import { Link } from 'react-router-dom';
import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal from '@/components/animations/Reveal';

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
        title="A logistics programme built around how you operate."
        lead="Your production rhythm is not a template. We connect lanes, vehicles, storage, documentation and reporting into one dependable operating system for the work that repeats every day."
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
          eyebrow="Operating Blueprint"
          title="The right system starts with your constraints."
          lead="We map the work before we assign the movement — then build the people, capacity and controls your operation needs to perform without friction."
        />
        <div className="custom-blueprint-grid">
          {CUSTOM_SOLUTIONS.components.map((c, i) => (
            <Reveal as="article" className="custom-blueprint-card" key={c.title} delay={i * 0.05}>
              <div className="custom-blueprint-card__topline">
                <span className="custom-blueprint-card__number">{String(i + 1).padStart(2, '0')}</span>
                <span className="custom-blueprint-card__icon">
                  <Icon name={c.icon} size={21} />
                </span>
              </div>
              <span className="custom-blueprint-card__label">Programme layer</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="custom-blueprint-card__arrow">
                Built into your operating model <Icon name="arrowRight" size={15} />
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Industries ---------- */}
      <Section tone="surface" className="custom-industry-section">
        <SectionHeading
          eyebrow="Programme Fit"
          title="Different industries. Different operating logic."
          lead="We adapt the playbook to the product, the plant and the consequences of a missed delivery — with a clear model for each sector we serve."
          aside={
            <Button to="/industries" variant="ghost" size="sm">
              Explore all sectors
            </Button>
          }
        />

        <div className="custom-industry-grid">
          {focus.map((ind, i) => (
            <Reveal as="article" className="custom-industry-card" key={ind.id} delay={i * 0.05}>
              <div className="custom-industry-card__topline">
                <span className="custom-industry-card__number">0{i + 1}</span>
                <Icon name={ind.icon} size={19} />
              </div>
              <h3>{ind.title}</h3>
              <p>{ind.summary}</p>
              <div className="custom-industry-card__highlights">
                {ind.highlights.map((h) => (
                  <span key={h}><Icon name="check" size={13} />{h}</span>
                ))}
              </div>
              <Link to={`/industries#${ind.id}`} className="custom-industry-card__link">
                View programme fit
                <Icon name="arrowRight" size={15} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Warehousing ---------- */}
      <Section tone="dark" className="custom-warehouse-section">
        <div className="custom-warehouse-layout">
          <Reveal>
            <span className="eyebrow">Integrated Flow</span>
            <h2>Make storage, staging and transport answer to the same plan.</h2>
            <p className="lead">
              When every handoff sits inside one operating model, inventory does not wait for a vehicle and
              vehicles do not wait for a release. Your cargo keeps moving through the system.
            </p>
            <div className="custom-warehouse-flow" aria-label="Integrated flow from plant to delivery">
              <span>Plant</span>
              <Icon name="arrowRight" size={17} />
              <span>Warehouse</span>
              <Icon name="arrowRight" size={17} />
              <span>Dispatch</span>
              <Icon name="arrowRight" size={17} />
              <span>Delivery</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="custom-warehouse-card">
            <div className="custom-warehouse-card__topline">
              <span className="custom-warehouse-card__icon"><Icon name="network" size={21} /></span>
              <span>One accountable flow</span>
            </div>
            <h3>Built to remove the gaps between teams.</h3>
            <ul className="custom-warehouse-list">
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
            <div className="custom-warehouse-card__locations">
              <span>Integrated at</span>
              <strong>Ahmedabad · Hyderabad · Vapi · Nellore</strong>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="custom-team-strip">
          <span className="custom-team-strip__icon"><Icon name="users" size={21} /></span>
          <div>
            <span className="custom-team-strip__label">Your dedicated team</span>
            <strong>Planner · Operations owner · Documentation executive</strong>
          </div>
          <p>A named team keeps every escalation moving without making you repeat the brief.</p>
        </Reveal>
      </Section>

      <CTABand
        title="Let’s design the programme around your plant."
        text="Share your monthly volumes and lane structure. We will come back with a network design, a capacity plan and a cost model."
        primaryLabel="Start the conversation"
      />
    </>
  );
}
