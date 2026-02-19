import { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site-config';

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
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
