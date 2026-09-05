import { useEffect } from 'react';

let locks = 0;
let previousOverflow;

/** Keep keyboard focus and wheel scrolling inside an open overlay. */
export default function useDialogFocus(ref, open, onClose) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    if (locks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    const focusable = () => [...(ref.current?.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]') || [])].filter(el => el.getClientRects().length);
    const frame = requestAnimationFrame(() => focusable()[0]?.focus());
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !ref.current.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !ref.current.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      if (--locks === 0) {
        document.body.style.overflow = previousOverflow;
        const target = previous?.isConnected ? previous : document.querySelector('.burger');
        target?.focus({ preventScroll: true });
      }
    };
  }, [open, onClose, ref]);
}
