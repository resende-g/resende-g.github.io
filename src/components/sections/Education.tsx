import { certifications, degrees } from '../../content/education';
import { useI18n } from '../../i18n';
import { Section } from '../Section';

export function Education() {
  const { t, tr } = useI18n();
  return (
    <Section id="education">
      <div className="grid grid--2">
        <div className="card glass">
          <h3 className="subheading">{t.education.degrees}</h3>
          <ul className="plain-list">
            {degrees.map((degree) => (
              <li key={degree.id}>
                <strong>{tr(degree.title)}</strong>
                <br />
                {degree.institution}
                <br />
                <span className="card__meta">
                  {tr(degree.period)} · {t.education.statusValues[degree.status]}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card glass">
          <h3 className="subheading">{t.education.certifications}</h3>
          <ul className="plain-list">
            {certifications.map((item) => (
              <li key={item.id}>
                <strong>{tr(item.title)}</strong>
                <br />
                <span className="card__meta">{item.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
