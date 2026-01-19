import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 🛡️ Security Headers (Hardening)

    // 🛡️ Security Headers (Enterprise Hardening)

    // HSTS: Strict HTTPS enforcement (2 years)
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

    // Mime Sniffing Protection
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Clickjacking Protection (DENY is safer than SAMEORIGIN)
    response.headers.set('X-Frame-Options', 'DENY');

    // Privacy Protection
    response.headers.set('X-DNS-Prefetch-Control', 'off');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions Policy (Block potentially dangerous features)
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()'
    );

    // Content-Security-Policy (CSP) - Temporarily Disabled for Debugging
    // const csp = [ ... ];
    // response.headers.set('Content-Security-Policy', csp);

    // 🔒 Route Protection (Auth Check)
    // Nota: Como estamos usando Auth.js (NextAuth v5 beta) y Mock, la protección real de sesión
    // suele ir en un envoltorio separado o usando `auth`. Aquí ponemos la lógica base.

    const path = request.nextUrl.pathname;

    // 🔒 Route Protection (Auth Check)
    // Fix: Redirección estricta desde el servidor para evitar "flicker" del home antiguo.
    if (path.startsWith('/admin')) {
        const sessionToken = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

        // Si no hay token de sesión, redirigir inmediatamente a login
        if (!sessionToken) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('callbackUrl', path);
            return NextResponse.redirect(loginUrl);
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
