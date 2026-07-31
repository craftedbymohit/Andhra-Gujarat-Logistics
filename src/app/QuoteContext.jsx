import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const QuoteContext = createContext(null);

/**
 * Holds the "Request a Quote" modal state so any button anywhere on the site
 * can open it without prop-drilling.
 */
export function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openQuote = useCallback(() => setIsOpen(true), []);
  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openQuote, closeQuote }), [isOpen, openQuote, closeQuote]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>');
  return ctx;
}
