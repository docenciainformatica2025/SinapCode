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

    // Content-Security-Policy (CSP) - Enterprise Grade
    // Blocks inline scripts (except unsafe-inline/eval required for Next.js dev/hydration usually), 
    // restricts sources to self and trusted domains (Google Auth, Vitals).
    const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://*.vercel-scripts.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' blob: data: https://*.googleusercontent.com https://*.gravatar.com",
        "font-src 'self' data:",
        "connect-src 'self' https://s3-alpha-sig.figma.com https://*.googleapis.com",
        "frame-src 'self' https://accounts.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'", // Blocks embedding (Clickjacking)
        "block-all-mixed-content",
        "upgrade-insecure-requests"
    ].join('; ');

    response.headers.set('Content-Security-Policy', csp);

    // 🔒 Route Protection (Auth Check)
    // Nota: Como estamos usando Auth.js (NextAuth v5 beta) y Mock, la protección real de sesión
    // suele ir en un envoltorio separado o usando `auth`. Aquí ponemos la lógica base.

    const path = request.nextUrl.pathname;

    // Proteger rutas de admin
    if (path.startsWith('/admin')) {
        // En una implementación real con JWT en cookie, verificaríamos aquí el token.
        // Dado que usamos SessionProvider y verificación en cliente (RoleGate) + Server Components,
        // este middleware actúa como primera línea de defensa para headers.
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
