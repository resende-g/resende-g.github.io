import { useI18n } from '../../i18n';
import { CyberModule } from './CyberModule';
import { JusticeModule } from './JusticeModule';

/** Two short data modules (Justice, Cybersecurity) at the end of the page: context for the CV, not a dashboard. */
export function ImpactSection() {
  const { t } = useI18n();
  return (
    <section className="impact" id="impact" aria-labelledby="impact-title">
      <header className="impact__header">
        <h2 id="impact-title" className="impact__title">
          {t.impact.title}
        </h2>
        <p className="impact__lead">{t.impact.lead}</p>
      </header>
      <div className="impact__grid">
        <JusticeModule />
        <CyberModule />
      </div>
    </section>
  );
}
