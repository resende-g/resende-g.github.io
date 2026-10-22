import { SECTION_IDS } from '../config/site';
import { useI18n } from '../i18n';
import { profile } from '../content/profile';
import { LanguageSwitch } from './LanguageSwitch';

export function Header() {
  const { t } = useI18n();

  return (
    <header className="header">
      <div className="container">
        <div className="header__bar glass glass--strong">
          <a className="header__brand" href="#top">
            {profile.name}
          </a>
          <nav className="nav" aria-label={t.nav.label}>
            {SECTION_IDS.map((id) => (
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
