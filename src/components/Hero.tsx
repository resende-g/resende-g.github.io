import type { ReactElement } from 'react';
import { CV_FILES, publicPath } from '../config/site';
import { contact } from '../content/contact';
import { profile, type ProfileLink } from '../content/profile';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';
import { HeroBust } from './HeroBust';
import { GitHubIcon, LattesIcon, LinkedInIcon, OrcidIcon } from './Icons';

const LINK_ICONS: Record<ProfileLink['id'], (props: { className?: string }) => ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  orcid: OrcidIcon,
  lattes: LattesIcon,
};

/**
 * Opening presentation: the identity card (name, roles, summary, actions, profiles) beside the bust on wide screens,
 * under a compact bust on narrow ones. The DOM follows the reading order; the bust is decorative.
 * There is deliberately no photograph.
 */
export function Hero() {
  const { t, tr, locale } = useI18n();
  const cvFile = CV_FILES[locale];

  return (
    <section className="hero" id="profile" aria-labelledby="profile-name">
      <HeroBust />
      <div className="hero__card glass glass--solid">
        <h1 id="profile-name" className="hero__name">
          {profile.name}
        </h1>
        <ul className="hero__roles">
          {profile.tagline.map((item, index) => (
            <li key={index}>{tr(item)}</li>
          ))}
        </ul>
        <p className="hero__summary">{tr(profile.summary)}</p>
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
        <ul className="hero__profiles" aria-label={t.hero.profilesLabel}>
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
        </ul>
        <p className="hero__location">{tr(profile.location)}</p>
      </div>
    </section>
  );
}
