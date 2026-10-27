import type { SourceLink } from '../../content/impact/justice';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';

/** One line of sources: "Sources: A · B". */
export function SourceList({ sources }: { sources: SourceLink[] }) {
  const { t, tr } = useI18n();
  return (
    <p className="sources">
      <span className="sources__title">{t.impact.sources}: </span>
      {sources.map((source, index) => (
        <span key={source.id}>
          {index > 0 && ' · '}
          <ExternalLink href={source.url}>{tr(source.label)}</ExternalLink>
        </span>
      ))}
    </p>
  );
}
