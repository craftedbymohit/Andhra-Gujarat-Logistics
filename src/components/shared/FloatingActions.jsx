import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import useScrolled from '@/hooks/useScrolled';
import { useQuote } from '@/app/QuoteContext';
import { COMPANY } from '@/constants/company';

/** WhatsApp, call, back-to-top, plus the desktop "Request a Quote" rail. */
export default function FloatingActions() {
  const showTop = useScrolled(600);
  const { openQuote } = useQuote();

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button className="quote-rail" onClick={openQuote}>
        Request a Quote
      </button>

      <div className="floating-actions">
        <AnimatePresence>
          {showTop && (
            <motion.button
              className="fab fab--top"
              onClick={toTop}
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.24 }}
            >
              <Icon name="arrowUp" size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          className="fab fab--whatsapp"
          href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
            'Hello, I would like to enquire about a consignment.'
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <Icon name="whatsapp" size={22} />
        </a>

        <a
          className="fab fab--call"
          href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
          aria-label={`Call ${COMPANY.phone}`}
        >
          <Icon name="phone" size={19} />
        </a>
      </div>
    </>
  );
}
