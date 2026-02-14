'use client';

import { useState } from 'react';
import { InkFrame } from './InkOrnaments';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
}

export default function ServiceModal({ isOpen, onClose, title, content }: ServiceModalProps) {
    if (!isOpen) return null;

    return (
        <div className="lightbox open" onClick={onClose} style={{ zIndex: 3000 }}>
            <div
                className="modal-content animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--color-parchment)',
                    padding: '0',
                    maxWidth: '600px',
                    width: '90%',
                    borderRadius: 'var(--radius-lg)',
                    position: 'relative',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: 'var(--color-burgundy)',
                        zIndex: 10
                    }}
                >
                    ×
                </button>

                <InkFrame className="modal-frame">
                    <h3 style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-lg)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        color: 'var(--color-burgundy)'
                    }}>
                        {title}
                    </h3>

                    <div style={{ color: 'var(--color-ink-light)' }}>
                        {content}
                    </div>
                </InkFrame>
            </div>
        </div>
    );
}
