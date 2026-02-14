import { useState, useCallback } from "react";
import logo from "@/assets/logo.jpeg";

const CurtainAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [opening, setOpening] = useState(false);

  const handleLogoClick = useCallback(() => {
    if (opening) return;
    setOpening(true);
    document.body.classList.remove("no-scroll");
    // Allow curtain animation to finish before removing overlay
    setTimeout(() => {
      onComplete();
    }, 2200);
  }, [opening, onComplete]);

  return (
    <div
      className={`curtain-overlay fixed inset-0 z-[100] flex items-center justify-center${opening ? " curtain-opening" : ""}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Left curtain */}
      <div className={`curtain-panel curtain-panel-left absolute top-0 left-0 w-1/2 h-full z-10${opening ? " curtain-slide-left" : ""}`}>
        <div className="curtain-fabric absolute inset-0">
          {/* Gold ornamental border on right edge */}
          <div className="absolute top-0 right-0 h-full w-3 bg-gradient-to-b from-gold via-gold-light to-gold opacity-60" />
          {/* Tassel */}
          <div className="absolute bottom-1/3 right-2 flex flex-col items-center">
            <div className="w-1 h-16 bg-gold opacity-50" />
            <div className="w-4 h-6 rounded-b-full bg-gold opacity-60" />
          </div>
        </div>
      </div>

      {/* Right curtain */}
      <div className={`curtain-panel curtain-panel-right absolute top-0 right-0 w-1/2 h-full z-10${opening ? " curtain-slide-right" : ""}`}>
        <div className="curtain-fabric absolute inset-0">
          <div className="absolute top-0 left-0 h-full w-3 bg-gradient-to-b from-gold via-gold-light to-gold opacity-60" />
          <div className="absolute bottom-1/3 left-2 flex flex-col items-center">
            <div className="w-1 h-16 bg-gold opacity-50" />
            <div className="w-4 h-6 rounded-b-full bg-gold opacity-60" />
          </div>
        </div>
      </div>

      {/* Logo in center — clickable */}
      <button
        onClick={handleLogoClick}
        className={`relative z-20 flex flex-col items-center gap-4 cursor-pointer group focus:outline-none${opening ? " logo-fade-out" : ""}`}
        aria-label="Enter site"
      >
        <div className="logo-pulse-ring relative">
          <img
            src={logo}
            alt="ShaadiNation"
            className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-full shadow-2xl ring-4 ring-gold/40 transition-transform duration-300 group-hover:scale-105"
          />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-logo-pulse" />
          <div className="absolute -inset-2 rounded-full border border-gold/15 animate-logo-pulse-delayed" />
        </div>

        {/* Tap to enter hint */}
        <span className="font-body text-sm tracking-[0.25em] uppercase text-secondary/80 animate-gentle-bounce select-none">
          Tap to Enter
        </span>
      </button>
    </div>
  );
};

export default CurtainAnimation;
