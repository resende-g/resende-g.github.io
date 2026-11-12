import { publicPath } from '../../config/site';
import { projects } from '../../content/projects';
import { useI18n } from '../../i18n';
import { ExternalLink } from '../ExternalLink';
import { Panel } from '../Panel';

export function Projects() {
  const { t, tr } = useI18n();
  return (
    <Panel id="projects">
      <div className="stack stack--grid">
        {projects.map((project) => (
          <article key={project.id} className="item" aria-labelledby={`project-${project.id}`}>
            <div className="item__head">
              <div className="project-card__heading">
                <img
                  className="project-card__icon"
                  src={publicPath(project.icon)}
                  alt={`${project.name} icon`}
                  width="64"
                  height="64"
                  loading="lazy"
                  decoding="async"
                />
                <h3 id={`project-${project.id}`}>{project.name}</h3>
              </div>
              <span className="status">{t.projects.statusValues[project.status]}</span>
            </div>
            <p className="item__text">{tr(project.description)}</p>
            {project.contribution && (
              <dl className="kv">
                <dt>{t.projects.role}</dt>
                <dd>{tr(project.contribution)}</dd>
              </dl>
            )}
            {project.modules && project.modules.length > 0 && (
              <section className="project-architecture" aria-label={t.projects.architecture}>
                <h4 className="item__label">{t.projects.architecture}</h4>
                <ul className="project-architecture__list">
                  {project.modules.map((module) => (
                    <li key={module.name} className="project-architecture__module">
                      <div className="project-architecture__head">
                        <strong>{module.name}</strong>
                        <span className="status">{t.projects.statusValues[module.status]}</span>
                      </div>
                      <p>{tr(module.description)}</p>
                      {module.repositoryUrl && module.repositoryLabel && (
                        <div className="project-architecture__actions">
                          <ExternalLink className="link-pill" href={module.repositoryUrl}>
                            {tr(module.repositoryLabel)}
                          </ExternalLink>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <ul className="chips" aria-label={t.projects.technologies}>
              {project.technologies.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="item__actions">
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
    </Panel>
  );
}
