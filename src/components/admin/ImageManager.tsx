'use client';

import { useState, useCallback } from 'react';
import { deleteImage, GalleryImage } from '@/lib/api';

interface ImageManagerProps {
    images: GalleryImage[];
    token: string;
    onDeleteComplete: () => void;
}

export default function ImageManager({ images, token, onDeleteComplete }: ImageManagerProps) {
    const [deleting, setDeleting] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);

    const handleDelete = useCallback(async (image: GalleryImage) => {
        if (!confirm(`Are you sure you want to delete ${image.filename}?`)) {
            return;
        }

        setDeleting(image.key);

        const result = await deleteImage(image.category, image.filename, token);

        if (result.success) {
            onDeleteComplete();
        } else {
            alert(`Failed to delete: ${result.message}`);
        }

        setDeleting(null);
    }, [token, onDeleteComplete]);

    // Group images by category
    const groupedImages = images.reduce((acc, image) => {
        if (!acc[image.category]) {
            acc[image.category] = [];
        }
        acc[image.category].push(image);
        return acc;
    }, {} as Record<string, GalleryImage[]>);

    if (images.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: 'var(--space-xl)',
                opacity: 0.7
            }}>
                <p>No images uploaded yet.</p>
                <p style={{ fontSize: '0.875rem' }}>Use the upload section above to add images.</p>
            </div>
        );
    }

    return (
        <div>
            {Object.entries(groupedImages).map(([category, categoryImages]) => (
                <div key={category} style={{ marginBottom: 'var(--space-xl)' }}>
                    <h4 style={{
                        color: 'var(--color-gold)',
                        marginBottom: 'var(--space-md)',
                        textTransform: 'capitalize'
                    }}>
                        {category.replace('-', ' ')} ({categoryImages.length})
                    </h4>

                    <div className="image-grid">
                        {categoryImages.map((image) => (
                            <div
                                key={image.key}
                                className="image-card"
                                style={{ opacity: deleting === image.key ? 0.5 : 1 }}
                            >
                                <img
                                    src={image.url}
                                    alt={image.filename}
                                    loading="lazy"
                                />
                                <div className="image-card-overlay">
                                    <div className="image-card-actions">
                                        <button
                                            onClick={() => setPreviewImage(image)}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                marginRight: 'var(--space-xs)'
                                            }}
                                            title="Preview"
                                        >
                                            👁️
                                        </button>
                                        <button
                                            className="image-card-delete"
                                            onClick={() => handleDelete(image)}
                                            disabled={deleting === image.key}
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                    <p style={{
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        padding: '0 var(--space-xs)',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {image.filename}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Preview Modal */}
            {previewImage && (
                <div
                    className="lightbox open"
                    onClick={() => setPreviewImage(null)}
                >
                    <img
                        src={previewImage.url}
                        alt={previewImage.filename}
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="lightbox-close"
                        onClick={() => setPreviewImage(null)}
                    >
                        ✕
                    </button>
                    <div style={{
                        position: 'absolute',
                        bottom: 'var(--space-lg)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        padding: 'var(--space-sm) var(--space-md)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontSize: '0.875rem'
                    }}>
                        {previewImage.category} / {previewImage.filename}
                    </div>
                </div>
            )}
        </div>
    );
}
