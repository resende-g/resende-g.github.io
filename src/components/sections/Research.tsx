import { academicIdentifiers, publications, researchGroups, researchInterests } from '../../content/research';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Panel } from '../Panel';

/** Publications (only once there is at least one), academic groups and activities, interests and identifiers. */
export function Research() {
  const { t, tr } = useI18n();
  return (
    <Panel id="research">
      {publications.length > 0 && (
        <div className="research__block">
          <h3 className="subheading">{t.research.publications}</h3>
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
        </div>
      )}

      <div className="research__grid">
        <div className="research__block">
          <h3 className="subheading">{t.research.groups}</h3>
          <ul className="plain-list">
            {researchGroups.map((group) => (
              <li key={group.id}>
                <strong>{group.name}</strong>
                <br />
                {tr(group.role)} · {tr(group.institution)}
                <br />
                <span className="meta">{tr(group.period)}</span>
                <p className="research__text">{tr(group.description)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="research__block">
          <h3 className="subheading">{t.research.interests}</h3>
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
        </div>
      </div>
    </Panel>
  );
}
