import { useEffect, useRef, ReactNode } from "react";

interface DestinationSectionProps {
  title: string;
  subtitle: string;
  description: string;
  bgClass: string;
  children: ReactNode;
  index: number;
}

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = el.querySelectorAll(".scroll-reveal");
            reveals.forEach((r) => r.classList.add("visible"));
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

// ===== Line Doodle Art Corner SVGs =====

// Floral corner with vine curls
const FloralCorner = ({ className }: { className?: string }) => (
  <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main vine curve */}
    <path d="M5 115Q5 60 30 35Q55 10 115 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    {/* Inner vine */}
    <path d="M10 100Q15 55 40 35Q60 20 100 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
    {/* Leaves along the vine */}
    <path d="M20 75Q10 65 20 60Q25 70 20 75Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.12" />
    <path d="M35 50Q25 42 35 35Q40 45 35 50Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.10" />
    <path d="M55 30Q48 22 58 18Q60 28 55 30Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.08" />
    {/* Small flowers */}
    <circle cx="15" cy="85" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <circle cx="15" cy="85" r="1.5" fill="currentColor" opacity="0.15" />
    <circle cx="45" cy="40" r="3" stroke="currentColor" strokeWidth="0.6" opacity="0.15" />
    <circle cx="45" cy="40" r="1" fill="currentColor" opacity="0.12" />
    {/* Tiny dots along vine */}
    <circle cx="25" cy="68" r="1" fill="currentColor" opacity="0.15" />
    <circle cx="50" cy="25" r="1" fill="currentColor" opacity="0.12" />
    <circle cx="75" cy="15" r="1" fill="currentColor" opacity="0.10" />
    {/* Paisley accent */}
    <path d="M70 18Q80 8 90 12Q85 20 70 18Z" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
  </svg>
);

// Mandala-inspired corner
const MandalaCorner = ({ className }: { className?: string }) => (
  <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Quarter mandala arcs */}
    <path d="M5 115A110 110 0 0 1 115 5" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    <path d="M5 95A90 90 0 0 1 95 5" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
    <path d="M5 75A70 70 0 0 1 75 5" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    {/* Petal shapes along arcs */}
    {[15, 30, 45, 60].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x = 5 + 70 * Math.sin(rad);
      const y = 75 - 70 * Math.cos(rad) + 5;
      return (
        <g key={angle}>
          <ellipse cx={x} cy={y} rx="5" ry="8" transform={`rotate(${-angle}, ${x}, ${y})`}
            stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
        </g>
      );
    })}
    {/* Inner decorative dots */}
    {[20, 40, 55, 70].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x = 5 + 50 * Math.sin(rad);
      const y = 55 - 50 * Math.cos(rad) + 5;
      return <circle key={angle} cx={x} cy={y} r="1.5" fill="currentColor" opacity="0.12" />;
    })}
    {/* Corner bead */}
    <circle cx="12" cy="108" r="2.5" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    <circle cx="12" cy="108" r="1" fill="currentColor" opacity="0.15" />
  </svg>
);

// Vine side border
const VineBorder = ({ className }: { className?: string }) => (
  <svg className={className} width="40" height="300" viewBox="0 0 40 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main vine stem */}
    <path d="M20 0Q25 50 15 100Q10 150 25 200Q30 250 18 300" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
    {/* Leaves */}
    <path d="M15 50Q5 40 8 30Q18 38 15 50Z" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
    <path d="M22 100Q32 90 35 80Q25 88 22 100Z" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
    <path d="M12 150Q2 140 5 130Q15 138 12 150Z" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
    <path d="M25 200Q35 190 38 180Q28 188 25 200Z" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
    <path d="M18 250Q8 240 10 230Q20 238 18 250Z" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
    {/* Small buds */}
    <circle cx="10" cy="70" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
    <circle cx="28" cy="130" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
    <circle cx="14" cy="180" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
    <circle cx="24" cy="230" r="2" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
  </svg>
);

// Pick corner style based on section index
const cornerComponents = [FloralCorner, MandalaCorner, FloralCorner];

const DestinationSection = ({ title, subtitle, description, bgClass, children, index }: DestinationSectionProps) => {
  const ref = useScrollReveal();
  const Corner = cornerComponents[index % cornerComponents.length];

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden ${bgClass}`}
    >
      {/* Line doodle art corners */}
      <Corner className="doodle-border-art doodle-corner-tl text-secondary" />
      <Corner className="doodle-border-art doodle-corner-tr text-secondary" />
      <Corner className="doodle-border-art doodle-corner-bl text-secondary" />
      <Corner className="doodle-border-art doodle-corner-br text-secondary" />

      {/* Vine side borders */}
      <VineBorder className="doodle-vine-left text-secondary hidden md:block" />
      <VineBorder className="doodle-vine-right text-secondary hidden md:block" />

      {/* Section number */}
      <div className="scroll-reveal absolute top-50 left-50 md:top-10 md:left-10">
        <span className="font-display text-6xl md:text-8xl text-primary/10 font-bold select-none">
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      {/* <div className="relative z-10 max-w-4xl w-full text-center">
        <p className="scroll-reveal font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
          {subtitle}
        </p>
        <h2 className="scroll-reveal scroll-reveal-delay-1 font-display text-3xl md:text-5xl text-primary mb-4 leading-tight">
          {title}
        </h2>
        <p className="scroll-reveal scroll-reveal-delay-2 font-elegant text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          {description}
        </p>
      </div> */}

      {/* Doodle scene */}
      {/* <div className="scroll-reveal scroll-reveal-delay-3 relative z-10 w-full max-w-3xl">
        {children}
      </div> */}
    </section>
  );
};

export default DestinationSection;
