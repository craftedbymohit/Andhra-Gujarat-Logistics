import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FeatureCard from '@/components/cards/FeatureCard';
import CompanyTimeline from '@/components/timeline/CompanyTimeline';
import StatsBand from '@/components/counters/StatsBand';
import CTABand from '@/components/sections/CTABand';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { COMPANY, KPIS } from '@/constants/company';
import {
  CHAIRMAN,
  CSR,
  LEADERSHIP,
  MISSION,
  VISION,
} from '@/data/company';
import { BRANCHES } from '@/data/branches';

export default function About() {
  usePageMeta(
    'About Us',
    'The story, leadership and operating standards behind Andhra Gujarat Logistics — a four-state transportation network built since 2012.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About Andhra Gujarat Logistics"
        title="Built around the corridors industry depends on."
        lead="Andhra Gujarat Logistic began in 2012 in Ankleshwar and Hyderabad by Bajranglal Sharma & Kamlesh Sharma."
        meta={[
          { value: `${new Date().getFullYear() - COMPANY.established}+`, label: 'Years operating' },
          { value: BRANCHES.length, label: 'Branch locations' },
          { value: '4', label: 'States connected' },
          { value: '24×7', label: 'Operations support' },
        ]}
      />

      {/* ---------- Our story ---------- */}
      <Section tone="ice" className="story-section">
        <div className="story-grid">
          <Reveal className="story-intro">
            <span className="eyebrow">Our Story</span>
            <h2>Two cities. One promise.</h2>
            <p className="lead">
              A logistics company built where industry works — close to the gates, the people and the pressure of
              every delivery date.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="story-copy">
            <p className="story-copy__lead">
              Andhra Gujarat Logistic began in 2012 in Ankleshwar and Hyderabad by Bajranglal Sharma & Kamlesh
              Sharma.
            </p>
            <p>
              From those two industrial centres, the network has grown to nine locations across Gujarat, Andhra
              Pradesh, Telangana and Karnataka — with one operating standard carried through every consignment.
            </p>
            <div className="story-tags" aria-label="Story principles">
              <span>Built close to industry</span>
              <span>One accountable team</span>
              <span>Ready for the next lane</span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Chairman ---------- */}
      <Section tone="surface">
        <div className="chairman">
          <Reveal className="chairman__portrait">
            {/* Replace with the chairman's photograph when supplied. */}
            <div className="grid-backdrop" />
            <span className="chairman__initials">{CHAIRMAN.initials}</span>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Chairman&apos;s Message</span>
            <p className="chairman__quote" style={{ marginTop: '1.25rem' }}>
              &ldquo;{CHAIRMAN.quote}&rdquo;
            </p>
            <p style={{ marginTop: '1.25rem' }}>{CHAIRMAN.note}</p>
            <div className="chairman__sig">
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>{CHAIRMAN.name}</div>
              <div className="muted" style={{ fontSize: '0.85rem' }}>
                {CHAIRMAN.role}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Mission & vision ---------- */}
      <Section>
        <div className="grid grid--2">
          <Reveal className="card" style={{ borderTop: '3px solid var(--sky)' }}>
            <span className="card__icon">
              <Icon name="route" size={21} />
            </span>
            <h3 className="card__title">Mission</h3>
            <p className="card__text">{MISSION}</p>
          </Reveal>
          <Reveal delay={0.1} className="card" style={{ borderTop: '3px solid var(--ocean)' }}>
            <span className="card__icon">
              <Icon name="eye" size={21} />
            </span>
            <h3 className="card__title">Vision</h3>
            <p className="card__text">{VISION}</p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Timeline ---------- */}
      <Section>
        <SectionHeading
          className="timeline-heading"
          eyebrow="Company Timeline"
          title="Built with purpose, one branch at a time."
        />
        <CompanyTimeline />
      </Section>

      {/* ---------- Performance ---------- */}
      <Section tone="dark">
        <div className="grid-backdrop" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeading
            eyebrow="By the Numbers"
            title="The operating picture, measured."
            lead="Reviewed monthly at branch level and reported to contract clients."
          />
          <StatsBand items={KPIS} dark />
        </div>
      </Section>

      {/* ---------- Leadership ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="People who have run the lanes themselves."
          lead="Our leadership came up through operations. Every one of them has stood at a loading bay at two in the morning."
        />
        <RevealGroup className="grid grid--3">
          {LEADERSHIP.map((p) => (
            <motion.article variants={revealItem} className="leader-card" key={p.name}>
              <span className="leader-card__avatar">
                {p.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <h3 className="leader-card__name">{p.name}</h3>
              <div className="leader-card__role">{p.role}</div>
              <p className="leader-card__bio">{p.bio}</p>
            </motion.article>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- CSR ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Corporate Social Responsibility"
          title="A stronger road starts with a stronger team."
        />
        <RevealGroup className="grid grid--3">
          {CSR.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </RevealGroup>
      </Section>

      <CTABand
        title="Work with a transporter that documents what it does."
        text="Whether it is a single consignment or a dedicated fleet programme, the operating standard is the same."
      />
    </>
  );
}
