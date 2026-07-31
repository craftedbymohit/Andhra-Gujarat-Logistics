import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal seven-stage operating model.
 * The rail draws itself and each step fades up as the section is scrolled.
 */
export default function ProcessTimeline({ steps = PROCESS_STEPS }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.process__rail-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 72%', scrub: 0.6 },
        }
      );

      gsap.from('.process__step', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 76%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="process" ref={root}>
      <div className="process__rail">
        <div className="process__rail-fill" />
      </div>

      <div className="process__track">
        {steps.map((step, i) => (
          <article className="process__step" key={step.title}>
            <span className="process__dot" />
            <span className="process__num numeric">STEP {String(i + 1).padStart(2, '0')}</span>
            <h3 className="process__title">{step.title}</h3>
            <p className="process__text">{step.text}</p>
          </article>
        ))}
      </div>

      <p className="process__hint">Scroll the track horizontally to follow the full consignment lifecycle →</p>
    </div>
  );
}
