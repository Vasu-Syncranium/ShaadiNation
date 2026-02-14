// import comingSoonImg from "@/assets/ComingSoon.jpeg";

// const ComingSoon = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background p-4">
//       <img
//         src={comingSoonImg}
//         alt="Coming Soon"
//         className="w-full max-w-4xl h-auto object-contain rounded-lg shadow-lg"
//       />
//     </div>
//   );
// };

// export default ComingSoon;

import React from 'react';
import Image from 'next/image';
import Logo from "@/assets/Shaadi Nation Logo.png";
const ComingSoon = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.header}>Launching Soon...</h1>

        <div style={styles.logoContainer}>
          <Image
            src={Logo}
            width={550}                // 👈 fixed width
            height={0}                 // 👈 can be 0 when using style height:auto
            style={{ height: "auto" }}
            className="rounded-lg object-contain"
            alt="Logo"
          />
        </div>
        <p style={styles.tagline}>
          Bespoke destination weddings and iconic Big Fat Indian weddings across India and international destinations — curated with timeless elegance and flawless execution.
        </p>

        <div style={styles.ctaSection}>
          <div style={styles.ctaTitle}>
            <span style={styles.phoneIcon}>📞</span>
            <span>Book a Consultation Call</span>
          </div>

          <div style={styles.phoneNumber}>
            <a href="tel:+918950298950" style={styles.phoneLink}>+91-8950-29-8950</a>
          </div>

          <div style={styles.location}>
            <span style={styles.locationIcon}>📍</span>
            <span>Available for PAN India & International Weddings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    background: 'linear-gradient(135deg, #fdfbfb 0%, #fff9f4 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: 0,
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    textAlign: 'center',
  },
  header: {
    fontSize: 'clamp(2.5rem, 5vw, 5rem)',
    fontWeight: 300,
    letterSpacing: '0.05em',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    color: '#2d2d2d',
    margin: '0 0 clamp(2rem, 4vw, 3rem) 0',
  },
  logoContainer: {
    marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  elephantImage: {
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    margin: '0 auto',
    display: 'block',
  },
  logoText: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 800,
    background: 'linear-gradient(45deg, #d4691e, #ff8c42)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginTop: '-20px',
    letterSpacing: '-0.02em',
  },
  tagline: {
    fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
    lineHeight: 1.7,
    color: '#333',
    margin: 'clamp(1rem, 4vw, 2rem) auto',
    maxWidth: '900px',
    padding: '0 12px',
  },
  ctaSection: {
    marginTop: 'clamp(1.5rem, 5vw, 2rem)',
  },
  ctaTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 600,
    marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
    color: '#2d2d2d',
    flexWrap: 'wrap',
  },
  phoneIcon: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  },
  phoneNumber: {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    fontWeight: 500,
    color: '#000',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
    letterSpacing: '0.05em',
  },
  phoneLink: {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'opacity 0.3s ease',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
    color: '#444',
    flexWrap: 'wrap',
  },
  locationIcon: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    color: '#e74c3c',
  },
};

// Add media query styles for hover effects
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
  @media (hover: hover) {
    a:hover {
      opacity: 0.8;
    }
  }
  
  @media (max-width: 768px) {
    /* Mobile adjustments are handled by clamp() */
  }
  
  @media (max-width: 480px) {
    /* Small mobile adjustments are handled by clamp() */
  }
`;
  document.head.appendChild(styleSheet);
}

export default ComingSoon;
