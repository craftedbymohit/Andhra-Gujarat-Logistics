import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { TESTIMONIALS } from '@/data/testimonials';

const AUTOPLAY_MS = 7000;

/** Two-up on desktop, one-up on mobile, with autoplay that pauses on hover. */
export default function TestimonialSlider({ items = TESTIMONIALS }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => setIndex((next + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, go]);

  const pair = [items[index], items[(index + 1) % items.length]];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid grid--2" style={{ alignItems: 'stretch' }}>
        <AnimatePresence mode="popLayout">
          {pair.map((t, i) => (
            <motion.blockquote
              className="quote-card"
              key={t.quote}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={i === 1 ? { display: 'flex' } : undefined}
            >
              <span className="quote-card__mark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="quote-card__text">{t.quote}</p>
              <footer className="quote-card__author">
                <span className="quote-card__avatar">{t.initials}</span>
                <span>
                  <span className="quote-card__name">{t.name}</span>
                  <span className="quote-card__role">{t.role}</span>
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </AnimatePresence>
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: '2rem' }}>
        <div className="slider-dots">
          {items.map((t, i) => (
            <button
              key={t.quote}
              data-active={i === index}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="slider-nav">
          <button className="slider-btn" onClick={() => go(index - 1)} aria-label="Previous testimonial">
            <Icon name="arrowLeft" size={17} />
          </button>
          <button className="slider-btn" onClick={() => go(index + 1)} aria-label="Next testimonial">
            <Icon name="arrowRight" size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
