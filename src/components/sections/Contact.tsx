import { contact } from '../../content/contact';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Panel } from '../Panel';

export function Contact() {
  const { t } = useI18n();
  return (
    <Panel id="contact">
      {contact.email && (
        <dl className="kv kv--top">
          <dt>{t.contact.email}</dt>
          <dd>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dd>
        </dl>
      )}
      <ul className="link-list">
        {contact.links.map((link) => (
          <li key={link.id}>
            <ExternalLink className="link-pill" href={link.url}>
              {link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
      <p className="meta note">{t.contact.note}</p>
    </Panel>
  );
}
