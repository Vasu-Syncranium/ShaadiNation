"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CarouselScene {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    content: React.ReactNode;
    align?: 'left' | 'right' | 'center';
}

interface VerticalCarouselProps {
    scenes: CarouselScene[];
}

export default function VerticalCarousel({ scenes }: VerticalCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentScene, setCurrentScene] = useState(0);

    // Scroll progress for the entire carousel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const sceneIndex = Math.round(scrollPosition / windowHeight);

            if (sceneIndex >= 0 && sceneIndex < scenes.length) {
                setCurrentScene(sceneIndex);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scenes.length]);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${scenes.length * 100}vh` }}>
            {/* Sticky container for the viewport */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                {/* Background Layers */}
                {scenes.map((scene, index) => (
                    <div
                        key={`bg-${scene.id}`}
                        className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                        style={{
                            opacity: currentScene === index ? 1 : 0,
                            zIndex: 0
                        }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={scene.image}
                                alt={scene.title}
                                fill
                                className="object-cover object-center"
                                priority={index === 0}
                                quality={90}
                            />
                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 bg-[#F9F5EC] opacity-10 mix-blend-multiply pointer-events-none" />
                            {/* Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F5EC]/80 pointer-events-none" />
                        </div>
                    </div>
                ))}

                {/* Content Layers */}
                <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                    {scenes.map((scene, index) => (
                        <div
                            key={`content-${scene.id}`}
                            className={`absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-20 transition-all duration-700 ease-out 
                ${scene.align === 'right' ? 'items-end text-right' : scene.align === 'center' ? 'items-center text-center' : 'items-start text-left'}
              `}
                            style={{
                                opacity: currentScene === index ? 1 : 0,
                                transform: `translateY(${currentScene === index ? 0 : 20}px)`,
                                pointerEvents: currentScene === index ? 'auto' : 'none',
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: currentScene === index ? 1 : 0, y: currentScene === index ? 0 : 30 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="max-w-xl bg-[#F9F5EC]/90 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-[#8B0000]/10 shadow-xl ink-border"
                            >
                                <span className="block text-[#8B0000] font-cormorant text-lg md:text-xl tracking-widest uppercase mb-2">
                                    {scene.subtitle}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-playfair text-gray-900 mb-6 leading-tight">
                                    {scene.title}
                                </h2>
                                <div className="text-gray-700 font-montserrat leading-relaxed text-base md:text-lg">
                                    {scene.content}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
                    {scenes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                window.scrollTo({
                                    top: index * window.innerHeight,
                                    behavior: 'smooth'
                                });
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 border border-[#8B0000]
                ${currentScene === index ? 'bg-[#8B0000] scale-125' : 'bg-transparent hover:bg-[#8B0000]/20'}
              `}
                            aria-label={`Go to section ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator (only on first slide) */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                    animate={{ opacity: currentScene === 0 ? 1 : 0 }}
                >
                    <span className="text-[#8B0000] font-cormorant text-sm tracking-widest uppercase">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#8B0000] to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}
