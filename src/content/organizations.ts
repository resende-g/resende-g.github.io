import type { Localized } from '../i18n/locales';

export interface Organization {
  id: string;
  name: string;
  /** Relationship to the organization, as documented in the CV. */
  relation: Localized;
  /** Add only after verifying the URL. */
  url?: string;
}

export const organizations: Organization[] = [
  { id: 'jusbrasil', name: 'Jusbrasil', relation: { en: 'Legal Quality Analyst', 'pt-BR': 'Analista de Qualidade Jurídica' } },
  { id: 'ufba', name: 'UFBA', relation: { en: 'Bachelor of Laws (in progress)', 'pt-BR': 'Bacharelado em Direito (em andamento)' } },
  { id: 'unifacs', name: 'UNIFACS', relation: { en: 'Information Security (completed)', 'pt-BR': 'Segurança da Informação (concluído)' } },
  { id: 'bahiana', name: 'Escola Bahiana de Medicina e Saúde Pública', relation: { en: 'IT Technician · Apprentice', 'pt-BR': 'Técnico de Informática · Jovem Aprendiz' } },
  { id: 'carb', name: 'CARB – Centro Acadêmico Ruy Barbosa', relation: { en: 'Director of Technological Innovation', 'pt-BR': 'Diretor de Inovação Tecnológica' } },
  { id: 'labid2', name: 'Labid² – UFBA', relation: { en: 'Member (2025–2026)', 'pt-BR': 'Integrante (2025–2026)' } },
  { id: 'tjba', name: 'TJBA Hackathon+ 2025', relation: { en: 'Participant', 'pt-BR': 'Participante' } },
  { id: 'goes-calmon', name: 'Colégio Estadual Góes Calmon', relation: { en: 'Technical diploma', 'pt-BR': 'Curso técnico' } },
];
