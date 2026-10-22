import { useState, type ReactElement } from 'react';
import { CV_FILES, publicPath } from '../config/site';
import { contact } from '../content/contact';
import { profile } from '../content/profile';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';
import { GitHubIcon, LattesIcon, LinkedInIcon, MailIcon, OrcidIcon } from './Icons';
import { Logo } from './Logo';
import type { ProfileLink } from '../content/profile';

const LINK_ICONS: Record<ProfileLink['id'], (props: { className?: string }) => ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  orcid: OrcidIcon,
  lattes: LattesIcon,
};

function ProfilePhoto() {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);
  const src = profile.photo;

  if (src === null || failed) {
    return (
      <div className="profile__photo" role="img" aria-label={t.hero.photoPlaceholder}>
        <span className="profile__initials" aria-hidden="true">
          {profile.initials}
        </span>
      </div>
    );
  }

  return (
    <div className="profile__photo">
      <img
        src={publicPath(src)}
        alt={t.hero.photoAlt}
        width={168}
        height={168}
        decoding="async"
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function ProfileCard() {
  const { t, tr, locale } = useI18n();
  const cvFile = CV_FILES[locale];

  return (
    <section className="profile glass glass--strong" id="profile" aria-labelledby="profile-name">
      <div className="profile__mark" aria-hidden="true">
        <Logo height={30} />
      </div>
      <ProfilePhoto />
      <div className="profile__identity">
        <h1 id="profile-name">{profile.name}</h1>
        <p className="profile__tagline">{tr(profile.tagline)}</p>
        <p className="profile__location">{tr(profile.location)}</p>
      </div>
      <div className="profile__body">
        <ul className="profile__links" aria-label={t.hero.linksLabel}>
          {profile.links.map((link) => {
            const Icon = LINK_ICONS[link.id];
            return (
              <li key={link.id}>
                <ExternalLink className="icon-button" href={link.url} aria-label={link.label} title={link.label}>
                  <Icon />
                </ExternalLink>
              </li>
            );
          })}
          {contact.email && (
            <li>
              <a className="icon-button" href={`mailto:${contact.email}`} aria-label={t.contact.email} title={t.contact.email}>
                <MailIcon />
              </a>
            </li>
          )}
        </ul>
        <div className="profile__description">
          <p>{tr(profile.summary)}</p>
          <div className="profile__actions">
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
      </div>
    </section>
  );
}
