#!/usr/bin/env node
/**
 * Prepares src/assets/bust.glb from the owner's photogrammetry scan (a glTF binary). The file is imported through
 * Vite, so its published name carries a content hash and a new scan is never served from a cache of the old one.
 * The bust is rendered as glass, so the photographic texture, UVs and baked normals are dropped;
 * positions are welded, the mesh is simplified (meshoptimizer) and quantized (KHR_mesh_quantization,
 * decoded natively by three.js). Normals are recomputed at load time.
 *
 * The packages are NOT project dependencies; install them ad hoc in a temporary folder:
 *   mkdir /tmp/gltf && cd /tmp/gltf && npm i @gltf-transform/core @gltf-transform/functions @gltf-transform/extensions meshoptimizer
 *   NODE_PATH=/tmp/gltf/node_modules node scripts/optimize-bust.mjs <source.glb> src/assets/bust.glb 0.45
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(process.env.NODE_PATH ? `${process.env.NODE_PATH}/` : import.meta.url);
const { NodeIO } = require('@gltf-transform/core');
const { ALL_EXTENSIONS } = require('@gltf-transform/extensions');
const { dedup, prune, quantize, simplify, weld } = require('@gltf-transform/functions');
const { MeshoptSimplifier } = require('meshoptimizer');

const [, , input, output, ratioArg = '0.6'] = process.argv;
if (!input || !output) {
  console.error('usage: optimize-bust.mjs <input.glb> <output.glb> [ratio]');
  process.exit(1);
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(input);
for (const material of doc.getRoot().listMaterials()) material.setBaseColorTexture(null);
for (const texture of doc.getRoot().listTextures()) texture.dispose();
for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    prim.setAttribute('TEXCOORD_0', null);
    prim.setAttribute('NORMAL', null);
  }
}
await MeshoptSimplifier.ready;
await doc.transform(
  dedup(),
  prune(),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: Number(ratioArg), error: 0.01 }),
  weld(),
  quantize({ quantizePosition: 14 }),
  prune(),
);
await io.write(output, doc);
for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    console.log(`vertices ${prim.getAttribute('POSITION').getCount()}, triangles ${prim.getIndices().getCount() / 3}`);
  }
}
console.log(`${output}: ${readFileSync(output).length} bytes`);
