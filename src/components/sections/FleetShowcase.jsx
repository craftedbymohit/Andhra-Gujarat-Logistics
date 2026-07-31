import { motion } from 'framer-motion';
import { RevealGroup, revealItem } from '@/components/animations/Reveal';
import { FLEET } from '@/data/fleet';

/** Simple line-art silhouettes — no photography dependency. */
function TruckArt({ variant }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' };

  return (
    <svg viewBox="0 0 160 62" width="100%" height="72" aria-hidden="true" className="fleet-card__art">
      {variant === 'lowbed' ? (
        <>
          <path d="M6 40h18l6-12h58l6 12h56" {...common} />
          <path d="M30 28h58v-8H30z" {...common} />
          <path d="M112 40V20h26l12 12v8" {...common} />
        </>
      ) : variant === 'axle' ? (
        <>
          <path d="M8 34h144v10H8z" {...common} />
          <path d="M28 34V22h104v12" {...common} />
          {[24, 46, 68, 96, 118, 140].map((x) => (
            <circle key={x} cx={x} cy="50" r="7" {...common} />
          ))}
        </>
      ) : variant === 'van' ? (
        <>
          <path d="M10 44V18h68v26" {...common} />
          <path d="M78 24h28l16 14v6H78z" {...common} />
          <circle cx="36" cy="48" r="8" {...common} />
          <circle cx="108" cy="48" r="8" {...common} />
        </>
      ) : variant === 'trailer' ? (
        <>
          <path d="M6 42V16h96v26" {...common} />
          <path d="M102 22h22l14 14v6h-36z" {...common} />
          <circle cx="34" cy="48" r="8" {...common} />
          <circle cx="58" cy="48" r="8" {...common} />
          <circle cx="124" cy="48" r="8" {...common} />
        </>
      ) : (
        <>
          <path d="M6 42V14h100v28" {...common} />
          <path d="M106 20h20l16 14v8h-36z" {...common} />
          <circle cx="36" cy="48" r="8" {...common} />
          <circle cx="126" cy="48" r="8" {...common} />
          <path d="M18 22h76M18 30h76" {...common} strokeWidth="1" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

export default function FleetShowcase({ items = FLEET }) {
  return (
    <RevealGroup className="grid grid--3">
      {items.map((v) => (
        <motion.article variants={revealItem} className="fleet-card" key={v.id}>
          <TruckArt variant={v.art} />
          <h3 className="card__title" style={{ marginTop: '1.25rem' }}>
            {v.name}
          </h3>
          <p className="card__text">{v.use}</p>
          <dl className="fleet-card__spec">
            <div>
              <dt>Payload</dt>
              <dd>{v.payload}</dd>
            </div>
            <div style={{ textAlign: 'right' }}>
              <dt>Deck length</dt>
              <dd>{v.length}</dd>
            </div>
          </dl>
        </motion.article>
      ))}
    </RevealGroup>
  );
}
