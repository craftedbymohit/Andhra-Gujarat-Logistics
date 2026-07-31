import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import QuoteForm from '@/components/forms/QuoteForm';
import Icon from '@/components/shared/Icon';
import { useQuote } from '@/app/QuoteContext';

export default function QuoteModal() {
  const { isOpen, closeQuote } = useQuote();

  // Escape closes; the page behind stays put while the modal is open.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeQuote();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeQuote]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          onClick={closeQuote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal__close" onClick={closeQuote} aria-label="Close">
              <Icon name="close" size={18} />
            </button>

            <span className="eyebrow">Request a Quote</span>
            <h3 style={{ margin: '0.75rem 0 0.5rem' }}>Tell us what needs to move.</h3>
            <p className="lead" style={{ fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Share the lane and the commodity — we will come back with a rate, a vehicle class and a
              realistic transit commitment.
            </p>

            <QuoteForm compact />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
