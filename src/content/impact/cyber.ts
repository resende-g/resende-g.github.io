import type { Localized } from '../../i18n/locales';
import type { SourceLink } from './justice';

/**
 * Cybersecurity in Brazil: figures from the executive summary of Brasscom's "Relatório de Cibersegurança 2025:
 * Panorama e Insights" (São Paulo, July 2025), as supplied by the site owner (screenshot of the summary page).
 *
 * Verification notes (2026-10-27): brasscom.org.br was not reachable from the build environment; the figures were
 * checked against search-engine excerpts of Brasscom's release and press coverage (Febraban Tech, WeLiveSecurity,
 * Teletime), which match the summary: R$ 104.6 billion projected investment 2025–2028 (+43.8%); 12th position in the
 * global cybersecurity market; ~60 billion attack attempts in 2023; average data-breach cost in Brazil of
 * US$ 1.36 million in 2024; 16.1% annual growth of information-security professionals (2015–2024); phishing as the
 * most common attack. The report compiles third-party data (e.g. the breach cost is in US dollars, from an industry
 * study); the underlying sources could not be read in the PDF from here.
 */

export const CYBER_REFERENCE_NOTE: Localized = {
  en: 'Figures compiled by Brasscom in its 2025 cybersecurity report; each refers to the period shown.',
  'pt-BR': 'Números compilados pela Brasscom no Relatório de Cibersegurança 2025; cada um se refere ao período indicado.',
};

export interface CyberStat {
  id: string;
  value: Localized;
  label: Localized;
  /** Period or scope, in a few words. */
  period: Localized;
}

export const cyberStats: CyberStat[] = [
  {
    id: 'attack-attempts',
    value: { en: '60 bn', 'pt-BR': '60 bi' },
    label: { en: 'attack attempts against Brazil', 'pt-BR': 'tentativas de ataque contra o Brasil' },
    period: { en: 'in 2023', 'pt-BR': 'em 2023' },
  },
  {
    id: 'breach-cost',
    value: { en: 'US$ 1.36 M', 'pt-BR': 'US$ 1,36 mi' },
    label: { en: 'average cost of a data breach in Brazil', 'pt-BR': 'custo médio de uma violação de dados no Brasil' },
    period: { en: '2024', 'pt-BR': '2024' },
  },
  {
    id: 'investment',
    value: { en: 'R$ 104.6 bn', 'pt-BR': 'R$ 104,6 bi' },
    label: { en: 'projected cybersecurity investment', 'pt-BR': 'investimento projetado em cibersegurança' },
    period: { en: '2025–2028, +43.8%', 'pt-BR': '2025–2028, +43,8%' },
  },
  {
    id: 'phishing',
    value: { en: 'Phishing', 'pt-BR': 'Phishing' },
    label: { en: 'the most common attack', 'pt-BR': 'o ataque mais comum' },
    period: { en: 'Brazil, 2025 report', 'pt-BR': 'Brasil, relatório de 2025' },
  },
];

export const cyberSources: SourceLink[] = [
  {
    id: 'brasscom-2025',
    label: {
      en: 'Brasscom, Relatório de Cibersegurança 2025: Panorama e Insights (July 2025), executive summary',
      'pt-BR': 'Brasscom, Relatório de Cibersegurança 2025: Panorama e Insights (julho de 2025), resumo executivo',
    },
    url: 'https://brasscom.org.br/wp-content/uploads/2025/07/BRI2-2025-008-Relatorio-de-Ciberseguranca-v13-3.pdf',
  },
];
