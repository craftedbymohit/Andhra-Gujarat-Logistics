import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';

export default function RouteError() {
  const error = useRouteError();
  const missing = isRouteErrorResponse(error) && error.status === 404;
  usePageMeta(missing ? 'Page not found' : 'Unable to load page', 'Return to the AGL home page or try loading this page again.', true);
  return (
    <main className="notfound" id="main">
      <div className="container">
        <span className="eyebrow">Andhra Gujarat Logistic</span>
        <h1 style={{ marginTop: '1rem' }}>{missing ? 'Page not found.' : 'This page could not load.'}</h1>
        <p className="lead" style={{ margin: '1.5rem auto 2rem' }}>
          Please try again. If the issue continues, return to our home page.
        </p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="btn" onClick={() => window.location.reload()}>Try again</button>
          <a className="btn btn--ghost" href="/">Back to home</a>
        </div>
      </div>
    </main>
  );
}
