import { SUPPORTED_LOCALES, LOCALE_LABELS, useI18n } from '../i18n';

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t.language.label}>
      {SUPPORTED_LOCALES.map((option) => {
        const label = LOCALE_LABELS[option];
        const active = option === locale;
        return (
          <button
            key={option}
            type="button"
            className="lang-switch__option"
            aria-pressed={active}
            // The accessible name starts with the visible label ("PT – Português (Brasil)") so voice control works.
            aria-label={`${label.short} – ${label.name}`}
            lang={option}
            onClick={() => setLocale(option)}
          >
            {label.short}
          </button>
        );
      })}
    </div>
  );
}
