import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import FeatureCard from '@/components/cards/FeatureCard';
import SpecRows from '@/components/sections/SpecRows';
import ProcessTimeline from '@/components/timeline/ProcessTimeline';
import Accordion from '@/components/shared/Accordion';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/buttons/Button';
import Icon from '@/components/shared/Icon';
import Reveal, { RevealGroup } from '@/components/animations/Reveal';

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
          title="Six categories of movement we plan for."
          lead="Each one fails differently. The planning changes accordingly — a windmill blade and a transformer share almost nothing beyond the word 'oversized'."
        />
        <RevealGroup className="grid grid--3">
          {PROJECT_CARGO.capabilities.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </RevealGroup>
      </Section>

      {/* ---------- Why route-first ---------- */}
      <Section tone="dark">
        <div className="grid-backdrop" />
        <div className="grid grid--split" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <span className="eyebrow">Route First</span>
            <h2 style={{ marginTop: '1rem' }}>We survey before we quote, not after we load.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              An ODC consignment stopped at a bridge or an overhead line is not a delay — it is a stranded asset
              blocking a public road while permissions are renegotiated. Everything we do on project movement
              exists to make sure that call never has to be made.
            </p>
            <Button variant="light" to="/contact" style={{ marginTop: '2rem' }}>
              Request a route survey
            </Button>
          </Reveal>

          <RevealGroup className="grid grid--2">
            {[
              { icon: 'route', title: 'Physical survey', text: 'Every metre of the route driven and measured before commitment.' },
              { icon: 'file', title: 'Method statement', text: 'A written plan issued to the client before mobilisation.' },
              { icon: 'shield', title: 'Escorted transit', text: 'A supervisor travels with the consignment end to end.' },
              { icon: 'chart', title: 'Daily reporting', text: 'Progress against plan reported every day of the movement.' },
            ].map((f) => (
              <FeatureCard key={f.title} {...f} dark />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ---------- Execution ---------- */}
      <Section>
        <div className="split-sticky">
          <div className="sticky-col">
            <span className="eyebrow">Execution Process</span>
            <h2 style={{ marginTop: '1rem' }}>Seven stages, none of which can be skipped.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              Project movement is compressed only by starting earlier — never by dropping a stage.
            </p>
            <div className="row" style={{ gap: '0.5rem', marginTop: '2rem' }}>
              <span className="badge">
                <Icon name="clock" size={13} />
                10–15 working days lead time
              </span>
            </div>
          </div>
          <SpecRows items={PROJECT_CARGO.execution} />
        </div>
      </Section>

      {/* ---------- Risk ---------- */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Risk Management"
          title="Every movement carries a written risk register."
          lead="Each item has a mitigation and a named owner. Nothing sits on the register unassigned."
        />
        <SpecRows items={PROJECT_CARGO.risks} />
      </Section>

      {/* ---------- Standard lifecycle ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Consignment Lifecycle"
          title="The standard operating model still applies."
          lead="Project movement adds survey and permissions — it does not replace the discipline that governs every consignment."
        />
        <ProcessTimeline />
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
