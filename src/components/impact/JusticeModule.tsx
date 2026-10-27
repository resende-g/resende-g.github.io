import { useRef } from 'react';
import { JUSTICE_REFERENCE_YEAR, justiceIndicators, justiceSources, pendingStock } from '../../content/impact/justice';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { format, useI18n } from '../../i18n';
import { BarRow, Legend } from './Bars';
import { formatMillions, formatNumber, formatRatio } from './format';
import { JusticeStatue } from './JusticeStatue';
import { SourceList } from './SourceList';

export function JusticeModule() {
  const { t, tr, locale } = useI18n();
  const reduced = useReducedMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  // With reduced motion the chart is shown complete from the start instead of revealed on scroll.
  const active = useInView(chartRef) || reduced;
  const primary = justiceIndicators.filter((indicator) => indicator.tier === 'primary');
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
          {primary.map((indicator, index) => {
            const max = Math.max(indicator.brazil, indicator.eu);
            const brazilLarger = indicator.brazil >= indicator.eu;
            const ratio = brazilLarger ? formatRatio(indicator.brazil, indicator.eu, locale) : formatRatio(indicator.eu, indicator.brazil, locale);
            return (
              <div className="cmp" key={indicator.id}>
                <div className="cmp__head">
                  <span className="cmp__label">{tr(indicator.label)}</span>
                  <span className="cmp__unit">{tr(indicator.unit)}</span>
                  <span className="cmp__ratio">{format(brazilLarger ? copy.ratio : copy.ratioEu, { n: ratio })}</span>
                </div>
                <BarRow name={t.impact.brazil} value={indicator.brazil} max={max} tone="brazil" decimals={indicator.decimals} active={active} reduced={reduced} index={index * 2} />
                <BarRow name={t.impact.eu} value={indicator.eu} max={max} tone="eu" decimals={indicator.decimals} active={active} reduced={reduced} index={index * 2 + 1} />
              </div>
            );
          })}
        </div>

        <div className="justice__aside">
      <p className="highlight">
        <span className="highlight__value">{formatMillions(pendingStock.value, locale)}</span>
        <span className="highlight__label">{copy.stockLabel}</span>
        <span className="highlight__note">{format(copy.stockNote, { previous: formatMillions(pendingStock.previousValue, locale) })}</span>
      </p>


      <p className="module__note">{copy.periodNote}</p>
        </div>
      </div>

      <details className="disclosure">
        <summary>{t.impact.tableView}</summary>
        <div className="table-wrap">
          <table className="data-table">
            <caption className="visually-hidden">
              {copy.chartLabel} ({JUSTICE_REFERENCE_YEAR})
            </caption>
            <thead>
              <tr>
                <th scope="col">{copy.columns.indicator}</th>
                <th scope="col">{copy.columns.unit}</th>
                <th scope="col" className="num">
                  {copy.columns.brazil}
                </th>
                <th scope="col" className="num">
                  {copy.columns.eu}
                </th>
                <th scope="col" className="num">
                  {copy.columns.ratio}
                </th>
              </tr>
            </thead>
            <tbody>
              {justiceIndicators.map((indicator) => (
                <tr key={indicator.id}>
                  <th scope="row">
                    {tr(indicator.label)}
                    {indicator.note && <span className="table-note"> — {tr(indicator.note)}</span>}
                  </th>
                  <td>{tr(indicator.unit)}</td>
                  <td className="num">{formatNumber(indicator.brazil, locale, indicator.decimals)}</td>
                  <td className="num">{formatNumber(indicator.eu, locale, indicator.decimals)}</td>
                  <td className="num">
                    {indicator.brazil >= indicator.eu
                      ? format(copy.ratio, { n: formatRatio(indicator.brazil, indicator.eu, locale) })
                      : format(copy.ratioEu, { n: formatRatio(indicator.eu, indicator.brazil, locale) })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <SourceList sources={justiceSources} />
    </article>
  );
}
