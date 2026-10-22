import { en, type Dictionary } from './locales/en';
import { ptBR } from './locales/pt-BR';
import type { Locale } from './locales';

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  'pt-BR': ptBR,
};

export type { Dictionary };
export { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_LABELS, isLocale } from './locales';
export type { Locale, Localized } from './locales';
export { LanguageProvider, useI18n } from './LanguageProvider';

/** Minimal `{name}`-style interpolation for UI strings. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
