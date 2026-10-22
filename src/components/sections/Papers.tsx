import { academicIdentifiers, publications, researchInterests } from '../../content/research';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Panel } from '../Panel';

export function Papers() {
  const { t, tr } = useI18n();
  return (
    <Panel id="papers">
      <h3 className="subheading">{t.research.publications}</h3>
      {publications.length === 0 ? (
        <p className="empty">{t.research.publicationsEmpty}</p>
      ) : (
        <ul className="plain-list">
          {publications.map((item) => (
            <li key={item.id}>
              <strong>{item.url ? <ExternalLink href={item.url}>{item.title}</ExternalLink> : item.title}</strong>
              <br />
              <span className="meta">
                {item.venue}, {item.year}
                {item.identifier ? ` · ${item.identifier}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="subheading subheading--spaced">{t.research.interests}</h3>
      <ul className="chips">
        {researchInterests.map((interest, index) => (
          <li key={index} className="chip">
            {tr(interest)}
          </li>
        ))}
      </ul>

      <h3 className="subheading subheading--spaced">{t.research.identifiers}</h3>
      <ul className="link-list">
        {academicIdentifiers.map((item) => (
          <li key={item.id}>
            <ExternalLink className="link-pill" href={item.url}>
              {item.label}: {item.value}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
