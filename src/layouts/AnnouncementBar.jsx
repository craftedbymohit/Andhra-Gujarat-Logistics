import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/shared/Icon';
import { ANNOUNCEMENTS, COMPANY } from '@/constants/company';

/** Rotating operational notice + direct contact lines. */
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="announce">
      <div className="container announce__inner">
        <div className="announce__rotator">
          <span className="dot-live" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              className="announce__msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {ANNOUNCEMENTS[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="announce__links">
          <a href={`tel:${COMPANY.emergency.replace(/\s/g, '')}`}>
            <Icon name="phone" size={13} />
            {COMPANY.emergency}
          </a>
          <a href={`mailto:${COMPANY.email}`}>
            <Icon name="mail" size={13} />
            {COMPANY.email}
          </a>
        </div>
      </div>
    </div>
  );
}
