import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FeatureCard from '@/components/cards/FeatureCard';
import SpecRows from '@/components/sections/SpecRows';
import ApplicationForm from '@/components/forms/ApplicationForm';
import CTABand from '@/components/sections/CTABand';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { BENEFITS, CULTURE, HIRING_STEPS, OPENINGS } from '@/data/careers';
import { COMPANY } from '@/constants/company';
import { BRANCHES } from '@/data/branches';

export default function Careers() {
  usePageMeta(
    'Careers',
    'Open roles across the Andhra Gujarat Logistics branch network — operations, project cargo, control tower, fleet and driving positions.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Careers' }]}
        eyebrow="Careers"
        title="Build the network, not just work in it."
        lead="We hire people who want operating responsibility early. Several of our branch heads joined as executives — internal movement is how this company has always grown."
        meta={[
          { value: `${OPENINGS.length}`, label: 'Open positions' },
          { value: `${BRANCHES.length}`, label: 'Branch locations' },
          { value: '5 days', label: 'Screening turnaround' },
          { value: '4×/yr', label: 'Training cycles' },
        ]}
      />

      {/* ---------- Culture ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Life at AGL"
          title="What working here actually looks like."
          lead="Long hours when a consignment demands it, real authority at branch level, and no pressure to compromise on safety to save a schedule."
        />
        <RevealGroup className="grid grid--3">
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

      {/* ---------- Hiring process ---------- */}
      <Section>
        <div className="split-sticky">
          <div className="sticky-col">
            <span className="eyebrow">Hiring Process</span>
            <h2 style={{ marginTop: '1rem' }}>Five steps, no silence in between.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              You will hear back either way. We commit to a decision within five working days of screening.
            </p>
          </div>
          <SpecRows items={HIRING_STEPS} />
        </div>
      </Section>

      {/* ---------- Openings ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Open Positions"
          title="Currently hiring."
          lead="Do not see your role? Send a general application — we keep strong profiles on file for the next branch opening."
        />

        <motion.div
          className="stack"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {OPENINGS.map((job) => (
            <motion.div variants={revealItem} className="job-row" key={job.title}>
              <span className="job-row__title">{job.title}</span>
              <span className="job-row__cell">
                <span>Location</span>
                {job.location}
              </span>
              <span className="job-row__cell">
                <span>Type</span>
                {job.type}
              </span>
              <span className="job-row__cell">
                <span>Experience</span>
                {job.experience}
              </span>
              <a href="#apply" className="link-arrow">
                Apply
                <Icon name="arrowRight" size={15} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ---------- Application ---------- */}
      <Section id="apply">
        <div className="grid grid--split" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Application Form</span>
            <h2 style={{ marginTop: '1rem' }}>Apply in two minutes.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Complete the form and email your CV to <a href={`mailto:${COMPANY.careersEmail}`}>{COMPANY.careersEmail}</a>{' '}
              with the role in the subject line.
            </p>
            <div className="stack" style={{ marginTop: '2rem', gap: '0.75rem' }}>
              {['Every application reviewed', 'Response within five working days', 'Roles across all 15 branches'].map(
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
