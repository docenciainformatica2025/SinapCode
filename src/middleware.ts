import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 🛡️ Security Headers (Enterprise Hardening)
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-DNS-Prefetch-Control', 'off');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()'
    );

    const path = request.nextUrl.pathname;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
    });

    // 🚦 1. LOGIN/REGISTER REDIRECTS (If already logged in)
    if (token && (path === '/auth/login' || path === '/auth/register')) {
        const target = token.role === 'ADMIN' ? '/admin' : '/dashboard';
        return NextResponse.redirect(new URL(target, request.url));
    }

    // 🚦 2. ROOT PATH REDIRECT (Smart Landing)
    if (path === '/') {
        if (token) {
            const target = token.role === 'ADMIN' ? '/admin' : '/dashboard';
            return NextResponse.redirect(new URL(target, request.url));
        }
        // If guest, stay on Landing Page (implicit)
    }

    // 🚦 3. DASHBOARD PROTECTION (Admins shouldn't see Student Dashboard)
    // Optional: You can remove this if Admins SHOULD see the dashboard, 
    // but the user complained about "seeing student home".
    if (path.startsWith('/dashboard') && token?.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // 🔒 4. ADMIN ROUTE PROTECTION
    if (path.startsWith('/admin')) {
        if (!token) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('callbackUrl', path);
            return NextResponse.redirect(loginUrl);
        }
        if (token.role !== 'ADMIN') {
            // Redirect unauthorized users to their dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
