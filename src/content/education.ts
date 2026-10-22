import type { Localized } from '../i18n/locales';

export type DegreeStatus = 'completed' | 'inProgress';

export interface Degree {
  id: string;
  title: Localized;
  institution: string;
  period: Localized;
  status: DegreeStatus;
}

export interface Certification {
  id: string;
  title: Localized;
  issuer: string;
}

export const degrees: Degree[] = [
  {
    id: 'ufba-law',
    title: { en: 'Bachelor of Laws (LL.B.)', 'pt-BR': 'Bacharelado em Direito' },
    institution: 'UFBA – Universidade Federal da Bahia',
    period: { en: '2022 – expected 2028', 'pt-BR': '2022 – previsão 2028' },
    status: 'inProgress',
  },
  {
    id: 'unifacs-infosec',
    title: {
      en: 'Undergraduate Technology Degree (Tecnólogo) in Information Security',
      'pt-BR': 'Curso Superior de Tecnologia em Segurança da Informação',
    },
    institution: 'UNIFACS – Universidade Salvador',
    period: { en: 'Jan 2024 – Jul 2026', 'pt-BR': 'jan. 2024 – jul. 2026' },
    status: 'completed',
  },
  {
    id: 'goes-calmon-technical',
    title: {
      en: 'Technical Diploma in Computer Maintenance and Support',
      'pt-BR': 'Técnico em Manutenção e Suporte em Informática',
    },
    institution: 'Colégio Estadual Góes Calmon',
    period: { en: 'Feb 2019 – Dec 2021', 'pt-BR': 'fev. 2019 – dez. 2021' },
    status: 'completed',
  },
];

export const certifications: Certification[] = [
  {
    id: 'stf-educa-ai',
    title: { en: 'Applying Artificial Intelligence to Law', 'pt-BR': 'Aplicação da Inteligência Artificial ao Direito' },
    issuer: 'STF Educa',
  },
  { id: 'claude-101', title: { en: 'Claude 101', 'pt-BR': 'Claude 101' }, issuer: 'Anthropic' },
  {
    id: 'exin-pdpe',
    title: { en: 'PDPE Essentials – Brazilian General Data Protection Law (LGPD)', 'pt-BR': 'PDPE Essentials – Lei Geral de Proteção de Dados (LGPD)' },
    issuer: 'EXIN',
  },
  {
    id: 'hackers-do-bem',
    title: { en: 'Cybersecurity Training (Basic Module)', 'pt-BR': 'Formação em Cibersegurança (Módulo Básico)' },
    issuer: 'Hackers do Bem',
  },
  {
    id: 'cis-controls',
    title: { en: 'Cybersecurity Fundamentals – Introduction to CIS Controls', 'pt-BR': 'Fundamentos da Segurança Cibernética – Introdução ao CIS Controls' },
    issuer: 'CIS',
  },
];
