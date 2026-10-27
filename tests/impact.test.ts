import { describe, expect, it } from 'vitest';
import { SUPPORTED_LOCALES } from '../src/i18n';
import { JUSTICE_REFERENCE_YEAR, justiceIndicators, justiceSources } from '../src/content/impact/justice';
import { CYBER_REFERENCE_YEAR, cyberSources, cyberStats } from '../src/content/impact/cyber';
import { BRAZIL_OUTLINE } from '../src/content/impact/brazilOutline';
import { profile } from '../src/content/profile';
import { BRAZIL_ASPECT, createSimulation, lonLatToPoint, mulberry32, outlinePoints, pointInPolygon } from '../src/components/impact/brazilMap';

const nonEmpty = (value: Record<string, string>) => SUPPORTED_LOCALES.every((locale) => (value[locale] ?? '').trim().length > 0);

describe('justice module data', () => {
  it('keeps the reference year and the headline ratio reported by the CNJ comparison', () => {
    expect(JUSTICE_REFERENCE_YEAR).toBe(2024);
    const byId = Object.fromEntries(justiceIndicators.map((indicator) => [indicator.id, indicator]));
    expect(byId['new-cases-per-100']!.brazil / byId['new-cases-per-100']!.eu).toBeCloseTo(4.18, 2);
    expect(byId['new-cases-per-judge']!.brazil / byId['new-cases-per-judge']!.eu).toBeCloseTo(8.4, 1);
  });

  it('labels per-inhabitant rates per 100 inhabitants (consistent with 39.4 M new cases / ~212 M inhabitants)', () => {
    const rate = justiceIndicators.find((indicator) => indicator.id === 'new-cases-per-100')!;
    expect(rate.unit['pt-BR']).toMatch(/por 100 habitantes/);
    expect(rate.unit.en).toMatch(/per 100 inhabitants/);
    expect((39_400_000 / 212_600_000) * 100).toBeCloseTo(rate.brazil, 0);
  });

  it('shows at most three indicators with localized labels, units and https sources', () => {
    expect(justiceIndicators.length).toBeLessThanOrEqual(3);
    for (const indicator of justiceIndicators) {
      expect(nonEmpty(indicator.label)).toBe(true);
      expect(nonEmpty(indicator.unit)).toBe(true);
      expect(indicator.brazil).toBeGreaterThan(0);
      expect(indicator.eu).toBeGreaterThan(0);
    }
    for (const source of justiceSources) {
      expect(source.url.startsWith('https://')).toBe(true);
      expect(nonEmpty(source.label)).toBe(true);
    }
  });
});

describe('cyber module data', () => {
  it('gives every figure a scope note, the 2025 period and an existing source', () => {
    const sourceIds = new Set(cyberSources.map((source) => source.id));
    expect(cyberStats.length).toBeLessThanOrEqual(2);
    for (const stat of cyberStats) {
      expect(nonEmpty(stat.value)).toBe(true);
      expect(nonEmpty(stat.label)).toBe(true);
      expect(nonEmpty(stat.note)).toBe(true);
      expect(stat.label.en).toContain(String(CYBER_REFERENCE_YEAR));
      expect(sourceIds.has(stat.sourceId)).toBe(true);
    }
    for (const source of cyberSources) expect(source.url.startsWith('https://')).toBe(true);
  });

  it('keeps the verified Brazil figure and its scope', () => {
    const brazil = cyberStats.find((stat) => stat.id === 'brazil-phishing-share')!;
    expect(brazil.value['pt-BR']).toBe('15,48%');
    expect(brazil.label.en).toMatch(/Brazil/);
    expect(brazil.note.en).toMatch(/not of the population/);
  });
});

describe('Brazil outline and simulation', () => {
  it('has a plausible outline: hundreds of points inside Brazil’s bounding box, taller than wide', () => {
    expect(BRAZIL_OUTLINE.length).toBeGreaterThan(150);
    for (const [lon, lat] of BRAZIL_OUTLINE) {
      expect(lon).toBeGreaterThanOrEqual(-74.1);
      expect(lon).toBeLessThanOrEqual(-33.7);
      expect(lat).toBeGreaterThanOrEqual(-34.9);
      expect(lat).toBeLessThanOrEqual(5.3);
    }
    expect(BRAZIL_ASPECT).toBeGreaterThan(0.85);
    expect(BRAZIL_ASPECT).toBeLessThan(1.15);
  });

  it('places Brasília inside the polygon and the Atlantic outside', () => {
    const polygon = outlinePoints(600, 600);
    expect(pointInPolygon(lonLatToPoint(-47.9, -15.8, 600, 600), polygon)).toBe(true);
    expect(pointInPolygon(lonLatToPoint(-35, -25, 600, 600), polygon)).toBe(false);
  });

  it('is deterministic, bounded and lands every strike inside the outline', () => {
    const polygon = outlinePoints(600, 600);
    const a = createSimulation(polygon, 600, 600, 11, 6);
    const b = createSimulation(polygon, 600, 600, 11, 6);
    for (let now = 0; now < 15_000; now += 100) {
      const strikesA = a.update(now);
      expect(strikesA.length).toBeLessThanOrEqual(6);
      expect(strikesA.map((s) => s.id)).toEqual(b.update(now).map((s) => s.id));
      for (const strike of strikesA) expect(pointInPolygon(strike.target, polygon)).toBe(true);
    }
    expect(a.update(15_000).length).toBeGreaterThan(0);
    const rand = mulberry32(1);
    for (let i = 0; i < 3; i++) {
      const value = rand();
      expect(value >= 0 && value < 1).toBe(true);
    }
  });
});

describe('profile presentation', () => {
  it('has no photograph field', () => {
    expect('photo' in profile).toBe(false);
    expect(profile.links.length).toBeGreaterThanOrEqual(3);
  });
});
