'use client';

import { useState, useRef, useCallback } from 'react';
import { uploadImage } from '@/lib/api';

interface ImageUploaderProps {
    token: string;
    onUploadComplete: () => void;
}

const CATEGORIES = ['ceremony', 'reception', 'mehendi', 'sangeet', 'pre-wedding'];

export default function ImageUploader({ token, onUploadComplete }: ImageUploaderProps) {
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        setUploadProgress([]);

        const fileArray = Array.from(files);

        for (const file of fileArray) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadProgress(prev => [...prev, `${file.name} - Not an image file`]);
                continue;
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setUploadProgress(prev => [...prev, `${file.name} - File too large (max 10MB)`]);
                continue;
            }

            setUploadProgress(prev => [...prev, `⏳ Uploading ${file.name}...`]);

            const result = await uploadImage(file, selectedCategory, token);

            setUploadProgress(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = result.success
                    ? `${file.name} - Uploaded successfully`
                    : `${file.name} - ${result.message}`;
                return updated;
            });
        }

        setUploading(false);
        onUploadComplete();
    }, [selectedCategory, token, onUploadComplete]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            {/* Category Selector */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: 'var(--space-sm)',
                        color: 'var(--color-gold)',
                        fontWeight: 500
                    }}
                >
                    Select Category
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        width: '100%',
                        padding: 'var(--space-md)',
                        fontSize: '1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-ivory)',
                        cursor: 'pointer'
                    }}
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat} style={{ background: '#1a1a1a' }}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                        </option>
                    ))}
                </select>
            </div>

            {/* Upload Zone */}
            <div
                className={`upload-zone ${isDragging ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                style={{ cursor: uploading ? 'wait' : 'pointer' }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    disabled={uploading}
                />

                <div className="upload-zone-icon">📷</div>

                {uploading ? (
                    <p>Uploading...</p>
                ) : (
                    <>
                        <p style={{ fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                            Drag & drop images here
                        </p>
                        <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>
                            or click to select files
                        </p>
                        <p style={{ opacity: 0.5, fontSize: '0.75rem', marginTop: 'var(--space-sm)' }}>
                            Max file size: 10MB per image
                        </p>
                    </>
                )}
            </div>

            {/* Upload Progress */}
            {uploadProgress.length > 0 && (
                <div style={{
                    marginTop: 'var(--space-lg)',
                    padding: 'var(--space-md)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                }}>
                    {uploadProgress.map((msg, i) => (
                        <p key={i} style={{ marginBottom: 'var(--space-xs)' }}>{msg}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
