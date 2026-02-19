import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // nextauth adds token to the request
        const token = req.nextauth.token;
        const role = token?.role;
        const { pathname } = req.nextUrl;

        // 0. Autenticación: Si el usuario YA está autenticado y trata de ir a login/register, enviarlo al dashboard
        if (token && (pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/auth/signin')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // 1. Redirigir usuarios no autenticados a la página de inicio de sesión para rutas protegidas
        if (!token && (
            pathname.startsWith('/admin') ||
            pathname.startsWith('/dashboard') ||
            pathname.startsWith('/profile') ||
            pathname.startsWith('/teacher') ||
            pathname.startsWith('/courses') ||
            pathname.startsWith('/evolution') ||
            pathname.startsWith('/library') ||
            pathname.startsWith('/mentor') ||
            pathname.startsWith('/api/protected')
        )) {
            const signInUrl = new URL('/auth/login', req.url);
            return NextResponse.redirect(signInUrl);
        }

        // 2. Los administradores deben ir al panel de admin desde el dashboard
        // Permitimos acceso para la simulación de roles. El dashboard manejará la redirección si es necesario.
        /* if (pathname === '/dashboard' && (role === 'ADMIN' || role === 'SUPER_ADMIN')) {
            return NextResponse.redirect(new URL('/admin', req.url));
        } */

        // 3. Proteger rutas de admin para solo roles autorizados
        if (pathname.startsWith('/admin') && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Permitir acceso a rutas de auth si no hay token, o rutas públicas
                if (req.nextUrl.pathname.startsWith('/auth')) {
                    return true;
                }
                // Para las demás rutas protegidas por matcher, requerir token
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*", "/profile/:path*", "/teacher/:path*", "/auth/:path*", "/courses/:path*", "/evolution/:path*", "/library/:path*", "/mentor/:path*"],
};
