import { cyberSources, cyberStats } from '../../content/impact/cyber';
import { useI18n } from '../../i18n';
import { BrazilMap } from './BrazilMap';
import { SourceList } from './SourceList';

export function CyberModule() {
  const { t, tr } = useI18n();
  const copy = t.impact.cyber;

  return (
    <article className="module module--cyber glass" aria-labelledby="cyber-title">
      <header className="module__header">
        <h3 id="cyber-title" className="module__title">
          {copy.title}
        </h3>
        <p className="module__lead">{copy.lead}</p>
      </header>

      <div className="cyber">
        <div className="cyber__map">
          <span className="map-badge">{copy.simulationBadge}</span>
          <BrazilMap />
          <p className="module__note">{copy.simulationNotice}</p>
        </div>
        <ul className="stats">
          {cyberStats.map((stat) => (
            <li key={stat.id} className="stat">
              <span className="stat__value">{tr(stat.value)}</span>
              <span className="stat__label">{tr(stat.label)}</span>
              <span className="stat__note">{tr(stat.note)}</span>
            </li>
          ))}
        </ul>
      </div>

      <SourceList sources={cyberSources} />
    </article>
  );
}
