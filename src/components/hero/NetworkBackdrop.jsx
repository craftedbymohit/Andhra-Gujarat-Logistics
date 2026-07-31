/**
 * Abstract logistics network: glowing nodes, connecting lanes, travelling
 * pulses and a truck running the primary corridor.
 *
 * Motion is native SVG (`animateMotion`) so it costs no JavaScript and keeps
 * running smoothly while the rest of the page animates.
 */

const NODES = [
  { x: 90, y: 150, r: 6, hub: true },
  { x: 150, y: 250, r: 5 },
  { x: 215, y: 120, r: 4.5 },
  { x: 300, y: 300, r: 6, hub: true },
  { x: 390, y: 210, r: 4.5 },
  { x: 440, y: 350, r: 5 },
  { x: 240, y: 400, r: 4.5 },
];

const LANES = [
  'M90 150 Q 160 170 150 250',
  'M150 250 Q 240 250 300 300',
  'M90 150 Q 180 90 215 120',
  'M215 120 Q 320 150 390 210',
  'M300 300 Q 380 300 440 350',
  'M150 250 Q 180 350 240 400',
  'M240 400 Q 340 380 440 350',
  'M390 210 Q 350 260 300 300',
];

/** The corridor the truck runs — Gujarat to Andhra, conceptually. */
const CORRIDOR = 'M90 150 Q 160 170 150 250 Q 240 250 300 300 Q 380 300 440 350';

export default function NetworkBackdrop() {
  return (
    <svg className="hero__network" viewBox="0 0 520 480" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="corridor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b99ee" />
          <stop offset="100%" stopColor="#0F6CBD" />
        </linearGradient>
        <filter id="soft-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Distance rings behind the network */}
      {[110, 175, 240].map((r) => (
        <circle key={r} cx="265" cy="250" r={r} stroke="#0b99ee" strokeOpacity="0.09" strokeWidth="1" />
      ))}

      {/* Lanes */}
      {LANES.map((d) => (
        <path key={d} d={d} className="hero__route" />
      ))}

      {/* Primary corridor, drawn heavier */}
      <path d={CORRIDOR} stroke="url(#corridor)" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />

      {/* Pulses travelling the lanes */}
      {LANES.filter((_, i) => i % 2 === 0).map((d, i) => (
        <circle key={`p${d}`} r="3.5" className="hero__pulse" opacity="0.9">
          <animateMotion dur={`${5 + i * 1.4}s`} repeatCount="indefinite" path={d} begin={`${i * 0.8}s`} />
          <animate
            attributeName="opacity"
            values="0;0.9;0.9;0"
            dur={`${5 + i * 1.4}s`}
            repeatCount="indefinite"
            begin={`${i * 0.8}s`}
          />
        </circle>
      ))}

      {/* Nodes */}
      {NODES.map((n) => (
        <g key={`${n.x}-${n.y}`}>
          <circle cx={n.x} cy={n.y} r={n.r * 2.6} className="hero__node" opacity="0.14">
            <animate
              attributeName="r"
              values={`${n.r * 1.6};${n.r * 3.4};${n.r * 1.6}`}
              dur="3.6s"
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r={n.r} className="hero__node" filter={n.hub ? 'url(#soft-glow)' : undefined} />
          {n.hub && <circle cx={n.x} cy={n.y} r={n.r + 7} className="hero__node-ring" />}
        </g>
      ))}

      {/* Truck running the corridor */}
      <g id="hero-truck">
        <g transform="translate(-17,-9)">
          <rect x="0" y="2" width="20" height="12" rx="2" fill="#0F6CBD" />
          <path d="M21 6h6l4 4v4h-10z" fill="#0b99ee" />
          <circle cx="7" cy="16" r="2.6" fill="#1A2B3C" />
          <circle cx="26" cy="16" r="2.6" fill="#1A2B3C" />
        </g>
        <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" path={CORRIDOR} />
      </g>
    </svg>
  );
}
