import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FleetShowcase from '@/components/sections/FleetShowcase';
import FeatureCard from '@/components/cards/FeatureCard';
import SpecRows from '@/components/sections/SpecRows';
import Accordion from '@/components/shared/Accordion';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { LANES } from '@/data/fleet';
import { INDUSTRIES } from '@/data/industries';
import { ROAD_FREIGHT } from '@/data/serviceDetails';
import { ROAD_FREIGHT_FAQS } from '@/data/faqs';

export default function RoadFreight() {
  usePageMeta(
    'Road Freight',
    'FTL and PTL road transportation across Gujarat, Andhra Pradesh and pan-India lanes — scheduled departures, GPS tracking and published transit norms.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'Road Freight' }]}
        eyebrow="Road Transportation"
        title="Freight that arrives when the plan said it would."
        lead="Full-truck and part-truck movement on scheduled lanes, with the vehicle chosen for the cargo and a transit norm you can hold us to."
        meta={[
          { value: '1,200+', label: 'Consignments / month' },
          { value: '8', label: 'Core lanes' },
          { value: '98%', label: 'On-time delivery' },
          { value: '350+', label: 'Vehicles available' },
        ]}
      />

      {/* ---------- Vehicle types ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Vehicle Types"
          title="Four fleet formats. One operating standard."
          lead="A focused fleet for containerised, open-deck and regional industrial movement."
        />
        <FleetShowcase />
      </Section>

      {/* ---------- Routes ---------- */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Core Routes"
          title="Published transit norms, measured against POD."
          lead="These are the lanes we run daily. Transit ranges reflect actual performance, including statutory halts — not a best-case calculation."
        />

        <Reveal className="spec-rows">
          {LANES.map((lane, i) => (
            <div
              className="spec-row"
              key={`${lane.from}-${lane.to}`}
              style={{ gridTemplateColumns: '56px minmax(0,1.2fr) minmax(0,0.6fr) minmax(0,0.6fr)' }}
            >
              <span className="spec-row__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="spec-row__title">
                {lane.from} <span style={{ color: 'var(--sky)' }}>→</span> {lane.to}
              </h3>
              <p className="spec-row__text numeric">{lane.distance}</p>
              <p className="spec-row__text numeric" style={{ color: 'var(--ocean)', fontWeight: 600 }}>
                {lane.transit}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} style={{ marginTop: '2rem' }}>
          <p className="form-note">
            Lanes beyond this list are quoted on request — our branch network reaches most industrial
            destinations in western and southern India within 72 hours.
          </p>
        </Reveal>
      </Section>

      {/* ---------- Advantages ---------- */}
      <Section>
        <div className="split-sticky">
          <div className="sticky-col">
            <span className="eyebrow">Advantages</span>
            <h2 style={{ marginTop: '1rem' }}>Why manufacturers move their base freight to us.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Not because we are the cheapest quote on the table — because the total cost of a delayed or
              detained vehicle is considerably higher than the rate difference.
            </p>
            <Button to="/contact" variant="ghost" style={{ marginTop: '2rem' }}>
              Talk to the operations desk
            </Button>
          </div>
          <SpecRows items={ROAD_FREIGHT.advantages} />
        </div>
      </Section>

      {/* ---------- Industries ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Industries Moved"
          title="Cargo we handle every day."
          aside={
            <Button to="/industries" variant="ghost" size="sm">
              Industry detail
            </Button>
          }
        />
        <RevealGroup className="grid grid--4">
          {INDUSTRIES.map((ind) => (
            <motion.div
              variants={revealItem}
              className="card"
              key={ind.id}
              style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem' }}
            >
              <span className="card__icon" style={{ width: 40, height: 40 }}>
                <Icon name={ind.icon} size={19} />
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                {ind.title}
              </span>
            </motion.div>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Safety ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Safety"
          title="Four checks that happen before the vehicle moves."
          lead="Load damage and roadside detention are almost always the result of something skipped at the origin."
        />
        <RevealGroup className="grid grid--4">
          {ROAD_FREIGHT.safety.map((s) => (
            <FeatureCard key={s.title} title={s.title} text={s.text} icon="shield" />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Tracking ---------- */}
      <Section tone="dark">
        <div className="grid-backdrop" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeading
            eyebrow="Tracking & Visibility"
            title="You should never have to telephone a branch to find your cargo."
            lead="The control tower watches every AGL consignment on the road and pushes status outward."
          />
          <RevealGroup className="grid grid--4">
            {ROAD_FREIGHT.tracking.map((t) => (
              <FeatureCard key={t.title} {...t} dark />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section>
        <div className="grid grid--split" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Road Freight FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Practical answers.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              What clients ask before they place the first load with us.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={ROAD_FREIGHT_FAQS} />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Move your next full-truck load with us."
        text="Give us the lane, the commodity and the dispatch date. You will have a rate and a vehicle class the same day."
      />
    </>
  );
}
