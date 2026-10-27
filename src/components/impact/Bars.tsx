import { useCountUp } from '../../hooks/useCountUp';
import { useI18n } from '../../i18n';
import { formatNumber } from './format';

interface BarRowProps {
  name: string;
  value: number;
  max: number;
  /** CSS modifier controlling the fill color (e.g. "brazil", "eu", "latam", "global"). */
  tone: string;
  decimals: number;
  active: boolean;
  reduced: boolean;
  prefix?: string;
  suffix?: string;
  /** Stagger index for the reveal transition. */
  index?: number;
}

/** One horizontal bar with its name and value. Bars grow from the baseline; the value counts up with them. */
export function BarRow({ name, value, max, tone, decimals, active, reduced, prefix = '', suffix = '', index = 0 }: BarRowProps) {
  const { locale } = useI18n();
  const shown = useCountUp(value, active, reduced);
  const proportion = max > 0 ? Math.max(0, value) / max : 0;
  return (
    <div className="bar" style={{ '--p': proportion, '--i': index } as React.CSSProperties}>
      <span className="bar__name">{name}</span>
      <span className="bar__track" aria-hidden="true">
        <span className={`bar__fill bar__fill--${tone}`} />
      </span>
      <span className="bar__value">
        {prefix}
        {formatNumber(shown, locale, decimals)}
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
