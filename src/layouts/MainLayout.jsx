import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from '@/components/animations/ScrollProgress';
import ScrollToTop from '@/components/shared/ScrollToTop';
import FloatingActions from '@/components/shared/FloatingActions';
import QuoteModal from '@/components/modals/QuoteModal';
import PageLoader from '@/components/loaders/PageLoader';

/** Persistent chrome + animated route transition. */
export default function MainLayout() {
  const navigation = useNavigation();

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

      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
      <QuoteModal />
    </>
  );
}
