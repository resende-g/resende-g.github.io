import { skillGroups } from '../../content/skills';
import { useI18n } from '../../i18n';
import { Section } from '../Section';

export function Skills() {
  const { tr } = useI18n();
  return (
    <Section id="skills">
      <div className="grid grid--2">
        {skillGroups.map((group) => (
          <div key={group.id} className="card glass">
            <h3 className="subheading">{tr(group.title)}</h3>
            <ul className="chips" style={{ marginTop: 0 }}>
              {group.items.map((item, index) => (
                <li key={index} className="chip">
                  {tr(item)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
