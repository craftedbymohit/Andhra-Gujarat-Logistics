import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FleetShowcase from '@/components/sections/FleetShowcase';
import FeatureCard from '@/components/cards/FeatureCard';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { LANES } from '@/data/fleet';
import { INDUSTRIES } from '@/data/industries';
import { ROAD_FREIGHT } from '@/data/serviceDetails';

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
          title="The lanes that keep industry moving."
          lead="A live view of the corridors our teams know by road, checkpoint and delivery window — with transit norms built from real operating performance."
        />

        <div className="route-control-panel">
          <Reveal className="route-control-panel__rail">
            <div className="route-control-panel__badge">
              <span className="route-control-panel__badge-icon">
                <Icon name="route" size={20} />
              </span>
              <span>AGL lane board</span>
            </div>
            <h3>Movement planned around the plant, not the postcode.</h3>
            <p>
              Every lane is backed by a branch team, a vehicle class and a practical delivery window —
              so your dispatch plan has something solid to work with.
            </p>
            <div className="route-control-panel__stats">
              <div>
                <strong>{LANES.length}</strong>
                <span>published lanes</span>
              </div>
              <div>
                <strong>72h</strong>
                <span>network reach</span>
              </div>
              <div>
                <strong>24×7</strong>
                <span>control tower</span>
              </div>
            </div>
            <div className="route-control-panel__footer">
              <span className="route-control-panel__pulse" />
              <span>Lane planning active</span>
              <span className="route-control-panel__footer-note">Same-day quote support</span>
            </div>
          </Reveal>

          <RevealGroup className="route-cards">
            {LANES.map((lane, i) => (
              <motion.article
                className="route-card"
                key={`${lane.from}-${lane.to}`}
                variants={revealItem}
              >
                <div className="route-card__header">
                  <span className="route-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="route-card__status">Active lane</span>
                </div>
                <div className="route-card__journey">
                  <div className="route-card__node">
                    <span>Origin</span>
                    <strong>{lane.from}</strong>
                  </div>
                  <span className="route-card__connector" aria-hidden="true">
                    <span />
                    <Icon name="arrowRight" size={17} />
                  </span>
                  <div className="route-card__node route-card__node--destination">
                    <span>Destination</span>
                    <strong>{lane.to}</strong>
                  </div>
                </div>
                <div className="route-card__meta">
                  <div>
                    <span>Distance</span>
                    <strong>{lane.distance}</strong>
                  </div>
                  <div>
                    <span>Transit norm</span>
                    <strong>{lane.transit}</strong>
                  </div>
                </div>
              </motion.article>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1} style={{ marginTop: '2rem' }}>
          <div className="route-board-note">
            <Icon name="clock" size={18} />
            <p>
              Need a lane beyond the board? Share the origin, destination, commodity and dispatch date —
              our operations desk will build the right movement plan around it.
            </p>
          </div>
        </Reveal>
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

      <CTABand
        title="Move your next full-truck load with us."
        text="Give us the lane, the commodity and the dispatch date. You will have a rate and a vehicle class the same day."
      />
    </>
  );
}
