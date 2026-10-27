import type { Localized } from '../../i18n/locales';
import type { SourceLink } from './justice';

/**
 * Cyber-threat statistics for 2025. Every figure carries its own scope, period and methodology because the
 * sources measure different phenomena (files detected, link clicks blocked, share of users affected, change in
 * detections). They must not be added up or read as "attacks against Brazil".
 *
 * Verification notes (2026-10-27; kaspersky.com and securelist.com were not reachable from the build
 * environment — figures were checked against search-engine excerpts of the primary pages named below):
 * - 500,000 malicious files/day, +7% vs 2024; password stealers +59%, spyware +51%, backdoors +6% (global):
 *   Kaspersky press release "The number of the year", 2 Dec 2025 (Kaspersky Security Bulletin 2025).
 * - 554,002,207 attempts to follow phishing links blocked in 2025 (global) and Brazil 15.48% of users who
 *   encountered phishing (6th place): Securelist, "Spam and phishing in 2025".
 * - Latin America: backdoors +24%, password stealers +35%, spyware +64% (detections, 2025 vs 2024):
 *   Kaspersky Latin America press release on the Security Bulletin 2025.
 * - Not used: a Brazil-specific count of ~553 million phishing blocks (Kaspersky "Panorama de Ameaças",
 *   Sep 2025) covers a 12-month window that is not calendar 2025 and is easy to confuse with the global 554 M.
 */

export const CYBER_REFERENCE_YEAR = 2025;

export interface CyberStat {
  id: string;
  /** Display value already formatted per locale (keeps formatting decisions next to the data). */
  value: Localized;
  label: Localized;
  /** Geographic scope. */
  scope: Localized;
  period: Localized;
  /** One-line description of what is counted and by whom. */
  method: Localized;
  sourceId: string;
}

export const cyberStats: CyberStat[] = [
  {
    id: 'malicious-files-per-day',
    value: { en: '500,000', 'pt-BR': '500 mil' },
    label: { en: 'new malicious files detected per day, on average', 'pt-BR': 'novos arquivos maliciosos detectados por dia, em média' },
    scope: { en: 'Global', 'pt-BR': 'Global' },
    period: { en: '2025 · +7% vs. 2024', 'pt-BR': '2025 · +7% vs. 2024' },
    method: {
      en: 'Daily average of unique malicious files found by Kaspersky detection systems; files, not attacks or victims.',
      'pt-BR': 'Média diária de arquivos maliciosos únicos encontrados pelos sistemas de detecção da Kaspersky; arquivos, não ataques nem vítimas.',
    },
    sourceId: 'ksb-2025',
  },
  {
    id: 'phishing-links-blocked',
    value: { en: '554,002,207', 'pt-BR': '554.002.207' },
    label: { en: 'attempts to open phishing links blocked', 'pt-BR': 'tentativas de acesso a links de phishing bloqueadas' },
    scope: { en: 'Global', 'pt-BR': 'Global' },
    period: { en: '2025', 'pt-BR': '2025' },
    method: {
      en: 'Blocked by the Kaspersky anti-phishing component on its users’ devices; one count per blocked attempt.',
      'pt-BR': 'Bloqueios do componente antiphishing da Kaspersky nos dispositivos de seus usuários; uma contagem por tentativa bloqueada.',
    },
    sourceId: 'securelist-phishing-2025',
  },
  {
    id: 'brazil-phishing-share',
    value: { en: '15.48%', 'pt-BR': '15,48%' },
    label: { en: 'of Kaspersky users in Brazil encountered phishing', 'pt-BR': 'dos usuários da Kaspersky no Brasil encontraram phishing' },
    scope: { en: 'Brazil (6th among countries)', 'pt-BR': 'Brasil (6º entre os países)' },
    period: { en: '2025', 'pt-BR': '2025' },
    method: {
      en: 'Share of the vendor’s users in the country whose anti-phishing component was triggered at least once; not a share of the population.',
      'pt-BR': 'Proporção dos usuários do fornecedor no país cujo componente antiphishing foi acionado ao menos uma vez; não é uma parcela da população.',
    },
    sourceId: 'securelist-phishing-2025',
  },
];

/** Year-over-year change in detections by category, 2025 vs. 2024 (percent). */
export interface GrowthSeries {
  id: 'latam' | 'global';
  label: Localized;
  sourceId: string;
  values: Record<GrowthCategory, number>;
}

export type GrowthCategory = 'backdoors' | 'passwordStealers' | 'spyware';

export const growthCategories: { id: GrowthCategory; label: Localized }[] = [
  { id: 'backdoors', label: { en: 'Backdoors', 'pt-BR': 'Backdoors' } },
  { id: 'passwordStealers', label: { en: 'Password stealers', 'pt-BR': 'Ladrões de senha' } },
  { id: 'spyware', label: { en: 'Spyware', 'pt-BR': 'Spyware' } },
];

export const growthSeries: GrowthSeries[] = [
  {
    id: 'latam',
    label: { en: 'Latin America', 'pt-BR': 'América Latina' },
    sourceId: 'kaspersky-latam-2025',
    values: { backdoors: 24, passwordStealers: 35, spyware: 64 },
  },
  {
    id: 'global',
    label: { en: 'Global', 'pt-BR': 'Global' },
    sourceId: 'ksb-2025',
    values: { backdoors: 6, passwordStealers: 59, spyware: 51 },
  },
];

export const cyberSources: SourceLink[] = [
  {
    id: 'ksb-2025',
    label: {
      en: 'Kaspersky, “The number of the year: half a million malicious files daily in 2025” (Security Bulletin 2025), 2 Dec 2025',
      'pt-BR': 'Kaspersky, “The number of the year: half a million malicious files daily in 2025” (Security Bulletin 2025), 02/12/2025',
    },
    url: 'https://www.kaspersky.com/about/press-releases/the-number-of-the-year-kaspersky-detected-half-a-million-malicious-files-daily-in-2025',
  },
  {
    id: 'securelist-phishing-2025',
    label: {
      en: 'Securelist (Kaspersky), “Spam and phishing in 2025”',
      'pt-BR': 'Securelist (Kaspersky), “Spam and phishing in 2025”',
    },
    url: 'https://securelist.com/spam-and-phishing-report-2025/118785/',
  },
  {
    id: 'kaspersky-latam-2025',
    label: {
      en: 'Kaspersky Latin America, “El cibercrimen en cifras: medio millón de archivos maliciosos al día en 2025”',
      'pt-BR': 'Kaspersky América Latina, “El cibercrimen en cifras: medio millón de archivos maliciosos al día en 2025”',
    },
    url: 'https://latam.kaspersky.com/about/press-releases/el-cibercrimen-en-cifras-kaspersky-detecto-medio-millon-de-archivos-maliciosos-al-dia-en-2025',
  },
];

/* ---------- Demonstrative map (synthetic events; no real-time data) ---------- */

export type ThreatCategory = 'phishing' | 'malware' | 'credential';

/** Categories shown on the map legend. Colors are semantic and fixed (validated for CVD separation). */
export const threatCategories: { id: ThreatCategory; label: Localized; color: string }[] = [
  { id: 'phishing', label: { en: 'Phishing', 'pt-BR': 'Phishing' }, color: '#3987e5' },
  { id: 'malware', label: { en: 'Malicious files', 'pt-BR': 'Arquivos maliciosos' }, color: '#d95926' },
  { id: 'credential', label: { en: 'Credential theft / spyware', 'pt-BR': 'Roubo de credenciais / spyware' }, color: '#199e70' },
];

export interface Hub {
  id: string;
  name: string;
  lon: number;
  lat: number;
  /** Relative frequency as origin or destination of synthetic events (no empirical meaning). */
  weight: number;
}

export const hubs: Hub[] = [
  { id: 'sao', name: 'São Paulo', lon: -46.63, lat: -23.55, weight: 3 },
  { id: 'bsb', name: 'Brasília', lon: -47.88, lat: -15.79, weight: 2 },
  { id: 'for', name: 'Fortaleza', lon: -38.52, lat: -3.73, weight: 1 },
  { id: 'bue', name: 'Buenos Aires', lon: -58.38, lat: -34.6, weight: 1 },
  { id: 'bog', name: 'Bogotá', lon: -74.07, lat: 4.71, weight: 1 },
  { id: 'mex', name: 'Mexico City', lon: -99.13, lat: 19.43, weight: 1.5 },
  { id: 'nyc', name: 'New York', lon: -74.01, lat: 40.71, weight: 2 },
  { id: 'sfo', name: 'San Francisco', lon: -122.42, lat: 37.77, weight: 1.5 },
  { id: 'lon', name: 'London', lon: -0.13, lat: 51.51, weight: 2 },
  { id: 'fra', name: 'Frankfurt', lon: 8.68, lat: 50.11, weight: 1.5 },
  { id: 'mad', name: 'Madrid', lon: -3.7, lat: 40.42, weight: 1 },
  { id: 'mow', name: 'Moscow', lon: 37.62, lat: 55.75, weight: 1.5 },
  { id: 'ist', name: 'Istanbul', lon: 28.98, lat: 41.01, weight: 1 },
  { id: 'los', name: 'Lagos', lon: 3.38, lat: 6.52, weight: 1 },
  { id: 'jnb', name: 'Johannesburg', lon: 28.05, lat: -26.2, weight: 1 },
  { id: 'dxb', name: 'Dubai', lon: 55.27, lat: 25.2, weight: 1 },
  { id: 'bom', name: 'Mumbai', lon: 72.88, lat: 19.08, weight: 1.5 },
  { id: 'sin', name: 'Singapore', lon: 103.82, lat: 1.35, weight: 1.5 },
  { id: 'bjs', name: 'Beijing', lon: 116.4, lat: 39.9, weight: 1.5 },
  { id: 'sel', name: 'Seoul', lon: 126.98, lat: 37.57, weight: 1 },
  { id: 'tyo', name: 'Tokyo', lon: 139.69, lat: 35.69, weight: 1.5 },
  { id: 'syd', name: 'Sydney', lon: 151.21, lat: -33.87, weight: 1 },
];
