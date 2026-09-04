import { Suspense } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from '@/components/animations/ScrollProgress';
import ScrollToTop from '@/components/shared/ScrollToTop';
import FloatingActions from '@/components/shared/FloatingActions';
import QuoteModal from '@/components/modals/QuoteModal';
import PageLoader from '@/components/loaders/PageLoader';
import useLenis from '@/hooks/useLenis';

/** Persistent chrome + animated route transition. */
export default function MainLayout() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  useLenis();

  const isNavigating = navigation.state !== 'idle';

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollProgress />
      <ScrollToTop />
      <AnnouncementBar />
      <Header />

      {isNavigating && <PageLoader />}

      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
      <QuoteModal />
    </>
  );
}
