/**
 * API client for Cloudflare Workers gallery API
 * All R2 operations go through Workers - credentials never exposed
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://gallery-api.your-worker.workers.dev';

export interface GalleryImage {
    key: string;
    url: string;
    category: string;
    filename: string;
    size?: number;
    uploaded?: string;
}

export interface GalleryResponse {
    images: GalleryImage[];
    categories: string[];
}

export interface UploadResponse {
    success: boolean;
    message: string;
    image?: GalleryImage;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

/**
 * Fetch all gallery images - public, no auth required
 */
export async function fetchGalleryImages(category?: string): Promise<GalleryResponse> {
    try {
        const url = category
            ? `${API_BASE_URL}/api/images/${encodeURIComponent(category)}`
            : `${API_BASE_URL}/api/images`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Don't cache - always get fresh data
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch images: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return { images: [], categories: [] };
    }
}

/**
 * Upload image to gallery - requires admin auth
 */
export async function uploadImage(
    file: File,
    category: string,
    token: string
): Promise<UploadResponse> {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.error || `Upload failed: ${response.status}`,
            };
        }

        return {
            success: true,
            message: 'Image uploaded successfully',
            image: data.image,
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Upload failed',
        };
    }
}

/**
 * Delete image from gallery - requires admin auth
 */
export async function deleteImage(
    category: string,
    filename: string,
    token: string
): Promise<DeleteResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, filename }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.error || `Delete failed: ${response.status}`,
            };
        }

        return {
            success: true,
            message: 'Image deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting image:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Delete failed',
        };
    }
}
