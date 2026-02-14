'use client';

import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { TasselDivider, ElephantSilhouette, PaisleyCorner } from '@/components/ui/TraditionalOrnaments';
import type { GalleryImage } from '@/lib/api';

export default function GalleryPage() {
    const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

    const handleImageClick = (image: GalleryImage) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

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
                        <h1 className="traditional">Wedding Portfolio</h1>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <TasselDivider color="var(--color-gold)" />
                        </div>
                    </div>

                    {/* Elephant motif decoration */}
                    <div style={{ position: 'absolute', left: '5%', bottom: '10%', opacity: 0.2 }}>
                        <ElephantSilhouette color="var(--color-burgundy)" size="lg" />
                    </div>
                </section>

                {/* Gallery */}
                <section className="section pattern-traditional" style={{ background: 'white' }}>
                    <div className="container">
                        <GalleryGrid onImageClick={handleImageClick} />
                    </div>
                </section>
            </main>

            <Footer />

            {/* Enhanced Lightbox */}
            <div
                className={`lightbox ${lightboxImage ? 'open' : ''}`}
                onClick={closeLightbox}
                style={{ background: 'rgba(26, 26, 26, 0.98)' }}
            >
                {lightboxImage && (
                    <>
                        {/* Decorative corners */}
                        <div style={{ position: 'absolute', top: 20, left: 20, opacity: 0.5 }}>
                            <PaisleyCorner color="var(--color-gold)" size="lg" />
                        </div>
                        <div style={{ position: 'absolute', top: 20, right: 20, transform: 'scaleX(-1)', opacity: 0.5 }}>
                            <PaisleyCorner color="var(--color-gold)" size="lg" />
                        </div>
                        <div style={{ position: 'absolute', bottom: 20, left: 20, transform: 'scaleY(-1)', opacity: 0.5 }}>
                            <PaisleyCorner color="var(--color-gold)" size="lg" />
                        </div>
                        <div style={{ position: 'absolute', bottom: 20, right: 20, transform: 'scale(-1)', opacity: 0.5 }}>
                            <PaisleyCorner color="var(--color-gold)" size="lg" />
                        </div>

                        <img
                            src={lightboxImage.url}
                            alt={`${lightboxImage.category} - ${lightboxImage.filename}`}
                            className="lightbox-image"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                border: '4px solid rgba(212, 175, 55, 0.3)',
                                boxShadow: '0 0 60px rgba(212, 175, 55, 0.2)'
                            }}
                        />
                        <button
                            className="lightbox-close"
                            onClick={closeLightbox}
                            aria-label="Close lightbox"
                            style={{
                                background: 'rgba(212, 175, 55, 0.2)',
                                border: '1px solid var(--color-gold)'
                            }}
                        >
                            ✕
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

