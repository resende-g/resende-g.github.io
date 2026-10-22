import { academicIdentifiers, publications, researchGroups, researchInterests } from '../../content/research';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Section } from '../Section';

export function Research() {
  const { t, tr } = useI18n();
  return (
    <Section id="research">
      <div className="grid grid--2">
        <div className="card glass">
          <h3 className="subheading">{t.research.interests}</h3>
          <ul className="chips" style={{ marginTop: 0 }}>
            {researchInterests.map((interest, index) => (
              <li key={index} className="chip">
                {tr(interest)}
              </li>
            ))}
          </ul>
          <h3 className="subheading" style={{ marginTop: 'var(--space-5)' }}>
            {t.research.identifiers}
          </h3>
          <ul className="link-list">
            {academicIdentifiers.map((item) => (
              <li key={item.id}>
                <ExternalLink className="link-pill" href={item.url}>
                  {item.label}: {item.value}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="card glass">
          <h3 className="subheading">{t.research.groups}</h3>
          <ul className="plain-list">
            {researchGroups.map((group) => (
              <li key={group.id}>
                <strong>{group.name}</strong>
                <br />
                {tr(group.role)} · {tr(group.institution)} · <span className="card__meta">{tr(group.period)}</span>
                <p className="card__summary" style={{ marginTop: 'var(--space-1)' }}>
                  {tr(group.description)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card glass" style={{ marginTop: 'var(--space-4)' }}>
        <h3 className="subheading">{t.research.publications}</h3>
        {publications.length === 0 ? (
          <p className="empty">{t.research.publicationsEmpty}</p>
        ) : (
          <ul className="plain-list">
            {publications.map((item) => (
              <li key={item.id}>
                <strong>{item.url ? <ExternalLink href={item.url}>{item.title}</ExternalLink> : item.title}</strong>
                <br />
                <span className="card__meta">
                  {item.venue}, {item.year}
                  {item.identifier ? ` · ${item.identifier}` : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
