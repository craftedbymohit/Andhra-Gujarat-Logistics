import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import indiaOutlineMap from '../../../assets/indian_outline_map.png';
import Icon from '@/components/shared/Icon';
import Button from '@/components/buttons/Button';
import { BRANCHES, BRANCH_REGIONS, getBranchPhones } from '@/data/branches';

// The western cluster is geographically dense at this scale. These small,
// responsive offsets fan the visible markers out while the connector still
// points back to each branch's exact geographic position.
const MAP_PIN_OFFSETS = {
  ahmedabad: { x: 2.4, y: -1.1 },
  ankleshwar: { x: 2.8, y: -1.3 },
  basavakalyan: { x: -2.1, y: -1.2 },
  kim: { x: -2.4, y: 0.15 },
  surat: { x: 2.8, y: 1.3 },
  vapi: { x: -2.8, y: 1.8 },
  vijayawada: { x: 2.1, y: 0.8 },
};

// The supplied outline image is a 1254px square. These bounds track its
// geographic outline so the pins stay anchored to the correct locations.
const MAP_IMAGE = {
  width: 1254,
  height: 1254,
  left: 136,
  right: 1158,
  top: 53,
  bottom: 1141,
  minLng: 68.1,
  maxLng: 97.4,
  minLat: 8,
  maxLat: 35.7,
};

function getMapPoint({ lat, lng }) {
  const x = MAP_IMAGE.left + ((lng - MAP_IMAGE.minLng) / (MAP_IMAGE.maxLng - MAP_IMAGE.minLng)) * (MAP_IMAGE.right - MAP_IMAGE.left);
  const y = MAP_IMAGE.top + ((MAP_IMAGE.maxLat - lat) / (MAP_IMAGE.maxLat - MAP_IMAGE.minLat)) * (MAP_IMAGE.bottom - MAP_IMAGE.top);

  return {
    x: (x / MAP_IMAGE.width) * 100,
    y: (y / MAP_IMAGE.height) * 100,
  };
}

function getPinPosition(branch) {
  const point = getMapPoint(branch);
  const offset = MAP_PIN_OFFSETS[branch.id] ?? { x: 0, y: 0 };

  return {
    left: `${point.x + offset.x}%`,
    top: `${point.y + offset.y}%`,
  };
}

function getConnector(branch) {
  const point = getMapPoint(branch);
  const offset = MAP_PIN_OFFSETS[branch.id] ?? { x: 0, y: 0 };

  return {
    x1: point.x,
    y1: point.y,
    x2: point.x + offset.x,
    y2: point.y + offset.y,
  };
}

/** Region tabs + map + expanding detail panel. Shared by Home and Branch Network. */
export default function BranchLocator({ initialId = 'ankleshwar', showRegions = true }) {
  const [region, setRegion] = useState('All');
  const [activeId, setActiveId] = useState(initialId);

  const branches = useMemo(
    () => (region === 'All' ? BRANCHES : BRANCHES.filter((b) => b.region === region)),
    [region]
  );

  // If the filter hides the selected branch, fall back to the first in view.
  const active = branches.find((b) => b.id === activeId) ?? branches[0];
  const mapBranches = branches;

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
            <div className="map-visual" role="img" aria-label="Outline map of India">
              <img className="map-base map-base--glow" src={indiaOutlineMap} alt="" aria-hidden="true" />
              <img className="map-base" src={indiaOutlineMap} alt="Outline map of India" />
              <svg className="map-connectors" viewBox="0 0 100 100" aria-hidden="true">
                {mapBranches.map((branch) => {
                  const connector = getConnector(branch);

                  return (
                    <line
                      key={branch.id}
                      className="map-connector"
                      data-active={active?.id === branch.id}
                      x1={connector.x1}
                      y1={connector.y1}
                      x2={connector.x2}
                      y2={connector.y2}
                    />
                  );
                })}
              </svg>
              {mapBranches.map((branch) => (
                <button
                  className="map-pin"
                  data-active={active?.id === branch.id}
                  data-hq={Boolean(branch.hq)}
                  key={branch.id}
                  type="button"
                  style={getPinPosition(branch)}
                  onClick={() => setActiveId(branch.id)}
                  aria-label={`Show ${branch.city}, ${branch.state}`}
                >
                  <Icon name="pin" size={15} />
                </button>
              ))}
            </div>
            <div className="map-legend">
              <span>
                <i data-hq="true" /> Head office
              </span>
              <span>
                <i /> Gujarat · Andhra Pradesh · Telangana · Karnataka
              </span>
            </div>
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
              {active.hq && ' · Head Office'}
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
                <span>
                  Mob.{' '}
                  {getBranchPhones(active).map((phone, index) => (
                    <span key={phone}>
                      {index > 0 && ' · '}
                      <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
                    </span>
                  ))}
                </span>
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

            {active.services.length > 0 && (
              <div className="branch-panel__tags">
                {active.services.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            )}

            <div className="branch-panel__footer">
              <div className="branch-panel__footer-copy">
                <span className="eyebrow">Direct coordination</span>
                <p>Connect with the local team for route and dispatch support.</p>
              </div>
              <div className="branch-panel__actions">
                <Button
                  href={`tel:${getBranchPhones(active)[0].replace(/\D/g, '')}`}
                  size="sm"
                  icon="phone"
                >
                  Call branch
                </Button>
                <Button href={mapsHref} variant="ghost" size="sm" icon="external">
                  Open in Maps
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
