import { describe, expect, it } from 'vitest';
import { SUPPORTED_LOCALES } from '../src/i18n';
import {
  JUSTICE_REFERENCE_YEAR,
  justiceIndicators,
  justiceSources,
  pendingStock,
} from '../src/content/impact/justice';
import {
  CYBER_REFERENCE_YEAR,
  cyberSources,
  cyberStats,
  growthCategories,
  growthSeries,
  hubs,
  threatCategories,
} from '../src/content/impact/cyber';
import { WORLD_GRID, decodeWorldGrid } from '../src/content/impact/worldGrid';
import { profile } from '../src/content/profile';
import { arcControl, createSimulation, mulberry32, project, quadraticPoint } from '../src/components/impact/threatSim';

const nonEmpty = (value: Record<string, string>) => SUPPORTED_LOCALES.every((locale) => (value[locale] ?? '').trim().length > 0);

describe('justice module data', () => {
  it('keeps the reference year and the headline ratios reported by the CNJ comparison', () => {
    expect(JUSTICE_REFERENCE_YEAR).toBe(2024);
    const byId = Object.fromEntries(justiceIndicators.map((indicator) => [indicator.id, indicator]));
    expect(byId['new-cases-per-100']!.brazil / byId['new-cases-per-100']!.eu).toBeCloseTo(4.18, 2);
    expect(byId['resolved-cases-per-100']!.brazil / byId['resolved-cases-per-100']!.eu).toBeCloseTo(4.7, 1);
    expect(byId['pending-cases-per-100']!.brazil / byId['pending-cases-per-100']!.eu).toBeCloseTo(14.7, 1);
  });

  it('labels per-inhabitant rates per 100 inhabitants (consistent with 39.4 M new cases / ~212 M inhabitants)', () => {
    const rate = justiceIndicators.find((indicator) => indicator.id === 'new-cases-per-100')!;
    expect(rate.unit['pt-BR']).toMatch(/por 100 habitantes/);
    expect(rate.unit.en).toMatch(/per 100 inhabitants/);
    expect((39_400_000 / 212_600_000) * 100).toBeCloseTo(rate.brazil, 0);
  });

  it('has two or three primary indicators and localized labels, units and notes', () => {
    const primary = justiceIndicators.filter((indicator) => indicator.tier === 'primary');
    expect(primary.length).toBeGreaterThanOrEqual(2);
    expect(primary.length).toBeLessThanOrEqual(3);
    for (const indicator of justiceIndicators) {
      expect(nonEmpty(indicator.label)).toBe(true);
      expect(nonEmpty(indicator.unit)).toBe(true);
      if (indicator.note) expect(nonEmpty(indicator.note)).toBe(true);
      expect(indicator.brazil).toBeGreaterThan(0);
      expect(indicator.eu).toBeGreaterThan(0);
    }
  });

  it('presents the pending stock as an absolute national total with its previous value', () => {
    expect(pendingStock.value).toBe(80_600_000);
    expect(pendingStock.previousValue).toBe(84_100_000);
    expect(pendingStock.year).toBe(JUSTICE_REFERENCE_YEAR);
  });

  it('links every source over https with a localized label', () => {
    for (const source of justiceSources) {
      expect(source.url.startsWith('https://')).toBe(true);
      expect(nonEmpty(source.label)).toBe(true);
    }
  });
});

describe('cyber module data', () => {
  it('gives every statistic a scope, period, method and an existing source', () => {
    const sourceIds = new Set(cyberSources.map((source) => source.id));
    for (const stat of cyberStats) {
      expect(nonEmpty(stat.value)).toBe(true);
      expect(nonEmpty(stat.label)).toBe(true);
      expect(nonEmpty(stat.scope)).toBe(true);
      expect(nonEmpty(stat.period)).toBe(true);
      expect(nonEmpty(stat.method)).toBe(true);
      expect(stat.period.en).toContain(String(CYBER_REFERENCE_YEAR));
      expect(sourceIds.has(stat.sourceId)).toBe(true);
    }
    for (const series of growthSeries) expect(sourceIds.has(series.sourceId)).toBe(true);
  });

  it('keeps the verified 2025 figures', () => {
    const byId = Object.fromEntries(cyberStats.map((stat) => [stat.id, stat]));
    expect(byId['phishing-links-blocked']!.value.en).toBe('554,002,207');
    expect(byId['brazil-phishing-share']!.value['pt-BR']).toBe('15,48%');
    expect(byId['brazil-phishing-share']!.scope.en).toMatch(/Brazil/);
    const latam = growthSeries.find((series) => series.id === 'latam')!;
    expect(latam.values).toEqual({ backdoors: 24, passwordStealers: 35, spyware: 64 });
    expect(growthCategories.map((category) => category.id)).toEqual(['backdoors', 'passwordStealers', 'spyware']);
  });

  it('uses distinct semantic colors for the simulated categories and valid hub coordinates', () => {
    const colors = new Set(threatCategories.map((category) => category.color));
    expect(colors.size).toBe(threatCategories.length);
    for (const hub of hubs) {
      expect(hub.lon).toBeGreaterThanOrEqual(-180);
      expect(hub.lon).toBeLessThanOrEqual(180);
      expect(hub.lat).toBeLessThanOrEqual(WORLD_GRID.latTop);
      expect(hub.lat).toBeGreaterThanOrEqual(WORLD_GRID.latBottom);
      expect(hub.weight).toBeGreaterThan(0);
    }
  });
});

describe('world grid and simulation', () => {
  it('decodes to the declared size with a plausible land share', () => {
    const cells = decodeWorldGrid();
    expect(cells.length).toBe(WORLD_GRID.cols * WORLD_GRID.rows);
    const land = cells.reduce((sum, cell) => sum + cell, 0);
    const share = land / cells.length;
    expect(share).toBeGreaterThan(0.2);
    expect(share).toBeLessThan(0.45);
    // Brasília (−47.9, −15.8) is land; the middle of the South Atlantic (−20, −25) is water.
    const cell = (lon: number, lat: number) => {
      const col = Math.floor(((lon + 180) / 360) * WORLD_GRID.cols);
      const row = Math.floor(((WORLD_GRID.latTop - lat) / (WORLD_GRID.latTop - WORLD_GRID.latBottom)) * WORLD_GRID.rows);
      return cells[row * WORLD_GRID.cols + col];
    };
    expect(cell(-47.9, -15.8)).toBe(1);
    expect(cell(-20, -25)).toBe(0);
  });

  it('projects longitude/latitude inside the map box', () => {
    const p = project(0, 0, 960, 376);
    expect(p.x).toBe(480);
    expect(p.y).toBeGreaterThan(0);
    expect(p.y).toBeLessThan(376);
    const c = arcControl({ x: 0, y: 100 }, { x: 200, y: 100 });
    expect(c.y).toBeLessThan(100);
    expect(quadraticPoint({ x: 0, y: 0 }, { x: 5, y: 5 }, { x: 10, y: 0 }, 1)).toEqual({ x: 10, y: 0 });
  });

  it('is deterministic, bounded and never routes an event to its own origin', () => {
    const a = createSimulation(7, 10);
    const b = createSimulation(7, 10);
    for (let now = 0; now < 20_000; now += 100) {
      const eventsA = a.update(now);
      const eventsB = b.update(now);
      expect(eventsA.length).toBeLessThanOrEqual(10);
      expect(eventsA.map((event) => event.id)).toEqual(eventsB.map((event) => event.id));
      for (const event of eventsA) expect(event.from.id).not.toBe(event.to.id);
    }
    expect(a.update(20_000).length).toBeGreaterThan(0);
    const rand = mulberry32(1);
    const values = [rand(), rand(), rand()];
    for (const value of values) expect(value >= 0 && value < 1).toBe(true);
  });
});

describe('profile presentation', () => {
  it('has no photograph field or reference', () => {
    expect('photo' in profile).toBe(false);
    expect(profile.links.length).toBeGreaterThanOrEqual(3);
  });
});
