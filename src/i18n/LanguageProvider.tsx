import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { dictionaries, type Dictionary } from './index';
import { DEFAULT_LOCALE, isLocale, type Locale, type Localized } from './locales';

const STORAGE_KEY = 'portfolio.locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI dictionary for the active locale. */
  t: Dictionary;
  /** Resolves a localized content field for the active locale. */
  tr: (value: Localized) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

function writeStoredLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage may be unavailable (private mode, blocked). The preference simply is not persisted.
  }
}

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
  const element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (element) element.setAttribute('content', content);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is always the initial render; a stored preference is applied immediately after mount.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== DEFAULT_LOCALE) setLocaleState(stored);
  }, []);

  useEffect(() => {
    const dictionary = dictionaries[locale];
    document.documentElement.lang = locale;
    document.title = dictionary.meta.title;
    setMeta('description', dictionary.meta.description);
    setMeta('og:title', dictionary.meta.title, 'property');
    setMeta('og:description', dictionary.meta.description, 'property');
    setMeta('og:locale', locale === 'pt-BR' ? 'pt_BR' : 'en_US', 'property');
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStoredLocale(next);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
      tr: (field) => field[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside <LanguageProvider>.');
  return context;
}
