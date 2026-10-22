import { SUPPORTED_LOCALES, LOCALE_LABELS, format, useI18n } from '../i18n';

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
            aria-label={active ? label.name : format(t.language.switchTo, { name: label.name })}
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
