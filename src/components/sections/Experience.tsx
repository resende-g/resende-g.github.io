import { experience } from '../../content/experience';
import { useI18n } from '../../i18n';
import { Section } from '../Section';

export function Experience() {
  const { t, tr } = useI18n();
  return (
    <Section id="experience">
      {experience.map((entry) => (
        <article key={entry.id} className="card glass" aria-labelledby={`exp-${entry.id}`}>
          <div className="card__head">
            <h3 id={`exp-${entry.id}`}>{tr(entry.role)}</h3>
            <span className="card__meta">{tr(entry.period)}</span>
          </div>
          <p className="card__org">
            {entry.organization}
            {entry.unit ? ` · ${tr(entry.unit)}` : ''} · {tr(entry.location)}
          </p>
          {entry.summary && <p className="card__summary">{tr(entry.summary)}</p>}
          <ul className="bullets" aria-label={t.experience.highlightsLabel}>
            {entry.highlights.map((item, index) => (
              <li key={index}>{tr(item)}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
