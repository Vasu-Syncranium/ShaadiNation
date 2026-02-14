'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll listener to toggle background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/events', label: 'Services' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
    ];

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <nav className={`nav ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'nav-open' : ''}`}>
            <div className="nav-container">
                <Link href="/" className="nav-logo nav-logo-traditional" onClick={() => setIsOpen(false)}>
                    <Image
                        src="/images/logo.jpeg"
                        alt="Shaadi Nation"
                        width={120}
                        height={120}
                        className="nav-logo-img"
                        priority
                    />
                </Link>

                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="nav-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className={`nav-toggle ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                    aria-expanded={isOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
