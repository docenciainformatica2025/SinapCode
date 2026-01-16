/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path((?!auth|admin).*)',
                destination: `${process.env.BACKEND_API_URL || 'http://localhost:3005'}/api/:path*`, // Proxy to Backend
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/register',
                destination: '/auth/register',
                permanent: true,
            },
            {
                source: '/login',
                destination: '/auth/login',
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ]
            }
        ];
    },
    // Security & Obfuscation
    productionBrowserSourceMaps: false, // Disable source maps in production (Hides code)
    poweredByHeader: false, // Hide "X-Powered-By: Next.js"
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        outputFileTracingIncludes: {
            '/api/admin/users/**/*': ['./public/fonts/**/*'],
        },
    },
};

module.exports = nextConfig;
