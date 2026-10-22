/**
 * Supported locales. To add a language:
 * 1. Append its BCP 47 tag here.
 * 2. Add a dictionary in ./locales/<tag>.ts and register it in ./index.ts.
 * 3. Fill the new key in every `Localized` field under src/content (the compiler lists what is missing).
 */
export const SUPPORTED_LOCALES = ['en', 'pt-BR'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** A piece of content with one value per supported locale. */
export type Localized = Record<Locale, string>;

/** Native-language label shown in the language switch. */
export const LOCALE_LABELS: Record<Locale, { short: string; name: string }> = {
  en: { short: 'EN', name: 'English' },
  'pt-BR': { short: 'PT', name: 'Português (Brasil)' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
