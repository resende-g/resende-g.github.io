import { useI18n } from '../../i18n';
import { formatNumber } from './format';

interface BarRowProps {
  name: string;
  value: number;
  max: number;
  /** CSS modifier controlling the fill color (e.g. "brazil", "eu", "latam", "global"). */
  tone: string;
  decimals: number;
  prefix?: string;
  suffix?: string;
  /** Stagger index for the reveal transition. */
  index?: number;
}

/**
 * One horizontal bar with its name and value. Bars grow from the baseline when the chart comes into view; the value
 * is always the real figure, so assistive technology and reader modes never read a placeholder.
 */
export function BarRow({ name, value, max, tone, decimals, prefix = '', suffix = '', index = 0 }: BarRowProps) {
  const { locale } = useI18n();
  const proportion = max > 0 ? Math.max(0, value) / max : 0;
  return (
    <div className="bar" style={{ '--p': proportion, '--i': index } as React.CSSProperties}>
      <span className="bar__name">{name}</span>
      <span className="bar__track" aria-hidden="true">
        <span className={`bar__fill bar__fill--${tone}`} />
      </span>
      <span className="bar__value">
        {prefix}
        {formatNumber(value, locale, decimals)}
        {suffix}
      </span>
    </div>
  );
}

export function Legend({ items }: { items: { tone: string; label: string }[] }) {
  return (
    <ul className="legend">
      {items.map((item) => (
        <li key={item.tone} className="legend__item">
          <span className={`legend__swatch legend__swatch--${item.tone}`} aria-hidden="true" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
