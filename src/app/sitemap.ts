import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sinapcode.com';
    const currentDate = new Date().toISOString();

    // Fetch dynamic routes from DB
    // Note: In a real scenario, we would restart the build to update this if using ISG
    // or use a dynamic route. For now, we add the base listing pages.

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        // Excluyendo rutas de auth/admin del sitemap público
        {
            url: `${baseUrl}/legal/terms`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];
}
