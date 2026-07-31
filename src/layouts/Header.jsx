import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/navigation/Logo';
import MobileMenu from '@/components/navigation/MobileMenu';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import useScrolled from '@/hooks/useScrolled';
import { useQuote } from '@/app/QuoteContext';
import { NAV_LINKS } from '@/constants/navigation';

export default function Header() {
  const { pathname } = useLocation();
  const scrolled = useScrolled(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(null);
  const { openQuote } = useQuote();

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
      <header className="header" data-scrolled={scrolled}>
        <div className="container header__inner">
          <Logo />

          <nav className="nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <div
                key={link.to}
                className="nav__item"
                onMouseEnter={() => setOpenPanel(link.children ? link.to : null)}
                onMouseLeave={() => setOpenPanel(null)}
              >
                <Link to={link.to} className="nav__link" data-active={isActive(link.to)}>
                  {link.label}
                  {link.children && <Icon name="chevronDown" size={13} className="nav__chev" />}
                </Link>

                <AnimatePresence>
                  {link.children && openPanel === link.to && (
                    <motion.div
                      className="nav__panel"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {link.children.map((child) => (
                        <Link key={child.to} to={child.to} className="nav__panel-link">
                          <span className="nav__panel-icon">
                            <Icon name={child.icon} size={17} />
                          </span>
                          <span>
                            <span className="nav__panel-title">{child.label}</span>
                            <span className="nav__panel-desc">{child.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="header__actions">
            <Button size="sm" onClick={openQuote}>
              Request a Quote
            </Button>
            <button
              className="burger"
              data-open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} onQuote={openQuote} />}
      </AnimatePresence>
    </>
  );
}
