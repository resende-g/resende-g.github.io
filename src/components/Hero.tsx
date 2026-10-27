import type { ReactElement } from 'react';
import { CV_FILES, publicPath } from '../config/site';
import { contact } from '../content/contact';
import { profile, type ProfileLink } from '../content/profile';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';
import { GitHubIcon, LattesIcon, LinkedInIcon, OrcidIcon } from './Icons';

const LINK_ICONS: Record<ProfileLink['id'], (props: { className?: string }) => ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  orcid: OrcidIcon,
  lattes: LattesIcon,
};

function linkById(id: ProfileLink['id']): ProfileLink | undefined {
  return profile.links.find((link) => link.id === id);
}

function LinkButton({ link }: { link: ProfileLink }) {
  const Icon = LINK_ICONS[link.id];
  return (
    <ExternalLink className="button button--secondary" href={link.url}>
      <Icon />
      {link.label}
    </ExternalLink>
  );
}

/**
 * Opening presentation. On wide screens two vertical columns of buttons flank the bust (left: GitHub, LinkedIn,
 * projects; right: Lattes, ORCID, contact); the name, identification and summary sit below, centered.
 * On narrow screens the columns stack under the bust in the same order. There is deliberately no photograph.
 */
export function Hero() {
  const { t, tr, locale } = useI18n();
  const cvFile = CV_FILES[locale];
  const github = linkById('github');
  const linkedin = linkById('linkedin');
  const lattes = linkById('lattes');
  const orcid = linkById('orcid');

  return (
    <section className="hero" id="profile" aria-labelledby="profile-name">
      <div className="hero__columns">
        <nav className="hero__column hero__column--left" aria-label={t.hero.linksLabel}>
          {github && <LinkButton link={github} />}
          {linkedin && <LinkButton link={linkedin} />}
          <a className="button button--primary" href="#projects">
            {t.hero.primaryCta}
          </a>
        </nav>
        <nav className="hero__column hero__column--right" aria-label={t.hero.academicLabel}>
          {lattes && <LinkButton link={lattes} />}
          {orcid && <LinkButton link={orcid} />}
          {contact.email && (
            <a className="button button--primary" href={`mailto:${contact.email}`}>
              {t.hero.secondaryCta}
            </a>
          )}
        </nav>
      </div>

      <div className="hero__text">
        <h1 id="profile-name" className="hero__name">
          {profile.name}
        </h1>
        <p className="hero__tagline">{tr(profile.tagline)}</p>
        <p className="hero__summary">{tr(profile.summary)}</p>
        <p className="hero__location">
          {tr(profile.location)}
          {cvFile && (
            <>
              {' · '}
              <a href={publicPath(cvFile)} download>
                {t.hero.downloadCv}
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
