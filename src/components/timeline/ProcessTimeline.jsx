import { useRef } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { PROCESS_STEPS } from '@/data/services';



/**
 * Compact tree-like seven-stage operating model.
 * The rail draws itself and each milestone fades up as the section is scrolled.
 */
export default function ProcessTimeline({ steps = PROCESS_STEPS }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start 72%', 'end 72%'] });


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
          <motion.div className="process__rail-fill" style={{ scaleY: reduced ? 1 : scrollYProgress }} />
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
