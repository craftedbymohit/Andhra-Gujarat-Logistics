import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from '@/components/animations/ScrollProgress';
import ScrollToTop from '@/components/shared/ScrollToTop';
import FloatingActions from '@/components/shared/FloatingActions';
import QuoteModal from '@/components/modals/QuoteModal';
import PageLoader from '@/components/loaders/PageLoader';

const ROUTE_LOADER_DURATION = 900;
const LOADER_FADE_DURATION = 320;

/** Persistent chrome + animated route transition. */
export default function MainLayout() {
  const navigation = useNavigation();
  const { pathname } = useLocation();

  // Show the branded loader on every real page (pathname) change.
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const isFirstRender = useRef(true);
  const hideTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    // Skip the initial mount; App.jsx already shows the startup loader.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.clearTimeout(hideTimerRef.current);
    window.clearTimeout(exitTimerRef.current);

    setIsRouteLoading(true);
    setIsLoaderExiting(false);

    hideTimerRef.current = window.setTimeout(() => {
      setIsLoaderExiting(true);
      exitTimerRef.current = window.setTimeout(() => {
        setIsRouteLoading(false);
        setIsLoaderExiting(false);
      }, LOADER_FADE_DURATION);
    }, ROUTE_LOADER_DURATION);

    return () => {
      window.clearTimeout(hideTimerRef.current);
      window.clearTimeout(exitTimerRef.current);
    };
  }, [pathname]);

  // Also cover slow async navigations (data loaders / lazy chunks not yet cached).
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

      {(isRouteLoading || isNavigating) && <PageLoader isExiting={isLoaderExiting && !isNavigating} />}

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
