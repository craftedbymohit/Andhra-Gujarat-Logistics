import Button from '@/components/buttons/Button';
import usePageMeta from '@/hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page Not Found');

  return (
    <section className="notfound">
      <div className="container">
        <div className="numeric notfound__code">404</div>
        <h1 style={{ marginTop: '0.5rem' }}>This route does not exist.</h1>
        <p className="lead" style={{ margin: '1rem auto 2rem' }}>
          The page you were looking for has moved or was never here. Let&apos;s get you back on a known lane.
        </p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
