const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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
    productionBrowserSourceMaps: false,
    poweredByHeader: false,
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
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
}

module.exports = withMDX(nextConfig)
