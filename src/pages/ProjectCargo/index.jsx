import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import Accordion from '@/components/shared/Accordion';
import CTABand from '@/components/sections/CTABand';
import Icon from '@/components/shared/Icon';
import Reveal from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { PROJECT_CARGO } from '@/data/serviceDetails';
import { PROJECT_CARGO_FAQS } from '@/data/faqs';

export default function ProjectCargo() {
  usePageMeta(
    'Project Cargo',
    'ODC and heavy-lift movement — route surveys, permissions, hydraulic axles and supervised execution for industrial project consignments.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'Project Cargo' }]}
        eyebrow="Project Cargo & Heavy Lift"
        title="Cargo that cannot simply be put on a truck."
        lead="Over-dimensional and heavy-lift movement planned route-first — survey, method statement, permissions, escort and supervised execution, carried by one accountable team."
        meta={[
          { value: '100T+', label: 'Heavy-lift capability' },
          { value: '42m', label: 'Longest cargo moved' },
          { value: '9', label: 'States permitted' },
          { value: '75+', label: 'Projects executed' },
        ]}
      />

      {/* ---------- Capability ---------- */}
      <Section>
        <SectionHeading
          eyebrow="Capability"
          title="Built for the cargo that changes the route."
          lead="From process equipment to power infrastructure, each movement is shaped around the load, the road and the site waiting at the other end."
        />
        <div className="project-capability-grid">
          {PROJECT_CARGO.capabilities.map((c, i) => (
            <Reveal as="article" className="project-capability-card" key={c.title} delay={i * 0.05}>
              <div className="project-capability-card__topline">
                <span className="project-capability-card__number">{String(i + 1).padStart(2, '0')}</span>
                <span className="project-capability-card__icon">
                  <Icon name={c.icon} size={21} />
                </span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="project-capability-card__link">
                Planned to the detail <Icon name="arrowRight" size={15} />
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Execution ---------- */}
      <Section tone="dark" className="project-execution-section">
        <div className="project-execution-header">
          <Reveal>
            <span className="eyebrow">Execution Process</span>
            <h2>From feasibility to handover, every move has a named stage.</h2>
            <p className="lead">
              Project movement is compressed by starting earlier — never by dropping the checks that keep
              people, equipment and the public road protected.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="project-execution-promise">
            <span className="project-execution-promise__icon">
              <Icon name="clock" size={21} />
            </span>
            <span className="project-execution-promise__label">Mobilisation window</span>
            <strong>10–15 working days</strong>
            <span>Typical lead time from approved scope to movement readiness.</span>
          </Reveal>
        </div>

        <div className="project-execution-board">
          {PROJECT_CARGO.execution.map((step, i) => (
            <Reveal as="article" className="project-execution-step" key={step.title} delay={i * 0.04}>
              <div className="project-execution-step__number">{String(i + 1).padStart(2, '0')}</div>
              <div className="project-execution-step__body">
                <span>Stage {String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <Icon name="arrowRight" size={18} className="project-execution-step__arrow" />
            </Reveal>
          ))}
        </div>

        <div className="project-execution-footer">
          <span><Icon name="shield" size={16} /> Safety-led planning</span>
          <span><Icon name="users" size={16} /> One accountable team</span>
          <span><Icon name="file" size={16} /> Documented handover</span>
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section>
        <div className="grid grid--split" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Project Cargo FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Planning questions.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              What project teams need settled before a movement window is fixed.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={PROJECT_CARGO_FAQS} />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Have an oversized consignment to plan?"
        text="Send the dimensions, the weight and the two end points. Our project team will come back with a feasibility view before anything is committed."
        primaryLabel="Start a project enquiry"
      />
    </>
  );
}
