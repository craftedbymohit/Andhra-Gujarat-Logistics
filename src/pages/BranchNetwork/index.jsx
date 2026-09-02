import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import PageHero from '@/components/hero/PageHero';
import { Section } from '@/components/shared/Section';
import SectionHeading from '@/components/sections/SectionHeading';
import BranchLocator from '@/components/maps/BranchLocator';
import CTABand from '@/components/sections/CTABand';
import Icon from '@/components/shared/Icon';
import Reveal, { revealItem } from '@/components/animations/Reveal';

import usePageMeta from '@/hooks/usePageMeta';
import { BRANCHES, BRANCH_REGIONS, getBranchPhones } from '@/data/branches';

/** One expandable branch record in the directory below the map. */
function BranchRow({ branch, index }) {
  const [open, setOpen] = useState(false);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${branch.address}, ${branch.city}`
  )}`;

  return (
    <motion.div variants={revealItem} className="branch-directory-card" data-open={open}>
      <button
        className="branch-directory-card__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="branch-directory-card__index numeric">{String(index + 1).padStart(2, '0')}</span>
        <span className="branch-directory-card__identity">
          <span className="branch-directory-card__city">{branch.city}</span>
          <span className="branch-directory-card__state">
            {branch.state}
            {branch.hq && <span className="branch-directory-card__hq">Head Office</span>}
          </span>
        </span>
        <span className="accordion__sign">
          <Icon name="plus" size={15} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="branch-directory-card__panel"
          >
            <div className="branch-directory-card__body">
              <div className="branch-panel__rows branch-directory-card__rows">
                <div className="branch-panel__row">
                  <Icon name="pin" size={16} />
                  <span>{branch.address}</span>
                </div>
                <div className="branch-panel__row">
                  <Icon name="users" size={16} />
                  <span>
                    Branch Manager — <strong>{branch.manager}</strong>
                  </span>
                </div>
                <div className="branch-panel__row">
                  <Icon name="phone" size={16} />
                  <span>
                    Mob.{' '}
                    {getBranchPhones(branch).map((phone, index) => (
                      <span key={phone}>
                        {index > 0 && ' · '}
                        <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                      </span>
                    ))}
                  </span>
                </div>
                <div className="branch-panel__row">
                  <Icon name="mail" size={16} />
                  <a href={`mailto:${branch.email}`}>{branch.email}</a>
                </div>
                <div className="branch-panel__row">
                  <Icon name="factory" size={16} />
                  <span>
                    <strong>Nearby industrial area:</strong> {branch.industrialBelt}
                  </span>
                </div>
                <div className="branch-panel__row">
                  <Icon name="route" size={16} />
                  <span>
                    <strong>Coverage:</strong> {branch.coverage}
                  </span>
                </div>
              </div>

              {branch.services.length > 0 && (
                <div className="branch-panel__tags">
                  {branch.services.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              )}

              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="link-arrow"
              >
                Open in Google Maps
                <Icon name="external" size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BranchNetwork() {
  usePageMeta(
    'Branch Network',
    'Nine locations across Gujarat, Telangana, Andhra Pradesh and Karnataka — with managers, contact details and industrial coverage for each.'
  );

  // Footer links deep-link into a specific branch via ?branch=<id>.
  const [params] = useSearchParams();
  const requested = params.get('branch');
  const initialId = BRANCHES.some((b) => b.id === requested) ? requested : 'ankleshwar';

  const grouped = useMemo(
    () =>
      BRANCH_REGIONS.filter((r) => r !== 'All').map((region) => ({
        region,
        items: BRANCHES.filter((b) => b.region === region),
      })),
    []
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Branch Network' }]}
        eyebrow="Branch Network"
        title="Where industry moves, we move with it."
        lead="From Gujarat’s manufacturing belts to the corridors of the South, every branch brings local intelligence, ready capacity and one accountable team closer to the cargo."
        meta={[
          { value: BRANCHES.length, label: 'Branch locations' },
          { value: '4', label: 'States & UTs' },
          { value: '20+', label: 'Industrial belts' },
          { value: '72h', label: 'Typical reach' },
        ]}
      />

      <Section className="branch-network-map-section">
        <SectionHeading
          eyebrow="Live Network View"
          title="A network built around the work."
          lead="Filter by region, then hover or tap any node to see the branch manager, the belt it serves and the corridors it feeds."
        />
        <div className="branch-network-map__frame">
          <BranchLocator initialId={initialId} />
        </div>
      </Section>

      <Section tone="ice" className="branch-directory-section">
        <SectionHeading
          eyebrow="Branch Directory"
          title="Choose a location. Get the whole picture."
          lead="Every location has a local manager, direct contacts and a defined industrial catchment. Open one branch at a time to see its operating details."
        />

        <div className="branch-directory__overview">
          <div>
            <span className="branch-directory__overview-value numeric">{BRANCHES.length}</span>
            <span className="branch-directory__overview-label">active locations</span>
          </div>
          <div>
            <span className="branch-directory__overview-value numeric">4</span>
            <span className="branch-directory__overview-label">states connected</span>
          </div>
          <div>
            <span className="branch-directory__overview-value numeric">20+</span>
            <span className="branch-directory__overview-label">industrial belts</span>
          </div>
          <div className="branch-directory__overview-note">
            <Icon name="route" size={18} />
            <span>Tap any branch to reveal direct coordination details.</span>
          </div>
        </div>

        <div className="branch-directory__groups">
        {grouped.map((group) => (
          <div key={group.region} className="branch-directory__group">
            <Reveal className="branch-directory__group-head">
              <div>
                <span className="branch-directory__group-kicker">Operating region</span>
                <h3>{group.region}</h3>
              </div>
              <span className="badge">{group.items.length} branches</span>
            </Reveal>

            <motion.div
              className="branch-directory-grid"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {group.items.map((b, index) => (
                <BranchRow key={b.id} branch={b} index={index} />
              ))}
            </motion.div>
          </div>
        ))}
        </div>
      </Section>

      <CTABand
        title="Need a branch closer to your plant?"
        text="Our network expands where clients need it. Tell us the belt you operate in and we will tell you what we can already service from the nearest branch."
      />
    </>
  );
}
