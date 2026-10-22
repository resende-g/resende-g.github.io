import { projects } from '../../content/projects';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Section } from '../Section';

export function Projects() {
  const { t, tr } = useI18n();
  return (
    <Section id="projects">
      <div className="grid grid--2">
        {projects.map((project) => (
          <article key={project.id} className="card glass" aria-labelledby={`project-${project.id}`}>
            <div className="card__head">
              <h3 id={`project-${project.id}`}>{project.name}</h3>
              <span className="status">{t.projects.statusValues[project.status]}</span>
            </div>
            <p className="card__summary">{tr(project.description)}</p>
            {project.contribution && (
              <dl className="kv">
                <dt>{t.projects.role}</dt>
                <dd>{tr(project.contribution)}</dd>
              </dl>
            )}
            <ul className="chips" aria-label={t.projects.technologies}>
              {project.technologies.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="card__actions">
              <ExternalLink className="link-pill" href={project.repositoryUrl}>
                {t.projects.repository}
              </ExternalLink>
              {project.demoUrl && (
                <ExternalLink className="link-pill" href={project.demoUrl}>
                  {t.projects.demo}
                </ExternalLink>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
