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

/** Simplified India outline, projected from the same bounding box. */
export const INDIA_PATH = `M 160 37 L 192 58 L 202 90 L 226 134 L 266 155 L 303 179 L 340 192
L 353 198 L 363 211 L 405 198 L 443 185 L 476 168 L 490 179 L 476 192 L 484 226
L 443 252 L 427 286 L 413 299 L 408 258 L 389 259 L 369 289 L 340 297 L 323 299
L 321 314 L 292 336 L 258 360 L 229 396 L 215 407 L 213 448 L 206 478 L 200 508
L 181 530 L 169 549 L 153 532 L 142 485 L 126 457 L 110 413 L 95 366 L 94 343
L 92 308 L 90 295 L 84 284 L 65 310 L 44 293 L 32 280 L 48 271 L 24 259 L 19 246
L 48 246 L 65 196 L 97 149 L 123 121 L 113 93 L 111 65 L 129 47 Z`;
