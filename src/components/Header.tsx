import { useEffect, useRef } from 'react';
import { NAV_IDS } from '../config/site';
import { useI18n } from '../i18n';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

export function Header() {
  const { t } = useI18n();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Publishes the sticky header's real height (it wraps to two rows on narrow screens) as --header-offset,
  // which `scroll-padding-top` uses so anchors and focused elements land below the header. Also flags the
  // navigation when its links do not fit, so the fade that hints at more links appears only then.
  useEffect(() => {
    const header = headerRef.current;
    const nav = navRef.current;
    if (!header || !nav) return;
    const root = document.documentElement;
    const update = () => {
      root.style.setProperty('--header-offset', `${Math.round(header.offsetHeight)}px`);
      nav.dataset.overflow = String(nav.scrollWidth > nav.clientWidth + 1);
    };
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, [t]);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="header__bar glass glass--solid">
          <a className="header__brand" href="#top">
            <Logo height={22} />
            <span>{t.brand.shortName}</span>
          </a>
          <nav className="nav" ref={navRef} aria-label={t.nav.label}>
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
