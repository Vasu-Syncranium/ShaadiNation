import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-2 md:py-3 max-w-6xl mx-auto">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Centered logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="ShaadiNation" className="h-10 md:h-12 w-auto rounded-full" />
        </div>

        {/* Placeholder right side */}
        <div className="w-10" />
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 space-y-3 animate-fade-in">
          {["Services", "Our Story", "Gallery", "Contact Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="block font-body text-sm tracking-wide text-foreground hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
