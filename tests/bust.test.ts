import { readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('glass bust assets', () => {
  it('ships a small, texture-free glTF binary', () => {
    const glb = readFileSync('public/models/bust.glb');
    expect(glb.toString('ascii', 0, 4)).toBe('glTF');
    const jsonLength = glb.readUInt32LE(12);
    const json = JSON.parse(glb.toString('utf8', 20, 20 + jsonLength)) as { images?: unknown[]; meshes: { primitives: { attributes: Record<string, number> }[] }[] };
    expect(json.images ?? []).toHaveLength(0);
    expect(json.meshes[0]?.primitives[0]?.attributes.POSITION).toBeDefined();
    expect(glb.length).toBeLessThan(400_000);
  });

  it('ships the static render used as placeholder and fallback', () => {
    expect(statSync('public/images/bust-static.png').size).toBeGreaterThan(10_000);
  });
});
