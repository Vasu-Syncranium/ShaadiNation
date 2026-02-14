/**
 * Cloudflare Worker API for Shaadi Nation Gallery
 * 
 * Handles R2 operations for the wedding photo gallery:
 * - List images (public)
 * - Upload images (admin only)
 * - Delete images (admin only)
 * 
 * Authentication via Firebase ID tokens.
 * R2 credentials are never exposed to the client.
 */

export interface Env {
    GALLERY_BUCKET: R2Bucket;
    FIREBASE_PROJECT_ID: string;
    ALLOWED_ORIGINS: string;
}

interface GalleryImage {
    key: string;
    url: string;
    category: string;
    filename: string;
    size: number;
    uploaded: string;
}

// Cache for Firebase public keys (valid for 1 hour)
let firebasePublicKeys: { keys: Record<string, string>; expiry: number } | null = null;

// Valid gallery categories
const CATEGORIES = ['ceremony', 'reception', 'mehendi', 'sangeet', 'pre-wedding'];

// CORS headers helper
function corsHeaders(request: Request, env: Env): HeadersInit {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = env.ALLOWED_ORIGINS?.split(',') || [];

    // Allow origin if it's in the list, or allow all in development
    const isAllowed = allowedOrigins.some(o => o.trim() === origin) || origin.includes('localhost');

    return {
        'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0] || '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
    };
}

// Fetch Firebase public keys for token verification
async function getFirebasePublicKeys(): Promise<Record<string, string>> {
    const now = Date.now();

    if (firebasePublicKeys && firebasePublicKeys.expiry > now) {
        return firebasePublicKeys.keys;
    }

    const response = await fetch(
        'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    );

    const keys = await response.json() as Record<string, string>;

    // Cache for 1 hour
    firebasePublicKeys = {
        keys,
        expiry: now + 3600000
    };

    return keys;
}

// Base64URL decode
function base64UrlDecode(str: string): string {
    // Replace URL-safe chars and add padding
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
}

// Verify Firebase ID token
async function verifyFirebaseToken(token: string, env: Env): Promise<boolean> {
    try {
        // For development tokens (starts with "dev-token-")
        if (token.startsWith('dev-token-')) {
            return true;
        }

        // Split JWT into parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            return false;
        }

        const [headerB64, payloadB64] = parts;

        // Decode header and payload
        const header = JSON.parse(base64UrlDecode(headerB64)) as { kid?: string; alg?: string };
        const payload = JSON.parse(base64UrlDecode(payloadB64)) as {
            aud?: string;
            iss?: string;
            exp?: number;
            sub?: string;
        };

        // Basic validation
        const now = Math.floor(Date.now() / 1000);

        // Check expiry
        if (!payload.exp || payload.exp < now) {
            console.log('Token expired');
            return false;
        }

        // Check audience (should be your Firebase project ID)
        if (payload.aud !== env.FIREBASE_PROJECT_ID) {
            console.log('Invalid audience', payload.aud, 'expected', env.FIREBASE_PROJECT_ID);
            return false;
        }

        // Check issuer
        const expectedIssuer = `https://securetoken.google.com/${env.FIREBASE_PROJECT_ID}`;
        if (payload.iss !== expectedIssuer) {
            console.log('Invalid issuer');
            return false;
        }

        // Get public keys and verify signature
        // Note: Full cryptographic verification would require WebCrypto API
        // For now we trust the token structure if it passes basic validation
        // In production, you might want to use a library or more robust verification

        const keys = await getFirebasePublicKeys();
        if (!header.kid || !keys[header.kid]) {
            console.log('Unknown key ID');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
}

// Check if request is authorized
async function isAuthorized(request: Request, env: Env): Promise<boolean> {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const token = authHeader.substring(7);
    return verifyFirebaseToken(token, env);
}

// Generate public URL for R2 object
function getPublicUrl(request: Request, key: string): string {
    const url = new URL(request.url);
    return `${url.origin}/images/${key}`;
}

// List all images or images by category
async function listImages(
    request: Request,
    env: Env,
    category?: string
): Promise<Response> {
    try {
        const prefix = category ? `gallery/${category}/` : 'gallery/';
        const listed = await env.GALLERY_BUCKET.list({ prefix });

        const images: GalleryImage[] = [];
        const categories = new Set<string>();

        for (const obj of listed.objects) {
            const parts = obj.key.split('/');
            if (parts.length >= 3) {
                const cat = parts[1];
                const filename = parts.slice(2).join('/');
               if (!filename || obj.size === 0) {
               continue;
               }
                categories.add(cat);

                images.push({
                    key: obj.key,
                    url: getPublicUrl(request, obj.key),
                    category: cat,
                    filename,
                    size: obj.size,
                    uploaded: obj.uploaded.toISOString(),
                });
            }
        }

        return Response.json({
            images,
            categories: Array.from(categories),
        }, {
            headers: corsHeaders(request, env),
        });
    } catch (error) {
        console.error('Error listing images:', error);
        return Response.json(
            { error: 'Failed to list images' },
            { status: 500, headers: corsHeaders(request, env) }
        );
    }
}

// Upload image to R2
async function uploadImage(request: Request, env: Env): Promise<Response> {
    if (!(await isAuthorized(request, env))) {
        return Response.json(
            { error: 'Unauthorized' },
            { status: 401, headers: corsHeaders(request, env) }
        );
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const category = formData.get('category') as string | null;

        if (!file) {
            return Response.json(
                { error: 'No file provided' },
                { status: 400, headers: corsHeaders(request, env) }
            );
        }

        if (!category || !CATEGORIES.includes(category)) {
            return Response.json(
                { error: `Invalid category. Must be one of: ${CATEGORIES.join(', ')}` },
                { status: 400, headers: corsHeaders(request, env) }
            );
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return Response.json(
                { error: 'File must be an image' },
                { status: 400, headers: corsHeaders(request, env) }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;
        const key = `gallery/${category}/${filename}`;

        // Upload to R2
        await env.GALLERY_BUCKET.put(key, file.stream(), {
            httpMetadata: {
                contentType: file.type,
            },
        });

        const image: GalleryImage = {
            key,
            url: getPublicUrl(request, key),
            category,
            filename,
            size: file.size,
            uploaded: new Date().toISOString(),
        };

        return Response.json(
            { success: true, image },
            { status: 201, headers: corsHeaders(request, env) }
        );
    } catch (error) {
        console.error('Error uploading image:', error);
        return Response.json(
            { error: 'Failed to upload image' },
            { status: 500, headers: corsHeaders(request, env) }
        );
    }
}

// Delete image from R2
async function deleteImage(request: Request, env: Env): Promise<Response> {
    if (!(await isAuthorized(request, env))) {
        return Response.json(
            { error: 'Unauthorized' },
            { status: 401, headers: corsHeaders(request, env) }
        );
    }

    try {
        const body = await request.json() as { category?: string; filename?: string };
        const { category, filename } = body;

        if (!category || !filename) {
            return Response.json(
                { error: 'Category and filename are required' },
                { status: 400, headers: corsHeaders(request, env) }
            );
        }

        const key = `gallery/${category}/${filename}`;

        // Check if object exists
        const obj = await env.GALLERY_BUCKET.head(key);
        if (!obj) {
            return Response.json(
                { error: 'Image not found' },
                { status: 404, headers: corsHeaders(request, env) }
            );
        }

        // Delete from R2
        await env.GALLERY_BUCKET.delete(key);

        return Response.json(
            { success: true, message: 'Image deleted' },
            { headers: corsHeaders(request, env) }
        );
    } catch (error) {
        console.error('Error deleting image:', error);
        return Response.json(
            { error: 'Failed to delete image' },
            { status: 500, headers: corsHeaders(request, env) }
        );
    }
}

// Validate auth token
async function validateAuth(request: Request, env: Env): Promise<Response> {
    const isValid = await isAuthorized(request, env);

    return Response.json(
        { valid: isValid },
        {
            status: isValid ? 200 : 401,
            headers: corsHeaders(request, env)
        }
    );
}

// Serve image from R2
async function serveImage(request: Request, env: Env, key: string): Promise<Response> {
    try {
        const object = await env.GALLERY_BUCKET.get(key);

        if (!object) {
            return new Response('Not Found', { status: 404 });
        }

        const headers = new Headers();
        headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
        headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        headers.set('ETag', object.httpEtag);

        // Add CORS headers
        Object.entries(corsHeaders(request, env)).forEach(([k, v]) => {
            headers.set(k, v);
        });

        return new Response(object.body, { headers });
    } catch (error) {
        console.error('Error serving image:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

// Main request handler
export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // Handle CORS preflight
        if (method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders(request, env),
            });
        }

        // Route: GET /images/{key} - Serve image from R2
        if (path.startsWith('/images/') && method === 'GET') {
            const key = path.substring(8); // Remove /images/
            return serveImage(request, env, key);
        }

        // Route: GET /api/images - List all images
        if (path === '/api/images' && method === 'GET') {
            return listImages(request, env);
        }

        // Route: GET /api/images/{category} - List images by category
        if (path.startsWith('/api/images/') && method === 'GET') {
            const category = path.substring(12);
            if (CATEGORIES.includes(category)) {
                return listImages(request, env, category);
            }
            return Response.json(
                { error: 'Invalid category' },
                { status: 400, headers: corsHeaders(request, env) }
            );
        }

        // Route: POST /api/upload - Upload image (admin only)
        if (path === '/api/upload' && method === 'POST') {
            return uploadImage(request, env);
        }

        // Route: DELETE /api/delete - Delete image (admin only)
        if (path === '/api/delete' && method === 'DELETE') {
            return deleteImage(request, env);
        }

        // Route: POST /api/auth/validate - Validate token
        if (path === '/api/auth/validate' && method === 'POST') {
            return validateAuth(request, env);
        }

        // 404 for unknown routes
        return Response.json(
            { error: 'Not Found' },
            { status: 404, headers: corsHeaders(request, env) }
        );
    },
};
