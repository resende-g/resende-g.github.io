import type { ReactNode } from 'react';
import type { PanelId } from '../config/site';
import { useI18n } from '../i18n';

interface PanelProps {
  id: PanelId;
  children: ReactNode;
}

/** Glass panel with a titled header; one per section of the page (curriculum, projects, research). */
export function Panel({ id, children }: PanelProps) {
  const { t } = useI18n();
  const copy = t.panels[id];
  const headingId = `${id}-title`;

  return (
    <section className={`panel glass panel--${id}`} id={id} aria-labelledby={headingId}>
      <header className="panel__header">
        <h2 id={headingId} className="panel__title">
          {copy.title}
        </h2>
        <p className="panel__lead">{copy.lead}</p>
      </header>
      <div className="panel__body">{children}</div>
    </section>
  );
}
