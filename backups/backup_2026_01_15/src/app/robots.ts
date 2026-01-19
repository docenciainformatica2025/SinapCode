import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/private/', '/_next/', '/auth/'], // Bloquear auth y privadas
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/private/', '/auth/'],
            },
        ],
        sitemap: 'https://sinapcode.com/sitemap.xml',
    };
}
