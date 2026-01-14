/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path((?!auth).*)',
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
};

module.exports = nextConfig;
