import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Site-wide smooth scrolling.
 * Disabled automatically when the OS asks for reduced motion.
 */
export default function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Let the rest of the app command the scroller (e.g. "back to top").
    window.__lenis = lenis;

    // Lenis owns the scroller, so native `#hash` links no longer jump.
    // Hand in-page anchors back to it.
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href').slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -100 });
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
