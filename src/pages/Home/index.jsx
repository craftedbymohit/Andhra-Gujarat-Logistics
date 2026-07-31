import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import HomeHero from '@/components/hero/HomeHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import StatsBand from '@/components/counters/StatsBand';
import ServiceCard from '@/components/cards/ServiceCard';
import FeatureCard from '@/components/cards/FeatureCard';
import IndustryCard from '@/components/cards/IndustryCard';
import ProcessTimeline from '@/components/timeline/ProcessTimeline';
import FleetShowcase from '@/components/sections/FleetShowcase';
import TestimonialSlider from '@/components/testimonials/TestimonialSlider';
import BranchLocator from '@/components/maps/BranchLocator';
import ClientLogos from '@/components/sections/ClientLogos';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { KPIS } from '@/constants/company';
import { DIFFERENTIATORS, EXPERTISE, TECHNOLOGY } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';
import { INSIGHTS } from '@/data/insights';
import { BRANCHES } from '@/data/branches';

export default function Home() {
  usePageMeta(
    'Transportation & Logistics Infrastructure',
    'Andhra Gujarat Logistics delivers road freight, project cargo and customised logistics solutions across Gujarat, Andhra Pradesh and pan-India corridors.'
  );

  const gujarat = BRANCHES.filter((b) => b.region === 'Gujarat').length;
  const andhra = BRANCHES.filter((b) => b.region === 'Andhra Pradesh').length;
  const national = BRANCHES.filter((b) => b.region === 'National').length;

  return (
    <>
      <HomeHero />

      {/* ---------- Branch presence + client marks ---------- */}
      <Section tight edge>
        <div className="grid grid--split" style={{ alignItems: 'center', marginBottom: '3rem' }}>
          <Reveal>
            <span className="eyebrow">Branch Presence</span>
            <h2 style={{ marginTop: '1rem', maxWidth: '18ch' }}>
              Fifteen branches. Two industrial states. One operating standard.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead">
              Our branches sit inside the estates they serve — Ankleshwar, Vapi, Gajuwaka, Auto Nagar — not in
              city-centre sales offices. That is why a vehicle reaches your gate in hours rather than a day.
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

        <Reveal>
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
      <Section tone="surface">
        <SectionHeading
          eyebrow="Our Expertise"
          title="Capability built around how industry actually moves."
          lead="Four core services, each with its own planning discipline, vehicle mix and accountability structure — rather than one fleet stretched across every requirement."
          aside={
            <Button to="/services" variant="ghost" size="sm">
              View all services
            </Button>
          }
        />

        <RevealGroup className="grid grid--2">
          {EXPERTISE.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Operational excellence ---------- */}
      <Section tone="dark">
        <div className="grid-backdrop" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeading
            eyebrow="Operational Excellence"
            title="Performance we publish, not performance we claim."
            lead="Every number below is measured against actual proof-of-delivery timestamps and reported back to contract clients each month."
          />
          <StatsBand items={KPIS} dark />
        </div>
      </Section>

      {/* ---------- Why Andhra Gujarat ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Why Andhra Gujarat"
          title="What a logistics partner is supposed to do."
          lead="Trucks are a commodity. Planning, compliance, visibility and a name that answers the phone are not."
        />
        <RevealGroup className="grid grid--3">
          {DIFFERENTIATORS.map((d) => (
            <FeatureCard key={d.title} {...d} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Industries ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Industries Served"
          title="Eight sectors. Eight sets of operating rules."
          lead="A chemical drum, a steel coil and a pharma batch fail in completely different ways. We plan for the failure mode, not just the tonnage."
          aside={
            <Button to="/industries" variant="ghost" size="sm">
              Explore industries
            </Button>
          }
        />
        <RevealGroup className="grid grid--4">
          {INDUSTRIES.slice(0, 8).map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </RevealGroup>
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
          title="The right vehicle, not the available vehicle."
          lead="Owned and contracted capacity spanning LCVs to hydraulic modular axles, so the consignment decides the equipment."
          aside={
            <Button to="/services/road-freight" variant="ghost" size="sm">
              Road freight details
            </Button>
          }
        />
        <FleetShowcase />
      </Section>

      {/* ---------- Technology ---------- */}
      <Section tone="dark">
        <div className="grid-backdrop" />
        <div className="grid grid--split" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Technology</span>
            <h2 style={{ marginTop: '1rem' }}>Visibility that reaches you before you ask for it.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Technology in transport is only worth what it prevents. Ours exists to catch the delay, the
              deviation and the documentation error while there is still time to act on them.
            </p>
            <Button variant="light" to="/about" style={{ marginTop: '2rem' }}>
              How we operate
            </Button>
          </Reveal>

          <RevealGroup className="grid grid--2">
            {TECHNOLOGY.map((t) => (
              <FeatureCard key={t.title} {...t} dark />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ---------- Testimonials ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Client Voices"
          title="Judged on the loads that went wrong, not the ones that went right."
          lead="Every transporter looks the same on a clear day. These are clients who have seen how we handle an exception."
        />
        <TestimonialSlider />
      </Section>

      {/* ---------- Coverage map ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Coverage Map"
          title="A network you can plan production around."
          lead="Hover any node to see the branch manager, the industrial belt it serves and the corridors it feeds."
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
