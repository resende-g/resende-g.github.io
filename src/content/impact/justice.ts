import type { Localized } from '../../i18n/locales';

/**
 * Judicial demand: Brazil vs. the European Union, reference year 2024.
 *
 * Primary source: CNJ, Justiça em Números 2025 (ano-base 2024), published 23 Sep 2025, whose international comparison
 * uses CEPEJ data (Commission européenne pour l'efficacité de la justice). Starting point: ConJur, Danilo Vital,
 * "Brasileiros acionam o Poder Judiciário quatro vezes mais do que europeus" (25 Sep 2025; PDF supplied by the owner).
 *
 * Verification notes (2026-10-27):
 * - The ConJur tables read: casos novos 4,44 (UE) vs 18,55 (BR), 4,18 vezes; casos novos por magistrado 249 vs 2.103,
 *   8,4 vezes. Both figures also appear in search-engine excerpts of the CNJ executive summary and press coverage
 *   (cnj.jus.br and conjur.com.br were not reachable from the build environment).
 * - Unit: the report prints "por cem mil habitantes", but the CNJ executive summary says "por cem habitantes" and
 *   the arithmetic only works per 100 inhabitants (39.4 million new cases over ~212 million inhabitants ≈ 18.5).
 * - The reference year of the European figures inside the comparison was not verified.
 * - A newer edition exists (Justiça em Números 2026, base year 2025). This module keeps 2024 on purpose.
 */

export interface JusticeIndicator {
  id: string;
  label: Localized;
  unit: Localized;
  brazil: number;
  eu: number;
  decimals: number;
}

export const JUSTICE_REFERENCE_YEAR = 2024;

export const justiceIndicators: JusticeIndicator[] = [
  {
    id: 'new-cases-per-100',
    label: { en: 'New cases', 'pt-BR': 'Casos novos' },
    unit: { en: 'per 100 inhabitants', 'pt-BR': 'por 100 habitantes' },
    brazil: 18.55,
    eu: 4.44,
    decimals: 2,
  },
  {
    id: 'new-cases-per-judge',
    label: { en: 'New cases per judge', 'pt-BR': 'Casos novos por magistrado' },
    unit: { en: 'cases per judge', 'pt-BR': 'casos por magistrado' },
    brazil: 2103,
    eu: 249,
    decimals: 0,
  },
];

export interface SourceLink {
  id: string;
  label: Localized;
  url: string;
}

export const justiceSources: SourceLink[] = [
  {
    id: 'cnj-jn-2025',
    label: { en: 'CNJ, Justiça em Números 2025 (base year 2024), with CEPEJ data', 'pt-BR': 'CNJ, Justiça em Números 2025 (ano-base 2024), com dados da CEPEJ' },
    url: 'https://www.cnj.jus.br/pesquisas-judiciarias/justica-em-numeros/',
  },
  {
    id: 'conjur',
    label: { en: 'ConJur, 25 Sep 2025', 'pt-BR': 'ConJur, 25/09/2025' },
    url: 'https://www.conjur.com.br/2025-set-25/brasileiros-acionam-o-poder-judiciario-quatro-vezes-mais-do-que-europeus/',
  },
];
