import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Log cookies for debugging
    const sessionToken = request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('next-auth.session-token');
    console.log(`[Middleware] Path: ${request.nextUrl.pathname}, Cookie found: ${!!sessionToken}`);

    if (request.nextUrl.pathname.startsWith('/dashboard') && !sessionToken) {
        console.log('[Middleware] Redirecting to login due to missing cookie');
        // Allow it to proceed to let client-side handle it, or redirect here?
        // Let's rely on client-side for now, just logging.
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/auth/:path*'],
};
