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
            {
    protocol: 'https',
        hostname: 'images.unsplash.com',
            },
{
    protocol: 'https',
        hostname: 'ui-avatars.com',
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
