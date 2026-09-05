import Button from '@/components/buttons/Button';
import usePageMeta from '@/hooks/usePageMeta';

export default function SocialComingSoon() {
  usePageMeta('Social channels coming soon', 'Our social channels are not available yet. Contact the AGL team directly.', true);
  return (
    <section className="notfound">
      <div className="container">
        <span className="eyebrow">Stay connected with AGL</span>
        <h1 style={{ marginTop: '1rem' }}>Our social channels are coming soon.</h1>
        <p className="lead" style={{ margin: '1.5rem auto 2rem', maxWidth: '48ch' }}>
          We don&apos;t have official social profiles yet. For enquiries, quotes or shipment support,
          our team is ready to help you directly.
        </p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Button to="/contact">Contact our team</Button>
          <Button to="/" variant="ghost">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
