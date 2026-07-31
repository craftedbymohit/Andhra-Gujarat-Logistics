import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import IndustryCard from '@/components/cards/IndustryCard';
import FeatureCard from '@/components/cards/FeatureCard';
import CTABand from '@/components/sections/CTABand';
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
        title="Eight sectors. Eight different ways cargo can go wrong."
        lead="A chemical drum, a steel coil, a pharma batch and a textile roll fail in completely different ways. We plan for the failure mode — the tonnage is the easy part."
        meta={[
          { value: '8', label: 'Industry verticals' },
          { value: '500+', label: 'Industrial clients' },
          { value: '20+', label: 'Industrial belts' },
          { value: '<0.4%', label: 'Damage rate' },
        ]}
      />

      {/* Jump links so a visitor can go straight to their sector. */}
      <Section tight edge>
        <Reveal className="row" style={{ gap: '0.5rem' }}>
          <span className="eyebrow" style={{ marginRight: '0.75rem' }}>
            Jump to
          </span>
          {INDUSTRIES.map((ind) => (
            <a key={ind.id} href={`#${ind.id}`} className="branch-tab">
              {ind.title}
            </a>
          ))}
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Sector Capability"
          title="What we actually do differently, per sector."
          lead="Vehicle specification, handling protocol, documentation standard and driver training all change with the commodity."
        />
        <RevealGroup className="grid grid--2">
          {INDUSTRIES.map((ind) => (
            <IndustryCard key={ind.id} industry={ind} detailed />
          ))}
        </RevealGroup>
      </Section>

      <Section tone="dark">
        <div className="grid-backdrop" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeading
            eyebrow="Cross-Sector Standards"
            title="What every industry gets, regardless of commodity."
          />
          <RevealGroup className="grid grid--4">
            {[
              {
                icon: 'shield',
                title: 'Verified Compliance',
                text: 'Permits, fitness, insurance and driver documents checked before allocation.',
              },
              {
                icon: 'satellite',
                title: 'GPS Visibility',
                text: 'Live position and exception alerts on every consignment under an AGL LR.',
              },
              {
                icon: 'file',
                title: 'Digital Paper Trail',
                text: 'E-way bill, LR and POD archived against a single consignment reference.',
              },
              {
                icon: 'users',
                title: 'Named Ownership',
                text: 'One operations owner per account, with a defined escalation ladder.',
              },
            ].map((f) => (
              <FeatureCard key={f.title} {...f} dark />
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="ice">
        <div className="grid grid--split">
          <Reveal>
            <span className="eyebrow">Not Listed?</span>
            <h2 style={{ marginTop: '1rem' }}>Most cargo is a variation on something we already move.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              If your commodity is not on this page, it usually means we have not written it up — not that we
              cannot handle it. Send the specification and our operations desk will tell you plainly whether it
              is within our capability, and what it would take.
            </p>
            <div className="row" style={{ marginTop: '1.75rem', gap: '1.5rem' }}>
              <span className="row" style={{ gap: '0.5rem', color: 'var(--ocean)', fontWeight: 600 }}>
                <Icon name="check" size={16} />
                Honest capability assessment
              </span>
              <span className="row" style={{ gap: '0.5rem', color: 'var(--ocean)', fontWeight: 600 }}>
                <Icon name="check" size={16} />
                Response within one working day
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
