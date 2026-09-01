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
function BranchRow({ branch }) {
  const [open, setOpen] = useState(false);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${branch.address}, ${branch.city}`
  )}`;

  return (
    <motion.div variants={revealItem} className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          width: '100%',
          padding: '1.4rem 1.6rem',
          textAlign: 'left',
        }}
      >
        <span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.08rem' }}>
            {branch.city}
          </span>
          {branch.hq && (
            <span className="badge" style={{ marginLeft: '0.6rem', padding: '0.2rem 0.55rem' }}>
              Head Office
            </span>
          )}
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--grey)' }}>{branch.state}</span>
        </span>
        <span className="accordion__sign" style={{ transform: open ? 'rotate(45deg)' : 'none' }}>
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
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.6rem 1.6rem' }}>
              <div className="branch-panel__rows" style={{ marginTop: 0 }}>
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
                style={{ marginTop: '1.25rem' }}
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
        title="Presence measured in loading bays, not letterheads."
        lead="Every branch below is a working operation with its own manager, vehicles and industrial catchment — placed where our clients manufacture."
        meta={[
          { value: BRANCHES.length, label: 'Branch locations' },
          { value: '4', label: 'States & UTs' },
          { value: '20+', label: 'Industrial belts' },
          { value: '72h', label: 'Typical reach' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Interactive Map"
          title="Explore the network."
          lead="Filter by region, then hover or tap any node to see the branch manager, the belt it serves and the corridors it feeds."
        />
        <BranchLocator initialId={initialId} />
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="Branch Directory"
          title="Every branch, with a name and a number."
          lead="Expand a branch for the address, manager, direct contact details and the industrial area it covers."
        />

        {grouped.map((group) => (
          <div key={group.region} style={{ marginTop: '2.5rem' }}>
            <Reveal className="row" style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: 'var(--fs-h3)' }}>{group.region}</h3>
              <span className="badge">{group.items.length} branches</span>
            </Reveal>

            <motion.div
              className="grid grid--3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {group.items.map((b) => (
                <BranchRow key={b.id} branch={b} />
              ))}
            </motion.div>
          </div>
        ))}
      </Section>

      <CTABand
        title="Need a branch closer to your plant?"
        text="Our network expands where clients need it. Tell us the belt you operate in and we will tell you what we can already service from the nearest branch."
      />
    </>
  );
}
