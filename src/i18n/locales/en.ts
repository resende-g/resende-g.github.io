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
    profile: 'Profile',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    research: 'Research',
    skills: 'Skills',
    contact: 'Contact',
    skipToContent: 'Skip to content',
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
  sections: {
    experience: { title: 'Professional Experience', lead: 'Legal data quality and evaluation of AI systems, built on a background in IT infrastructure and information security.' },
    projects: { title: 'Technical Projects', lead: 'Public repositories. Descriptions follow each project’s own README; status reflects what is documented there.' },
    education: { title: 'Academic Background', lead: 'Law and information security, in parallel.' },
    research: { title: 'Research & Publications', lead: 'Interests, study groups, and academic identifiers. Publications will be listed here as they become available.' },
    skills: { title: 'Skills & Technologies', lead: 'Grouped by domain; limited to what the professional record and the projects support.' },
    contact: { title: 'Contact', lead: 'Professional channels only.' },
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
      experimental: 'Experimental',
      prototype: 'Prototype',
      mvp: 'MVP',
      firstRelease: 'First public release',
    },
  },
  education: {
    degrees: 'Degrees',
    certifications: 'Certifications & courses',
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
    note: 'Links open in a new tab.',
  },
  footer: {
    builtWith: 'Static site hosted on GitHub Pages. No tracking or analytics.',
    source: 'Site source code',
  },
} as const;

/** Recursively maps every string leaf of `en` to `string`, so other locales may differ in text but not in shape. */
type Shape<T> = { readonly [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };

export type Dictionary = Shape<typeof en>;
