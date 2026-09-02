import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FeatureCard from '@/components/cards/FeatureCard';
import Button from '@/components/buttons/Button';
import ApplicationForm from '@/components/forms/ApplicationForm';
import CTABand from '@/components/sections/CTABand';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { BENEFITS, CULTURE, OPENINGS } from '@/data/careers';
import { COMPANY } from '@/constants/company';
import { BRANCHES } from '@/data/branches';

export default function Careers() {
  usePageMeta(
    'Careers',
    'Build your career with Andhra Gujarat Logistic. There are no current openings, but we welcome strong general applications for future roles.'
  );

  return (
    <>
      <PageHero
        className="page-hero--careers"
        crumbs={[{ label: 'Careers' }]}
        eyebrow="Careers"
        title="Build the network. Shape what comes next."
        lead="We give capable people more than a role: an early seat at the table, real ownership on the ground, and room to grow into the people the operation depends on."
        meta={[
          { value: `${OPENINGS.length}`, label: 'Current openings' },
          { value: `${BRANCHES.length}`, label: 'Branch locations' },
          { value: '24×7', label: 'Operations network' },
          { value: '4×/yr', label: 'Training cycles' },
        ]}
      />

      {/* ---------- Culture ---------- */}
      <Section tone="surface" className="careers-life-section">
        <div className="careers-life-header">
          <Reveal>
            <span className="eyebrow">Life at AGL</span>
            <h2>Own the outcome, not just the task.</h2>
          </Reveal>
          <Reveal delay={0.1} className="careers-life-marker">
            <span className="numeric">01</span>
            <span>Work that travels farther than your job title.</span>
          </Reveal>
        </div>
        <RevealGroup className="careers-culture-grid">
          {CULTURE.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Benefits ---------- */}
      <Section tone="surface">
        <div className="grid grid--split" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Benefits</span>
            <h2 style={{ marginTop: '1rem' }}>Looked after, on the road and off it.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Full statutory benefits from the date of joining, plus a driver welfare programme that treats the
              people carrying the cargo as the front line of the business — because they are.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {BENEFITS.map((b) => (
              <div className="benefit" key={b.title}>
                <span className="benefit__icon">
                  <Icon name={b.icon} size={19} />
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700 }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: 'var(--fs-sm)', marginTop: '0.15rem' }}>{b.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ---------- Openings ---------- */}
      <Section tone="ice" className="careers-openings-section">
        <div className="careers-openings">
          <Reveal className="careers-openings__intro">
            <span className="eyebrow">Open Positions</span>
            <span className="careers-openings__status">
              <i /> No current openings
            </span>
            <h2>Nothing open today. Plenty worth staying for.</h2>
          </Reveal>
          <Reveal delay={0.1} className="careers-openings__content">
            <p className="lead">
              We are not hiring for a listed role right now, but the network keeps moving and new opportunities open
              as it grows. Stay close: fill out the form or send your CV so we can reach you when the right opening
              arrives.
            </p>
            <div className="careers-openings__actions">
              <Button href="#apply" size="sm" icon="arrowRight">
                Share your profile
              </Button>
              <span>
                <Icon name="mail" size={15} />
                Or email your CV to {COMPANY.careersEmail}
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Application ---------- */}
      <Section id="apply">
        <div className="grid grid--split" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Application Form</span>
            <h2 style={{ marginTop: '1rem' }}>Keep the door open.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              There are no active roles today, but we welcome strong general applications. Fill in the form and email
              your CV to <a href={`mailto:${COMPANY.careersEmail}`}>{COMPANY.careersEmail}</a> so we can keep your
              profile in view.
            </p>
            <div className="stack" style={{ marginTop: '2rem', gap: '0.75rem' }}>
              {['Every application reviewed', 'Future opportunities considered', 'Roles across the branch network'].map(
                (t) => (
                  <span className="row" key={t} style={{ gap: '0.6rem', color: 'var(--ocean)', fontWeight: 600 }}>
                    <Icon name="check" size={16} />
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="panel" style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            <ApplicationForm />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Know someone who would fit?"
        text="Referrals from people who understand this business are how we have filled most of our senior operating roles."
        primaryLabel="Get in touch"
      />
    </>
  );
}
