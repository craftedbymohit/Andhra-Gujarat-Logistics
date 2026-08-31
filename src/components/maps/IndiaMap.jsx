import { useMemo } from 'react';
import indiaMap from '../../../assets/india-states-map.svg';
import { BRANCHES, NETWORK_LANES } from '@/data/branches';
import { MAP_VIEWBOX, laneCurve, project } from '@/utils/projection';

/**
 * Interactive India map with a current, detailed India base map. Branch
 * coordinates come straight from lat/lng in data/branches.js.
 */
export default function IndiaMap({ branches = BRANCHES, activeId, onSelect }) {
  // Project once per branch list rather than on every render of every node.
  const points = useMemo(() => {
    const map = new Map();
    BRANCHES.forEach((b) => map.set(b.id, project(b.lat, b.lng)));
    return map;
  }, []);

  const visible = new Set(branches.map((b) => b.id));
  const lanes = NETWORK_LANES.filter(([a, b]) => visible.has(a) && visible.has(b));

  return (
    <div className="map-visual">
      <img className="map-base" src={indiaMap} alt="Map of India showing states and union territories" />
      <svg
        className="map-svg"
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        role="img"
        aria-label="Interactive Andhra Gujarat Logistics branch network across India"
      >
        {lanes.map(([a, b]) => (
          <path key={`${a}-${b}`} className="map-route" d={laneCurve(points.get(a), points.get(b))} />
        ))}

        {branches.map((branch) => {
          const p = points.get(branch.id);
          const active = activeId === branch.id;

          return (
            <g
              key={branch.id}
              className="map-node"
              data-active={active}
              data-hq={Boolean(branch.hq)}
              onMouseEnter={() => onSelect?.(branch.id)}
              onClick={() => onSelect?.(branch.id)}
              tabIndex={0}
              role="button"
              aria-label={`${branch.city}, ${branch.state}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect?.(branch.id)}
            >
              <circle className="map-node__halo" cx={p.x} cy={p.y} r={branch.hq ? 8 : 6} />
              <circle className="map-node__core" cx={p.x} cy={p.y} r={branch.hq ? 6 : 4.5} />
              <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
              <text className="map-node__label" x={p.x + 10} y={p.y + 3}>
                {branch.city}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
