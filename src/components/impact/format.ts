import type { Locale } from '../../i18n/locales';

const INTL_LOCALE: Record<Locale, string> = { en: 'en-US', 'pt-BR': 'pt-BR' };

export function formatNumber(value: number, locale: Locale, decimals = 0): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

/** 80_600_000 → "80.6 million" / "80,6 milhões". */
export function formatMillions(value: number, locale: Locale): string {
  const millions = formatNumber(value / 1_000_000, locale, 1);
  return locale === 'pt-BR' ? `${millions} milhões` : `${millions} million`;
}

export function formatRatio(a: number, b: number, locale: Locale): string {
  return formatNumber(a / b, locale, 1);
}
