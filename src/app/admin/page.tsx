'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { login, logout, getAuthToken, getUserEmail, onAuthChange, refreshToken } from '@/lib/auth';
import { isFirebaseConfigured } from '@/lib/firebase';
import { fetchGalleryImages, GalleryImage } from '@/lib/api';
import ImageUploader from '@/components/admin/ImageUploader';
import ImageManager from '@/components/admin/ImageManager';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
    const [userEmail, setUserEmail] = useState('');

    // Check existing authentication
    useEffect(() => {
        const savedToken = getAuthToken();
        const savedEmail = getUserEmail();

        if (savedToken) {
            setToken(savedToken);
            if (savedEmail) setUserEmail(savedEmail);
            setIsAuthenticated(true);
        }

        // Only subscribe to Firebase auth state if Firebase is configured
        if (isFirebaseConfigured()) {
            const unsubscribe = onAuthChange((user: User | null) => {
                if (user) {
                    setUserEmail(user.email || '');
                    setIsAuthenticated(true);
                    // Refresh token periodically
                    refreshToken().then(newToken => {
                        if (newToken) setToken(newToken);
                    });
                }
                setIsLoading(false);
            });
            return () => unsubscribe();
        } else {
            // No Firebase - just finish loading
            setIsLoading(false);
        }
    }, []);

    // Load images
    const loadImages = useCallback(async () => {
        try {
            const data = await fetchGalleryImages();
            setImages(data.images);
        } catch (error) {
            console.error('Failed to load images:', error);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadImages();
        }
    }, [isAuthenticated, loadImages]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        if (!email.trim() || !password.trim()) {
            setLoginError('Please enter both email and password');
            setIsLoggingIn(false);
            return;
        }

        const result = await login(email, password);

        if (result.success && result.token) {
            setToken(result.token);
            setUserEmail(result.user?.email || email);
            setIsAuthenticated(true);
        } else {
            setLoginError(result.error || 'Login failed');
        }
        setIsLoggingIn(false);
    };

    const handleLogout = async () => {
        await logout();
        setToken('');
        setUserEmail('');
        setIsAuthenticated(false);
        setImages([]);
        setEmail('');
        setPassword('');
    };

    if (isLoading) {
        return (
            <div className="admin-container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="admin-container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: 'var(--space-xl)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                        <h1 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-sm)' }}>
                            Admin Login
                        </h1>
                        <p style={{ opacity: 0.7 }}>Shaadi Nation Gallery Manager</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-label" style={{ color: 'var(--color-ivory)' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="form-input form-input-dark"
                                autoFocus
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'var(--color-ivory)' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="form-input form-input-dark"
                                autoComplete="current-password"
                            />
                        </div>

                        {loginError && (
                            <p style={{
                                color: '#ff6b6b',
                                fontSize: '0.875rem',
                                marginBottom: 'var(--space-md)'
                            }}>
                                {loginError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-gold"
                            style={{ width: '100%' }}
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p style={{
                        textAlign: 'center',
                        marginTop: 'var(--space-xl)',
                        fontSize: '0.75rem',
                        opacity: 0.5
                    }}>
                        {isFirebaseConfigured()
                            ? 'Contact the administrator if you need access.'
                            : 'Dev mode: admin@shaadination.com / admin123'
                        }
                    </p>
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="admin-container">
            {/* Header */}
            <header className="admin-header">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div>
                        <h1 className="admin-title">Shaadi Nation Admin</h1>
                        <p style={{ fontSize: '0.875rem', opacity: 0.7, margin: 0 }}>
                            {userEmail || 'Logged in'}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary"
                        style={{
                            color: 'var(--color-ivory)',
                            borderColor: 'var(--color-ivory)'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="admin-content">
                {/* Tab Navigation */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-md)',
                    marginBottom: 'var(--space-xl)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: 'var(--space-md)'
                }}>
                    <button
                        onClick={() => setActiveTab('upload')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'upload' ? 'var(--color-gold)' : 'var(--color-ivory)',
                            fontSize: '1rem',
                            fontWeight: activeTab === 'upload' ? 600 : 400,
                            cursor: 'pointer',
                            padding: 'var(--space-sm) 0',
                            borderBottom: activeTab === 'upload' ? '2px solid var(--color-gold)' : 'none'
                        }}
                    >
                        Upload Images
                    </button>
                    <button
                        onClick={() => setActiveTab('manage')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'manage' ? 'var(--color-gold)' : 'var(--color-ivory)',
                            fontSize: '1rem',
                            fontWeight: activeTab === 'manage' ? 600 : 400,
                            cursor: 'pointer',
                            padding: 'var(--space-sm) 0',
                            borderBottom: activeTab === 'manage' ? '2px solid var(--color-gold)' : 'none'
                        }}
                    >
                        Manage Gallery ({images.length})
                    </button>
                </div>

                {activeTab === 'upload' && (
                    <div style={{ maxWidth: '600px' }}>
                        <h2 style={{
                            color: 'var(--color-ivory)',
                            marginBottom: 'var(--space-lg)'
                        }}>
                            Upload New Images
                        </h2>
                        <ImageUploader
                            token={token}
                            onUploadComplete={loadImages}
                        />
                    </div>
                )}

                {activeTab === 'manage' && (
                    <div>
                        <h2 style={{
                            color: 'var(--color-ivory)',
                            marginBottom: 'var(--space-lg)'
                        }}>
                            Manage Gallery
                        </h2>
                        <ImageManager
                            images={images}
                            token={token}
                            onDeleteComplete={loadImages}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
