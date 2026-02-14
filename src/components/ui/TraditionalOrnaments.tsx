'use client';

/**
 * Traditional Indian Wedding Decorative SVG Components
 * Inspired by the Shaadi Nation logo aesthetics:
 * - Tassels (from umbrella)
 * - Paisley patterns
 * - Elephant silhouettes
 * - Umbrella/parasol motifs
 * - Scalloped edges
 */

interface OrnamentProps {
    className?: string;
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    animated?: boolean;
}

// Tassel Divider - Horizontal divider with hanging tassels like the umbrella
export function TasselDivider({ className = '', color = 'currentColor', animated = true }: OrnamentProps) {
    return (
        <div className={`tassel-divider ${animated ? 'tassel-animated' : ''} ${className}`} style={{ textAlign: 'center', padding: '1rem 0' }}>
            <svg
                width="300"
                height="50"
                viewBox="0 0 300 50"
                fill="none"
                style={{ color, maxWidth: '100%' }}
            >
                {/* Main scalloped line */}
                <path
                    d="M0 10 Q25 20 50 10 Q75 0 100 10 Q125 20 150 10 Q175 0 200 10 Q225 20 250 10 Q275 0 300 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                />

                {/* Tassels hanging from scallops */}
                {[50, 100, 150, 200, 250].map((x, i) => (
                    <g key={i}>
                        {/* Tassel cord */}
                        <line
                            x1={x}
                            y1="10"
                            x2={x}
                            y2="35"
                            stroke="currentColor"
                            strokeWidth="2"
                            opacity="0.5"
                        />
                        {/* Tassel ball */}
                        <circle
                            cx={x}
                            cy="40"
                            r="5"
                            fill="currentColor"
                            opacity="0.6"
                        />
                        {/* Tassel fringe */}
                        <path
                            d={`M${x - 4} 45 L${x} 50 L${x + 4} 45`}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            opacity="0.4"
                        />
                    </g>
                ))}

                {/* Center ornament */}
                <circle cx="150" cy="10" r="4" fill="currentColor" opacity="0.8" />
            </svg>
        </div>
    );
}

export function PaisleyCorner({ className = '', color = 'currentColor', size = 'md', animated = true }: OrnamentProps) {
    const dimensions = { sm: 40, md: 60, lg: 80 }[size];

    return (
        <svg
            className={`${animated ? 'paisley-animated' : ''} ${className}`}
            width={dimensions}
            height={dimensions}
            viewBox="0 0 60 60"
            fill="none"
            style={{ color }}
        >
            {/* Main paisley curve */}
            <path
                d="M5 55 Q5 30 25 15 Q40 5 55 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
            />
            {/* Inner paisley */}
            <path
                d="M12 48 Q12 30 28 18 Q38 12 48 12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
            />
            {/* Decorative dots */}
            <circle cx="8" cy="52" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="38" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="30" cy="25" r="2" fill="currentColor" opacity="0.4" />
            {/* Small paisley accent */}
            <path
                d="M20 45 Q22 40 18 38 Q14 36 16 42 Q18 48 20 45"
                fill="currentColor"
                opacity="0.3"
            />
        </svg>
    );
}

// Umbrella Border - Scalloped edge inspired by the parasol in the logo
export function UmbrellaBorder({ className = '', color = 'currentColor' }: OrnamentProps) {
    return (
        <svg
            className={className}
            width="100%"
            height="20"
            viewBox="0 0 400 20"
            preserveAspectRatio="none"
            fill="none"
            style={{ color, display: 'block' }}
        >
            {/* Scalloped umbrella edge */}
            <path
                d="M0 0 Q10 15 20 0 Q30 15 40 0 Q50 15 60 0 Q70 15 80 0 Q90 15 100 0 Q110 15 120 0 Q130 15 140 0 Q150 15 160 0 Q170 15 180 0 Q190 15 200 0 Q210 15 220 0 Q230 15 240 0 Q250 15 260 0 Q270 15 280 0 Q290 15 300 0 Q310 15 320 0 Q330 15 340 0 Q350 15 360 0 Q370 15 380 0 Q390 15 400 0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
            />
            {/* Teal accent line (like the umbrella trim) */}
            <path
                d="M0 3 Q10 18 20 3 Q30 18 40 3 Q50 18 60 3 Q70 18 80 3 Q90 18 100 3 Q110 18 120 3 Q130 18 140 3 Q150 18 160 3 Q170 18 180 3 Q190 18 200 3 Q210 18 220 3 Q230 18 240 3 Q250 18 260 3 Q270 18 280 3 Q290 18 300 3 Q310 18 320 3 Q330 18 340 3 Q350 18 360 3 Q370 18 380 3 Q390 18 400 3"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
            />
        </svg>
    );
}

// Elephant Silhouette - Cute elephant motif from the logo
export function ElephantSilhouette({ className = '', color = 'currentColor', size = 'md', animated = true }: OrnamentProps) {
    const dimensions = { sm: 40, md: 60, lg: 100 }[size];

    return (
        <svg
            className={`${animated ? 'elephant-animated' : ''} ${className}`}
            width={dimensions}
            height={dimensions}
            viewBox="0 0 100 100"
            fill="none"
            style={{ color }}
        >
            {/* Elephant body */}
            <ellipse cx="50" cy="65" rx="30" ry="20" fill="currentColor" opacity="0.15" />

            {/* Elephant head */}
            <circle cx="30" cy="50" r="18" fill="currentColor" opacity="0.15" />

            {/* Trunk */}
            <path
                d="M15 55 Q5 60 8 70 Q10 78 15 75 Q18 72 16 65 Q14 58 18 55"
                fill="currentColor"
                opacity="0.15"
            />

            {/* Ear */}
            <ellipse cx="38" cy="45" rx="8" ry="12" fill="currentColor" opacity="0.1" />

            {/* Eye */}
            <circle cx="25" cy="48" r="2" fill="currentColor" opacity="0.3" />

            {/* Decorative saddle cloth */}
            <path
                d="M35 55 L40 50 L60 50 L65 55 L65 70 L35 70 Z"
                fill="currentColor"
                opacity="0.2"
            />

            {/* Saddle pattern */}
            <path
                d="M40 55 L50 52 L60 55"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
            />

            {/* Headpiece */}
            <path
                d="M25 35 Q30 28 35 35"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.2"
            />

            {/* Legs */}
            <rect x="38" y="75" width="6" height="15" rx="3" fill="currentColor" opacity="0.12" />
            <rect x="56" y="75" width="6" height="15" rx="3" fill="currentColor" opacity="0.12" />

            {/* Tail */}
            <path
                d="M75 65 Q82 68 80 75"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                opacity="0.12"
            />
        </svg>
    );
}

// Traditional Frame - Full decorative frame with scalloped edges and corner ornaments
export function TraditionalFrame({
    children,
    className = '',
    showCorners = true
}: {
    children: React.ReactNode;
    className?: string;
    showCorners?: boolean;
}) {
    return (
        <div className={`traditional-frame-wrapper ${className}`} style={{ position: 'relative', padding: '2rem' }}>
            {/* Top border */}
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }}>
                <UmbrellaBorder color="var(--color-gold)" />
            </div>

            {/* Bottom border (flipped) */}
            <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', transform: 'scaleY(-1)' }}>
                <UmbrellaBorder color="var(--color-gold)" />
            </div>

            {/* Corner ornaments */}
            {showCorners && (
                <>
                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                        <PaisleyCorner color="var(--color-gold)" />
                    </div>
                    <div style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}>
                        <PaisleyCorner color="var(--color-gold)" />
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}>
                        <PaisleyCorner color="var(--color-gold)" />
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)' }}>
                        <PaisleyCorner color="var(--color-gold)" />
                    </div>
                </>
            )}

            {children}
        </div>
    );
}

// Mandala Flourish - Circular mandala-inspired decoration
export function MandalaFlourish({ className = '', color = 'currentColor', size = 'md', animated = true }: OrnamentProps) {
    const dimensions = { sm: 40, md: 60, lg: 100 }[size];

    return (
        <svg
            className={`${animated ? 'mandala-animated' : ''} ${className}`}
            width={dimensions}
            height={dimensions}
            viewBox="0 0 80 80"
            fill="none"
            style={{ color }}
        >
            {/* Outer ring */}
            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="1" opacity="0.3" />

            {/* Petal pattern */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <path
                    key={angle}
                    d="M40 15 Q50 25 40 35 Q30 25 40 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="currentColor"
                    fillOpacity="0.1"
                    transform={`rotate(${angle} 40 40)`}
                    opacity="0.5"
                />
            ))}

            {/* Inner circles */}
            <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.6" />
        </svg>
    );
}

// Section Divider with Traditional Ornament
export function TraditionalDivider({ className = '', symbol = '✦' }: { className?: string; symbol?: string }) {
    return (
        <div className={`section-divider ${className}`}>
            <span className="section-divider-icon">{symbol}</span>
        </div>
    );
}

// Decorative Heading Wrapper
export function DecorativeHeading({
    children,
    level = 2,
    className = ''
}: {
    children: React.ReactNode;
    level?: 1 | 2 | 3;
    className?: string;
}) {
    const headingStyle = {
        fontFamily: 'var(--font-display)',
        display: 'inline-block' as const
    };

    return (
        <div className={`decorative-heading ${className}`} style={{ textAlign: 'center' }}>
            {level === 1 && <h1 className="traditional" style={headingStyle}>{children}</h1>}
            {level === 2 && <h2 className="traditional" style={headingStyle}>{children}</h2>}
            {level === 3 && <h3 className="traditional" style={headingStyle}>{children}</h3>}
        </div>
    );
}

export default {
    TasselDivider,
    PaisleyCorner,
    UmbrellaBorder,
    ElephantSilhouette,
    TraditionalFrame,
    MandalaFlourish,
    TraditionalDivider,
    DecorativeHeading
};
