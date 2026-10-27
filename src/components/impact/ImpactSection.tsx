import { useI18n } from '../../i18n';
import { CyberModule } from './CyberModule';
import { JusticeModule } from './JusticeModule';

/** Two complementary data modules (Justice, Cybersecurity) placed right after the presentation. */
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
      <p className="impact__bridge">{t.impact.bridge}</p>
    </section>
  );
}
