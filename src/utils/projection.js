/**
 * Equirectangular projection tuned to the India map viewBox.
 * Keeping this in one place means branch data only ever stores lat/lng.
 */

export const MAP_VIEWBOX = { width: 500, height: 560 };

// Bounding box the outline path was drawn against.
const BOUNDS = { minLng: 67, maxLng: 98, minLat: 7.5, maxLat: 37.5 };

export function project(lat, lng) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * MAP_VIEWBOX.width;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * MAP_VIEWBOX.height;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

/**
 * Quadratic curve between two projected points, bowed perpendicular to the
 * lane so overlapping routes stay readable.
 */
export function laneCurve(a, b, bow = 0.16) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return `M ${a.x} ${a.y} Q ${mx - dy * bow} ${my + dx * bow} ${b.x} ${b.y}`;
}
