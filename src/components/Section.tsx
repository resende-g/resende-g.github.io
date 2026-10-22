import type { ReactNode } from 'react';
import type { SectionId } from '../config/site';
import { useI18n } from '../i18n';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
}

export function Section({ id, children }: SectionProps) {
  const { t } = useI18n();
  const copy = t.sections[id];
  const headingId = `${id}-title`;

  return (
    <section className="section" id={id} aria-labelledby={headingId}>
      <div className="container">
        <div className="section__header">
          <h2 id={headingId}>{copy.title}</h2>
          <p className="section__lead">{copy.lead}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
