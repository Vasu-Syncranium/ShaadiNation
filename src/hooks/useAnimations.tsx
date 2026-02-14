'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

/**
 * Hook for triggering animations when elements come into view
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollAnimationOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

/**
 * Hook for parallax scroll effect
 */
export function useParallax(speed: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.scrollY;
            const elementTop = rect.top + scrolled;
            const parallaxOffset = (scrolled - elementTop) * speed;
            setOffset(parallaxOffset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
}

/**
 * Hook for mouse-following 3D tilt effect
 */
export function use3DTilt(intensity: number = 15) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            setTransform(
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            );
        };

        const handleMouseLeave = () => {
            setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [intensity]);

    return { ref, transform };
}

/**
 * Hook for staggered children animations
 */
export function useStaggerAnimation(
    count: number,
    baseDelay: number = 0.1
): string[] {
    return Array.from({ length: count }, (_, i) => `stagger-${i + 1}`);
}

/**
 * Component wrapper for scroll animations
 */
interface AnimatedSectionProps {
    children: React.ReactNode;
    animation?: 'fade-up' | 'fade-in' | 'scale' | 'flip' | 'slide-left' | 'slide-right';
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function AnimatedSection({
    children,
    animation = 'fade-up',
    delay = 0,
    className = '',
    style = {}
}: AnimatedSectionProps) {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

    const animationClass = isVisible
        ? `animate-${animation === 'fade-up' ? 'fade-in-up' : animation === 'scale' ? 'scale-in' : animation === 'flip' ? 'flip-in' : animation === 'slide-left' ? 'fade-in-left' : animation === 'slide-right' ? 'fade-in-right' : 'fade-in'}`
        : '';

    return (
        <div
            ref={ref}
            className={`${className} ${animationClass}`}
            style={{
                ...style,
                opacity: isVisible ? 1 : 0,
                animationDelay: `${delay}s`
            }}
        >
            {children}
        </div>
    );
}

/**
 * Floating element wrapper
 */
interface FloatingElementProps {
    children: React.ReactNode;
    duration?: number;
    amplitude?: number;
    className?: string;
}

export function FloatingElement({
    children,
    duration = 4,
    className = ''
}: FloatingElementProps) {
    return (
        <div
            className={`animate-float ${className}`}
            style={{ animationDuration: `${duration}s` }}
        >
            {children}
        </div>
    );
}

/**
 * 3D Tilt card wrapper
 */
interface Tilt3DCardProps {
    children: React.ReactNode;
    intensity?: number;
    className?: string;
    glowOnHover?: boolean;
}

export function Tilt3DCard({
    children,
    intensity = 10,
    className = '',
    glowOnHover = true
}: Tilt3DCardProps) {
    const { ref, transform } = use3DTilt(intensity);

    return (
        <div
            ref={ref}
            className={`${className} ${glowOnHover ? 'hover-glow' : ''}`}
            style={{
                transform,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    );
}

/**
 * Shimmer text effect
 */
interface ShimmerTextProps {
    children: React.ReactNode;
    className?: string;
}

export function ShimmerText({ children, className = '' }: ShimmerTextProps) {
    return (
        <span
            className={`animate-gold-shimmer ${className}`}
            style={{
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
            }}
        >
            {children}
        </span>
    );
}

/**
 * Pulsing glow wrapper
 */
interface GlowPulseProps {
    children: React.ReactNode;
    className?: string;
}

export function GlowPulse({ children, className = '' }: GlowPulseProps) {
    return (
        <div className={`animate-pulse-glow ${className}`}>
            {children}
        </div>
    );
}
