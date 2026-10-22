import { useState } from 'react';
import { CV_FILES, publicPath } from '../config/site';
import { profile } from '../content/profile';
import { useI18n } from '../i18n';
import { ExternalLink } from './ExternalLink';

function ProfilePhoto() {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);
  const src = profile.photo;

  if (src === null || failed) {
    return (
      <div className="hero__photo" role="img" aria-label={t.hero.photoPlaceholder}>
        <span className="hero__initials" aria-hidden="true">
          {profile.initials}
        </span>
      </div>
    );
  }

  return (
    <div className="hero__photo">
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

export function Hero() {
  const { t, tr, locale } = useI18n();
  const cvFile = CV_FILES[locale];

  return (
    <section className="hero" id="profile" aria-labelledby="profile-name">
      <div className="container">
        <div className="hero__card glass">
          <ProfilePhoto />
          <div>
            <h1 id="profile-name">{profile.name}</h1>
            <p className="hero__tagline">{tr(profile.tagline)}</p>
            <p className="hero__location">{tr(profile.location)}</p>
          </div>
          <p className="hero__summary">{tr(profile.summary)}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#projects">
              {t.hero.primaryCta}
            </a>
            <a className="button button--secondary" href="#contact">
              {t.hero.secondaryCta}
            </a>
            {cvFile && (
              <a className="button button--secondary" href={publicPath(cvFile)} download>
                {t.hero.downloadCv}
              </a>
            )}
          </div>
          <ul className="link-list" aria-label={t.hero.linksLabel}>
            {profile.links.map((link) => (
              <li key={link.id}>
                <ExternalLink className="link-pill" href={link.url}>
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
