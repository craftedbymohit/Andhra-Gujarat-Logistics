import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import ContactForm from '@/components/forms/ContactForm';
import CTABand from '@/components/sections/CTABand';
import Icon from '@/components/shared/Icon';
import Reveal, { revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { COMPANY } from '@/constants/company';
import { BRANCHES } from '@/data/branches';

/** Direct desks — so a visitor reaches the right team without a switchboard. */
const DESKS = [
  {
    icon: 'bell',
    label: 'Emergency No.',
    value: `${COMPANY.emergency} / ${COMPANY.emergencyAlt}`,
    href: `tel:${COMPANY.emergency.replace(/\s/g, '')}`,
    note: 'Staffed 24 × 7 for consignments already in transit',
  },
  {
    icon: 'briefcase',
    label: 'Sales & New Business',
    value: COMPANY.salesEmail,
    href: `mailto:${COMPANY.salesEmail}`,
    note: 'Quotations, contract logistics and dedicated fleet',
  },
  {
    icon: 'truck',
    label: 'Operations Desk',
    value: COMPANY.emergency,
    href: `tel:${COMPANY.emergency.replace(/\s/g, '')}`,
    note: 'Bookings, vehicle placement and dispatch',
  },
  {
    icon: 'users',
    label: 'Carrier',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    note: 'Carrier partnerships and vehicle placement',
  },
];

export default function Contact() {
  usePageMeta(
    'Contact Us',
    'Reach the Andhra Gujarat Logistic operations desk, sales team, control tower or any of our regional branch offices.'
  );

  const regional = BRANCHES;

  // Google Maps embed centred on the corporate office. No API key required.
  const mapQuery = encodeURIComponent(COMPANY.hq.lines.join(', '));

  return (
    <>
      <PageHero
        className="page-hero--contact"
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title="Talk to the desk that can actually help."
        lead="Four direct lines rather than one switchboard — so an in-transit escalation never has to queue behind a sales enquiry."
        meta={[
          { value: '24×7', label: 'Control tower' },
          { value: '<1 day', label: 'Enquiry response' },
          { value: `${BRANCHES.length}`, label: 'Branch offices' },
          { value: '4', label: 'Direct desks' },
        ]}
      />

      {/* ---------- Direct desks ---------- */}
      <Section>
        <SectionHeading eyebrow="Direct Lines" title="A direct line to the people who can move it." />

        <motion.div
          className="grid grid--4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {DESKS.map((desk) => (
            <motion.div variants={revealItem} className="contact-card" key={desk.label}>
              <span className="card__icon" style={{ marginBottom: '1rem' }}>
                <Icon name={desk.icon} size={20} />
              </span>
              <span className="contact-card__label">{desk.label}</span>
              <a href={desk.href} className="contact-card__value">
                {desk.value}
              </a>
              <p className="contact-card__note">{desk.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ---------- Form + office ---------- */}
      <Section tone="surface">
        <div className="contact-grid">
          <Reveal>
            <span className="eyebrow">Corporate Office</span>
            <h2 style={{ marginTop: '1rem' }}>{COMPANY.hq.label}</h2>

            <div className="branch-panel__rows" style={{ borderTop: 0, paddingTop: '1.5rem' }}>
              <div className="branch-panel__row">
                <Icon name="pin" size={16} />
                <span>
                  {COMPANY.hq.lines.map((l) => (
                    <span key={l} style={{ display: 'block' }}>
                      {l}
                    </span>
                  ))}
                </span>
              </div>
              <div className="branch-panel__row">
                <Icon name="phone" size={16} />
                <span>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a>
                  {' · '}
                  <a href={`tel:${COMPANY.phoneAlt.replace(/\s/g, '')}`}>{COMPANY.phoneAlt}</a>
                </span>
              </div>
              <div className="branch-panel__row">
                <Icon name="mail" size={16} />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
            </div>

            <h3 style={{ fontSize: '1.05rem', marginTop: '2.5rem', marginBottom: '0.5rem' }}>
              Business Hours
            </h3>
            <table className="hours-table">
              <tbody>
                {COMPANY.hours.map((h) => (
                  <tr key={h.day}>
                    <th scope="row">{h.day}</th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={0.1} className="panel" style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            <span className="eyebrow">Quick Inquiry</span>
            <h3 style={{ margin: '0.75rem 0 1.5rem' }}>Send us a message.</h3>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* ---------- Map ---------- */}
        <Section tight>
        <SectionHeading
          eyebrow="Find Us"
          title="Our head office, Ankleshwar."
          lead="Find Andhra Gujarat Logistic at the centre of the industrial corridor we have served from the beginning."
        />
        <Reveal className="map-embed">
          <iframe
            title="Andhra Gujarat Logistic — corporate office location"
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </Section>

      {/* ---------- Regional offices ---------- */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Regional Offices"
          title="Key branch contacts."
          aside={
            <Link to="/branch-network" className="link-arrow">
              View all {BRANCHES.length} branches
              <Icon name="arrowRight" size={15} />
            </Link>
          }
        />

        <motion.div
          className="grid grid--3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {regional.map((b) => (
            <motion.div variants={revealItem} className="contact-card" key={b.id}>
              <span className="contact-card__label">
                {b.state}
                {b.hq && ' · Head Office'}
              </span>
              <span className="contact-card__value" style={{ cursor: 'default' }}>
                {b.city}
              </span>
              <p className="contact-card__note" style={{ marginTop: '0.6rem' }}>
                {b.address}
              </p>
              <div className="branch-panel__rows" style={{ marginTop: '1rem', paddingTop: '1rem' }}>
                <div className="branch-panel__row">
                  <Icon name="users" size={15} />
                  <span>{b.manager}</span>
                </div>
                <div className="branch-panel__row">
                  <Icon name="phone" size={15} />
                  <span>
                    Mob.{' '}
                    {(b.phones ?? [b.phone]).map((phone, index) => (
                      <span key={phone}>
                        {index > 0 && ' · '}
                        <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                      </span>
                    ))}
                  </span>
                </div>
                <div className="branch-panel__row">
                  <Icon name="mail" size={15} />
                  <a href={`mailto:${b.email}`}>{b.email}</a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <CTABand
        title="Need a rate before you call?"
        text="Use the quote form — lane, commodity and dispatch date is all we need to come back with a number."
      />
    </>
  );
}
