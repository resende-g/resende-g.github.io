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
    impact: 'Data',
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
  impact: {
    title: 'Two fields, one requirement: data that can be trusted',
    lead: 'A glimpse of the two fields I work in. Both come down to correct data, traceability and governance — the core of my work on legal data quality and in information security.',
    brazil: 'Brazil',
    eu: 'European Union',
    sources: 'Sources',
    justice: {
      title: 'Justice in Brazil, compared with the European Union',
      lead: 'Judicial demand in 2024, from CNJ data compared with CEPEJ data.',
      statueAlt: 'Stylized illustration of the statue “A Justiça” by Alfredo Ceschiatti, in front of the Supreme Federal Court in Brasília: a seated, blindfolded figure with a sword across her lap.',
      ratio: '{n}× in Brazil',
      chartLabel: 'Comparison of judicial indicators between Brazil and the European Union, 2024',
      periodNote: 'Reference year 2024, released with the 2025 reports. Comparison with the EU only; not a world ranking.',
    },
    cyber: {
      title: 'Cyber threats and Brazil',
      lead: 'A demonstrative map and two verified 2025 figures.',
      simulationBadge: 'Simulation',
      simulationNotice: 'Synthetic events drawn in your browser; not real attacks, not real-time data.',
      mapLabel: 'Glass map of Brazil with animated silver streaks representing simulated cyber events',
      staticMapLabel: 'Glass map of Brazil with example silver streaks representing simulated cyber events (static version)',
      pause: 'Pause',
      resume: 'Resume',
      reducedMotion: 'Static version: your system prefers reduced motion.',
      noCanvas: 'Static version: the browser could not draw the animation.',
    },
  },
  footer: {
    builtWith: 'Static site hosted on GitHub Pages. No tracking or analytics.',
    source: 'Site source code',
  },
} as const;

/** Recursively maps every string leaf of `en` to `string`, so other locales may differ in text but not in shape. */
type Shape<T> = { readonly [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };

export type Dictionary = Shape<typeof en>;
