import type { Localized } from '../../i18n/locales';

/**
 * Judicial demand: Brazil vs. the European Union, reference year 2024.
 *
 * Primary source: CNJ, Justiça em Números 2025 (ano-base 2024), published 23 Sep 2025, including its
 * international comparison built on CEPEJ data (Commission européenne pour l'efficacité de la justice).
 * Starting point for this module: ConJur, Danilo Vital, "Brasileiros acionam o Poder Judiciário quatro vezes mais
 * do que europeus" (25 Sep 2025), which reports the same figures.
 *
 * Verification notes (2026-10-27):
 * - The ConJur report (PDF supplied by the site owner, 3 pages) carries two tables: "Indicadores gerais" (casos novos
 *   4,44 vs 18,55 = 4,18 vezes; baixados 4,48 vs 21,07 = 4,7; pendentes 2,58 vs 37,93 = 14,7) and "Indicadores por
 *   magistrado" (magistrados por cem mil habitantes 18 vs 9; casos novos 249 vs 2.103 = 8,4; pendentes 145 vs 4.300
 *   = 29,7; baixados 252 vs 2.389 = 9,5). It also states the stock fell from 84,1 to 80,6 million at the end of 2024
 *   and that the European figures come from a CEPEJ report.
 * - Unit of the per-inhabitant rates: the report prints "por cem mil habitantes", but the CNJ executive summary says
 *   "por cem habitantes" and the arithmetic only works per 100 inhabitants (39.4 million new cases in 2024 over
 *   ~212 million inhabitants ≈ 18.5 per 100; 80.6 million pending ≈ 37.9 per 100). The rates below are therefore
 *   labelled per 100 inhabitants. Judges are per 100 thousand inhabitants, as printed.
 * - cnj.jus.br and conjur.com.br were not reachable from the build environment; 18.55 / 4.44, 2,103 / 249, 9 / 18
 *   and 80.6 / 84.1 million were also confirmed in search-engine excerpts of the CNJ executive summary and press
 *   release. The per-magistrate figures are the ones of the CEPEJ comparison (the CNJ release quotes 2,569 resolved
 *   cases per magistrate, computed on another base).
 * - The reference year of the European figures inside the comparison was not verified; they are the data the CNJ
 *   used for its comparison in the 2025 edition.
 * - A newer edition exists (Justiça em Números 2026, base year 2025: 75.5 million pending). This module keeps the
 *   2024 reference year on purpose; update the figures together with the sources when migrating.
 */

export interface JusticeIndicator {
  id: string;
  label: Localized;
  /** Unit shown next to the figures. */
  unit: Localized;
  brazil: number;
  eu: number;
  /** Primary indicators are charted; secondary ones appear in the expandable table. */
  tier: 'primary' | 'secondary';
  /** Decimal places for display. */
  decimals: number;
  note?: Localized;
}

export const JUSTICE_REFERENCE_YEAR = 2024;

export const justiceIndicators: JusticeIndicator[] = [
  {
    id: 'new-cases-per-100',
    label: { en: 'New cases', 'pt-BR': 'Casos novos' },
    unit: { en: 'per 100 inhabitants', 'pt-BR': 'por 100 habitantes' },
    brazil: 18.55,
    eu: 4.44,
    tier: 'primary',
    decimals: 2,
  },
  {
    id: 'pending-cases-per-100',
    label: { en: 'Pending cases', 'pt-BR': 'Casos pendentes' },
    unit: { en: 'per 100 inhabitants', 'pt-BR': 'por 100 habitantes' },
    brazil: 37.93,
    eu: 2.58,
    tier: 'primary',
    decimals: 2,
  },
  {
    id: 'new-cases-per-judge',
    label: { en: 'New cases per judge', 'pt-BR': 'Casos novos por magistrado' },
    unit: { en: 'cases per judge', 'pt-BR': 'casos por magistrado' },
    brazil: 2103,
    eu: 249,
    tier: 'primary',
    decimals: 0,
  },
  {
    id: 'resolved-cases-per-100',
    label: { en: 'Resolved cases', 'pt-BR': 'Casos baixados' },
    unit: { en: 'per 100 inhabitants', 'pt-BR': 'por 100 habitantes' },
    brazil: 21.07,
    eu: 4.48,
    tier: 'secondary',
    decimals: 2,
  },
  {
    id: 'resolved-cases-per-judge',
    label: { en: 'Resolved cases per judge', 'pt-BR': 'Casos baixados por magistrado' },
    unit: { en: 'cases per judge', 'pt-BR': 'casos por magistrado' },
    brazil: 2389,
    eu: 252,
    tier: 'secondary',
    decimals: 0,
  },
  {
    id: 'pending-cases-per-judge',
    label: { en: 'Pending cases per judge', 'pt-BR': 'Casos pendentes por magistrado' },
    unit: { en: 'cases per judge', 'pt-BR': 'casos por magistrado' },
    brazil: 4300,
    eu: 145,
    tier: 'secondary',
    decimals: 0,
  },
  {
    id: 'judges-per-100k',
    label: { en: 'Judges', 'pt-BR': 'Magistrados' },
    unit: { en: 'per 100,000 inhabitants', 'pt-BR': 'por 100 mil habitantes' },
    brazil: 9,
    eu: 18,
    tier: 'secondary',
    decimals: 0,
    note: {
      en: 'Rounded values as released with the report; here the EU figure is the larger one.',
      'pt-BR': 'Valores arredondados conforme divulgados com o relatório; aqui o valor maior é o da UE.',
    },
  },
];

/** National stock of pending cases (absolute total, not a per-inhabitant rate). */
export const pendingStock = {
  year: 2024,
  value: 80_600_000,
  previousYear: 2023,
  previousValue: 84_100_000,
};

export interface SourceLink {
  id: string;
  label: Localized;
  url: string;
}

export const justiceSources: SourceLink[] = [
  {
    id: 'cnj-jn-2025',
    label: {
      en: 'CNJ — Justiça em Números 2025 (base year 2024), report and executive summary',
      'pt-BR': 'CNJ — Justiça em Números 2025 (ano-base 2024), relatório e sumário executivo',
    },
    url: 'https://www.cnj.jus.br/pesquisas-judiciarias/justica-em-numeros/',
  },
  {
    id: 'cnj-press',
    label: {
      en: 'CNJ press release, 23 Sep 2025: backlog down to 80.6 million cases',
      'pt-BR': 'Notícia do CNJ, 23/09/2025: estoque cai para 80,6 milhões de processos',
    },
    url: 'https://www.cnj.jus.br/justica-em-numeros-judiciario-reduziu-acervo-e-alcancou-produtividade-historica-em-2024/',
  },
  {
    id: 'cepej',
    label: {
      en: 'CEPEJ — European judicial systems evaluation data (Council of Europe), used by the CNJ for the comparison',
      'pt-BR': 'CEPEJ — dados de avaliação dos sistemas judiciais europeus (Conselho da Europa), usados pelo CNJ na comparação',
    },
    url: 'https://www.coe.int/en/web/cepej/cepej-stat',
  },
  {
    id: 'conjur',
    label: {
      en: 'ConJur, 25 Sep 2025: “Brasileiros acionam o Poder Judiciário quatro vezes mais do que europeus”',
      'pt-BR': 'ConJur, 25/09/2025: “Brasileiros acionam o Poder Judiciário quatro vezes mais do que europeus”',
    },
    url: 'https://www.conjur.com.br/2025-set-25/brasileiros-acionam-o-poder-judiciario-quatro-vezes-mais-do-que-europeus/',
  },
];
