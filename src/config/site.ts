import type { Locale } from '../i18n/locales';

/**
 * Site-level configuration (navigation, documents, repository).
 * Content about the person lives in src/content; UI strings in src/i18n.
 */

/** Panels in navigation order. Each has a title/lead under `panels` in the dictionaries. */
export const PANEL_IDS = ['papers', 'projects', 'curriculum', 'organizations'] as const;
export type PanelId = (typeof PANEL_IDS)[number];

/** Header navigation order: the impact section (data modules) first, then the panels. */
export const NAV_IDS = ['impact', 'projects', 'curriculum', 'papers', 'organizations'] as const;
export type NavId = (typeof NAV_IDS)[number];

/**
 * CV files for download, relative to the `public/` folder (e.g. "cv/Gabriel_Resende_CV_EN.pdf").
 * `null` hides the button for that language. Only place files here that are approved for public release.
 */
export const CV_FILES: Record<Locale, string | null> = {
  en: null,
  'pt-BR': null,
};

/** Public repository of this site (shown in the footer). */
export const SITE_REPOSITORY_URL = 'https://github.com/resende-g/resende-g.github.io';

/** Resolves a path under `public/` against the configured base path. */
export function publicPath(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
}
