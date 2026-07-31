import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import ServiceCard from '@/components/cards/ServiceCard';
import FeatureCard from '@/components/cards/FeatureCard';
import ProcessTimeline from '@/components/timeline/ProcessTimeline';
import Accordion from '@/components/shared/Accordion';
import CTABand from '@/components/sections/CTABand';
import Reveal, { RevealGroup } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { DIFFERENTIATORS, SERVICES } from '@/data/services';
import { GENERAL_FAQS } from '@/data/faqs';

export default function Services() {
  usePageMeta(
    'Services',
    'Road transportation, project cargo, customised logistics solutions, interstate distribution, industrial transportation and dedicated fleet services.'
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="What We Do"
        title="Six services. One accountability model."
        lead="Each service line carries its own planning discipline, vehicle mix and named operations owner — so nothing falls between a sales promise and a loading bay."
        meta={[
          { value: '6', label: 'Service lines' },
          { value: '350+', label: 'Vehicles in network' },
          { value: '100T+', label: 'Heavy-lift capability' },
          { value: '24×7', label: 'Control tower' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Service Catalogue"
          title="Capability, matched to the consignment."
          lead="Start with what needs to move and the constraints around it. The vehicle, the route and the paperwork follow from there — not the other way round."
        />
        <RevealGroup className="grid grid--3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </RevealGroup>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="How We Work"
          title="Seven stages, every consignment."
          lead="The same documented path at every branch, from enquiry to digitised proof of delivery."
        />
        <ProcessTimeline />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Operating Principles"
          title="What you get regardless of which service you buy."
        />
        <RevealGroup className="grid grid--3">
          {DIFFERENTIATORS.map((d) => (
            <FeatureCard key={d.title} {...d} />
          ))}
        </RevealGroup>
      </Section>

      <Section tone="ice">
        <div className="grid grid--split" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Common Questions</span>
            <h2 style={{ marginTop: '1rem' }}>Before you send the enquiry.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              The questions our operations desk is asked most often. Anything not covered here — call the
              control tower, it is staffed around the clock.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={GENERAL_FAQS} />
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
