import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth?.token;
        const role = token?.role;
        const { pathname } = req.nextUrl;

        // 1. Redirigir usuarios no autenticados a la página de inicio de sesión para rutas protegidas
        if (!token && (pathname.startsWith('/admin') || pathname === '/dashboard')) {
            const signInUrl = new URL('/auth/signin', req.url);
            return NextResponse.redirect(signInUrl);
        }

        // 2. Los administradores deben ir al panel de admin desde el dashboard
        if (pathname === '/dashboard' && (role === 'ADMIN' || role === 'SUPER_ADMIN')) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        // 3. Proteger rutas de admin para solo roles autorizados
        if (pathname.startsWith('/admin') && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin", "/admin/:path*", "/dashboard", "/profile/:path*", "/teacher/:path*"],
};
