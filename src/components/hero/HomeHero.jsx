import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import NetworkBackdrop from './NetworkBackdrop';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import { useQuote } from '@/app/QuoteContext';
import { HERO_PROOF } from '@/constants/company';

/**
 * Entrance sequence (GSAP): backdrop → visual slides in → headline →
 * sub-copy → actions → proof strip. One timeline, no scroll dependency.
 */
export default function HomeHero() {
  const root = useRef(null);
  const { openQuote } = useQuote();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('[data-hero]', { opacity: 1, y: 0, x: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-hero="visual"]', { x: 70, opacity: 0, duration: 1.1 })
        .from('[data-hero="badge"]', { y: 16, opacity: 0, duration: 0.5 }, 0.15)
        .from('[data-hero="title"] .hero__line', { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.09 }, 0.25)
        .from('[data-hero="sub"]', { y: 20, opacity: 0, duration: 0.7 }, 0.7)
        .from('[data-hero="actions"] > *', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.85)
        .from('[data-hero="proof"] > *', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, 1)
        .from('[data-hero="chip"]', { scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.12 }, 1.1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="grid-backdrop" />
      <div className="bloom hero__bloom-a" />
      <div className="bloom hero__bloom-b" />

      <div className="container hero__grid">
        <div>
          <span className="badge" data-hero="badge">
            <span className="dot-live" />
            Gujarat &nbsp;·&nbsp; Andhra Pradesh &nbsp;·&nbsp; Pan-India lanes
          </span>

          {/* Each line is masked so it can rise into place independently. */}
          <h1 className="hero__title" data-hero="title">
            {['Driving India’s', 'Supply Chain with'].map((line) => (
              <span key={line} style={{ display: 'block', overflow: 'hidden' }}>
                <span className="hero__line" style={{ display: 'block' }}>
                  {line}
                </span>
              </span>
            ))}
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <em className="hero__line" style={{ display: 'block' }}>
                Precision, Speed &amp; Trust
              </em>
            </span>
          </h1>

          <p className="hero__sub" data-hero="sub">
            Delivering dependable transportation and customised logistics solutions across Gujarat, Andhra
            Pradesh and beyond — through a growing branch network, experienced professionals and an
            uncompromising commitment to operational excellence.
          </p>

          <div className="hero__actions" data-hero="actions">
            <Button size="lg" onClick={openQuote}>
              Request a Quote
            </Button>
            <Button size="lg" variant="ghost" to="/services" icon="arrowRight">
              Explore Services
            </Button>
          </div>

          <div className="hero__proof" data-hero="proof">
            {HERO_PROOF.map((item) => (
              <div key={item.label}>
                <div className="hero__proof-value">
                  {item.value}
                  <span style={{ color: 'var(--sky)' }}>{item.suffix}</span>
                </div>
                <div className="hero__proof-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual" data-hero="visual">
          <NetworkBackdrop />

          <div className="telemetry telemetry--a" data-hero="chip">
            <span className="telemetry__icon">
              <Icon name="truck" size={17} />
            </span>
            <span>
              <span className="telemetry__label">In transit now</span>
              <span className="telemetry__value">148 consignments</span>
            </span>
          </div>

          <div className="telemetry telemetry--b" data-hero="chip">
            <span className="telemetry__icon">
              <Icon name="satellite" size={17} />
            </span>
            <span>
              <span className="telemetry__label">Fleet visibility</span>
              <span className="telemetry__value">GPS · Live</span>
            </span>
          </div>

          <div className="telemetry telemetry--c" data-hero="chip">
            <span className="telemetry__icon">
              <Icon name="clock" size={17} />
            </span>
            <span>
              <span className="telemetry__label">Ahmedabad → Hyderabad</span>
              <span className="telemetry__value">38–42 hrs</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
