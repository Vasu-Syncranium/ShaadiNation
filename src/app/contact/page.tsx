import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TasselDivider, MandalaFlourish, ElephantSilhouette } from '@/components/ui/TraditionalOrnaments';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Shaadi Nation for wedding planning inquiries. Schedule a free consultation today. Contact us via phone, email, or visit our office in Mumbai. We\'re here to make your dream wedding a reality.',
    keywords: [
        'contact wedding planner',
        'wedding consultation India',
        'wedding planner phone number',
        'wedding planner Mumbai',
        'wedding inquiry',
        'free wedding consultation',
        'book wedding planner',
    ],
    openGraph: {
        title: 'Contact Shaadi Nation - Get Your Free Consultation',
        description: 'Schedule a free wedding planning consultation today.',
        type: 'website',
        images: ['/images/contact-og.jpg'],
    },
    twitter: {
        card: 'summary',
        title: 'Contact Shaadi Nation',
        description: 'Get in touch for wedding planning inquiries',
    },
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    return (
        <>
            <Navigation />

            <main id="main-content">
                {/* Hero */}
                <section className="section hero-traditional pattern-paisley" style={{
                    background: 'linear-gradient(180deg, var(--color-cream) 0%, white 100%)',
                    textAlign: 'center',
                    position: 'relative',
                    paddingTop: '120px'
                }}>
                    <div className="container">
                        <p className="hero-subtitle">Let&apos;s Connect</p>
                        <h1 className="traditional">Contact Us</h1>
                        <TasselDivider color="var(--color-gold)" />
                        <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
                            Ready to start planning your dream wedding? We&apos;d love to hear from you.
                        </p>
                    </div>

                    {/* Elephant motif decoration */}
                    <div style={{ position: 'absolute', right: '5%', bottom: '10%', opacity: 0.2, transform: 'scaleX(-1)' }}>
                        <ElephantSilhouette color="var(--color-burgundy)" size="lg" />
                    </div>
                </section>

                {/* Contact Cards */}
                <section className="section pattern-traditional" style={{ background: 'white' }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 'var(--space-lg)',
                            maxWidth: '900px',
                            margin: '0 auto'
                        }}>
                            {/* Email */}
                            <div className="card-traditional text-center corner-flourish">
                                <span style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)', display: 'block' }}>
                                    ✉️
                                </span>
                                <h3 style={{ marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>Email Us</h3>
                                <p style={{ opacity: 0.7, marginBottom: 'var(--space-md)' }}>
                                    For inquiries and quotes
                                </p>
                                <a
                                    href="mailto:hello@shaadination.com"
                                    style={{
                                        color: 'var(--color-gold-dark)',
                                        fontWeight: 600
                                    }}
                                >
                                    hello@shaadination.com
                                </a>
                            </div>

                            {/* Phone */}
                            <div className="card-traditional text-center corner-flourish">
                                <span style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)', display: 'block' }}>
                                    📱
                                </span>
                                <h3 style={{ marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>Call Us</h3>
                                <p style={{ opacity: 0.7, marginBottom: 'var(--space-md)' }}>
                                    Mon-Sat, 10 AM - 7 PM
                                </p>
                                <a
                                    href="tel:+919876543210"
                                    style={{
                                        color: 'var(--color-gold-dark)',
                                        fontWeight: 600
                                    }}
                                >
                                    +91 98765 43210
                                </a>
                            </div>

                            {/* Location */}
                            <div className="card-traditional text-center corner-flourish">
                                <span style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)', display: 'block' }}>
                                    📍
                                </span>
                                <h3 style={{ marginBottom: 'var(--space-sm)', fontFamily: 'var(--font-display)' }}>Visit Us</h3>
                                <p style={{ opacity: 0.7, marginBottom: 'var(--space-md)' }}>
                                    Our Head Office
                                </p>
                                <p style={{
                                    color: 'var(--color-gold-dark)',
                                    fontWeight: 500,
                                    fontSize: '0.9375rem'
                                }}>
                                    Mumbai, Maharashtra<br />
                                    India
                                </p>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div style={{
                            maxWidth: '700px',
                            margin: 'var(--space-2xl) auto 0'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
                                <MandalaFlourish color="var(--color-gold)" size="lg" />
                            </div>
                            <h2 className="traditional text-center" style={{ marginBottom: 'var(--space-xl)' }}>
                                Frequently Asked Questions
                            </h2>

                            {[
                                {
                                    q: 'How far in advance should we book?',
                                    a: 'We recommend booking at least 6-12 months in advance for full wedding planning. For destination weddings or peak season dates, 12-18 months is ideal.',
                                },
                                {
                                    q: 'What is your pricing structure?',
                                    a: 'Our packages are customized based on your specific requirements. We offer everything from day-of coordination to full planning. Contact us for a personalized quote.',
                                },
                                {
                                    q: 'Do you work with specific vendors?',
                                    a: 'We have a trusted network of premium vendors across India, but we\'re also happy to work with vendors of your choice.',
                                },
                                {
                                    q: 'Do you plan destination weddings?',
                                    a: 'Absolutely! We specialize in destination weddings across India (Udaipur, Goa, Jaipur) and internationally (Thailand, Bali, Dubai, etc.).',
                                },
                                {
                                    q: 'What is included in the consultation?',
                                    a: 'Our free initial consultation includes understanding your vision, discussing your budget, and providing an overview of how we can help bring your dream wedding to life.',
                                },
                            ].map((faq, i) => (
                                <div
                                    key={i}
                                    className="card-traditional"
                                    style={{ marginBottom: 'var(--space-md)' }}
                                >
                                    <h4 style={{
                                        color: 'var(--color-burgundy)',
                                        marginBottom: 'var(--space-sm)',
                                        fontFamily: 'var(--font-display)'
                                    }}>
                                        {faq.q}
                                    </h4>
                                    <p style={{ margin: 0, opacity: 0.8 }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
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
                            Ready to Begin?
                        </h2>
                        <p style={{
                            maxWidth: '500px',
                            margin: '0 auto',
                            opacity: 0.9,
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.25rem'
                        }}>
                            Schedule your free consultation today and let&apos;s create something beautiful together.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

