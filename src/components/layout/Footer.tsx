import Link from 'next/link';
import { TasselDivider } from '@/components/ui/TraditionalOrnaments';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/events', label: 'Services' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <footer className="footer-traditional">
            {/* Tassel ornament divider */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <TasselDivider color="var(--color-gold)" />
            </div>

            <div className="footer-logo">
                Shaadi Nation
            </div>

            <p className="footer-tagline">
                Creating Dream Weddings
            </p>

            <nav className="footer-links">
                {footerLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="footer-link"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
                color: 'var(--color-blush)',
                fontSize: '0.9rem',
                opacity: 0.8
            }}>
                <div>
                    <span style={{ color: 'var(--color-gold)', marginRight: 'var(--space-xs)' }}>✉</span>
                    hello@shaadination.com
                </div>
                <div>
                    <span style={{ color: 'var(--color-gold)', marginRight: 'var(--space-xs)' }}>☏</span>
                    +91 98765 43210
                </div>
            </div>

            <p className="footer-copyright">
                © {currentYear} Shaadi Nation. Crafted with love.
            </p>
        </footer>
    );
}

