import useDialogFocus from '@/hooks/useDialogFocus';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import { NAV_LINKS, SERVICE_LINKS } from '@/constants/navigation';
import { COMPANY } from '@/constants/company';

/** Full-screen navigation for tablet and below. */
export default function MobileMenu({ onClose, onQuote }) {
  const dialogRef = useRef(null);
  useDialogFocus(dialogRef, true, onClose);

  const links = [...NAV_LINKS, ...SERVICE_LINKS.map((s) => ({ label: s.label, to: s.to, nested: true }))];

  return (
    <motion.nav
      ref={dialogRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="mobile-menu"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="mobile-menu__close" onClick={onClose} aria-label="Close navigation menu"><Icon name="close" size={22} /></button>
      {links.map((link, i) => (
        <NavLink
          key={link.to + link.label}
          to={link.to}
          end={link.to === '/'}
          onClick={onClose}
          className="mobile-menu__link"
          style={link.nested ? { paddingLeft: '1rem', fontSize: '1rem' } : undefined}
        >
          {({ isActive }) => (
            <>
              <span data-active={isActive}>{link.label}</span>
              <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
            </>
          )}
        </NavLink>
      ))}

      <div className="mobile-menu__foot">
        <Button
          onClick={() => {
            onClose();
            onQuote();
          }}
          block
        >
          Request a Quote
        </Button>
        <Button href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} variant="ghost" icon="phone" block>
          {COMPANY.phone}
        </Button>
        <a
          href={`mailto:${COMPANY.email}`}
          className="row muted"
          style={{ justifyContent: 'center', fontSize: '0.85rem' }}
        >
          <Icon name="mail" size={14} />
          {COMPANY.email}
        </a>
      </div>
    </motion.nav>
  );
}
