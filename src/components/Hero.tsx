import type { ReactElement } from 'react';
import { CV_FILES, publicPath } from '../config/site';
import { contact } from '../content/contact';
import { profile, type ProfileLink } from '../content/profile';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';
import { GitHubIcon, LattesIcon, LinkedInIcon, MailIcon, OrcidIcon } from './Icons';

const LINK_ICONS: Record<ProfileLink['id'], (props: { className?: string }) => ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  orcid: OrcidIcon,
  lattes: LattesIcon,
};

/**
 * Opening presentation: name, professional identification, short summary and professional links, centered under
 * the silver bust that fills the background. There is deliberately no photograph.
 */
export function Hero() {
  const { t, tr, locale } = useI18n();
  const cvFile = CV_FILES[locale];

  return (
    <section className="hero" id="profile" aria-labelledby="profile-name">
      <div className="hero__head">
        <h1 id="profile-name" className="hero__name">
          {profile.name}
        </h1>
        <p className="hero__tagline">{tr(profile.tagline)}</p>
      </div>

      <p className="hero__summary">{tr(profile.summary)}</p>

      <div className="hero__side">
        <p className="hero__location">{tr(profile.location)}</p>
        <ul className="hero__links" aria-label={t.hero.linksLabel}>
          {profile.links.map((link) => {
            const Icon = LINK_ICONS[link.id];
            return (
              <li key={link.id}>
                <ExternalLink className="link-pill link-pill--icon" href={link.url}>
                  <Icon />
                  {link.label}
                </ExternalLink>
              </li>
            );
          })}
          {contact.email && (
            <li>
              <a className="link-pill link-pill--icon" href={`mailto:${contact.email}`}>
                <MailIcon />
                {t.contact.email}
              </a>
            </li>
          )}
        </ul>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            {t.hero.primaryCta}
          </a>
          {contact.email && (
            <a className="button button--secondary" href={`mailto:${contact.email}`}>
              {t.hero.secondaryCta}
            </a>
          )}
          {cvFile && (
            <a className="button button--secondary" href={publicPath(cvFile)} download>
              {t.hero.downloadCv}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
