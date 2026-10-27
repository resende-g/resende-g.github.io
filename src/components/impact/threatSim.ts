import { hubs, threatCategories, type Hub, type ThreatCategory } from '../../content/impact/cyber';
import { WORLD_GRID } from '../../content/impact/worldGrid';

/** Deterministic PRNG (mulberry32) so the demonstration is reproducible and clearly not data-driven. */
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

/** Equirectangular projection onto the land-grid bounds. */
export function project(lon: number, lat: number, width: number, height: number): Point {
  const { latTop, latBottom } = WORLD_GRID;
  return {
    x: ((lon + 180) / 360) * width,
    y: ((latTop - lat) / (latTop - latBottom)) * height,
  };
}

/** Control point of a quadratic arc: perpendicular offset proportional to the distance, bowing upward. */
export function arcControl(a: Point, b: Point): Point {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy) || 1;
  const bow = Math.min(0.28 * distance, 90);
  // Perpendicular unit vector chosen so the arc rises (negative y) on screen.
  let nx = -dy / distance;
  let ny = dx / distance;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: mx + nx * bow, y: my + ny * bow };
}

export function quadraticPoint(a: Point, c: Point, b: Point, t: number): Point {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
}

export interface SimEvent {
  id: number;
  from: Hub;
  to: Hub;
  category: ThreatCategory;
  /** Timestamp (ms) when the event started. */
  start: number;
  /** Total lifetime in ms (arc travel + fade). */
  duration: number;
}

const CATEGORY_IDS = threatCategories.map((category) => category.id);

function pickHub(rand: () => number, exclude?: Hub): Hub {
  const candidates = exclude ? hubs.filter((hub) => hub.id !== exclude.id) : hubs;
  const total = candidates.reduce((sum, hub) => sum + hub.weight, 0);
  let r = rand() * total;
  for (const hub of candidates) {
    r -= hub.weight;
    if (r <= 0) return hub;
  }
  return candidates[candidates.length - 1] ?? hubs[0]!;
}

export interface Simulation {
  /** Advances the simulation to `now` and returns the currently active events. */
  update: (now: number) => SimEvent[];
}

/**
 * Generates synthetic events: an origin hub, a destination hub and a category, at a steady pace.
 * Nothing here derives from telemetry; the weights only keep the picture varied.
 */
export function createSimulation(seed = 7, maxActive = 10): Simulation {
  const rand = mulberry32(seed);
  let events: SimEvent[] = [];
  let nextId = 0;
  let nextSpawn = 0;

  return {
    update(now) {
      events = events.filter((event) => now - event.start < event.duration);
      if (now >= nextSpawn && events.length < maxActive) {
        const from = pickHub(rand);
        const to = pickHub(rand, from);
        events.push({
          id: nextId++,
          from,
          to,
          category: CATEGORY_IDS[Math.floor(rand() * CATEGORY_IDS.length)] ?? 'phishing',
          start: now,
          duration: 2600 + rand() * 900,
        });
        nextSpawn = now + 380 + rand() * 520;
      }
      return events;
    },
  };
}

/** Fixed events for the static fallback (same vocabulary as the animation, no randomness). */
export const STATIC_EVENTS: { from: string; to: string; category: ThreatCategory }[] = [
  { from: 'mow', to: 'sao', category: 'malware' },
  { from: 'nyc', to: 'bsb', category: 'phishing' },
  { from: 'sin', to: 'fra', category: 'credential' },
  { from: 'los', to: 'mad', category: 'phishing' },
  { from: 'bjs', to: 'sfo', category: 'credential' },
  { from: 'sao', to: 'mex', category: 'malware' },
  { from: 'bom', to: 'lon', category: 'phishing' },
];

export function hubById(id: string): Hub {
  const hub = hubs.find((candidate) => candidate.id === id);
  if (!hub) throw new Error(`Unknown hub: ${id}`);
  return hub;
}

export function categoryColor(category: ThreatCategory): string {
  return threatCategories.find((candidate) => candidate.id === category)?.color ?? '#ffffff';
}
