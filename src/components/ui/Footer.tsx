import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const links = [
    { label: "Services", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <footer className="relative bg-primary text-primary-foreground py-12 px-4 overflow-hidden">
      {/* Ornamental top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-gold-light to-secondary" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Brand */}
        <h3 className="font-display text-2xl md:text-3xl mb-2">ShaadiNation</h3>
        <p className="font-elegant text-sm text-primary-foreground/70 mb-8 tracking-wider">
          Crafting Dream Indian Weddings
        </p>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-primary-foreground/80 hover:text-secondary transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-8">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Doodle border decoration */}
        <svg viewBox="0 0 400 20" className="w-48 mx-auto mb-6 text-secondary opacity-30">
          <path d="M0 10Q25 0 50 10Q75 20 100 10Q125 0 150 10Q175 20 200 10Q225 0 250 10Q275 20 300 10Q325 0 350 10Q375 20 400 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>

        <p className="font-body text-xs text-primary-foreground/40">
          © 2026 ShaadiNation. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
