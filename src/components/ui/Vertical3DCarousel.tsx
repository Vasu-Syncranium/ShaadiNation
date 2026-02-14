'use client';

import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

interface CarouselSection {
    id: string;
    label: string;
    children: ReactNode;
}

interface Vertical3DCarouselProps {
    sections: CarouselSection[];
    showNav?: boolean;
    showIndicator?: boolean;
}

export default function Vertical3DCarousel({
    sections,
    showNav = true,
    showIndicator = true
}: Vertical3DCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartY = useRef(0);
    const lastScrollTime = useRef(0);

    const totalSections = sections.length;

    // Navigate to a specific section
    const goToSection = useCallback((index: number) => {
        if (isAnimating || index === activeIndex || index < 0 || index >= totalSections) return;

        setIsAnimating(true);
        setActiveIndex(index);
        setScrollProgress((index / (totalSections - 1)) * 100);

        setTimeout(() => setIsAnimating(false), 800);
    }, [isAnimating, activeIndex, totalSections]);

    // Navigate to next/previous
    const nextSection = useCallback(() => {
        if (activeIndex < totalSections - 1) {
            goToSection(activeIndex + 1);
        }
    }, [activeIndex, totalSections, goToSection]);

    const prevSection = useCallback(() => {
        if (activeIndex > 0) {
            goToSection(activeIndex - 1);
        }
    }, [activeIndex, goToSection]);

    // Handle mouse wheel scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const now = Date.now();
            if (now - lastScrollTime.current < 800) return; // Debounce

            if (e.deltaY > 50) {
                nextSection();
                lastScrollTime.current = now;
            } else if (e.deltaY < -50) {
                prevSection();
                lastScrollTime.current = now;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [nextSection, prevSection]);

    // Handle touch events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY.current - touchEndY;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSection();
                } else {
                    prevSection();
                }
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [nextSection, prevSection]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                nextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSection();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSection, prevSection]);

    // Get 3D transform for each section
    const getSectionStyle = (index: number): React.CSSProperties => {
        const diff = index - activeIndex;

        // 3D transforms
        const translateY = diff * 100; // Percentage
        const translateZ = diff === 0 ? 0 : -300 * Math.abs(diff);
        const rotateX = diff * 15; // Rotate on X axis for depth
        const scale = diff === 0 ? 1 : 0.8 - Math.abs(diff) * 0.1;
        const opacity = diff === 0 ? 1 : Math.max(0, 0.5 - Math.abs(diff) * 0.2);

        return {
            transform: `
                translateY(${translateY}%)
                translateZ(${translateZ}px)
                rotateX(${rotateX}deg)
                scale(${scale})
            `,
            opacity,
            zIndex: 10 - Math.abs(diff),
            pointerEvents: diff === 0 ? 'auto' : 'none' as const,
            visibility: Math.abs(diff) > 2 ? 'hidden' : 'visible' as const
        };
    };

    return (
        <div
            ref={containerRef}
            className="vertical-3d-carousel"
        >
            {/* Progress Bar */}
            {showIndicator && (
                <div className="v3d-progress-track">
                    <div
                        className="v3d-progress-bar"
                        style={{ height: `${scrollProgress}%` }}
                    />
                </div>
            )}

            {/* Navigation Dots */}
            {showNav && (
                <nav className="v3d-nav" aria-label="Section navigation">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            className={`v3d-nav-dot ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => goToSection(index)}
                            aria-label={`Go to ${section.label}`}
                            title={section.label}
                        >
                            <span className="v3d-nav-label">{section.label}</span>
                        </button>
                    ))}
                </nav>
            )}

            {/* 3D Stage */}
            <div className="v3d-stage">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className={`v3d-section ${activeIndex === index ? 'active' : ''}`}
                        style={getSectionStyle(index)}
                        data-index={index}
                    >
                        {section.children}
                    </div>
                ))}
            </div>

            {/* Scroll Hint */}
            {activeIndex === 0 && (
                <div className="v3d-scroll-hint">
                    <span>Scroll to explore</span>
                    <div className="v3d-scroll-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Section Counter */}
            <div className="v3d-counter">
                <span className="v3d-counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="v3d-counter-divider">/</span>
                <span className="v3d-counter-total">{String(totalSections).padStart(2, '0')}</span>
            </div>
        </div>
    );
}
