// Cocktail Party doodle scene
const CocktailScene = () => (
  <div className="relative w-full h-64 md:h-96">
    <svg viewBox="0 0 800 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Disco ball */}
      <g transform="translate(400, 40)" opacity="0.5">
        <line x1="0" y1="-20" x2="0" y2="0" stroke="currentColor" strokeWidth="1" className="text-secondary" />
        <circle cx="0" cy="15" r="15" stroke="currentColor" strokeWidth="1.2" className="text-secondary" />
        <path d="M-15 15L15 15M-14 8L14 8M-14 22L14 22" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.4" />
        {/* Light rays */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
          <line
            key={angle}
            x1={20 * Math.cos((angle * Math.PI) / 180)}
            y1={15 + 20 * Math.sin((angle * Math.PI) / 180)}
            x2={35 * Math.cos((angle * Math.PI) / 180)}
            y2={15 + 35 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-secondary"
            opacity="0.2"
          />
        ))}
      </g>

      {/* Bar counter */}
      <g opacity="0.8">
        <rect x="200" y="180" width="400" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
        <rect x="210" y="190" width="380" height="80" rx="2" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.3" />
        {/* Bar stools */}
        {[240, 340, 440, 540].map((x) => (
          <g key={x}>
            <circle cx={x} cy="170" r="8" stroke="currentColor" strokeWidth="1" className="text-secondary" opacity="0.5" />
            <line x1={x} y1="178" x2={x} y2="270" stroke="currentColor" strokeWidth="1" className="text-secondary" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* Cocktail glasses on bar */}
      <g transform="translate(280, 140)" opacity="0.7">
        {/* Martini glass */}
        <path d="M0 0L12 25L12 38M-2 0L24 0" stroke="currentColor" strokeWidth="1.2" className="text-secondary" />
        <line x1="6" y1="38" x2="18" y2="38" stroke="currentColor" strokeWidth="1" className="text-secondary" />
        {/* Olive */}
        <circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="0.8" className="text-accent" opacity="0.5" />
      </g>

      <g transform="translate(380, 135)" opacity="0.7">
        {/* Wine glass */}
        <ellipse cx="10" cy="5" rx="10" ry="6" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="10" y1="11" x2="10" y2="35" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="3" y1="35" x2="17" y2="35" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M2 5Q10 18 18 5" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.3" />
      </g>

      <g transform="translate(470, 140)" opacity="0.6">
        {/* Cocktail shaker */}
        <rect x="0" y="5" width="16" height="30" rx="3" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M3 5L5 0L11 0L13 5" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
      </g>

      {/* Dancing people */}
      {[
        { x: 100, y: 200 },
        { x: 140, y: 210 },
        { x: 620, y: 195 },
        { x: 680, y: 210 },
        { x: 720, y: 200 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y})`} opacity="0.5">
          <circle cx="0" cy="0" r="5" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <path d={`M0 5L0 25M-10 15L10 15M0 25L-8 42M0 25L8 42`} stroke="currentColor" strokeWidth="1" className="text-primary" />
          {i % 2 === 0 && (
            <path d="M-5 12Q-12 18 -10 22" stroke="currentColor" strokeWidth="0.7" className="text-secondary" opacity="0.4" />
          )}
        </g>
      ))}

      {/* Glasses clinking */}
      <g transform="translate(160, 130)" opacity="0.4">
        <text fontSize="16" fill="currentColor" className="text-secondary">🥂</text>
      </g>

      {/* Music notes floating */}
      {[
        { x: 80, y: 100 },
        { x: 700, y: 120 },
        { x: 500, y: 80 },
      ].map((p, i) => (
        <text key={i} x={p.x} y={p.y} fontSize="14" fill="currentColor" className="text-secondary" opacity={0.2 + i * 0.1}>
          ♪
        </text>
      ))}

      {/* Party lights string */}
      <path d="M50 60Q200 90 400 70Q600 50 750 80" stroke="currentColor" strokeWidth="0.8" className="text-secondary" opacity="0.2" />
      {[120, 220, 320, 480, 580, 680].map((x, i) => (
        <circle key={i} cx={x} cy={65 + (i % 2 === 0 ? 5 : -5)} r="4" stroke="currentColor" strokeWidth="0.6" className={i % 3 === 0 ? "text-secondary" : i % 3 === 1 ? "text-pink" : "text-accent"} opacity="0.3" />
      ))}

      {/* Floor */}
      <path d="M0 280Q200 275 400 280Q600 285 800 278" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.15" />
    </svg>
  </div>
);

export default CocktailScene;
