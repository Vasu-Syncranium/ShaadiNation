'use client';

import { useState, useEffect, useCallback } from 'react';
import type { GalleryImage } from '@/lib/api';

const DEMO_IMAGES: GalleryImage[] = [
    { key: 'ceremony/1.jpg', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', category: 'ceremony', filename: '1.jpg' },
    { key: 'ceremony/2.jpg', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', category: 'ceremony', filename: '2.jpg' },
    { key: 'ceremony/3.jpg', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800', category: 'ceremony', filename: '3.jpg' },
    { key: 'reception/1.jpg', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', category: 'reception', filename: '1.jpg' },
    { key: 'reception/2.jpg', url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800', category: 'reception', filename: '2.jpg' },
    { key: 'mehendi/1.jpg', url: 'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800', category: 'mehendi', filename: '1.jpg' },
    { key: 'mehendi/2.jpg', url: 'https://images.unsplash.com/photo-1600577916048-804c9191e36c?w=800', category: 'mehendi', filename: '2.jpg' },
    { key: 'sangeet/1.jpg', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800', category: 'sangeet', filename: '1.jpg' },
    { key: 'sangeet/2.jpg', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', category: 'sangeet', filename: '2.jpg' },
    { key: 'pre-wedding/1.jpg', url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800', category: 'pre-wedding', filename: '1.jpg' },
    { key: 'pre-wedding/2.jpg', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', category: 'pre-wedding', filename: '2.jpg' },
];

const CATEGORIES = ['all', 'ceremony', 'reception', 'mehendi', 'sangeet', 'pre-wedding'];

interface GalleryGridProps {
    onImageClick?: (image: GalleryImage) => void;
}

export default function GalleryGrid({ onImageClick }: GalleryGridProps) {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadImages = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_WORKER_URL;

            if (API_URL) {
                // Production: fetch from Worker API
                const url = activeCategory !== 'all'
                    ? `${API_URL}/api/images/${activeCategory}`
                    : `${API_URL}/api/images`;

                const response = await fetch(url, { cache: 'no-store' });
                if (response.ok) {
                    const data = await response.json();
                    setImages(data.images || []);
                } else {
                    throw new Error('Failed to fetch images');
                }
            } else {
                // Development: use demo images
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
                const filtered = activeCategory === 'all'
                    ? DEMO_IMAGES
                    : DEMO_IMAGES.filter(img => img.category === activeCategory);
                setImages(filtered);
            }
        } catch (err) {
            console.error('Error loading images:', err);
            setError('Failed to load images. Please try again.');
            // Fallback to demo images in case of error
            const filtered = activeCategory === 'all'
                ? DEMO_IMAGES
                : DEMO_IMAGES.filter(img => img.category === activeCategory);
            setImages(filtered);
        } finally {
            setLoading(false);
        }
    }, [activeCategory]);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter(img => img.category === activeCategory);

    return (
        <div>
            {/* Category Tabs */}
            <div className="category-tabs">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* Error State */}
            {error && (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-lg)',
                    color: 'var(--color-burgundy)'
                }}>
                    <p>{error}</p>
                    <button className="btn btn-secondary" onClick={loadImages}>
                        Try Again
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                </div>
            )}

            {/* Gallery Grid */}
            {!loading && filteredImages.length > 0 && (
                <div className="gallery-grid">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.key}
                            className="gallery-item animate-fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => onImageClick?.(image)}
                        >
                            <img
                                src={image.url}
                                alt={`${image.category} - ${image.filename}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredImages.length === 0 && !error && (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-xl)',
                    opacity: 0.7
                }}>
                    <p>No photos in this category yet.</p>
                    <p style={{ fontSize: '0.875rem' }}>Check back soon!</p>
                </div>
            )}
        </div>
    );
}
