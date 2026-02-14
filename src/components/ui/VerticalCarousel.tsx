'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';

interface CarouselSection {
    id: string;
    label: string;
    children: ReactNode;
}

interface VerticalCarouselProps {
    sections: CarouselSection[];
    showNav?: boolean;
    showIndicator?: boolean;
}

export default function VerticalCarousel({
    sections,
    showNav = true,
    showIndicator = true
}: VerticalCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            setScrollProgress(progress);

            // Find active section
            const sectionHeight = container.clientHeight;
            const currentIndex = Math.round(scrollTop / sectionHeight);
            setActiveIndex(Math.min(currentIndex, sections.length - 1));
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [sections.length]);

    const scrollToSection = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        const sectionHeight = container.clientHeight;
        container.scrollTo({
            top: index * sectionHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="vertical-carousel-wrapper" style={{ position: 'relative' }}>
            {/* Progress Indicator */}
            {showIndicator && (
                <div
                    className="carousel-indicator"
                    style={{ height: `${scrollProgress}%` }}
                />
            )}

            {/* Navigation Dots */}
            {showNav && (
                <nav className="carousel-nav" aria-label="Section navigation">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => scrollToSection(index)}
                            aria-label={`Go to ${section.label}`}
                            title={section.label}
                        />
                    ))}
                </nav>
            )}

            {/* Carousel Container */}
            <div
                ref={containerRef}
                className="vertical-carousel hide-scrollbar"
            >
                {sections.map((section, index) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="carousel-section"
                        data-index={index}
                    >
                        {section.children}
                    </section>
                ))}
            </div>
        </div>
    );
}
