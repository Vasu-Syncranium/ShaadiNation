// Rajasthan Heritage doodle scene — ultra-detailed line art SVG
const RajasthanScene = () => (
  <div className="relative w-full h-80 md:h-[32rem]">
    <svg viewBox="0 0 1200 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ===== PALACE — GROUND FLOOR ===== */}
      <g opacity="0.9">
        {/* Base wall */}
        <rect x="100" y="100" width="1000" height="310" stroke="currentColor" strokeWidth="1.2" className="text-primary" />

        {/* Plinth / base band */}
        <rect x="95" y="395" width="1010" height="15" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.4" />
        <line x1="95" y1="402" x2="1105" y2="402" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />

        {/* Horizontal cornice bands */}
        <line x1="100" y1="155" x2="1100" y2="155" stroke="currentColor" strokeWidth="0.8" className="text-primary" opacity="0.5" />
        <line x1="100" y1="160" x2="1100" y2="160" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
        <line x1="100" y1="240" x2="1100" y2="240" stroke="currentColor" strokeWidth="0.7" className="text-primary" opacity="0.45" />
        <line x1="100" y1="245" x2="1100" y2="245" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
        <line x1="100" y1="320" x2="1100" y2="320" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.35" />

        {/* ===== Scalloped top edge (chhajja / drip edge) ===== */}
        {Array.from({ length: 50 }).map((_, i) => {
          const sx = 100 + i * 20;
          if (sx >= 480 && sx <= 720) return null;
          return (
            <path key={`sc-${i}`} d={`M${sx} 100Q${sx + 10} 92 ${sx + 20} 100`}
              stroke="currentColor" strokeWidth="0.6" className="text-secondary" opacity="0.3" />
          );
        })}

        {/* ===== UPPER ROW — Small arched windows ===== */}
        {[130, 180, 230, 280, 330, 380, 430, 770, 820, 870, 920, 970, 1020, 1070].map((x) => (
          <g key={`uwin-${x}`}>
            {/* Arched window */}
            <path d={`M${x - 14} 150 L${x - 14} 118 A14 16 0 0 1 ${x + 14} 118 L${x + 14} 150`}
              stroke="currentColor" strokeWidth="0.7" className="text-primary" />
            {/* Inner arch */}
            <path d={`M${x - 10} 148 L${x - 10} 122 A10 12 0 0 1 ${x + 10} 122 L${x + 10} 148`}
              stroke="currentColor" strokeWidth="0.35" className="text-primary" opacity="0.3" />
            {/* Sill */}
            <line x1={x - 16} y1="150" x2={x + 16} y2="150" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
            {/* Jali center line */}
            <line x1={x} y1="118" x2={x} y2="150" stroke="currentColor" strokeWidth="0.25" className="text-primary" opacity="0.2" />
          </g>
        ))}

        {/* Decorative diamond medallions between upper windows */}
        {[155, 255, 355, 795, 895, 995].map((x) => (
          <g key={`dm-${x}`} opacity="0.25">
            <path d={`M${x} 108L${x + 4} 115L${x} 122L${x - 4} 115Z`} stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            <circle cx={x} cy="115" r="1.5" fill="currentColor" className="text-secondary" opacity="0.3" />
          </g>
        ))}

        {/* ===== MIDDLE ROW — Larger arched windows with columns ===== */}
        {[125, 195, 265, 335, 405, 795, 865, 935, 1005, 1075].map((x) => (
          <g key={`mwin-${x}`}>
            {/* Outer arch */}
            <path d={`M${x - 22} 240 L${x - 22} 180 A22 26 0 0 1 ${x + 22} 180 L${x + 22} 240`}
              stroke="currentColor" strokeWidth="0.8" className="text-primary" />
            {/* Inner arch */}
            <path d={`M${x - 16} 238 L${x - 16} 185 A16 20 0 0 1 ${x + 16} 185 L${x + 16} 238`}
              stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.35" />
            {/* Column sides */}
            <line x1={x - 22} y1="178" x2={x - 22} y2="240" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.6" />
            <line x1={x + 22} y1="178" x2={x + 22} y2="240" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.6" />
            {/* Window sill bracket */}
            <path d={`M${x - 24} 240L${x - 20} 244L${x + 20} 244L${x + 24} 240`} stroke="currentColor" strokeWidth="0.35" className="text-primary" opacity="0.3" />
            {/* Jali pattern */}
            <line x1={x} y1="182" x2={x} y2="238" stroke="currentColor" strokeWidth="0.2" className="text-primary" opacity="0.15" />
            <line x1={x - 16} y1="210" x2={x + 16} y2="210" stroke="currentColor" strokeWidth="0.2" className="text-primary" opacity="0.15" />
            {/* Top ornament dot */}
            <circle cx={x} cy="172" r="1.5" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.3" />
          </g>
        ))}

        {/* ===== BOTTOM ROW — Ground floor large arches ===== */}
        {[130, 210, 290, 370, 825, 905, 985, 1065].map((x) => (
          <g key={`barch-${x}`}>
            <path d={`M${x - 28} 395 L${x - 28} 270 A28 32 0 0 1 ${x + 28} 270 L${x + 28} 395`}
              stroke="currentColor" strokeWidth="0.9" className="text-primary" />
            {/* Inner arch outline */}
            <path d={`M${x - 22} 393 L${x - 22} 275 A22 26 0 0 1 ${x + 22} 275 L${x + 22} 393`}
              stroke="currentColor" strokeWidth="0.35" className="text-primary" opacity="0.25" />
            {/* Column details */}
            <line x1={x - 28} y1="268" x2={x - 28} y2="395" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.5" />
            <line x1={x + 28} y1="268" x2={x + 28} y2="395" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.5" />
            {/* Column base */}
            <rect x={x - 31} y="388" width="6" height="7" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
            <rect x={x + 25} y="388" width="6" height="7" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
            {/* Keystone */}
            <path d={`M${x - 4} 258L${x} 252L${x + 4} 258`} stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* ===== CENTRAL TOWER (3 levels, taller) ===== */}
      <g opacity="0.9">
        {/* Tower body extending above main wall */}
        <rect x="480" y="40" width="240" height="370" stroke="currentColor" strokeWidth="1.2" className="text-primary" />

        {/* Tower cornice bands */}
        <line x1="480" y1="90" x2="720" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />
        <line x1="480" y1="155" x2="720" y2="155" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />

        {/* Tower upper section / pavilion */}
        <rect x="510" y="5" width="180" height="40" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {/* Pavillion arches */}
        {[530, 570, 610, 650].map((x) => (
          <path key={`pav-${x}`} d={`M${x - 12} 45 L${x - 12} 20 A12 14 0 0 1 ${x + 12} 20 L${x + 12} 45`}
            stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.6" />
        ))}

        {/* ===== MAIN DOME on central tower ===== */}
        <path d="M520 5Q540 -30 600 -42Q660 -30 680 5" stroke="currentColor" strokeWidth="1.3" className="text-primary" />
        {/* Inner dome line */}
        <path d="M535 5Q550 -18 600 -28Q650 -18 665 5" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.35" />
        {/* Dome ribs */}
        <line x1="600" y1="-42" x2="600" y2="5" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.2" />
        <path d="M555 -10Q575 -22 600 -30" stroke="currentColor" strokeWidth="0.25" className="text-primary" opacity="0.15" />
        <path d="M645 -10Q625 -22 600 -30" stroke="currentColor" strokeWidth="0.25" className="text-primary" opacity="0.15" />

        {/* Kalash (sacred pot finial) on top */}
        <line x1="600" y1="-42" x2="600" y2="-52" stroke="currentColor" strokeWidth="0.8" className="text-secondary" />
        <circle cx="600" cy="-55" r="3" stroke="currentColor" strokeWidth="0.7" className="text-secondary" />
        <path d="M597 -55L600 -62L603 -55" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />

        {/* Side mini domes */}
        <path d="M510 5Q520 -10 530 -12Q540 -10 550 5" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
        <circle cx="530" cy="-16" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        <path d="M650 5Q660 -10 670 -12Q680 -10 690 5" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
        <circle cx="670" cy="-16" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />

        {/* ===== SIDE CHATTRIS (domed pavilions at corners) ===== */}
        {/* Left chattri */}
        <g>
          <rect x="105" y="65" width="55" height="35" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
          <path d="M105 65Q132 38 160 65" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <path d="M115 65Q132 48 150 65" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
          {/* Pillars */}
          <line x1="110" y1="65" x2="110" y2="100" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          <line x1="130" y1="65" x2="130" y2="100" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
          <line x1="155" y1="65" x2="155" y2="100" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          {/* Kalash */}
          <line x1="132" y1="38" x2="132" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
          <circle cx="132" cy="28" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        </g>
        {/* Right chattri */}
        <g>
          <rect x="1035" y="65" width="55" height="35" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
          <path d="M1035 65Q1062 38 1090 65" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <path d="M1045 65Q1062 48 1080 65" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
          <line x1="1040" y1="65" x2="1040" y2="100" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          <line x1="1062" y1="65" x2="1062" y2="100" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
          <line x1="1085" y1="65" x2="1085" y2="100" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          <line x1="1062" y1="38" x2="1062" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
          <circle cx="1062" cy="28" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        </g>

        {/* Tower level 1 — upper arched windows */}
        {[510, 560, 610, 660, 710].map((x) => (
          <g key={`tw1-${x}`}>
            <path d={`M${x - 16} 88 L${x - 16} 58 A16 18 0 0 1 ${x + 16} 58 L${x + 16} 88`}
              stroke="currentColor" strokeWidth="0.7" className="text-primary" />
            <path d={`M${x - 11} 86 L${x - 11} 62 A11 13 0 0 1 ${x + 11} 62 L${x + 11} 86`}
              stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
            <line x1={x} y1="58" x2={x} y2="86" stroke="currentColor" strokeWidth="0.2" className="text-primary" opacity="0.15" />
          </g>
        ))}

        {/* Tower level 2 — middle arched windows */}
        {[505, 555, 605, 655, 705].map((x) => (
          <g key={`tw2-${x}`}>
            <path d={`M${x - 18} 152 L${x - 18} 108 A18 22 0 0 1 ${x + 18} 108 L${x + 18} 152`}
              stroke="currentColor" strokeWidth="0.7" className="text-primary" />
            <path d={`M${x - 13} 150 L${x - 13} 112 A13 16 0 0 1 ${x + 13} 112 L${x + 13} 150`}
              stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
            <line x1={x} y1="108" x2={x} y2="150" stroke="currentColor" strokeWidth="0.2" className="text-primary" opacity="0.15" />
            <line x1={x - 13} y1="130" x2={x + 13} y2="130" stroke="currentColor" strokeWidth="0.2" className="text-primary" opacity="0.12" />
          </g>
        ))}

        {/* Tower level 3 — large arched openings */}
        {[510, 570, 630, 690].map((x) => (
          <g key={`tw3-${x}`}>
            <path d={`M${x - 20} 320 L${x - 20} 260 A20 24 0 0 1 ${x + 20} 260 L${x + 20} 320`}
              stroke="currentColor" strokeWidth="0.8" className="text-primary" />
            <path d={`M${x - 15} 318 L${x - 15} 264 A15 18 0 0 1 ${x + 15} 264 L${x + 15} 318`}
              stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.2" />
          </g>
        ))}

        {/* ===== MAIN ENTRANCE GATE ===== */}
        <path d="M565 410 L565 340 A35 42 0 0 1 635 340 L635 410" stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
        <path d="M573 408 L573 345 A27 34 0 0 1 627 345 L627 408" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.35" />
        {/* Gate panels */}
        <line x1="600" y1="345" x2="600" y2="408" stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.3" />
        {/* Door studs */}
        {[360, 375, 390].map((y) => (
          <g key={`stud-${y}`}>
            <circle cx="585" cy={y} r="1.2" fill="currentColor" className="text-secondary" opacity="0.2" />
            <circle cx="615" cy={y} r="1.2" fill="currentColor" className="text-secondary" opacity="0.2" />
          </g>
        ))}
        {/* Keystone arch decoration */}
        <path d="M594 330L600 322L606 330" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.4" />
        {/* Chhajja over gate */}
        <line x1="555" y1="328" x2="645" y2="328" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.4" />
        <line x1="558" y1="331" x2="642" y2="331" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
      </g>

      {/* ===== MERLONS / PARAPET CRENELLATIONS ===== */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 102 + i * 21;
        if (x >= 475 && x <= 725) return null;
        return (
          <rect key={`mer-L${i}`} x={x} y="93" width="12" height="7" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
        );
      })}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 742 + i * 21;
        if (x > 1100) return null;
        return (
          <rect key={`mer-R${i}`} x={x} y="93" width="12" height="7" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
        );
      })}

      {/* ===== STEPS ===== */}
      {/* Left staircase */}
      {[0, 6, 12, 18].map((dy, i) => (
        <line key={`stL-${i}`} x1={108 + i * 5} y1={410 + dy} x2={165 - i * 5} y2={410 + dy}
          stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity={0.35 - i * 0.05} />
      ))}
      {/* Right staircase */}
      {[0, 6, 12, 18].map((dy, i) => (
        <line key={`stR-${i}`} x1={1035 + i * 5} y1={410 + dy} x2={1092 - i * 5} y2={410 + dy}
          stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity={0.35 - i * 0.05} />
      ))}

      {/* ===== GROUND / COURTYARD ===== */}
      <path d="M30 430Q300 440 600 432Q900 424 1170 435" stroke="currentColor" strokeWidth="0.7" className="text-primary" opacity="0.18" />
      <path d="M0 445Q400 455 600 447Q800 440 1200 450" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.1" />
      {/* Ground texture dashes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`grd-${i}`} x1={50 + i * 58} y1={440 + (i % 3) * 2} x2={70 + i * 58} y2={440 + (i % 3) * 2}
          stroke="currentColor" strokeWidth="0.25" className="text-primary" opacity="0.08" />
      ))}

      {/* ===== VINTAGE CAR (left) ===== */}
      <g transform="translate(100, 395)" opacity="0.85">
        {/* Car body shell */}
        <path d="M0 18Q2 2 20 -8L55 -12Q72 -12 85 -8L110 -2Q118 5 120 18Z"
          stroke="currentColor" strokeWidth="1.2" className="text-primary" />
        {/* Cabin / roof */}
        <path d="M35 -12Q38 -32 55 -35Q72 -32 78 -12" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {/* Windshield */}
        <line x1="37" y1="-12" x2="40" y2="-30" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.5" />
        <line x1="41" y1="-12" x2="43" y2="-28" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.3" />
        {/* Rear window */}
        <path d="M75 -12Q78 -22 82 -12" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />
        {/* Convertible top fold */}
        <path d="M78 -12Q88 -20 98 -10" stroke="currentColor" strokeWidth="0.7" className="text-primary" opacity="0.5" />
        <path d="M82 -12Q90 -16 95 -10" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
        {/* Front fender */}
        <path d="M0 18Q-6 12 -5 5Q-3 -2 5 -5" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
        {/* Rear fender */}
        <path d="M115 8Q122 4 124 10Q124 18 120 20" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        {/* Headlamp */}
        <circle cx="-3" cy="6" r="5" stroke="currentColor" strokeWidth="0.8" className="text-secondary" />
        <circle cx="-3" cy="6" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.4" />
        {/* Running board */}
        <line x1="18" y1="20" x2="102" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />
        {/* Door line */}
        <line x1="60" y1="-10" x2="60" y2="16" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.35" />
        {/* Door handle */}
        <line x1="62" y1="3" x2="68" y2="3" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />
        {/* Grille lines */}
        {[0, 3, 6, 9, 12].map((y) => (
          <line key={`grille-${y}`} x1="3" y1={y} x2="15" y2={y - 1} stroke="currentColor" strokeWidth="0.25" className="text-primary" opacity="0.3" />
        ))}
        {/* Bumper */}
        <path d="M-8 18L-5 22L125 22L128 18" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />
        {/* Wheels with spokes */}
        <circle cx="25" cy="25" r="12" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
        <circle cx="25" cy="25" r="3" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={`wsp1-${a}`}
            x1={25 + 3 * Math.cos(a * Math.PI / 180)} y1={25 + 3 * Math.sin(a * Math.PI / 180)}
            x2={25 + 8 * Math.cos(a * Math.PI / 180)} y2={25 + 8 * Math.sin(a * Math.PI / 180)}
            stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.3" />
        ))}
        <circle cx="100" cy="25" r="12" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <circle cx="100" cy="25" r="8" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
        <circle cx="100" cy="25" r="3" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={`wsp2-${a}`}
            x1={100 + 3 * Math.cos(a * Math.PI / 180)} y1={25 + 3 * Math.sin(a * Math.PI / 180)}
            x2={100 + 8 * Math.cos(a * Math.PI / 180)} y2={25 + 8 * Math.sin(a * Math.PI / 180)}
            stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.3" />
        ))}
        {/* Maroon fill hint */}
        <path d="M5 16L22 -10L85 -10L115 5L118 16Z" fill="hsl(350 60% 25%)" opacity="0.06" />
        {/* Groom sitting in car */}
        <circle cx="55" cy="-22" r="6" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
        <path d="M55 -16L55 -8" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        <path d="M49 -12L61 -12" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        {/* Turban */}
        <path d="M49 -26Q55 -35 61 -26" stroke="currentColor" strokeWidth="0.7" className="text-secondary" />
        <path d="M51 -27Q55 -32 59 -27" stroke="currentColor" strokeWidth="0.35" className="text-secondary" opacity="0.4" />
        {/* Sehra strands */}
        <path d="M49 -24L46 -18" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.4" />
        <path d="M48 -23L44 -17" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.3" />
      </g>

      {/* ===== DANCING GROUP (between car & truck) ===== */}
      {/* Women in sarees dancing */}
      {[
        { x: 320, arm: 1 },
        { x: 350, arm: -1 },
        { x: 380, arm: 1 },
        { x: 410, arm: -1 },
        { x: 440, arm: 1 },
      ].map((p, i) => (
        <g key={`sari-${i}`} transform={`translate(${p.x}, 390)`} opacity="0.72">
          {/* Head */}
          <circle cx="0" cy="0" r="5.5" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
          {/* Hair bun */}
          <circle cx={p.arm * 4} cy="-3" r="2.5" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
          {/* Neck */}
          <line x1="0" y1="5.5" x2="0" y2="9" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          {/* Body / blouse */}
          <path d="M-5 9L5 9L4 20L-4 20Z" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          {/* Saree drape */}
          <path d={`M-7 20Q0 38 7 20`} stroke="currentColor" strokeWidth="0.6" className="text-secondary" opacity="0.45" />
          <path d={`M-9 28Q0 48 9 28`} stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.3" />
          <path d={`M-10 35Q0 55 10 35`} stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.2" />
          {/* Pallu (draped part) */}
          <path d={`M${p.arm * -4} 12Q${p.arm * -12} 5 ${p.arm * -10} 15`} stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.3" />
          {/* Arms raised for dance */}
          <line x1="-4" y1="12" x2={p.arm * -14} y2="2" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          <line x1="4" y1="12" x2={p.arm * 12} y2="-2" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          {/* Bangles */}
          <circle cx={p.arm * -14} cy="1" r="1.5" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.3" />
          <circle cx={p.arm * 12} cy="-3" r="1.5" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.3" />
        </g>
      ))}

      {/* ===== DJ TRUCK (right-center) ===== */}
      <g transform="translate(660, 370)" opacity="0.78">
        {/* Truck body */}
        <rect x="0" y="0" width="105" height="50" rx="2" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {/* Cabin */}
        <rect x="105" y="8" width="40" height="42" rx="3" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {/* Cabin window */}
        <rect x="112" y="13" width="25" height="18" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.45" />
        {/* Cabin lines */}
        <line x1="105" y1="35" x2="145" y2="35" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.3" />
        {/* Speaker rows — top */}
        {[12, 35, 58, 82].map((x) => (
          <g key={`spkT-${x}`}>
            <rect x={x - 10} y="4" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
            <circle cx={x} cy="14" r="7" stroke="currentColor" strokeWidth="0.6" className="text-secondary" />
            <circle cx={x} cy="14" r="3.5" stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.5" />
            <circle cx={x} cy="14" r="1.2" fill="currentColor" className="text-secondary" opacity="0.2" />
          </g>
        ))}
        {/* Speaker rows — bottom */}
        {[18, 50, 75].map((x) => (
          <g key={`spkB-${x}`}>
            <rect x={x - 12} y="28" width="24" height="18" rx="1" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.6" />
            <circle cx={x} cy="37" r="5" stroke="currentColor" strokeWidth="0.5" className="text-secondary" opacity="0.5" />
            <circle cx={x} cy="37" r="2" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.3" />
          </g>
        ))}
        {/* Wheels */}
        <circle cx="25" cy="55" r="10" stroke="currentColor" strokeWidth="0.9" className="text-primary" />
        <circle cx="25" cy="55" r="5" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
        <circle cx="25" cy="55" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        <circle cx="75" cy="55" r="10" stroke="currentColor" strokeWidth="0.9" className="text-primary" />
        <circle cx="75" cy="55" r="5" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
        <circle cx="75" cy="55" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        <circle cx="130" cy="55" r="10" stroke="currentColor" strokeWidth="0.9" className="text-primary" />
        <circle cx="130" cy="55" r="5" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
        <circle cx="130" cy="55" r="2" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        {/* Music notes floating above */}
        <text x="20" y="-8" className="text-secondary" fontSize="13" fill="currentColor" opacity="0.35">♪</text>
        <text x="50" y="-15" className="text-secondary" fontSize="10" fill="currentColor" opacity="0.25">♫</text>
        <text x="80" y="-5" className="text-secondary" fontSize="11" fill="currentColor" opacity="0.3">♪</text>
        <text x="45" y="-22" className="text-secondary" fontSize="9" fill="currentColor" opacity="0.2">♫</text>
      </g>

      {/* ===== BAND MUSICIANS (right side) ===== */}
      {[
        { x: 870, inst: "dhol" },
        { x: 900, inst: "trumpet" },
        { x: 930, inst: "shehnai" },
        { x: 960, inst: "trumpet" },
        { x: 990, inst: "cymbal" },
        { x: 1020, inst: "dhol" },
      ].map((m, i) => (
        <g key={`band-${i}`} transform={`translate(${m.x}, 388)`} opacity="0.6">
          {/* Head */}
          <circle cx="0" cy="0" r="5" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
          {/* Uniform cap */}
          <path d="M-5 -3Q0 -10 5 -3" stroke="currentColor" strokeWidth="0.6" className="text-secondary" opacity="0.5" />
          <line x1="-5" y1="-3" x2="5" y2="-3" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.3" />
          {/* Body */}
          <path d="M-3 5L3 5L4 28L-4 28Z" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          {/* Legs */}
          <line x1="-2" y1="28" x2="-4" y2="45" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <line x1="2" y1="28" x2="4" y2="45" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          {/* Feet */}
          <line x1="-4" y1="45" x2="-8" y2="45" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
          <line x1="4" y1="45" x2="8" y2="45" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />

          {/* Instruments */}
          {m.inst === "trumpet" && (
            <>
              <line x1="3" y1="12" x2="18" y2="8" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
              <line x1="18" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
              <path d="M22 4Q26 8 22 12" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
              <line x1="-3" y1="12" x2="5" y2="15" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
            </>
          )}
          {m.inst === "shehnai" && (
            <>
              <line x1="3" y1="10" x2="16" y2="2" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
              <path d="M16 -2Q22 2 16 6" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
              <line x1="-3" y1="10" x2="8" y2="6" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
            </>
          )}
          {m.inst === "dhol" && (
            <>
              <ellipse cx="0" cy="18" rx="10" ry="6" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
              <ellipse cx="0" cy="18" rx="10" ry="3" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
              <line x1="-10" y1="18" x2="-15" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              <line x1="10" y1="18" x2="15" y2="12" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              {/* Sticks */}
              <line x1="-15" y1="10" x2="-8" y2="14" stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.5" />
            </>
          )}
          {m.inst === "cymbal" && (
            <>
              <line x1="-3" y1="12" x2="-14" y2="8" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              <line x1="3" y1="12" x2="14" y2="6" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              <ellipse cx="-16" cy="7" rx="6" ry="2.5" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
              <ellipse cx="16" cy="5" rx="6" ry="2.5" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            </>
          )}
        </g>
      ))}

      {/* ===== STANDING GUESTS / ONLOOKERS ===== */}
      {[
        { x: 270, gender: "m" }, { x: 290, gender: "f" },
        { x: 500, gender: "f" }, { x: 520, gender: "m" },
        { x: 1050, gender: "m" }, { x: 1070, gender: "f" }, { x: 1090, gender: "m" },
      ].map((g, i) => (
        <g key={`guest-${i}`} transform={`translate(${g.x}, 392)`} opacity="0.45">
          <circle cx="0" cy="0" r="4.5" stroke="currentColor" strokeWidth="0.6" className="text-primary" />
          <path d="M-3 5L3 5L3.5 26L-3.5 26Z" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <line x1="-2" y1="26" x2="-3" y2="40" stroke="currentColor" strokeWidth="0.4" className="text-primary" />
          <line x1="2" y1="26" x2="3" y2="40" stroke="currentColor" strokeWidth="0.4" className="text-primary" />
          {g.gender === "f" && (
            <>
              <path d="M-5 20Q0 30 5 20" stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.3" />
              <path d="M-4 -3Q-6 2 -5 6" stroke="currentColor" strokeWidth="0.3" className="text-primary" opacity="0.25" />
            </>
          )}
          {g.gender === "m" && (
            <path d="M-4 -3Q0 -7 4 -3" stroke="currentColor" strokeWidth="0.35" className="text-secondary" opacity="0.3" />
          )}
          {/* Arm */}
          <line x1={i % 2 === 0 ? -3 : 3} y1="10" x2={i % 2 === 0 ? -10 : 10} y2="16" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.4" />
        </g>
      ))}

      {/* ===== HORSE WITH BARAAT RIDER ===== */}
      <g transform="translate(250, 380)" opacity="0.65">
        {/* Horse body outline */}
        <path d="M0 20L5 5L12 -5L22 -10L35 -8L42 0L48 10L50 20" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {/* Belly */}
        <path d="M8 20Q25 25 45 20" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.2" />
        {/* Head and neck */}
        <path d="M5 5L-5 -12L-10 -20L-8 -25" stroke="currentColor" strokeWidth="0.9" className="text-primary" />
        {/* Ears */}
        <path d="M-10 -25L-8 -32L-6 -25" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <path d="M-7 -24L-4 -30L-3 -23" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.5" />
        {/* Eye */}
        <circle cx="-7" cy="-18" r="1" fill="currentColor" className="text-primary" opacity="0.5" />
        {/* Muzzle */}
        <path d="M-10 -20L-14 -18L-10 -15" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.5" />
        {/* Mane */}
        <path d="M-2 -10Q2 -15 5 -10" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
        <path d="M2 -5Q6 -10 10 -5" stroke="currentColor" strokeWidth="0.35" className="text-primary" opacity="0.25" />
        {/* Front legs */}
        <line x1="8" y1="18" x2="5" y2="48" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        <line x1="18" y1="12" x2="15" y2="48" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        {/* Hooves */}
        <line x1="3" y1="48" x2="7" y2="48" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.6" />
        <line x1="13" y1="48" x2="17" y2="48" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.6" />
        {/* Back legs */}
        <line x1="38" y1="15" x2="40" y2="48" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        <line x1="45" y1="18" x2="48" y2="48" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        <line x1="38" y1="48" x2="42" y2="48" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.6" />
        <line x1="46" y1="48" x2="50" y2="48" stroke="currentColor" strokeWidth="0.6" className="text-primary" opacity="0.6" />
        {/* Tail */}
        <path d="M50 8Q58 2 56 15Q54 22 52 18" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.4" />
        {/* Saddle decoration */}
        <path d="M15 -8Q25 -14 38 -8" stroke="currentColor" strokeWidth="0.6" className="text-secondary" opacity="0.35" />
        <path d="M18 -6Q25 -10 35 -6" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.2" />
        {/* Decorative head ornament */}
        <path d="M-6 -22L-2 -28L2 -22" stroke="currentColor" strokeWidth="0.4" className="text-secondary" opacity="0.4" />
        {/* Rider */}
        <circle cx="28" cy="-22" r="6" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
        <path d="M28 -16L28 -5" stroke="currentColor" strokeWidth="0.7" className="text-primary" />
        <path d="M22 -10L34 -10" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        {/* Sherwani body */}
        <path d="M24 -10L22 -2L34 -2L32 -10" stroke="currentColor" strokeWidth="0.4" className="text-primary" opacity="0.3" />
        {/* Turban with kalgi */}
        <path d="M22 -26Q28 -36 34 -26" stroke="currentColor" strokeWidth="0.8" className="text-secondary" />
        <path d="M24 -27Q28 -33 32 -27" stroke="currentColor" strokeWidth="0.35" className="text-secondary" opacity="0.35" />
        {/* Kalgi feather */}
        <line x1="28" y1="-36" x2="28" y2="-42" stroke="currentColor" strokeWidth="0.4" className="text-secondary" />
        <path d="M26 -42Q28 -45 30 -42" stroke="currentColor" strokeWidth="0.3" className="text-secondary" opacity="0.5" />
      </g>

    </svg>
  </div>
);

export default RajasthanScene;
