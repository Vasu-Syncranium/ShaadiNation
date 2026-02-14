import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TasselDivider, PaisleyCorner, MandalaFlourish } from '@/components/ui/TraditionalOrnaments';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wedding Planning Services',
    description: 'Explore our comprehensive wedding planning services including full wedding planning, stunning decor & design, catering, and luxury destination weddings across India. Get your dream wedding today.',
    keywords: [
        'wedding planning services India',
        'full wedding planning',
        'wedding decor services',
        'wedding catering India',
        'destination wedding Udaipur',
        'destination wedding Goa',
        'luxury wedding services',
        'wedding coordinator India',
        'mehendi planning',
        'sangeet planning',
    ],
    openGraph: {
        title: 'Wedding Planning Services - Shaadi Nation',
        description: 'Complete wedding planning services: decor, catering, destination weddings & more.',
        type: 'website',
        images: ['/images/services-og.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wedding Planning Services',
        description: 'Complete wedding planning from start to finish',
    },
    alternates: {
        canonical: '/events',
    },
};

const services = [
    {
        name: 'Full Wedding Planning',
        icon: '✿',
        description: 'Complete end-to-end wedding coordination, from concept to execution. We handle every detail so you can enjoy your celebration stress-free.',
        features: ['Venue Selection', 'Budget Management', 'Timeline Planning', 'Day-of Coordination', 'Vendor Management'],
    },
    {
        name: 'Decor & Design',
        icon: '❧',
        description: 'Transform any venue into a breathtaking backdrop for your love story. Our design team creates immersive experiences that wow your guests.',
        features: ['Theme Development', 'Floral Design', 'Lighting Design', 'Stage Setup', 'Table Settings'],
    },
    {
        name: 'Catering & Cuisine',
        icon: '✦',
        description: 'Curated culinary experiences that delight every palate. From traditional Indian fare to global cuisine, we partner with the best caterers.',
        features: ['Menu Curation', 'Tasting Sessions', 'Multi-Cuisine Options', 'Special Diet Accommodations', 'Live Stations'],
    },
    {
        name: 'Destination Weddings',
        icon: '♪',
        description: 'Dream of a palace wedding in Udaipur? A beach celebration in Goa? We specialize in creating magical destination experiences.',
        features: ['Location Scouting', 'Guest Management', 'Travel Coordination', 'Local Vendor Network', 'Cultural Experiences'],
    },
];

export default function ServicesPage() {
    return (
        <>
            <Navigation />

            <main id="main-content">
                {/* Hero */}
                <section className="section hero-traditional pattern-paisley" style={{
                    background: 'linear-gradient(180deg, var(--color-cream) 0%, white 100%)',
                    textAlign: 'center',
                    paddingTop: '120px'
                }}>
                    <div className="container1" >
                        <h1 className="traditional" style={{ textAlign: 'center', width: '100%' }}>Our Services</h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <TasselDivider color="var(--color-gold)" />
                        </div>
                    </div>
                </section>

                {/* Services List */}
                <section className="section pattern-traditional" style={{ background: 'white' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                        {services.map((service, index) => (
                            <div
                                key={service.name}
                                className="card-traditional"
                                style={{
                                    marginBottom: index < services.length - 1 ? 'var(--space-xl)' : 0,
                                    position: 'relative',
                                    overflow: 'visible',
                                    textAlign: 'center'
                                }}
                            >
                                {/* Paisley Corner Decorations */}
                                <div style={{ position: 'absolute', top: -10, left: -10 }}>
                                    <PaisleyCorner color="var(--color-gold)" size="sm" />
                                </div>
                                <div style={{ position: 'absolute', top: -10, right: -10, transform: 'scaleX(-1)' }}>
                                    <PaisleyCorner color="var(--color-gold)" size="sm" />
                                </div>

                                {/* Decorative Icon */}
                                <span style={{
                                    position: 'absolute',
                                    top: 'var(--space-md)',
                                    right: 'var(--space-lg)',
                                    fontSize: '3rem',
                                    opacity: 0.15,
                                    color: 'var(--color-burgundy)'
                                }}>
                                    {service.icon}
                                </span>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-lg)' }}>
                                    {/* Icon Column */}
                                    <div style={{
                                        minWidth: '100px',
                                        textAlign: 'center',
                                        padding: 'var(--space-md)',
                                        background: 'linear-gradient(135deg, var(--color-cream) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px dashed rgba(212, 175, 55, 0.3)'
                                    }}>
                                        <span style={{
                                            fontSize: '3rem',
                                            color: 'var(--color-gold)'
                                        }}>
                                            {service.icon}
                                        </span>
                                    </div>

                                    {/* Content Column */}
                                    <div style={{ flex: 1, minWidth: '250px' }}>
                                        <h3 style={{ marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>{service.name}</h3>
                                        <p style={{ marginBottom: 'var(--space-md)' }}>{service.description}</p>

                                        {/* Features */}
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: 'var(--space-sm)'
                                        }}>
                                            {service.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    style={{
                                                        padding: '0.25rem 0.75rem',
                                                        fontSize: '0.75rem',
                                                        background: 'linear-gradient(135deg, var(--color-cream) 0%, rgba(212, 175, 55, 0.15) 100%)',
                                                        borderRadius: 'var(--radius-xl)',
                                                        color: 'var(--color-burgundy)',
                                                        border: '1px solid rgba(212, 175, 55, 0.2)'
                                                    }}
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing CTA */}
                <section className="section pattern-mandala" style={{ background: 'var(--color-cream)' }}>
                    <div className="container text-center">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                            <MandalaFlourish color="var(--color-gold)" size="md" />
                        </div>
                        <h2 className="traditional" style={{ marginBottom: 'var(--space-md)' }}>Customized Packages</h2>
                        <p style={{
                            maxWidth: '600px',
                            margin: '0 auto var(--space-lg)',
                            opacity: 0.8
                        }}>
                            Every wedding is unique, and so is our pricing. We create customized packages
                            based on your specific needs, preferences, and budget. Contact us for a personalized quote.
                        </p>
                        <TasselDivider color="var(--color-gold)" />
                    </div>
                </section>

                {/* CTA */}
                <section className="section border-scalloped-top" style={{
                    background: 'var(--gradient-burgundy)',
                    color: 'var(--color-ivory)',
                    textAlign: 'center'
                }}>
                    <div className="container">
                        <h2 style={{ color: 'var(--color-ivory)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-display)' }}>
                            Let&apos;s Plan Your Perfect Day
                        </h2>
                        <p style={{
                            maxWidth: '500px',
                            margin: '0 auto var(--space-lg)',
                            opacity: 0.9
                        }}>
                            Schedule a free consultation to discuss your wedding vision with our expert planners.
                        </p>
                        <a href="/contact" className="btn-traditional" style={{
                            borderColor: 'var(--color-gold)',
                            color: 'var(--color-ivory)'
                        }}>
                            Get Started
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

