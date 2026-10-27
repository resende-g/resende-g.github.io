import type { SourceLink } from '../../content/impact/justice';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';

export function SourceList({ sources }: { sources: SourceLink[] }) {
  const { t, tr } = useI18n();
  return (
    <div className="sources">
      <h4 className="sources__title">{t.impact.sources}</h4>
      <ol className="sources__list">
        {sources.map((source) => (
          <li key={source.id}>
            <ExternalLink href={source.url}>{tr(source.label)}</ExternalLink>
          </li>
        ))}
      </ol>
    </div>
  );
}
