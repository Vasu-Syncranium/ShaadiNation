import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wedding Gallery',
    description: 'Browse our stunning wedding gallery featuring beautiful moments from Indian weddings we\'ve planned. View photos from destination weddings, mehendi ceremonies, sangeet nights, and grand receptions.',
    keywords: [
        'wedding gallery India',
        'wedding photos',
        'Indian wedding pictures',
        'destination wedding gallery',
        'wedding decor photos',
        'wedding inspiration',
        'real wedding photos India',
        'luxury wedding gallery',
    ],
    openGraph: {
        title: 'Wedding Gallery - Shaadi Nation',
        description: 'Stunning photos from weddings we\'ve planned across India.',
        type: 'website',
        images: ['/images/gallery-og.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wedding Gallery',
        description: 'Beautiful moments from our planned weddings',
    },
    alternates: {
        canonical: '/gallery',
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
