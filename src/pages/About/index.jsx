import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FeatureCard from '@/components/cards/FeatureCard';
import SpecRows from '@/components/sections/SpecRows';
import CompanyTimeline from '@/components/timeline/CompanyTimeline';
import StatsBand from '@/components/counters/StatsBand';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { COMPANY, KPIS } from '@/constants/company';
import {
  CHAIRMAN,
  CORE_VALUES,
  CSR,
  GALLERY,
  LEADERSHIP,
  MISSION,
  SAFETY_PRACTICES,
  STANDARDS,
  VISION,
} from '@/data/company';
import { BRANCHES } from '@/data/branches';

export default function About() {
  usePageMeta(
    'About Us',
    'The story, leadership, values and operating standards behind Andhra Gujarat Logistics — a two-state transportation network built since 2009.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        eyebrow="About Andhra Gujarat Logistics"
        title="Built branch by branch, since 2009."
        lead="We are a transportation infrastructure company operating out of Gujarat and Andhra Pradesh — assembled slowly, in the industrial estates our clients actually manufacture in."
        meta={[
          { value: `${new Date().getFullYear() - COMPANY.established}+`, label: 'Years operating' },
          { value: BRANCHES.length, label: 'Branch locations' },
          { value: '350+', label: 'Vehicles in network' },
          { value: '500+', label: 'Industrial clients' },
        ]}
      />

      {/* ---------- Our story ---------- */}
      <Section>
        <div className="grid grid--split">
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <h2 style={{ marginTop: '1rem' }}>
              We did not set out to own trucks. We set out to make a delivery date mean something.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="stack">
            <p className="lead">
              Andhra Gujarat Logistics began in {COMPANY.established} with a handful of vehicles working the
              Aslali and Naroda estates outside Ahmedabad. The proposition was narrow and unglamorous: pick up
              when we said we would, and deliver when we said we would.
            </p>
            <p>
              Manufacturers noticed. Within three years we had opened at Vadodara and Ankleshwar because clients
              in the Nandesari and Bharuch chemical belts wanted the same discipline closer to their gates. In
              2015 we crossed into Andhra Pradesh and Telangana, and the Gujarat ⇄ Andhra corridor became the
              spine of the business.
            </p>
            <p>
              Today the network runs to {BRANCHES.length} branches, a project cargo division with its own survey
              team, and a control tower that watches every consignment on the road. The proposition has not
              changed — there is simply a great deal more infrastructure behind it.
            </p>
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

      {/* ---------- Core values ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Core Values"
          title="Six things we will not trade away for a load."
          lead="These are operating rules, not wall posters. Every branch is audited against them."
        />
        <RevealGroup className="grid grid--3">
          {CORE_VALUES.map((v) => (
            <FeatureCard key={v.title} {...v} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Timeline ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Company Timeline"
          title="Fifteen years, one branch at a time."
          lead="Each opening followed a client requirement rather than a growth target."
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

      {/* ---------- Safety ---------- */}
      <Section tone="surface">
        <div className="split-sticky">
          <div className="sticky-col">
            <span className="eyebrow">Safety Culture</span>
            <h2 style={{ marginTop: '1rem' }}>A schedule is never a reason to cut a corner.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Every driver in our network has the authority to refuse an unsafe load or an unsafe schedule
              without needing to justify it afterwards.
            </p>
            <Button to="/contact" variant="ghost" style={{ marginTop: '2rem' }}>
              Discuss your safety requirements
            </Button>
          </div>
          <SpecRows items={SAFETY_PRACTICES} />
        </div>
      </Section>

      {/* ---------- Standards ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Quality Standards"
          title="Compliance is a precondition, not a selling point."
          lead="Documentation and statutory compliance are verified before a vehicle is allocated — not reconciled after a consignment is detained."
        />
        <RevealGroup className="grid grid--3">
          {STANDARDS.map((s) => (
            <motion.div variants={revealItem} className="card" key={s.label}>
              <span className="card__icon">
                <Icon name="check" size={20} />
              </span>
              <h3 className="card__title" style={{ fontSize: '1.05rem' }}>
                {s.label}
              </h3>
              <p className="card__text">{s.note}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- CSR ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Corporate Social Responsibility"
          title="The people who drive this business come first."
          lead="Road transport is a hard living. Our obligations start with the drivers who carry the cargo."
        />
        <RevealGroup className="grid grid--3">
          {CSR.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Gallery ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Gallery"
          title="Operations, on the ground."
          lead="Replace these placeholders with site photography from your branches and executions."
        />
        <Reveal className="gallery">
          {GALLERY.map((g) => (
            <div className="gallery__tile" key={g.caption}>
              <Icon name={g.icon} size={34} strokeWidth={1.3} />
              <span className="gallery__caption">{g.caption}</span>
            </div>
          ))}
        </Reveal>
      </Section>

      <CTABand
        title="Work with a transporter that documents what it does."
        text="Whether it is a single consignment or a dedicated fleet programme, the operating standard is the same."
      />
    </>
  );
}
