import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shaadination.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    // Static pages
    const staticPages = [
        {
            url: siteUrl,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${siteUrl}/about`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${siteUrl}/events`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${siteUrl}/gallery`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ];

    return staticPages;
}
