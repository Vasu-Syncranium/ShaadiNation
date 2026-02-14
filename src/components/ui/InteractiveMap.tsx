'use client';

import { useState } from 'react';
import Image from 'next/image';
import { InkDivider, TextFlourish } from './InkOrnaments';
import ServiceModal from './ServiceModal';

interface Hotspot {
    id: string;
    label: string;
    top: number; // percentage
    left: number; // percentage
    width: number; // percentage
    height: number; // percentage
    title: string;
    content: React.ReactNode;
}

interface Scene {
    id: string;
    imageSrc: string;
    title: string;
    subtitle: string;
    hotspots: Hotspot[];
}

interface InteractiveMapProps {
    sceneId?: string; // Optional: Force a specific scene
}

export default function InteractiveMap({ sceneId }: InteractiveMapProps) {
    const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

    const scenes: Scene[] = [
        {
            id: 'baraat',
            title: 'Royal Palace Baraat',
            subtitle: 'Grand Arrival at Udaipur Heritage Palace',
            imageSrc: '/images/doodles/doodle_baraat_1770648955310.png',
            hotspots: [
                {
                    id: 'mini-truck',
                    label: 'DJ Truck',
                    top: 40,
                    left: 50,
                    width: 20,
                    height: 25,
                    title: 'Baraat on One Wheel',
                    content: (
                        <div className="text-center">
                            <p className="mb-md">Decorated mini DJ truck with professional sound.</p>
                            <ul style={{ listStyle: 'none', textAlign: 'left', display: 'inline-block' }}>
                                <li>🔊 Stacked Speakers</li>
                                <li>🚐 Rajasthani Decor</li>
                                <li>🎺 Live Dhol</li>
                            </ul>
                        </div>
                    )
                },
                {
                    id: 'vintage-car',
                    label: 'Groom Entry',
                    top: 55,
                    left: 20,
                    width: 25,
                    height: 30,
                    title: 'Vintage Classic',
                    content: (
                        <div className="text-center">
                            <p className="mb-md">Royal entry in an open-top vintage classic.</p>
                            <div className="card" style={{ padding: '0.5rem' }}>
                                <strong>Ivory Sherwani & Safa</strong>
                            </div>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'haldi',
            title: 'Garden Ceremony',
            subtitle: 'Spiritual Mandap Under Ancient Trees',
            imageSrc: '/images/doodles/doodle_haldi_1770648903029.png',
            hotspots: [
                {
                    id: 'mandap',
                    label: 'Floral Mandap',
                    top: 40,
                    left: 30,
                    width: 40,
                    height: 40,
                    title: 'Vedic Rituals',
                    content: (
                        <div className="text-center">
                            <p className="mb-md">Traditional raised platform with marigold backdrop.</p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>🌸 Fresh Marigolds</li>
                                <li>🔥 Sacred Fire</li>
                                <li>🌿 Natural Ambiance</li>
                            </ul>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'cocktail',
            title: 'Reception Lawn',
            subtitle: 'Luxury Evening Celebration',
            imageSrc: '/images/doodles/doodle_cocktail_1770648921199.png',
            hotspots: [
                {
                    id: 'dance-floor',
                    label: 'Dance Floor',
                    top: 50,
                    left: 40,
                    width: 30,
                    height: 30,
                    title: 'Sangeet & Party',
                    content: (
                        <div className="text-center">
                            <p className="mb-md">White dance floor under crystal chandeliers.</p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>✨ String Lights</li>
                                <li>💃 DJ Booth</li>
                                <li>🍸 Cocktail Bar</li>
                            </ul>
                        </div>
                    )
                }
            ]
        },
        {
            id: 'beach',
            title: 'Beach Destination',
            subtitle: 'Sunset Vows by the Ocean',
            imageSrc: '/images/doodles/doodle_beach_1770649061368.png',
            hotspots: [
                {
                    id: 'canopy',
                    label: 'Beach Mandap',
                    top: 45,
                    left: 30,
                    width: 40,
                    height: 35,
                    title: 'Coastal Luxury',
                    content: (
                        <div className="text-center">
                            <p className="mb-md">Palm trees framing the canopy mandap.</p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>🌊 Ocean Horizon</li>
                                <li>🌴 Tropical Decor</li>
                                <li>🌅 Sunset Glow</li>
                            </ul>
                        </div>
                    )
                }
            ]
        }
    ];

    // Find specific scene or default to first
    const activeScene = sceneId
        ? scenes.find(s => s.id === sceneId) || scenes[0]
        : scenes[0];

    return (
        <div className="interactive-scene" style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden'
        }}>
            {/* Full Screen Background Image */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                    src={activeScene.imageSrc}
                    alt={activeScene.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />

                {/* Darker gradients for better text visibility */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)'
                }} />

                {/* Hotspots overlay */}
                <div style={{ position: 'absolute', inset: 0 }}>
                    {activeScene.hotspots.map((hotspot) => (
                        <button
                            key={hotspot.id}
                            className="hotspot-trigger"
                            onClick={() => setActiveHotspot(hotspot)}
                            style={{
                                position: 'absolute',
                                top: `${hotspot.top}%`,
                                left: `${hotspot.left}%`,
                                width: `${hotspot.width}%`,
                                height: `${hotspot.height}%`,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                            aria-label={`View details for ${hotspot.label}`}
                        >
                            {/* Pulsing indicator center of hotspot */}
                            <span className="hotspot-pulse" style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.6)',
                                boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
                                animation: 'pulse 2s infinite'
                            }} />

                            <span className="hotspot-label">
                                {hotspot.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Scene Title Overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '0',
                    right: '0',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    pointerEvents: 'none'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontFamily: 'var(--font-display)',
                        marginBottom: '0.5rem',
                        color: 'white' // Override default burgundy
                    }}>
                        {activeScene.title}
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--color-ivory)'
                    }}>
                        {activeScene.subtitle}
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
                    70% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
                    100% { transform: translate(-50%, -50%) scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
                }

                .hotspot-trigger:hover .hotspot-pulse {
                    background: 'var(--color-gold)';
                }
                
                .hotspot-label {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) translateY(25px);
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    opacity: 0;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    font-family: var(--font-sans);
                }

                .hotspot-trigger:hover .hotspot-label {
                    opacity: 1;
                    transform: translate(-50%, -50%) translateY(20px);
                }
            `}</style>

            {/* Detail Modal */}
            <ServiceModal
                isOpen={!!activeHotspot}
                onClose={() => setActiveHotspot(null)}
                title={activeHotspot?.title || ''}
                content={activeHotspot?.content}
            />
        </div>
    );
}
