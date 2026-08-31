import { useRef } from 'react';
import { useInView } from 'framer-motion';
import CountUp from 'react-countup';
import Reveal from '@/components/animations/Reveal';
import { cn } from '@/utils/cn';

/**
 * The Operational Excellence band.
 *
 * Framer Motion decides when the band is in view and the counters mount at
 * that moment — react-countup's own scroll spy is bypassed so we are not
 * running a second, competing scroll listener alongside Lenis.
 */
export default function StatsBand({ items, dark, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <Reveal className={cn('stats-band', className)} ref={ref}>
      {items.map((item, i) => (
        <div className="stat" key={item.label}>
          <div className="stat__value">
            {inView ? (
              <CountUp end={item.value} duration={2.2} delay={i * 0.08} separator="," />
            ) : (
              0
            )}
            <span style={{ color: dark ? 'var(--sky)' : 'var(--ocean)' }}>{item.suffix}</span>
          </div>
          <div className="stat__label">{item.label}</div>
          {item.note && <div className="stat__note">{item.note}</div>}
        </div>
      ))}
    </Reveal>
  );
}
