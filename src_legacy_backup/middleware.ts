import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

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

    // Permissions Policy (Block all intrusive features)
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), magnetomery=(), accelerometer=(), gyroscope=()'
    );

    // Content-Security-Policy (CSP)
    // Allows: Self, Vercel Analytics, Google Analytics, Images from Unsplash/Gravatar/Supabase
    const cspHeader = `
        default-src 'self';
        connect-src 'self' https://region1.google-analytics.com https://*.supabase.co https://vitals.vercel-insights.com;
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google.com/recaptcha/ https://www.gstatic.com;
        frame-src 'self' https://www.google.com/recaptcha/;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: https://images.unsplash.com https://*.supabase.co https://gravatar.com https://www.gravatar.com;
        font-src 'self' data:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `;

    response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());

    // 🔒 Route Protection (Auth Check)
    const path = request.nextUrl.pathname;

    // Protección básica de Admin en Edge
    // Si intenta entrar a /admin y no tiene cookie de sesión, redirigir a login.
    if (path.startsWith('/admin')) {
        const sessionToken = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');
        if (!sessionToken) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
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
