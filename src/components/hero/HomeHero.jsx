import heroVideo from '../../../assets/hero_video_agl.mp4';
import Button from '@/components/buttons/Button';
import { useQuote } from '@/app/QuoteContext';

export default function HomeHero() {
  const { openQuote } = useQuote();

  return (
    <section className="hero">
      <video
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <span className="badge badge--light">
          <span className="dot-live" />
          Gujarat&nbsp; · &nbsp;Andhra Pradesh&nbsp; · &nbsp;Telangana&nbsp; · &nbsp;Karnataka&nbsp; · &nbsp;Pan-India lanes
        </span>

        <h1 className="hero__title">
          Moving industry <em>forward.</em>
        </h1>

        <p className="hero__sub">
          Reliable road freight and project cargo for the corridors that keep India moving.
        </p>

        <div className="hero__actions">
          <Button size="lg" onClick={openQuote}>
            Request a Quote
          </Button>
          <Button size="lg" variant="outline-light" to="/contact" icon="arrowRight">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
