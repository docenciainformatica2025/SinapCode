import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 🛡️ Security Headers (Hardening)

    // HSTS: Forzar HTTPS por 1 año
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // X-Content-Type-Options: Evitar MIME Sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // X-Frame-Options: Prevenir Clickjacking (Solo permitir mismo origen si es necesario, DENY es más seguro)
    response.headers.set('X-Frame-Options', 'DENY');

    // X-DNS-Prefetch-Control: Privacidad
    response.headers.set('X-DNS-Prefetch-Control', 'off');

    // Content-Security-Policy (Simplificado para evitar roturas, debería refinarse)
    // response.headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com;");

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
