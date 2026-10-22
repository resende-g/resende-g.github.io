import backgroundLarge from '../assets/background.jpg';
import backgroundSmall from '../assets/background-small.jpg';

/**
 * Full-bleed background image with a darkening overlay for legibility.
 * The small variant is served to narrow viewports; the <picture> element lets the browser choose.
 */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <picture>
        <source media="(max-width: 900px)" srcSet={backgroundSmall} />
        <img src={backgroundLarge} alt="" decoding="async" fetchPriority="high" />
      </picture>
      <div className="backdrop__overlay" />
    </div>
  );
}
