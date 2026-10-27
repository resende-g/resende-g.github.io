import { NAV_IDS } from '../config/site';
import { useI18n } from '../i18n';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

export function Header() {
  const { t } = useI18n();

  return (
    <header className="header">
      <div className="container">
        <div className="header__bar glass glass--strong">
          <a className="header__brand" href="#top">
            <Logo height={22} />
            <span>{t.brand.shortName}</span>
          </a>
          <nav className="nav" aria-label={t.nav.label}>
            {NAV_IDS.map((id) => (
              <a key={id} className="nav__link" href={`#${id}`}>
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
