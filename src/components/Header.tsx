import { useEffect, useRef, useState } from 'react';
import { NAV_IDS } from '../config/site';
import { useI18n } from '../i18n';
import { CloseIcon, MenuIcon } from './Icons';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

/**
 * Sticky header of two floating glass capsules: the brand on the left, the section links and the language switch on
 * the right. On narrow screens the right capsule becomes a menu behind a toggle button (styles in layout.css).
 */
export function Header() {
  const { t } = useI18n();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Publishes the sticky header's real height as --header-offset: `scroll-padding-top` uses it so anchors and focused
  // elements land below the header, and the hero frame uses it to start behind the header.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--header-offset', `${Math.round(header.offsetHeight)}px`);
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // While the menu is open, Escape (focus back on the toggle) or a press outside the header closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="container header__inner">
        <a className="header__brand glass" href="#top">
          <Logo height={18} />
          <span>{t.brand.shortName}</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="header__toggle glass"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={t.nav.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <div className="header__menu glass" id="site-menu" data-open={menuOpen}>
          <nav className="nav" aria-label={t.nav.label}>
            {NAV_IDS.map((id) => (
              <a key={id} className="nav__link" href={`#${id}`} onClick={() => setMenuOpen(false)}>
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
