import Button from '@/components/buttons/Button';
import Reveal from '@/components/animations/Reveal';
import { useQuote } from '@/app/QuoteContext';
import { COMPANY } from '@/constants/company';

/** Closing call to action, reused at the foot of every page. */
export default function CTABand({
  title = 'Let’s move your next consignment.',
  text = 'Tell us the lane, the commodity and the timeline. We will come back with a vehicle class, a rate and a transit commitment we intend to keep.',
  primaryLabel = 'Request a Quote',
}) {
  const { openQuote } = useQuote();

  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal className="cta-band">
          <div className="grid-backdrop" />
          <div className="bloom cta-band__bloom" />

          <div className="cta-band__inner">
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
            <div className="cta-band__actions">
              <Button variant="light" onClick={openQuote}>
                {primaryLabel}
              </Button>
              <Button
                variant="outline-light"
                href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                icon="phone"
              >
                {COMPANY.phone}
              </Button>
              <Button
                variant="outline-light"
                href={`tel:${COMPANY.phoneAlt.replace(/\s/g, '')}`}
                icon="phone"
              >
                {COMPANY.phoneAlt}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
