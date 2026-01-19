import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Force all routes to be dynamic
export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Add header to force dynamic rendering
    response.headers.set('x-middleware-cache', 'no-cache')

    return response
}

// Apply to all routes
export const config = {
    matcher: '/:path*',
}
