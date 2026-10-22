import { contact } from '../../content/contact';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Section } from '../Section';

export function Contact() {
  const { t } = useI18n();
  return (
    <Section id="contact">
      <div className="card glass">
        {contact.email && (
          <dl className="kv" style={{ marginTop: 0, marginBottom: 'var(--space-4)' }}>
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
        <p className="card__meta" style={{ marginTop: 'var(--space-3)' }}>
          {t.contact.note}
        </p>
      </div>
    </Section>
  );
}
