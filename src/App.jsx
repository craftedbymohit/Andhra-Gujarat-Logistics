import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { QuoteProvider } from '@/app/QuoteContext';
import PageLoader from '@/components/loaders/PageLoader';

const INITIAL_LOADER_DURATION = 1500;
const LOADER_FADE_DURATION = 320;

export default function App() {
  const [isStarting, setIsStarting] = useState(true);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const initialExitTimerRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoaderExiting(true);
      initialExitTimerRef.current = window.setTimeout(() => {
        setIsStarting(false);
        setIsLoaderExiting(false);
      }, LOADER_FADE_DURATION);
    }, INITIAL_LOADER_DURATION);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(initialExitTimerRef.current);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <QuoteProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      {isStarting && <PageLoader isExiting={isLoaderExiting} />}
    </QuoteProvider>
    </MotionConfig>
  );
}
