import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import ServiceCard from '@/components/cards/ServiceCard';
import ProcessTimeline from '@/components/timeline/ProcessTimeline';
import Accordion from '@/components/shared/Accordion';
import CTABand from '@/components/sections/CTABand';
import Reveal, { RevealGroup } from '@/components/animations/Reveal';
import Icon from '@/components/shared/Icon';

import usePageMeta from '@/hooks/usePageMeta';
import { SERVICES } from '@/data/services';
import { GENERAL_FAQS } from '@/data/faqs';

export default function Services() {
  usePageMeta(
    'Services',
    'Road transportation, project cargo, customised logistics solutions, interstate distribution, industrial transportation and dedicated fleet services.'
  );

  return (
    <>
      <PageHero
        className="page-hero--services"
        crumbs={[{ label: 'Services' }]}
        eyebrow="What We Do"
        title="Every move, made accountable."
        lead="Industrial logistics built around the cargo, the lane and the promise — with one team carrying it through."
        meta={[
          { value: '6', label: 'Service lines' },
          { value: '350+', label: 'Vehicles in network' },
          { value: '100T+', label: 'Heavy-lift capability' },
          { value: '24×7', label: 'Control tower' },
        ]}
        art={
          <div className="services-hero-art">
            <div className="services-hero-art__topline">
              <span className="dot-live" />
              <span>AGL operating system</span>
              <span className="numeric">01 / 06</span>
            </div>
            <div className="services-hero-art__core">
              <span className="services-hero-art__icon">
                <Icon name="route" size={28} />
              </span>
              <div>
                <strong>One coordinated movement</strong>
                <span>Plan · Move · Deliver</span>
              </div>
            </div>
            <div className="services-hero-art__route" aria-hidden="true">
              <span className="services-hero-art__route-line" />
              <span className="services-hero-art__node services-hero-art__node--start" />
              <span className="services-hero-art__node services-hero-art__node--mid" />
              <span className="services-hero-art__node services-hero-art__node--end" />
            </div>
            <div className="services-hero-art__labels">
              <span>Requirement</span>
              <span>Execution</span>
              <span>Closure</span>
            </div>
          </div>
        }
      />

      <Section className="services-catalogue">
        <SectionHeading
          eyebrow="Service Catalogue"
          title="Built for the way industry moves."
        />
        <RevealGroup className="grid grid--3 services-catalogue__grid">
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

      <Section tone="ice" className="services-faq">
        <div className="grid grid--split services-faq__layout" style={{ alignItems: 'start' }}>
          <Reveal>
            <span className="eyebrow">Common Questions</span>
            <h2 style={{ marginTop: '1rem' }}>Questions, answered.</h2>
            <p className="lead" style={{ marginTop: '1.25rem' }}>
              A clear start to every movement. Find the essentials here, then speak with the team when your
              consignment needs a closer look.
            </p>
            <div className="services-faq__status">
              <span className="dot-live" />
              <span>Operations desk available 24×7</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={GENERAL_FAQS} className="accordion--services" />
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
