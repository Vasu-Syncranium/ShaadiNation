/**
 * Decorative SVG flourishes and ornaments
 * Hand-drawn ink illustration style
 */

interface InkOrnamentProps {
    className?: string;
    color?: string;
    animated?: boolean;
}

// Horizontal flourish divider
export function InkDivider({ className = '', color = 'currentColor' }: InkOrnamentProps) {
    return (
        <div className={`ink-divider ${className}`}>
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                style={{ color }}
            >
                <path
                    d="M20 5 C10 15, 10 25, 20 35 C30 25, 30 15, 20 5"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                />
                <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5" />
            </svg>
        </div>
    );
}

// Ornamental corner flourish
export function CornerFlourish({ className = '', color = 'currentColor' }: InkOrnamentProps) {
    return (
        <svg
            className={className}
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            style={{ color }}
        >
            <path
                d="M5 55 Q5 30, 20 20 Q35 10, 55 5"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
            />
            <path
                d="M10 50 Q10 35, 22 25 Q34 15, 50 10"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.2"
            />
            <circle cx="8" cy="52" r="2" fill="currentColor" opacity="0.4" />
        </svg>
    );
}

// Simple horizontal line ornament
export function LineOrnament({ className = '', color = 'currentColor' }: InkOrnamentProps) {
    return (
        <svg
            className={className}
            width="200"
            height="20"
            viewBox="0 0 200 20"
            fill="none"
            style={{ color }}
        >
            <path
                d="M0 10 L70 10 Q80 5, 90 10 L100 10 L110 10 Q120 15, 130 10 L200 10"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
            />
            <circle cx="100" cy="10" r="3" fill="currentColor" opacity="0.4" />
        </svg>
    );
}

// Decorative text flourish (for headers)
export function TextFlourish({ className = '', color = 'currentColor' }: InkOrnamentProps) {
    return (
        <svg
            className={className}
            width="120"
            height="30"
            viewBox="0 0 120 30"
            fill="none"
            style={{ color, display: 'block', margin: '0 auto' }}
        >
            <path
                d="M0 15 Q30 5, 60 15 Q90 25, 120 15"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
            />
            <circle cx="60" cy="15" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="30" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
            <circle cx="90" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
    );
}

// Wedding-themed ornament (mandala-style)
export function WeddingOrnament({ className = '', color = 'currentColor' }: InkOrnamentProps) {
    return (
        <svg
            className={className}
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            style={{ color }}
        >
            {/* Outer petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <path
                    key={angle}
                    d="M40 20 Q50 30, 40 40 Q30 30, 40 20"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                    transform={`rotate(${angle} 40 40)`}
                />
            ))}
            {/* Inner circle */}
            <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.5" />
        </svg>
    );
}

// Border frame for sections
export function InkFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`ink-frame ${className}`} style={{ position: 'relative', padding: '2rem' }}>
            {/* Top left corner */}
            <CornerFlourish
                className="ink-frame-corner"
                color="var(--color-burgundy)"
            />
            {/* Top right corner */}
            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}>
                <CornerFlourish color="var(--color-burgundy)" />
            </div>
            {/* Bottom left corner */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}>
                <CornerFlourish color="var(--color-burgundy)" />
            </div>
            {/* Bottom right corner */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)' }}>
                <CornerFlourish color="var(--color-burgundy)" />
            </div>

            {children}
        </div>
    );
}

export default {
    InkDivider,
    CornerFlourish,
    LineOrnament,
    TextFlourish,
    WeddingOrnament,
    InkFrame
};
