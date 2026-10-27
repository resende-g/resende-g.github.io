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
    title: 'Two systems, one requirement: data that can be trusted',
    lead:
      'The two fields I work in, in figures from their primary sources. The scale of the Brazilian judiciary and the volume of digital threats raise the same demands: correct data, traceability and governance.',
    bridge:
      'In my work these demands take concrete form: verifying the completeness, correctness and recall of a legislation dataset collected from official sources, evaluating answers from AI systems and legal search engines, and, earlier, managing vulnerabilities and phishing incidents in a healthcare institution. The modules above show the scale that makes this work necessary.',
    brazil: 'Brazil',
    eu: 'European Union',
    sources: 'Sources',
    tableView: 'All indicators as a table',
    justice: {
      title: 'Justice: Brazil and the European Union',
      lead: 'Judicial demand per 100 inhabitants and per judge, reference year 2024. CNJ figures compared with CEPEJ data, as published in Justiça em Números 2025.',
      statueAlt: 'Stylized illustration of the statue “A Justiça” by Alfredo Ceschiatti, in front of the Supreme Federal Court in Brasília: a seated, blindfolded figure with a sword across her lap.',
      ratio: '{n}× in Brazil',
      ratioEu: '{n}× in the EU',
      chartLabel: 'Comparison of judicial indicators between Brazil and the European Union, 2024',
      stockLabel: 'pending cases in Brazil at the end of 2024',
      stockNote: 'National total, not a rate per inhabitant. Down from {previous} at the end of the previous year.',
      periodNote: 'Reference year 2024; figures released with the 2025 reports. The comparison covers the European Union only — it does not establish a world ranking of litigation.',
      columns: { indicator: 'Indicator', unit: 'Unit', brazil: 'Brazil', eu: 'European Union', ratio: 'Ratio' },
      noteLabel: 'Note',
    },
    cyber: {
      title: 'Cyber threats: a demonstrative map and 2025 figures',
      lead: 'Where digital threats come from and where they land is a global question. The map is an animated simulation; the figures below it are verified 2025 statistics, each with its scope and method.',
      simulationBadge: 'Simulation',
      simulationNotice:
        'Synthetic events generated in your browser for demonstration. They are not real attacks, not real-time data and do not come from any monitoring service.',
      mapLabel: 'Stylized world map with animated arcs between cities representing simulated cyber events',
      staticMapLabel: 'Stylized world map with example arcs between cities representing simulated cyber events (static version)',
      legend: 'Event categories (simulated)',
      pause: 'Pause animation',
      resume: 'Resume animation',
      paused: 'Animation paused',
      reducedMotion: 'Static version shown because your system prefers reduced motion.',
      noCanvas: 'Static version shown because the browser could not draw the animated map.',
      statsTitle: 'Verified figures, 2025',
      scope: 'Scope',
      period: 'Period',
      method: 'What is counted',
      growthTitle: 'Change in detections by category, 2025 vs. 2024',
      growthUnit: 'percent change in detections (Kaspersky telemetry)',
      growthLabel: 'Grouped bar chart comparing Latin America and global year-over-year growth in detections of backdoors, password stealers and spyware',
      growthNote: 'Each bar is a year-over-year change in the number of detections for one category, on the vendor’s telemetry. Regional and global series come from separate releases and are not shares of the same total.',
      noMixNote: 'Files detected, phishing attempts blocked, users affected and simulated map events are different measures and are not comparable with each other.',
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
