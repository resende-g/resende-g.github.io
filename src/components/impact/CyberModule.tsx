import { useRef } from 'react';
import { cyberSources, cyberStats, growthCategories, growthSeries, threatCategories } from '../../content/impact/cyber';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { BarRow, Legend } from './Bars';
import { SourceList } from './SourceList';
import { ThreatMap } from './ThreatMap';

function sourceById(id: string) {
  const source = cyberSources.find((candidate) => candidate.id === id);
  if (!source) throw new Error(`Unknown source: ${id}`);
  return source;
}

export function CyberModule() {
  const { t, tr } = useI18n();
  const reduced = useReducedMotion();
  const growthRef = useRef<HTMLDivElement>(null);
  const growthActive = useInView(growthRef) || reduced;
  const copy = t.impact.cyber;
  const growthMax = Math.max(...growthSeries.flatMap((series) => Object.values(series.values)));

  return (
    <article className="module module--cyber glass" aria-labelledby="cyber-title">
      <header className="module__header">
        <h3 id="cyber-title" className="module__title">
          {copy.title}
        </h3>
        <p className="module__lead">{copy.lead}</p>
      </header>

      <div className="cyber">
        <div className="cyber__main">
      <div className="map-frame">
        <span className="map-frame__badge">{copy.simulationBadge}</span>
        <ThreatMap />
        <div className="map-frame__foot">
          <Legend items={threatCategories.map((category) => ({ tone: category.id, label: tr(category.label) }))} />
          <p className="map-frame__notice">{copy.simulationNotice}</p>
        </div>
      </div>

      <div className={`growth${growthActive ? ' is-visible' : ''}`} ref={growthRef} role="group" aria-label={copy.growthLabel}>
        <div className="growth__head">
          <h4 className="module__subtitle">{copy.growthTitle}</h4>
          <span className="cmp__unit">{copy.growthUnit}</span>
        </div>
        <Legend items={growthSeries.map((series) => ({ tone: series.id, label: tr(series.label) }))} />
        {growthCategories.map((category, index) => (
          <div className="cmp" key={category.id}>
            <div className="cmp__head">
              <span className="cmp__label">{tr(category.label)}</span>
            </div>
            {growthSeries.map((series, seriesIndex) => (
              <BarRow
                key={series.id}
                name={tr(series.label)}
                value={series.values[category.id]}
                max={growthMax}
                tone={series.id}
                decimals={0}
                active={growthActive}
                reduced={reduced}
                prefix="+"
                suffix="%"
                index={index * 2 + seriesIndex}
              />
            ))}
          </div>
        ))}
        <p className="module__note">{copy.growthNote}</p>
      </div>

        </div>

        <div className="cyber__aside">
      <h4 className="module__subtitle">{copy.statsTitle}</h4>
      <ul className="stats">
        {cyberStats.map((stat) => {
          const source = sourceById(stat.sourceId);
          return (
            <li key={stat.id} className="stat">
              <span className="stat__value">{tr(stat.value)}</span>
              <span className="stat__label">{tr(stat.label)}</span>
              <dl className="stat__meta">
                <div>
                  <dt>{copy.scope}</dt>
                  <dd>{tr(stat.scope)}</dd>
                </div>
                <div>
                  <dt>{copy.period}</dt>
                  <dd>{tr(stat.period)}</dd>
                </div>
                <div>
                  <dt>{copy.method}</dt>
                  <dd>{tr(stat.method)}</dd>
                </div>
              </dl>
              <ExternalLink className="stat__source" href={source.url}>
                {t.impact.sources}: {source.id === 'ksb-2025' ? 'Kaspersky Security Bulletin 2025' : 'Securelist, Spam and phishing in 2025'}
              </ExternalLink>
            </li>
          );
        })}
      </ul>

      <p className="module__note">{copy.noMixNote}</p>
        </div>
      </div>

      <SourceList sources={cyberSources} />
    </article>
  );
}
