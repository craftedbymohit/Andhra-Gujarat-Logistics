import { useCallback, useEffect, useRef, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { QuoteProvider } from '@/app/QuoteContext';
import PageLoader from '@/components/loaders/PageLoader';

const INITIAL_LOADER_DURATION = 1500;
const ACTION_LOADER_DURATION = 1500;
const LOADER_FADE_DURATION = 320;

export default function App() {
  const [isStarting, setIsStarting] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isLoaderExiting, setIsLoaderExiting] = useState(false);
  const initialExitTimerRef = useRef(null);
  const actionTimerRef = useRef(null);
  const actionExitTimerRef = useRef(null);

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

  const showActionLoader = useCallback(() => {
    setIsActionLoading(true);
    setIsLoaderExiting(false);
    window.clearTimeout(actionTimerRef.current);
    window.clearTimeout(actionExitTimerRef.current);
    actionTimerRef.current = window.setTimeout(
      () => {
        setIsLoaderExiting(true);
        actionExitTimerRef.current = window.setTimeout(() => {
          setIsActionLoading(false);
          setIsLoaderExiting(false);
        }, LOADER_FADE_DURATION);
      },
      ACTION_LOADER_DURATION
    );
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      // Trigger the branded loader for every actual link/button interaction.
      // Modified clicks open a new tab/window, so leave those browser actions alone.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element
        ? event.target.closest('a, button, [role="button"]')
        : null;

      if (!target || target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true') {
        return;
      }

      showActionLoader();
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.clearTimeout(actionTimerRef.current);
      window.clearTimeout(actionExitTimerRef.current);
    };
  }, [showActionLoader]);

  return (
    <QuoteProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      {(isStarting || isActionLoading) && <PageLoader isExiting={isLoaderExiting} />}
    </QuoteProvider>
  );
}
