import type { Localized } from '../../i18n/locales';
import type { SourceLink } from './justice';

/**
 * Cyber-threat figures for 2025, each with its own scope and method; they measure different things and are not
 * comparable with each other or with the simulated map.
 *
 * Verification notes (2026-10-27; kaspersky.com and securelist.com were not reachable from the build environment,
 * figures were checked against search-engine excerpts of the primary pages):
 * - Brazil 15.48% of users who encountered phishing (6th among countries) and 554,002,207 phishing link attempts
 *   blocked globally in 2025: Securelist, "Spam and phishing in 2025".
 * - 500,000 malicious files per day, +7% vs 2024 (global): Kaspersky press release "The number of the year",
 *   2 Dec 2025 (Kaspersky Security Bulletin 2025).
 */

export const CYBER_REFERENCE_YEAR = 2025;

export interface CyberStat {
  id: string;
  value: Localized;
  label: Localized;
  /** Scope and what is counted, in one short line. */
  note: Localized;
  sourceId: string;
}

export const cyberStats: CyberStat[] = [
  {
    id: 'brazil-phishing-share',
    value: { en: '15.48%', 'pt-BR': '15,48%' },
    label: { en: 'of Kaspersky users in Brazil encountered phishing in 2025', 'pt-BR': 'dos usuários da Kaspersky no Brasil encontraram phishing em 2025' },
    note: {
      en: 'Share of the vendor’s users in the country, not of the population; 6th among countries.',
      'pt-BR': 'Proporção dos usuários do fornecedor no país, não da população; 6º entre os países.',
    },
    sourceId: 'securelist-phishing-2025',
  },
  {
    id: 'malicious-files-per-day',
    value: { en: '500,000', 'pt-BR': '500 mil' },
    label: { en: 'new malicious files detected per day in 2025, worldwide', 'pt-BR': 'novos arquivos maliciosos detectados por dia em 2025, no mundo' },
    note: {
      en: 'Daily average on Kaspersky detection systems, +7% vs. 2024; files, not attacks or victims.',
      'pt-BR': 'Média diária nos sistemas de detecção da Kaspersky, +7% vs. 2024; arquivos, não ataques nem vítimas.',
    },
    sourceId: 'ksb-2025',
  },
];

export const cyberSources: SourceLink[] = [
  {
    id: 'securelist-phishing-2025',
    label: { en: 'Securelist (Kaspersky), “Spam and phishing in 2025”', 'pt-BR': 'Securelist (Kaspersky), “Spam and phishing in 2025”' },
    url: 'https://securelist.com/spam-and-phishing-report-2025/118785/',
  },
  {
    id: 'ksb-2025',
    label: { en: 'Kaspersky Security Bulletin 2025, “The number of the year”', 'pt-BR': 'Kaspersky Security Bulletin 2025, “The number of the year”' },
    url: 'https://www.kaspersky.com/about/press-releases/the-number-of-the-year-kaspersky-detected-half-a-million-malicious-files-daily-in-2025',
  },
];
