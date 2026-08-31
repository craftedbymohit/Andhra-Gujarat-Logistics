import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

/**
 * Compact tree-like seven-stage operating model.
 * The rail draws itself and each milestone fades up as the section is scrolled.
 */
export default function ProcessTimeline({ steps = PROCESS_STEPS }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.process__rail-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
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
      <div className="process__route-labels" aria-hidden="true">
        <span>
          <small>START</small>
          <strong>Enquiry</strong>
        </span>
        <span>
          <small>FINISH</small>
          <strong>Proof of delivery</strong>
        </span>
      </div>

      <div className="process__tree">
        <div className="process__rail" aria-hidden="true">
          <div className="process__rail-fill" />
        </div>

        <div className="process__track">
          {steps.map((step, i) => (
            <article className="process__step" key={step.title}>
              <div className="process__step-card">
                <span className="process__num numeric">STEP {String(i + 1).padStart(2, '0')}</span>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__text">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}
