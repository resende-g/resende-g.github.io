import { useRef } from 'react';
import { justiceIndicators, justiceSources } from '../../content/impact/justice';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { format, useI18n } from '../../i18n';
import { BarRow, Legend } from './Bars';
import { formatRatio } from './format';
import { JusticeStatue } from './JusticeStatue';
import { SourceList } from './SourceList';

export function JusticeModule() {
  const { t, tr, locale } = useI18n();
  const reduced = useReducedMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  // With reduced motion the chart is shown complete from the start instead of revealed on scroll.
  const active = useInView(chartRef) || reduced;
  const copy = t.impact.justice;

  return (
    <article className="module module--justice glass" aria-labelledby="justice-title">
      <header className="module__header">
        <h3 id="justice-title" className="module__title">
          {copy.title}
        </h3>
        <p className="module__lead">{copy.lead}</p>
      </header>

      <div className="justice">
        <div className="justice__figure">
          <JusticeStatue title={copy.statueAlt} />
        </div>
        <div className={`justice__chart${active ? ' is-visible' : ''}`} ref={chartRef} role="group" aria-label={copy.chartLabel}>
          <Legend
            items={[
              { tone: 'brazil', label: t.impact.brazil },
              { tone: 'eu', label: t.impact.eu },
            ]}
          />
          {justiceIndicators.map((indicator, index) => {
            const max = Math.max(indicator.brazil, indicator.eu);
            return (
              <div className="cmp" key={indicator.id}>
                <div className="cmp__head">
                  <span className="cmp__label">{tr(indicator.label)}</span>
                  <span className="cmp__unit">{tr(indicator.unit)}</span>
                  <span className="cmp__ratio">{format(copy.ratio, { n: formatRatio(indicator.brazil, indicator.eu, locale) })}</span>
                </div>
                <BarRow name={t.impact.brazil} value={indicator.brazil} max={max} tone="brazil" decimals={indicator.decimals} active={active} reduced={reduced} index={index * 2} />
                <BarRow name={t.impact.eu} value={indicator.eu} max={max} tone="eu" decimals={indicator.decimals} active={active} reduced={reduced} index={index * 2 + 1} />
              </div>
            );
          })}
          <p className="module__note">{copy.periodNote}</p>
        </div>
      </div>

      <SourceList sources={justiceSources} />
    </article>
  );
}
