'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';

interface CarouselItem {
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    description?: string;
    link?: string;
}

interface Carousel3DProps {
    items: CarouselItem[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
}

export default function Carousel3D({
    items,
    autoPlay = true,
    autoPlayInterval = 5000,
    showControls = true,
    showIndicators = true
}: Carousel3DProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const totalItems = items.length;

    const goToSlide = useCallback((index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex(index);
        setTimeout(() => setIsAnimating(false), 600);
    }, [isAnimating]);

    const nextSlide = useCallback(() => {
        goToSlide((activeIndex + 1) % totalItems);
    }, [activeIndex, totalItems, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide((activeIndex - 1 + totalItems) % totalItems);
    }, [activeIndex, totalItems, goToSlide]);

    // Auto-play functionality
    useEffect(() => {
        if (!autoPlay || isPaused) return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, isPaused, nextSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prevSlide, nextSlide]);

    // Calculate position for each card
    const getCardStyle = (index: number) => {
        const diff = index - activeIndex;
        const normalizedDiff = ((diff % totalItems) + totalItems) % totalItems;

        // Handle wrap-around for smooth circular motion
        const adjustedDiff = normalizedDiff > totalItems / 2
            ? normalizedDiff - totalItems
            : normalizedDiff;

        // 3D transform values
        const rotateY = adjustedDiff * 45; // Rotate cards
        const translateZ = Math.abs(adjustedDiff) === 0 ? 100 : -150 * Math.abs(adjustedDiff);
        const translateX = adjustedDiff * 280;
        const scale = adjustedDiff === 0 ? 1 : 0.7 - Math.abs(adjustedDiff) * 0.1;
        const opacity = adjustedDiff === 0 ? 1 : Math.max(0.3, 0.7 - Math.abs(adjustedDiff) * 0.2);
        const zIndex = 10 - Math.abs(adjustedDiff);
        const blur = adjustedDiff === 0 ? 0 : Math.abs(adjustedDiff) * 2;

        return {
            transform: `
                translateX(${translateX}px) 
                translateZ(${translateZ}px) 
                rotateY(${rotateY}deg) 
                scale(${scale})
            `,
            opacity,
            zIndex,
            filter: blur > 0 ? `blur(${blur}px)` : 'none',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
    };

    return (
        <div
            className="carousel-3d-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background gradient based on active slide */}
            <div className="carousel-3d-bg" />

            {/* 3D Stage */}
            <div className="carousel-3d-stage">
                <div className="carousel-3d-track">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`carousel-3d-card ${index === activeIndex ? 'active' : ''}`}
                            style={getCardStyle(index)}
                            onClick={() => goToSlide(index)}
                        >
                            {/* Card Image */}
                            <div className="carousel-3d-image">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading={Math.abs(index - activeIndex) <= 1 ? 'eager' : 'lazy'}
                                />
                                {/* Overlay gradient */}
                                <div className="carousel-3d-overlay" />
                            </div>

                            {/* Card Content */}
                            <div className="carousel-3d-content">
                                {item.subtitle && (
                                    <span className="carousel-3d-subtitle">{item.subtitle}</span>
                                )}
                                <h3 className="carousel-3d-title">{item.title}</h3>
                                {item.description && index === activeIndex && (
                                    <p className="carousel-3d-description">{item.description}</p>
                                )}
                            </div>

                            {/* 3D Card shine effect */}
                            <div className="carousel-3d-shine" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            {showControls && (
                <div className="carousel-3d-controls">
                    <button
                        className="carousel-3d-btn carousel-3d-prev"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        className="carousel-3d-btn carousel-3d-next"
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Indicators */}
            {showIndicators && (
                <div className="carousel-3d-indicators">
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            className={`carousel-3d-indicator ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}: ${item.title}`}
                        >
                            <span className="carousel-3d-indicator-fill" />
                        </button>
                    ))}
                </div>
            )}

            {/* Active slide info */}
            <div className="carousel-3d-info">
                <span className="carousel-3d-counter">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
}
