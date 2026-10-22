import { certifications, degrees } from '../../content/education';
import { experience } from '../../content/experience';
import { skillGroups } from '../../content/skills';
import { useI18n } from '../../i18n';
import { Panel } from '../Panel';

function Experience() {
  const { t, tr } = useI18n();
  return (
    <div className="curriculum__block" id="experience">
      <h3 className="subheading">{t.curriculum.experience}</h3>
      <div className="stack">
        {experience.map((entry) => (
          <article key={entry.id} className="item" aria-labelledby={`exp-${entry.id}`}>
            <div className="item__head">
              <h4 id={`exp-${entry.id}`}>{tr(entry.role)}</h4>
              <span className="meta">{tr(entry.period)}</span>
            </div>
            <p className="item__org">
              {entry.organization}
              {entry.unit ? ` · ${tr(entry.unit)}` : ''} · {tr(entry.location)}
            </p>
            {entry.summary && <p className="item__text">{tr(entry.summary)}</p>}
            <ul className="bullets" aria-label={t.experience.highlightsLabel}>
              {entry.highlights.map((item, index) => (
                <li key={index}>{tr(item)}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function Education() {
  const { t, tr } = useI18n();
  return (
    <div className="curriculum__block curriculum__block--split" id="education">
      <div>
        <h3 className="subheading">{t.curriculum.education}</h3>
        <ul className="plain-list">
          {degrees.map((degree) => (
            <li key={degree.id}>
              <strong>{tr(degree.title)}</strong>
              <br />
              {degree.institution}
              <br />
              <span className="meta">
                {tr(degree.period)} · {t.education.statusValues[degree.status]}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="subheading">{t.curriculum.certifications}</h3>
        <ul className="plain-list">
          {certifications.map((item) => (
            <li key={item.id}>
              <strong>{tr(item.title)}</strong>
              <br />
              <span className="meta">{item.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Skills() {
  const { t, tr } = useI18n();
  return (
    <div className="curriculum__block" id="skills">
      <h3 className="subheading">{t.curriculum.skills}</h3>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.id} className="item">
            <h4 className="item__label">{tr(group.title)}</h4>
            <ul className="chips">
              {group.items.map((item, index) => (
                <li key={index} className="chip">
                  {tr(item)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Curriculum() {
  return (
    <Panel id="curriculum">
      <Experience />
      <Education />
      <Skills />
    </Panel>
  );
}
