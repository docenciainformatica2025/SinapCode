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
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https: http:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https://accounts.google.com https://www.google.com; object-src 'none';"
                    }
                ]
            }
        ];
    },
    // Security & Obfuscation
    productionBrowserSourceMaps: false, // Disable source maps in production (Hides code)
    poweredByHeader: false, // Hide "X-Powered-By: Next.js"
    reactStrictMode: true,
    // Headers are now handled in middleware.ts
};

module.exports = nextConfig;
