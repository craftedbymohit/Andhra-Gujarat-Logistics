import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import HomeHero from '@/components/hero/HomeHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import StatsBand from '@/components/counters/StatsBand';
import ProcessTimeline from '@/components/timeline/ProcessTimeline';
import FleetShowcase from '@/components/sections/FleetShowcase';
import TestimonialSlider from '@/components/testimonials/TestimonialSlider';
import BranchLocator from '@/components/maps/BranchLocator';
import ClientLogos from '@/components/sections/ClientLogos';
import CTABand from '@/components/sections/CTABand';
import ExpertiseShowcase from '@/components/sections/ExpertiseShowcase';
import WhyLogistics from '@/components/sections/WhyLogistics';
import IndustryShowcase from '@/components/sections/IndustryShowcase';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { KPIS } from '@/constants/company';
import { EXPERTISE } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { INSIGHTS } from '@/data/insights';
import { BRANCHES } from '@/data/branches';

export default function Home() {
  usePageMeta(
    'Transportation & Logistics Infrastructure',
    'Andhra Gujarat Logistics delivers road freight, project cargo and customised logistics solutions across Gujarat, Andhra Pradesh and pan-India corridors.'
  );

  const gujarat = BRANCHES.filter((b) => b.region === 'Gujarat').length;
  const andhra = BRANCHES.filter((b) => ['Andhra Pradesh', 'Telangana'].includes(b.region)).length;
  const national = BRANCHES.filter((b) => b.region === 'National').length;

  return (
    <>
      <HomeHero />

      {/* ---------- Branch presence + client marks ---------- */}
      <Section tight edge>
        <div className="grid grid--split" style={{ alignItems: 'start', marginBottom: '3rem' }}>
          <Reveal>
            <span className="eyebrow">Branch Presence</span>
            <h2 style={{ marginTop: '1rem', maxWidth: '18ch' }}>
              Fifteen branches. Three industrial states. One operating standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="branch-presence__support">
            <p className="lead">
              Our network across Gujarat, Andhra Pradesh and Telangana is built around the industrial corridors we
              serve — combining dependable capacity, responsive coordination and one consistent operating standard
              from pickup to delivery.
            </p>
            <div className="row" style={{ gap: '2.5rem', marginTop: '1.75rem' }}>
              {[
                { value: gujarat, label: 'Gujarat branches' },
                { value: andhra, label: 'Andhra & Telangana' },
                { value: national, label: 'National hubs' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="numeric" style={{ fontSize: '1.9rem', fontWeight: 700, lineHeight: 1.1 }}>
                    {String(s.value).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--grey)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="client-logo-block">
          <p
            className="eyebrow"
            style={{ justifyContent: 'center', width: '100%', marginBottom: '1.5rem' }}
          >
            Moving cargo for manufacturers across
          </p>
          <ClientLogos />
        </Reveal>
      </Section>

      {/* ---------- Our expertise ---------- */}
      <Section className="expertise-section">
        <SectionHeading
          eyebrow="Our Expertise"
          title="Built for the way industry moves."
          lead="Four focused capabilities. One accountable partner."
          aside={
            <Button to="/services" variant="ghost" size="sm">
              View all services
            </Button>
          }
        />

        <ExpertiseShowcase services={EXPERTISE} />
      </Section>

      {/* ---------- Operational excellence ---------- */}
      <Section tone="surface" className="operational-section">
        <SectionHeading
          eyebrow="Operational Excellence"
          title="Reliable by the numbers."
          lead="A clear view of the standards our teams work to every day."
        />
        <StatsBand items={KPIS} className="stats-band--clean" />
      </Section>

      {/* ---------- Why Andhra Gujarat ---------- */}
      <Section tone="dark" className="why-logistics-section">
        <SectionHeading
          eyebrow="Why Andhra Gujarat Logistics"
          title="The difference is in the details."
          lead="Capacity is easy to promise. We make the rest visible."
        />
        <WhyLogistics />
      </Section>

      {/* ---------- Industries ---------- */}
      <Section tone="ice" className="industry-section">
        <SectionHeading
          eyebrow="Industries Served"
          title="Sectors we know how to move."
          lead="The cargo changes. The discipline stays."
          aside={
            <Button to="/industries" variant="ghost" size="sm">
              Explore industries
            </Button>
          }
        />
        <IndustryShowcase industries={INDUSTRIES.slice(0, 8)} />
      </Section>

      {/* ---------- Logistics journey ---------- */}
      <Section>
        <SectionHeading
          eyebrow="The Logistics Journey"
          title="Seven stages. One reference number."
          lead="From the first enquiry to the digitised proof of delivery, every consignment follows the same documented path — at every branch, identically."
        />
        <ProcessTimeline />
      </Section>

      {/* ---------- Fleet ---------- */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Fleet Highlights"
          title="Capacity matched to the cargo."
          lead="Four proven fleet formats for dependable movement across industrial lanes."
          aside={
            <Button to="/services/road-freight" variant="ghost" size="sm">
              Road freight details
            </Button>
          }
        />
        <FleetShowcase />
      </Section>

      {/* ---------- Testimonials ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Client Voices"
          title="What partners say after the hard miles."
          lead="The clearest measure of a logistics partner is the confidence left behind."
        />
        <TestimonialSlider />
      </Section>

      {/* ---------- Coverage map ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Coverage Map"
          title="Ankleshwar at the centre of our network."
          lead="Our head office connects Gujarat, Andhra Pradesh, Telangana and national hubs through one coordinated operating network."
          aside={
            <Button to="/branch-network" variant="ghost" size="sm">
              Full branch network
            </Button>
          }
        />
        <BranchLocator />
      </Section>

      {/* ---------- Insights ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Latest Insights"
          title="Notes from the corridor."
          lead="Operating data and field observations from the lanes we run every day."
        />
        <RevealGroup className="grid grid--3">
          {INSIGHTS.map((post) => (
            <motion.article variants={revealItem} className="insight" key={post.title}>
              <div className="insight__meta">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
              <h3 className="insight__title">{post.title}</h3>
              <p className="card__text">{post.excerpt}</p>
              <Link to={post.href} className="link-arrow" style={{ marginTop: 'auto' }}>
                Read insight
                <Icon name="arrowRight" size={15} />
              </Link>
            </motion.article>
          ))}
        </RevealGroup>
      </Section>

      <CTABand />
    </>
  );
}
