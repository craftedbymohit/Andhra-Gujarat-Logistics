import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FeatureCard from '@/components/cards/FeatureCard';
import SpecRows from '@/components/sections/SpecRows';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup, revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { CUSTOM_SOLUTIONS } from '@/data/serviceDetails';
import { INDUSTRIES } from '@/data/industries';

/** The six verticals with the most engineered programmes. */
const FOCUS_IDS = ['healthcare', 'steel', 'textile', 'chemical', 'automobile', 'fmcg'];

export default function CustomizedSolutions() {
  usePageMeta(
    'Customized Logistics Solutions',
    'Industry-engineered logistics programmes for pharma, steel, textile, chemical, automobile and FMCG — with warehousing integration and dedicated teams.'
  );

  const focus = FOCUS_IDS.map((id) => INDUSTRIES.find((i) => i.id === id)).filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'Customized Solutions' }]}
        eyebrow="Customized Logistics Solutions"
        title="A logistics programme, not a rate card."
        lead="For clients whose movement is continuous rather than occasional, we design the network around the production plan — lanes, vehicles, storage, documentation and reporting as one system."
        meta={[
          { value: '30', label: 'Day onboarding' },
          { value: '6', label: 'Industry programmes' },
          { value: '1', label: 'Named account owner' },
          { value: '24×7', label: 'Operations cover' },
        ]}
      />

      {/* ---------- Programme components ---------- */}
      <Section>
        <SectionHeading
          eyebrow="What a Programme Includes"
          title="Six components, assembled around your constraints."
          lead="We start from your production plan and work backwards — not from the vehicles we happen to have available."
        />
        <RevealGroup className="grid grid--3">
          {CUSTOM_SOLUTIONS.components.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Industries ---------- */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Industry Programmes"
          title="Six verticals we have built repeatable models for."
          lead="Each carries its own SOP set, vehicle specification and documentation standard."
          aside={
            <Button to="/industries" variant="ghost" size="sm">
              All industries
            </Button>
          }
        />

        <RevealGroup className="grid grid--3">
          {focus.map((ind) => (
            <motion.article variants={revealItem} className="card" key={ind.id}>
              <span className="card__icon">
                <Icon name={ind.icon} size={21} />
              </span>
              <h3 className="card__title">{ind.title}</h3>
              <p className="card__text">{ind.summary}</p>
              <ul className="tick-list" style={{ marginTop: '0.35rem' }}>
                {ind.highlights.map((h) => (
                  <li key={h}>
                    <Icon name="check" size={14} />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="card__foot">
                <Link to={`/industries#${ind.id}`} className="link-arrow">
                  Industry detail
                  <Icon name="arrowRight" size={15} />
                </Link>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Warehousing ---------- */}
      <Section tone="dark">
        <div className="grid-backdrop" />
        <div className="grid grid--split" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Warehousing Integration</span>
            <h2 style={{ marginTop: '1rem' }}>Storage and transport should not be two vendors.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              When the warehouse and the fleet answer to different companies, every exception becomes a
              conversation about whose fault it is. We run storage, staging and dispatch as one flow — at
              Ahmedabad, Hyderabad, Vapi and Nellore.
            </p>
            <ul className="tick-list" style={{ marginTop: '1.75rem' }}>
              {[
                'Inbound receipt, put-away and stock visibility',
                'Order staging aligned to dispatch windows',
                'Cross-dock and consolidation at hub branches',
                'Single documentation trail from receipt to POD',
              ].map((t) => (
                <li key={t}>
                  <Icon name="check" size={14} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="card card--dark">
            <span className="card__icon">
              <Icon name="users" size={21} />
            </span>
            <h3 className="card__title">Your dedicated team</h3>
            <p className="card__text">
              Every programme is staffed with a named planner, an operations owner and a documentation
              executive. They work on your account and no one else&apos;s, which is why escalation does not
              begin with an explanation of who you are.
            </p>
            <ul className="tick-list" style={{ marginTop: '0.5rem' }}>
              {['Account planner', 'Operations owner', 'Documentation executive', 'Regional director escalation'].map(
                (r) => (
                  <li key={r}>
                    <Icon name="check" size={14} />
                    {r}
                  </li>
                )
              )}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Support model ---------- */}
      <Section>
        <div className="split-sticky">
          <div className="sticky-col">
            <span className="eyebrow">Support Model</span>
            <h2 style={{ marginTop: '1rem' }}>How the relationship is actually run.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              A contract is only as good as the review cadence behind it. Ours is fixed and documented from day
              one.
            </p>
            <Button to="/contact" variant="ghost" style={{ marginTop: '2rem' }}>
              Discuss a programme
            </Button>
          </div>
          <SpecRows items={CUSTOM_SOLUTIONS.support} />
        </div>
      </Section>

      <CTABand
        title="Let’s design the programme around your plant."
        text="Share your monthly volumes and lane structure. We will come back with a network design, a capacity plan and a cost model."
        primaryLabel="Start the conversation"
      />
    </>
  );
}
