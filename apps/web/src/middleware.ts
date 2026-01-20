import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const role = token?.role;
        const { pathname } = req.nextUrl;

        // 1. Force Admins to /admin if they try to access /dashboard
        if (pathname === "/dashboard" && (role === "ADMIN" || role === "SUPER_ADMIN")) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        // 2. Protect /admin for only authorized roles
        if (pathname.startsWith("/admin") && role !== "ADMIN" && role !== "SUPER_ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
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
    matcher: ["/admin/:path*", "/dashboard", "/profile/:path*", "/teacher/:path*"],
};
