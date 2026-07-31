import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import IndiaMap from './IndiaMap';
import Icon from '@/components/shared/Icon';
import Button from '@/components/buttons/Button';
import { BRANCHES, BRANCH_REGIONS } from '@/data/branches';

/** Region tabs + map + expanding detail panel. Shared by Home and Branch Network. */
export default function BranchLocator({ initialId = 'ahmedabad', showRegions = true }) {
  const [region, setRegion] = useState('All');
  const [activeId, setActiveId] = useState(initialId);

  const branches = useMemo(
    () => (region === 'All' ? BRANCHES : BRANCHES.filter((b) => b.region === region)),
    [region]
  );

  // If the filter hides the selected branch, fall back to the first in view.
  const active = branches.find((b) => b.id === activeId) ?? branches[0];

  const mapsHref = active
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${active.address}, ${active.city}`
      )}`
    : '#';

  return (
    <div>
      {showRegions && (
        <div className="branch-tabs">
          {BRANCH_REGIONS.map((r) => (
            <button
              key={r}
              className="branch-tab"
              data-active={region === r}
              onClick={() => setRegion(r)}
            >
              {r}
              <span className="muted" style={{ marginLeft: 6, fontSize: '0.75rem' }}>
                {r === 'All' ? BRANCHES.length : BRANCHES.filter((b) => b.region === r).length}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="map-layout">
        <div>
          <div className="map-stage">
            <div className="grid-backdrop" />
            <IndiaMap branches={branches} activeId={active?.id} onSelect={setActiveId} />
          </div>
          <div className="map-legend">
            <span>
              <i data-hq="true" /> Regional headquarters
            </span>
            <span>
              <i /> Branch location
            </span>
            <span>Hover or tap a node to view branch details</span>
          </div>
        </div>

        {/* Keyed remount rather than <AnimatePresence mode="wait">: selection is
            driven by hover, so an exit animation would queue and leave the panel
            trailing the cursor. This swaps instantly and fades the new content in. */}
        {active && (
          <motion.div
            className="branch-panel"
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="branch-panel__state">
              {active.state}
              {active.hq && ' · Regional HQ'}
            </span>
            <h3 className="branch-panel__city">{active.city}</h3>

            <div className="branch-panel__rows">
              <div className="branch-panel__row">
                <Icon name="pin" size={16} />
                <span>{active.address}</span>
              </div>
              <div className="branch-panel__row">
                <Icon name="users" size={16} />
                <span>
                  Branch Manager — <strong>{active.manager}</strong>
                </span>
              </div>
              <div className="branch-panel__row">
                <Icon name="phone" size={16} />
                <a href={`tel:${active.phone.replace(/\s/g, '')}`}>{active.phone}</a>
              </div>
              <div className="branch-panel__row">
                <Icon name="mail" size={16} />
                <a href={`mailto:${active.email}`}>{active.email}</a>
              </div>
              <div className="branch-panel__row">
                <Icon name="factory" size={16} />
                <span>
                  <strong>Industrial belt:</strong> {active.industrialBelt}
                </span>
              </div>
              <div className="branch-panel__row">
                <Icon name="route" size={16} />
                <span>
                  <strong>Coverage:</strong> {active.coverage}
                </span>
              </div>
            </div>

            <div className="branch-panel__tags">
              {active.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>

            <Button
              href={mapsHref}
              variant="ghost"
              size="sm"
              icon="external"
              style={{ marginTop: '1.25rem' }}
            >
              Open in Google Maps
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
