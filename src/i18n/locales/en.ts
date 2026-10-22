/**
 * English UI strings. This file defines the dictionary shape;
 * every other locale must provide the same keys (enforced by the `Dictionary` type).
 */
export const en = {
  meta: {
    title: 'Gabriel Almeida Resende — Legal Quality Analyst | AI Evaluation | Law & Technology',
    description:
      'Portfolio of Gabriel Almeida Resende: legal data quality, evaluation of AI systems and legal search, information security, and academic research at the intersection of law and technology.',
  },
  nav: {
    label: 'Main navigation',
    papers: 'Papers',
    projects: 'Projects',
    curriculum: 'Curriculum',
    organizations: 'Organizations',
    skipToContent: 'Skip to content',
  },
  brand: {
    shortName: 'Resende',
    logoAlt: 'Resende mark',
  },
  language: {
    label: 'Language',
    switchTo: 'Switch to {name}',
  },
  hero: {
    photoAlt: 'Portrait of Gabriel Almeida Resende',
    photoPlaceholder: 'Profile photo placeholder',
    primaryCta: 'View projects',
    secondaryCta: 'Get in touch',
    downloadCv: 'Download CV',
    linksLabel: 'Professional profiles',
  },
  panels: {
    papers: { title: 'Recent papers', lead: 'Publications, research interests, and academic identifiers.' },
    projects: { title: 'Projects', lead: 'Public repositories. Descriptions follow each project’s README; status reflects what is documented there.' },
    curriculum: { title: 'Curriculum', lead: 'Professional experience, academic background, and skills.' },
    organizations: { title: 'Organizations', lead: 'Employers, universities, and groups from the professional and academic record.' },
  },
  curriculum: {
    experience: 'Professional experience',
    education: 'Academic background',
    certifications: 'Certifications & courses',
    skills: 'Skills & technologies',
  },
  experience: {
    highlightsLabel: 'Highlights',
    present: 'Present',
  },
  projects: {
    repository: 'Source code',
    demo: 'Live prototype',
    technologies: 'Technologies',
    status: 'Status',
    role: 'Contribution',
    statusValues: {
      planning: 'Planning',
      experimental: 'Experimental',
      prototype: 'Prototype',
      mvp: 'MVP',
      firstRelease: 'First public release',
    },
  },
  education: {
    statusValues: {
      completed: 'Completed',
      inProgress: 'In progress',
    },
    expected: 'expected',
  },
  research: {
    interests: 'Research interests',
    groups: 'Groups & academic activities',
    publications: 'Publications',
    publicationsEmpty: 'No publications listed yet. References and links will be added here.',
    identifiers: 'Academic identifiers',
  },
  contact: {
    email: 'Email',
  },
  footer: {
    builtWith: 'Static site hosted on GitHub Pages. No tracking or analytics.',
    source: 'Site source code',
  },
} as const;

/** Recursively maps every string leaf of `en` to `string`, so other locales may differ in text but not in shape. */
type Shape<T> = { readonly [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };

export type Dictionary = Shape<typeof en>;
