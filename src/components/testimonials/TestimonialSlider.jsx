import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { TESTIMONIALS } from '@/data/testimonials';

const AUTOPLAY_MS = 7000;

/** Quote-led voice wall with a selectable editorial testimonial. */
export default function TestimonialSlider({ items = TESTIMONIALS }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => setIndex((next + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, go]);

  const active = items[index];

  return (
    <div
      className="voices"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="voices__directory">
        <span className="eyebrow">Voices from the work</span>
        <p className="voices__note">The moments clients remember are the ones that tested the operation.</p>
        <div className="voices__list" role="list" aria-label="Client voices">
          {items.map((t, i) => (
            <button
              className="voices__selector"
              data-active={i === index}
              key={t.quote}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show voice from ${t.role}`}
            >
              <span className="voices__selector-number numeric">{String(i + 1).padStart(2, '0')}</span>
              <span className="voices__selector-copy">
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </span>
              <Icon name="arrowRight" size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="voices__feature">
        <div className="voices__feature-topline">
          <span className="numeric">CLIENT VOICE / {String(index + 1).padStart(2, '0')}</span>
          <span className="voices__feature-status">On the record</span>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.blockquote
            className="voices__quote"
            key={active.quote}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="voices__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="voices__quote-text">{active.quote}</p>
            <footer className="voices__author">
              <span className="voices__avatar">{active.initials}</span>
              <span>
                <span className="voices__name">{active.name}</span>
                <span className="voices__role">{active.role}</span>
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="voices__controls">
          <div className="voices__progress" aria-hidden="true">
            {items.map((t, i) => (
              <span key={t.quote} data-active={i === index} />
            ))}
          </div>
          <div className="slider-nav">
            <button className="slider-btn" type="button" onClick={() => go(index - 1)} aria-label="Previous voice">
              <Icon name="arrowLeft" size={17} />
            </button>
            <button className="slider-btn" type="button" onClick={() => go(index + 1)} aria-label="Next voice">
              <Icon name="arrowRight" size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
