import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * The single scroll-reveal used across the site.
 * One shared easing and distance keeps the whole page feeling like one system.
 */
const Reveal = forwardRef(function Reveal(
  { children, delay = 0, y = 26, as = 'div', className, ...rest },
  ref
) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

export default Reveal;

/** Staggers direct children — use for card grids and lists. */
export function RevealGroup({ children, className, stagger = 0.08, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
