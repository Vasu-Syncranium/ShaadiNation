import logo from "@/assets/logo.jpeg";
import { ChevronDown } from "lucide-react";

// SVG doodle elements
const PaisleyDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 10C25 10 15 25 15 40C15 55 25 65 40 55C55 65 65 55 65 40C65 25 55 10 40 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M40 20C32 20 25 30 25 40C25 48 32 52 40 48" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle cx="35" cy="38" r="2" fill="currentColor" opacity="0.5" />
  </svg>
);

const MarigoldDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="6" stroke="currentColor" strokeWidth="1.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <ellipse
        key={angle}
        cx="30"
        cy="14"
        rx="5"
        ry="10"
        stroke="currentColor"
        strokeWidth="1"
        transform={`rotate(${angle} 30 30)`}
        opacity="0.7"
      />
    ))}
  </svg>
);

const DiyaDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 35C15 28 20 25 25 25C30 25 35 28 35 35C35 42 30 45 25 45C20 45 15 42 15 35Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 25L25 10L28 25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <ellipse cx="25" cy="10" rx="3" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    <path d="M18 45L15 50H35L32 45" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center gap-24 px-4 overflow-hidden">
      {/* Floating doodles */}
      <PaisleyDoodle className="absolute top-20 left-4 w-16 h-16 text-gold opacity-30 animate-float" />
      <MarigoldDoodle className="absolute top-32 right-6 w-14 h-14 text-pink opacity-25 animate-float-reverse" />
      <DiyaDoodle className="absolute bottom-40 left-8 w-12 h-12 text-gold opacity-20 animate-float-slow" />
      <PaisleyDoodle className="absolute bottom-32 right-10 w-20 h-20 text-teal opacity-15 animate-float" />
      <MarigoldDoodle className="absolute top-1/2 left-2 w-10 h-10 text-maroon-light opacity-20 animate-float-reverse" />

      {/* Logo */}
      <div className="relative z-10 mb-6">
        <img
          src={logo}
          alt="ShaadiNation"
          className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-full shadow-xl ring-4 ring-gold/30"
        />
      </div>

      {/* Tagline */}
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary text-center leading-tight mb-4">
        Crafting Your Dream
        <br />
        <span className="text-secondary italic">Indian Wedding</span>
      </h1>

      <p className="font-elegant text-lg md:text-xl text-muted-foreground text-center max-w-md mb-12 tracking-wide">
        Where every celebration becomes an unforgettable story
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center animate-gentle-bounce">
        <span className="font-body text-xs text-muted-foreground mb-1 tracking-widest uppercase">Explore</span>
        <ChevronDown className="w-5 h-5 text-secondary" />
      </div>
    </section>
  );
};

export default HeroSection;
