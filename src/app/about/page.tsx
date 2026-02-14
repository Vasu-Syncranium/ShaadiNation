import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TasselDivider, MandalaFlourish, ElephantSilhouette } from '@/components/ui/TraditionalOrnaments';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Discover the story behind Shaadi Nation - India\'s premier wedding planning company with 10+ years of experience creating unforgettable dream weddings. Learn about our mission, values, and expert team.',
    keywords: ['about Shaadi Nation', 'wedding planner India story', 'wedding planning company history', 'Indian wedding experts'],
    openGraph: {
        title: 'About Shaadi Nation - Our Story',
        description: 'India\'s premier wedding planning company with 10+ years of experience creating dream weddings.',
        type: 'website',
        images: ['/images/about-og.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Shaadi Nation',
        description: '10+ years of creating unforgettable Indian weddings',
    },
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
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
                    <div className="container1">
                        {/* <p className="hero-subtitle">About Us</p> */}
                        <h1 className="traditional">Our Story</h1>
                        <TasselDivider color="var(--color-gold)" />
                    </div>

                    {/* Elephant motif decoration */}
                    <div style={{ position: 'absolute', right: '5%', bottom: '10%', opacity: 0.3 }}>
                        <ElephantSilhouette color="var(--color-burgundy)" size="lg" />
                    </div>
                </section>

                {/* Company Story */}
                <section className="section pattern-traditional" style={{ background: 'white', textAlign: 'center' }}>
                    <div className="container" style={{ maxWidth: '800px' }}>
                        {/* Founding Story */}
                        <div className="card-traditional corner-flourish" style={{ marginBottom: 'var(--space-xl)' }}>
                            <p style={{
                                color: 'var(--color-gold-dark)',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.875rem',
                                marginBottom: 'var(--space-sm)'
                            }}>
                                Founded in 2015
                            </p>
                            <h3 style={{ fontFamily: 'var(--font-display)' }}>How We Began</h3>
                            <p style={{ marginTop: 'var(--space-md)' }}>
                                Shaadi Nation was born from a simple belief: every couple deserves a wedding
                                that reflects their unique love story. What started as a small team of passionate
                                event planners has grown into one of India&apos;s most trusted wedding planning companies.
                            </p>
                            <p>
                                Our founder, inspired by the chaos of her own wedding planning experience,
                                set out to create a seamless, stress-free journey for couples embarking on
                                the most important celebration of their lives.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="card-traditional corner-flourish" style={{ marginBottom: 'var(--space-xl)' }}>
                            <p style={{
                                color: 'var(--color-gold-dark)',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.875rem',
                                marginBottom: 'var(--space-sm)'
                            }}>
                                Our Mission
                            </p>
                            <h3 style={{ fontFamily: 'var(--font-display)' }}>Creating Unforgettable Moments</h3>
                            <p style={{ marginTop: 'var(--space-md)' }}>
                                We are dedicated to transforming your wedding dreams into reality. Whether it&apos;s
                                an intimate ceremony for 50 guests or a grand celebration for 5,000, we bring
                                the same level of passion, creativity, and attention to detail.
                            </p>
                            <p>
                                Our mission is to take the stress out of wedding planning while ensuring every
                                moment is magical, meaningful, and memorable.
                            </p>
                        </div>

                        {/* Values */}
                        <div className="card-traditional corner-flourish" style={{ marginBottom: 'var(--space-xl)' }}>
                            <p style={{
                                color: 'var(--color-gold-dark)',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.875rem',
                                marginBottom: 'var(--space-sm)'
                            }}>
                                Our Values
                            </p>
                            <h3 style={{ fontFamily: 'var(--font-display)' }}>What Drives Us</h3>
                            <div style={{ marginTop: 'var(--space-md)', display: 'grid', gap: 'var(--space-md)' }}>
                                {[
                                    { title: 'Excellence', desc: 'We strive for perfection in every detail, no matter how small.' },
                                    { title: 'Personalization', desc: 'Every wedding we plan is as unique as the couple we serve.' },
                                    { title: 'Transparency', desc: 'Clear communication and honest pricing—no hidden surprises.' },
                                    { title: 'Passion', desc: 'We genuinely love what we do, and it shows in our work.' },
                                ].map((value) => (
                                    <div key={value.title}>
                                        <p style={{ fontWeight: 600, color: 'var(--color-burgundy)', marginBottom: 'var(--space-xs)', fontFamily: 'var(--font-display)' }}>
                                            {value.title}
                                        </p>
                                        <p style={{ margin: 0, opacity: 0.8 }}>{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
                                <MandalaFlourish color="var(--color-gold)" size="lg" />
                            </div>
                            <h3 className="traditional" style={{ marginBottom: 'var(--space-lg)' }}>By The Numbers</h3>
                            <div className="traditional-frame" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                gap: 'var(--space-lg)'
                            }}>
                                {[
                                    { number: '500+', label: 'Weddings' },
                                    { number: '10+', label: 'Years' },
                                    { number: '50+', label: 'Cities' },
                                    { number: '15', label: 'Countries' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <p style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '2.5rem',
                                            color: 'var(--color-burgundy)',
                                            marginBottom: '0'
                                        }}>
                                            {stat.number}
                                        </p>
                                        <p style={{ fontSize: '0.875rem', opacity: 0.7, margin: 0 }}>
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

