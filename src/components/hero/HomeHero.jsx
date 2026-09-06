import { useEffect, useRef, useState } from 'react';
import Button from '@/components/buttons/Button';
import { useQuote } from '@/app/QuoteContext';

// Hero video is served from Vercel Blob Storage to avoid bundling/streaming lag.
const heroVideo = 'https://4jeqrtwamgulddtw.public.blob.vercel-storage.com/aglherovideo.mp4';

export default function HomeHero() {
  const { openQuote } = useQuote();
  const videoRef = useRef(null);
  const manuallyPaused = useRef(false);
  const [source] = useState(heroVideo);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const syncMobileState = () => setIsMobile(media.matches);
    syncMobileState();
    media.addEventListener?.('change', syncMobileState);
    return () => media.removeEventListener?.('change', syncMobileState);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const playVideo = () => {
      if (!document.hidden && !manuallyPaused.current) video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) playVideo();
      else video.pause();
    });
    observer.observe(video);
    const visibility = () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) playVideo();
    };
    document.addEventListener('visibilitychange', visibility);
    video.addEventListener('loadeddata', playVideo, { once: true });
    playVideo();
    return () => {
      document.removeEventListener('visibilitychange', visibility);
      video.removeEventListener('loadeddata', playVideo);
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
        preload="auto"
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
      {source && !isMobile && <button className="hero__playback" type="button" onClick={() => {
        manuallyPaused.current = playing;
        if (playing) videoRef.current.pause();
        else videoRef.current.play().catch(() => {});
      }}>{playing ? 'Pause video' : 'Play video'}</button>}
    </section>
  );
}
