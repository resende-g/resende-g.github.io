#!/usr/bin/env node
/**
 * Writes src/content/impact/brazilOutline.ts: Brazil's mainland outline (longitude/latitude pairs) simplified with
 * Douglas-Peucker from Natural Earth 1:50m country polygons (world-atlas package, public domain).
 *
 * The packages are NOT project dependencies; install them ad hoc in a temporary folder:
 *   mkdir /tmp/geo && cd /tmp/geo && npm i world-atlas@2 topojson-client@3
 *   NODE_PATH=/tmp/geo/node_modules node scripts/build-brazil-outline.mjs > src/content/impact/brazilOutline.ts
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(process.env.NODE_PATH ? `${process.env.NODE_PATH}/` : import.meta.url);
const topojson = require('topojson-client');
const topo = JSON.parse(readFileSync(require.resolve('world-atlas/countries-50m.json'), 'utf8'));
const brazil = topojson.feature(topo, topo.objects.countries).features.find((f) => f.id === '076');
const main = brazil.geometry.coordinates.map((polygon) => polygon[0]).sort((a, b) => b.length - a.length)[0];

const TOLERANCE = 0.08; // degrees

function simplify(points, tol) {
  if (points.length < 3) return points;
  const a = points[0];
  const b = points[points.length - 1];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  let maxD = 0;
  let idx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = Math.abs(dy * points[i][0] - dx * points[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > maxD) {
      maxD = d;
      idx = i;
    }
  }
  if (maxD <= tol) return [a, b];
  return [...simplify(points.slice(0, idx + 1), tol).slice(0, -1), ...simplify(points.slice(idx), tol)];
}

// The ring is closed: split it at the point farthest from the start so each half has a real baseline.
let far = 0;
let farD = 0;
for (let i = 1; i < main.length; i++) {
  const d = Math.hypot(main[i][0] - main[0][0], main[i][1] - main[0][1]);
  if (d > farD) {
    farD = d;
    far = i;
  }
}
const ring = [...simplify(main.slice(0, far + 1), TOLERANCE).slice(0, -1), ...simplify(main.slice(far), TOLERANCE).slice(0, -1)];
const rounded = ring.map(([lon, lat]) => [Number(lon.toFixed(2)), Number(lat.toFixed(2))]);

process.stdout.write(`/**
 * Brazil's mainland outline as [longitude, latitude] pairs (${rounded.length} points), simplified from Natural Earth
 * 1:50m country polygons (world-atlas, public domain) by scripts/build-brazil-outline.mjs. Do not edit by hand.
 */
export const BRAZIL_OUTLINE: ReadonlyArray<readonly [number, number]> = ${JSON.stringify(rounded)};
`);
