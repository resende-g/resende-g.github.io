import { SITE_REPOSITORY_URL } from '../config/site';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container">
        <p>{t.footer.builtWith}</p>
        <p>
          <ExternalLink href={SITE_REPOSITORY_URL}>{t.footer.source}</ExternalLink>
        </p>
      </div>
    </footer>
  );
}
