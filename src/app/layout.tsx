import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

// Base URL for the site - update this for production
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shaadination.com';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FFFFF0' },
        { media: '(prefers-color-scheme: dark)', color: '#8B1A1A' },
    ],
};

export const metadata: Metadata = {
    // Primary metadata
    title: {
        default: 'Shaadi Nation - Premium Wedding Planning in India',
        template: '%s | Shaadi Nation'
    },
    description: 'India\'s premier wedding planning company. We create dream weddings with expert planning, stunning decor, and flawless execution. Serving luxury destination weddings across India since 2015.',

    // Keywords for search engines
    keywords: [
        'wedding planner India',
        'Indian wedding planner',
        'destination wedding India',
        'luxury wedding planning',
        'wedding decor',
        'wedding coordinator',
        'Hindu wedding planner',
        'destination wedding Udaipur',
        'destination wedding Goa',
        'destination wedding Jaipur',
        'wedding venue selection',
        'wedding catering services',
        'bridal makeup services',
        'mehendi ceremony planning',
        'sangeet planning',
        'reception planning',
    ],

    // Author and creator info
    authors: [{ name: 'Shaadi Nation' }],
    creator: 'Shaadi Nation',
    publisher: 'Shaadi Nation',

    // Robots directives
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Canonical URL
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
        languages: {
            'en-IN': '/en-IN',
        },
    },

    // Open Graph metadata for social sharing
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: siteUrl,
        siteName: 'Shaadi Nation',
        title: 'Shaadi Nation - Premium Wedding Planning in India',
        description: 'India\'s premier wedding planning company. Creating dream weddings with expert planning, stunning decor, and flawless execution since 2015.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Shaadi Nation - Premium Indian Wedding Planning',
                type: 'image/jpeg',
            },
        ],
    },

    // Twitter Card metadata
    twitter: {
        card: 'summary_large_image',
        title: 'Shaadi Nation - Premium Wedding Planning in India',
        description: 'India\'s premier wedding planning company. Creating dream weddings since 2015.',
        images: ['/images/og-image.jpg'],
        creator: '@shaadinationav',
        site: '@shaadinationav',
    },

    // Verification for search engines
    verification: {
        google: 'your-google-verification-code', // Replace with actual code
        // yandex: 'your-yandex-code',
        // bing: 'your-bing-code',
    },

    // App-specific metadata
    applicationName: 'Shaadi Nation',
    category: 'Wedding Planning',

    // Additional metadata
    other: {
        'geo.region': 'IN',
        'geo.placename': 'India',
        'business:contact_data:street_address': 'Mumbai, India',
        'business:contact_data:country_name': 'India',
    },
};

// JSON-LD Structured Data for the organization
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'Shaadi Nation',
    alternateName: 'Shaadi Nation Wedding Planners',
    description: 'India\'s premier wedding planning company specializing in luxury destination weddings, traditional Indian ceremonies, and bespoke wedding experiences.',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/images/og-image.jpg`,
    telephone: '+91-98765-43210',
    email: 'hello@shaadination.com',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '19.0760',
        longitude: '72.8777',
    },
    areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Udaipur' },
        { '@type': 'City', name: 'Jaipur' },
        { '@type': 'City', name: 'Goa' },
    ],
    priceRange: '₹₹₹₹',
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
    },
    sameAs: [
        'https://www.instagram.com/shaadinationav',
        'https://www.facebook.com/shaadinationav',
        'https://www.pinterest.com/shaadinationav',
    ],
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
        bestRating: '5',
        worstRating: '1',
    },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Wedding Planning Services',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Full Wedding Planning',
                    description: 'Complete end-to-end wedding coordination',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Destination Wedding Planning',
                    description: 'Luxury destination wedding experiences across India',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Wedding Decor & Design',
                    description: 'Stunning venue transformations and decoration',
                },
            },
        ],
    },
};

// Website schema
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Shaadi Nation',
    description: 'India\'s premier wedding planning company',
    publisher: {
        '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-IN" dir="ltr">
            <head>
                {/* Preconnect to external resources for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Google Fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />

                {/* Favicon and app icons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteSchema),
                    }}
                />
            </head>
            <body>
                {/* Skip to main content link for accessibility */}
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                {children}
            </body>
        </html>
    );
}
