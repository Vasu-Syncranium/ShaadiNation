'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface SplashScreenProps {
    children: React.ReactNode;
}

type Phase = 'splash' | 'curtain' | 'content';

export default function SplashScreen({ children }: SplashScreenProps) {
    const [phase, setPhase] = useState<Phase>('splash');
    const [curtainOpen, setCurtainOpen] = useState(false);

    const handleSplashClick = useCallback(() => {
        setPhase('curtain');
        requestAnimationFrame(() => {
            setTimeout(() => {
                setCurtainOpen(true);
            }, 100);
        });
    }, []);

    useEffect(() => {
        if (curtainOpen) {
            const timer = setTimeout(() => {
                setPhase('content');
            }, 2200);
            return () => clearTimeout(timer);
        }
    }, [curtainOpen]);

    return (
        <>
            {phase === 'splash' && (
                <div
                    className="splash-overlay"
                    onClick={handleSplashClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleSplashClick();
                    }}
                    aria-label="Click to enter the website"
                >
                    <div className="splash-image" />
                    <div className="splash-content">
                        <div className="splash-logo">
                            <img
                                src="/images/logo.jpeg"
                                alt="Shaadi Nation"
                                className="splash-logo-img"
                            />
                        </div>
                        <p className="splash-cta">Click anywhere to enter</p>
                    </div>
                </div>
            )}

            {/* Curtain Opening Animation */}
            {phase === 'curtain' && (
                <div className="curtain-container">
                    {/* Left curtain panel */}
                    <div className={`curtain-panel curtain-left ${curtainOpen ? 'curtain-open' : ''}`}>
                        <div className="curtain-fabric">
                            <div className="curtain-fold curtain-fold-1" />
                            <div className="curtain-fold curtain-fold-2" />
                            <div className="curtain-fold curtain-fold-3" />
                            <div className="curtain-fold curtain-fold-4" />
                            <div className="curtain-fold curtain-fold-5" />
                        </div>
                        <div className="curtain-shadow" />
                    </div>

                    {/* Right curtain panel */}
                    <div className={`curtain-panel curtain-right ${curtainOpen ? 'curtain-open' : ''}`}>
                        <div className="curtain-fabric">
                            <div className="curtain-fold curtain-fold-1" />
                            <div className="curtain-fold curtain-fold-2" />
                            <div className="curtain-fold curtain-fold-3" />
                            <div className="curtain-fold curtain-fold-4" />
                            <div className="curtain-fold curtain-fold-5" />
                        </div>
                        <div className="curtain-shadow" />
                    </div>

                    {/* Golden rod at the top */}
                    <div className="curtain-rod" />

                    {/* Curtain tassels */}
                    <div className={`curtain-tassel curtain-tassel-left ${curtainOpen ? 'tassel-open' : ''}`} />
                    <div className={`curtain-tassel curtain-tassel-right ${curtainOpen ? 'tassel-open' : ''}`} />

                    {/* Content visible behind curtains */}
                    <div className="curtain-reveal-content">
                        {children}
                    </div>
                </div>
            )}

            {/* Main Content - fully revealed */}
            {phase === 'content' && (
                <div className="splash-main-content splash-revealed">
                    {children}
                </div>
            )}
        </>
    );
}
