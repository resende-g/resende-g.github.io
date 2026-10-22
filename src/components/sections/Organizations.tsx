import { organizations } from '../../content/organizations';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Panel } from '../Panel';

export function Organizations() {
  const { tr } = useI18n();
  return (
    <Panel id="organizations">
      <ul className="org-grid">
        {organizations.map((org) => {
          const body = (
            <>
              <span className="org__name">{org.name}</span>
              <span className="org__relation">{tr(org.relation)}</span>
            </>
          );
          return (
            <li key={org.id}>
              {org.url ? (
                <ExternalLink className="org org--link" href={org.url}>
                  {body}
                </ExternalLink>
              ) : (
                <div className="org">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
