import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Every route change starts at the top — including when Lenis owns the scroll. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const jump = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior: 'instant' });
      return true;
    };
    if (jump()) return;
    // A lazy route may not have committed its anchor yet.
    const observer = new MutationObserver(() => { if (jump()) observer.disconnect(); });
    observer.observe(document.getElementById('main'), { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash]);

  return null;
}
