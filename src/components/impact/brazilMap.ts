import { BRAZIL_OUTLINE } from '../../content/impact/brazilOutline';

/** Deterministic PRNG (mulberry32): the demonstration is reproducible and clearly not data-driven. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Point {
  x: number;
  y: number;
}

const lons = BRAZIL_OUTLINE.map((p) => p[0]);
const lats = BRAZIL_OUTLINE.map((p) => p[1]);
const BOUNDS = { west: Math.min(...lons), east: Math.max(...lons), south: Math.min(...lats), north: Math.max(...lats) };
const MEAN_LAT = (BOUNDS.north + BOUNDS.south) / 2;
/** Width / height of the outline's box after the equirectangular aspect correction. */
export const BRAZIL_ASPECT = ((BOUNDS.east - BOUNDS.west) * Math.cos((MEAN_LAT * Math.PI) / 180)) / (BOUNDS.north - BOUNDS.south);

/** Outline scaled into a width × height box with the given padding (fraction of the box). */
export function outlinePoints(width: number, height: number, padding = 0.06): Point[] {
  return BRAZIL_OUTLINE.map(([lon, lat]) => lonLatToPoint(lon, lat, width, height, padding));
}

export function pointInPolygon(point: Point, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i]!;
    const b = polygon[j]!;
    if (a.y > point.y !== b.y > point.y && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

export interface Strike {
  id: number;
  /** Impact point inside the outline. */
  target: Point;
  start: number;
  duration: number;
}

export interface Simulation {
  /** Advances to `now` and returns the strikes alive at that time. */
  update: (now: number) => Strike[];
}

/** Synthetic "falling" events landing on random points inside the outline, at a steady pace. */
export function createSimulation(polygon: Point[], width: number, height: number, seed = 11, maxActive = 6): Simulation {
  const rand = mulberry32(seed);
  const randomTarget = (): Point => {
    for (let i = 0; i < 200; i++) {
      const candidate = { x: rand() * width, y: rand() * height };
      if (pointInPolygon(candidate, polygon)) return candidate;
    }
    return polygon[0] ?? { x: width / 2, y: height / 2 };
  };
  let strikes: Strike[] = [];
  let nextId = 0;
  let nextSpawn = 0;
  return {
    update(now) {
      strikes = strikes.filter((strike) => now - strike.start < strike.duration);
      if (now >= nextSpawn && strikes.length < maxActive) {
        strikes.push({ id: nextId++, target: randomTarget(), start: now, duration: 1900 + rand() * 700 });
        nextSpawn = now + 320 + rand() * 480;
      }
      return strikes;
    },
  };
}

/** Fixed strikes for the static version (progress 0..1 along the fall). */
export const STATIC_STRIKES: { lon: number; lat: number; progress: number }[] = [
  { lon: -46.6, lat: -23.5, progress: 0.62 },
  { lon: -47.9, lat: -15.8, progress: 0.9 },
  { lon: -38.5, lat: -12.97, progress: 0.4 },
  { lon: -60.0, lat: -3.1, progress: 0.75 },
];

export function lonLatToPoint(lon: number, lat: number, width: number, height: number, padding = 0.06): Point {
  const innerW = width * (1 - 2 * padding);
  const innerH = height * (1 - 2 * padding);
  const scale = Math.min(innerW / BRAZIL_ASPECT, innerH);
  const boxW = scale * BRAZIL_ASPECT;
  const boxH = scale;
  return {
    x: (width - boxW) / 2 + ((lon - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * boxW,
    y: (height - boxH) / 2 + ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * boxH,
  };
}
