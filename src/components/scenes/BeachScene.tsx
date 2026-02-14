// Beach Wedding doodle scene
const BeachScene = () => (
  <div className="relative w-full h-64 md:h-96">
    <svg viewBox="0 0 800 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sun */}
      <circle cx="650" cy="80" r="30" stroke="currentColor" strokeWidth="1.5" className="text-secondary" opacity="0.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1={650 + 35 * Math.cos((angle * Math.PI) / 180)}
          y1={80 + 35 * Math.sin((angle * Math.PI) / 180)}
          x2={650 + 45 * Math.cos((angle * Math.PI) / 180)}
          y2={80 + 45 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="1"
          className="text-secondary"
          opacity="0.3"
        />
      ))}

      {/* Palm trees */}
      <g transform="translate(100, 100)" opacity="0.6">
        <path d="M20 180L25 80" stroke="currentColor" strokeWidth="2" className="text-accent" />
        <path d="M25 80Q10 50 -20 60" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
        <path d="M25 80Q40 45 70 55" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
        <path d="M25 80Q20 40 0 30" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
        <path d="M25 80Q35 40 55 35" stroke="currentColor" strokeWidth="1.2" className="text-accent" />
      </g>

      <g transform="translate(650, 130)" opacity="0.4">
        <path d="M15 150L18 60" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
        <path d="M18 60Q5 35 -15 42" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <path d="M18 60Q30 32 50 40" stroke="currentColor" strokeWidth="1" className="text-accent" />
        <path d="M18 60Q15 28 0 20" stroke="currentColor" strokeWidth="1" className="text-accent" />
      </g>

      {/* Mandap */}
      <g transform="translate(300, 120)" opacity="0.8">
        {/* Pillars */}
        <line x1="0" y1="30" x2="0" y2="150" stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
        <line x1="150" y1="30" x2="150" y2="150" stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
        <line x1="30" y1="25" x2="30" y2="150" stroke="currentColor" strokeWidth="1" className="text-secondary" opacity="0.5" />
        <line x1="120" y1="25" x2="120" y2="150" stroke="currentColor" strokeWidth="1" className="text-secondary" opacity="0.5" />
        {/* Canopy */}
        <path d="M-10 30Q75 0 160 30" stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
        {/* Drapes */}
        <path d="M0 30Q20 50 0 70" stroke="currentColor" strokeWidth="0.8" className="text-pink" opacity="0.4" />
        <path d="M150 30Q130 50 150 70" stroke="currentColor" strokeWidth="0.8" className="text-pink" opacity="0.4" />
        {/* Hanging flowers */}
        {[30, 60, 90, 120].map((x) => (
          <g key={x}>
            <line x1={x} y1="20" x2={x} y2="35" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.4" />
            <circle cx={x} cy="37" r="3" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.4" />
          </g>
        ))}
        {/* Couple silhouette */}
        <circle cx="65" cy="100" r="5" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.5" />
        <circle cx="85" cy="100" r="5" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.5" />
        <path d="M65 105L65 130M85 105L85 130" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.4" />
      </g>

      {/* Waves */}
      <path d="M0 320Q50 310 100 320Q150 330 200 320Q250 310 300 320Q350 330 400 320Q450 310 500 320Q550 330 600 320Q650 310 700 320Q750 330 800 320" stroke="currentColor" strokeWidth="1.5" className="text-accent" opacity="0.3" />
      <path d="M0 340Q50 330 100 340Q150 350 200 340Q250 330 300 340Q350 350 400 340Q450 330 500 340Q550 350 600 340Q650 330 700 340Q750 350 800 340" stroke="currentColor" strokeWidth="1" className="text-accent" opacity="0.2" />
      <path d="M0 360Q50 350 100 360Q150 370 200 360Q250 350 300 360Q350 370 400 360Q450 350 500 360Q550 370 600 360Q650 350 700 360Q750 370 800 360" stroke="currentColor" strokeWidth="0.8" className="text-accent" opacity="0.15" />

      {/* Sandy ground */}
      <path d="M0 290Q200 280 400 285Q600 290 800 282" stroke="currentColor" strokeWidth="1" className="text-secondary" opacity="0.15" />
    </svg>
  </div>
);

export default BeachScene;
