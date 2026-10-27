import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, dictionaries, format, isLocale } from '../src/i18n';
import { experience } from '../src/content/experience';
import { projects } from '../src/content/projects';
import { profile } from '../src/content/profile';
import { CV_FILES } from '../src/config/site';

type Tree = { [key: string]: string | Tree };

function leafPaths(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [path] : leafPaths(value, path);
  });
}

function emptyLeaves(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') return value.trim() === '' ? [path] : [];
    return emptyLeaves(value, path);
  });
}

describe('i18n configuration', () => {
  it('defaults to English', () => {
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('has a dictionary for every supported locale', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(dictionaries[locale]).toBeDefined();
    }
  });

  it('validates locale tags strictly', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('pt-BR')).toBe(true);
    expect(isLocale('pt')).toBe(false);
    expect(isLocale(null)).toBe(false);
  });

  it('interpolates named placeholders', () => {
    expect(format('Switch to {name}', { name: 'English' })).toBe('Switch to English');
    expect(format('No {missing} value', {})).toBe('No {missing} value');
  });
});

describe('UI dictionaries', () => {
  const reference = leafPaths(dictionaries.en as unknown as Tree).sort();

  it.each(SUPPORTED_LOCALES)('%s has the same keys as English', (locale) => {
    expect(leafPaths(dictionaries[locale] as unknown as Tree).sort()).toEqual(reference);
  });

  it.each(SUPPORTED_LOCALES)('%s has no empty strings', (locale) => {
    expect(emptyLeaves(dictionaries[locale] as unknown as Tree)).toEqual([]);
  });
});

describe('localized content', () => {
  const samples = [
    ...profile.tagline,
    profile.summary,
    ...experience.flatMap((entry) => [entry.role, entry.period, ...entry.highlights]),
    ...projects.map((project) => project.description),
  ];

  it('provides non-empty text for every supported locale', () => {
    for (const sample of samples) {
      for (const locale of SUPPORTED_LOCALES) {
        expect(sample[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('only links to https URLs or the Lattes platform', () => {
    const urls = [...profile.links.map((link) => link.url), ...projects.flatMap((p) => [p.repositoryUrl, p.demoUrl ?? ''])];
    for (const url of urls.filter(Boolean)) {
      expect(url.startsWith('https://') || url.startsWith('http://lattes.cnpq.br/')).toBe(true);
    }
  });

  it('declares CV files for every locale (null allowed)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(locale in CV_FILES).toBe(true);
    }
  });
});
