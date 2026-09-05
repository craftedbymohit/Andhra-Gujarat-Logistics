import { useEffect, useRef, useState } from 'react';
import heroVideo from '../../../assets/agl_hero_vid.mp4';
import Button from '@/components/buttons/Button';
import { useQuote } from '@/app/QuoteContext';

export default function HomeHero() {
  const { openQuote } = useQuote();
  const videoRef = useRef(null);
  const manuallyPaused = useRef(false);
  const [source, setSource] = useState();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const update = () => {
      const constrained = connection?.saveData;
      setSource(reduced.matches || constrained ? undefined : heroVideo);
    };
    // Use the original client video on every screen size.
    if (document.readyState === 'complete') update();
    else window.addEventListener('load', update, { once: true });
    reduced.addEventListener('change', update);
    connection?.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden && video.currentSrc && !manuallyPaused.current) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    const visibility = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0 && video.currentSrc && !manuallyPaused.current) video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.removeEventListener('load', update);
      reduced.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="hero">
      <video
        ref={videoRef}
        src={source}
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <span className="badge badge--light">
          <span className="dot-live" />
          Gujarat&nbsp; · &nbsp;Andhra Pradesh&nbsp; · &nbsp;Telangana&nbsp; · &nbsp;Karnataka&nbsp; · &nbsp;Pan-India lanes
        </span>

        <h1 className="hero__title">
          We Deliver <em>Excellence.</em>
        </h1>

        <p className="hero__sub">
          Connecting industries. Delivering excellence. Reliable road freight and project cargo for the
          corridors that keep India moving.
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
      {source && <button className="hero__playback" type="button" onClick={() => {
        manuallyPaused.current = playing;
        if (playing) videoRef.current.pause();
        else videoRef.current.play().catch(() => {});
      }}>{playing ? 'Pause video' : 'Play video'}</button>}
    </section>
  );
}
