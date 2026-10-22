import { useState } from 'react';
import { CV_FILES, publicPath } from '../config/site';
import { contact } from '../content/contact';
import { profile } from '../content/profile';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';
import { Logo } from './Logo';

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
      <div className="profile__grid">
        <ul className="profile__links" aria-label={t.hero.linksLabel}>
          {profile.links.map((link) => (
            <li key={link.id}>
              <ExternalLink className="button button--secondary button--block" href={link.url}>
                {link.label}
              </ExternalLink>
            </li>
          ))}
          {contact.email && (
            <li>
              <a className="button button--secondary button--block" href={`mailto:${contact.email}`}>
                {t.contact.email}
              </a>
            </li>
          )}
          {cvFile && (
            <li>
              <a className="button button--primary button--block" href={publicPath(cvFile)} download>
                {t.hero.downloadCv}
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
            <a className="button button--secondary" href="#contact">
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
