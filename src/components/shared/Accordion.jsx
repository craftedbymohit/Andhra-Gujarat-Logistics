import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { cn } from '@/utils/cn';

/** FAQ accordion. One panel open at a time; click an open panel to close it. */
export default function Accordion({ items, defaultOpen = 0, className }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('accordion', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="accordion__item" key={item.q} data-open={isOpen}>
            <button
              className="accordion__trigger"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="accordion__question">
                <span className="accordion__number numeric">{String(i + 1).padStart(2, '0')}</span>
                <span>{item.q}</span>
              </span>
              <span className="accordion__sign">
                <Icon name="plus" size={15} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="accordion__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="accordion__body">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
