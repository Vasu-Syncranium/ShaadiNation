import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Domain-based routing middleware for ShaadinationAV
 * 
 * Rules:
 * - domain.com → only public routes (/, /about, /events, /gallery, /contact)
 * - admin.domain.com → only /admin route
 * - domain.com/admin → blocked, redirects to /
 * - admin.domain.com/any-public-route → redirects to /admin
 */

const PUBLIC_ROUTES = ['/', '/about', '/events', '/gallery', '/contact'];
const ADMIN_ROUTE = '/admin';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Normalize pathname (remove trailing slash except for root)
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

    // Check if this is the admin subdomain
    const isAdminSubdomain = hostname.startsWith('admin.');

    // Check what type of route is being accessed
    const isAdminRoute = normalizedPath === ADMIN_ROUTE || normalizedPath.startsWith(ADMIN_ROUTE + '/');
    const isPublicRoute = PUBLIC_ROUTES.includes(normalizedPath);

    // Skip middleware for static assets and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // static files
    ) {
        return NextResponse.next();
    }

    // Admin subdomain logic
    if (isAdminSubdomain) {
        // On admin subdomain, only allow /admin routes
        if (!isAdminRoute) {
            // Redirect any non-admin route to /admin
            const url = request.nextUrl.clone();
            url.pathname = ADMIN_ROUTE;
            return NextResponse.redirect(url);
        }
        // Allow /admin routes on admin subdomain
        return NextResponse.next();
    }

    // Main domain logic
    if (isAdminRoute) {
        // Block /admin on main domain, redirect to home
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Allow public routes on main domain
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
    ],
};
