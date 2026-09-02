import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import IndustryCard from '@/components/cards/IndustryCard';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { INDUSTRIES } from '@/data/industries';

export default function Industries() {
  usePageMeta(
    'Industries We Serve',
    'Chemical, textile, engineering, steel, infrastructure, automobile, FMCG and pharma logistics across Gujarat and Andhra Pradesh.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Industries' }]}
        eyebrow="Industries We Serve"
        title="Critical cargo deserves more than a standard route."
        lead="From chemical drums to pharma batches, steel coils to precision machinery, we engineer every movement around how your cargo is made, handled and delivered."
        meta={[
          { value: '8', label: 'Industry verticals' },
          { value: '500+', label: 'Industrial clients' },
          { value: '20+', label: 'Industrial belts' },
          { value: '<0.4%', label: 'Damage rate' },
        ]}
      />

      {/* Jump links so a visitor can go straight to their sector. */}
      <Section tight edge className="industry-jump-section">
        <div className="industry-jump">
          <Reveal className="industry-jump__intro">
            <span className="eyebrow">Jump to</span>
            <h2>Start with the cargo you know.</h2>
            <p>Choose a sector to see the way we protect its timing, condition and continuity.</p>
          </Reveal>
          <div className="industry-jump__grid">
            {INDUSTRIES.map((ind, index) => (
              <a key={ind.id} href={`#${ind.id}`} className="industry-jump__item">
                <span className="industry-jump__number numeric">{String(index + 1).padStart(2, '0')}</span>
                <span className="industry-jump__icon">
                  <Icon name={ind.icon} size={18} />
                </span>
                <span className="industry-jump__title">{ind.title}</span>
                <Icon name="arrowRight" size={16} />
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Sector Capability"
          title="Every cargo has a different risk profile."
        />
        <RevealGroup className="grid grid--2">
          {INDUSTRIES.map((ind) => (
            <IndustryCard key={ind.id} industry={ind} detailed />
          ))}
        </RevealGroup>
      </Section>

      <Section className="industry-inquiry-section">
        <div className="industry-inquiry">
          <Reveal className="industry-inquiry__intro">
            <span className="industry-inquiry__icon">
              <Icon name="route" size={25} />
            </span>
            <span className="eyebrow">Not Listed?</span>
            <h2>Tell us what you make. We’ll map the move.</h2>
          </Reveal>
          <Reveal delay={0.1} className="industry-inquiry__content">
            <p className="lead">
              Your cargo does not need to fit a category to deserve a clear answer. Share the material, dimensions,
              origin and destination, and our operations team will assess the route, vehicle and handling plan.
            </p>
            <div className="industry-inquiry__actions">
              <Button to="/contact" size="sm" icon="arrowRight">
                Discuss your cargo
              </Button>
              <span>
                <Icon name="check" size={15} />
                Straight answer within one working day
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Tell us what you manufacture."
        text="We will tell you which branch serves your belt, which vehicle class fits your cargo, and what the lane realistically takes."
      />
    </>
  );
}
