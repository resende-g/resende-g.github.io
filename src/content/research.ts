import type { Localized } from '../i18n/locales';

export interface ResearchGroup {
  id: string;
  name: string;
  institution: Localized;
  role: Localized;
  period: Localized;
  description: Localized;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: number;
  url?: string;
  /** DOI or other persistent identifier, when available. */
  identifier?: string;
}

export interface AcademicIdentifier {
  id: 'orcid' | 'lattes';
  label: string;
  value: string;
  url: string;
}

export const researchInterests: Localized[] = [
  { en: 'Law and technology', 'pt-BR': 'Direito e tecnologia' },
  { en: 'Artificial intelligence and law', 'pt-BR': 'Inteligência artificial e Direito' },
  { en: 'Data protection', 'pt-BR': 'Proteção de dados' },
  { en: 'Cybersecurity', 'pt-BR': 'Cibersegurança' },
  { en: 'Digital governance', 'pt-BR': 'Governança digital' },
  { en: 'Political economy of data and technology', 'pt-BR': 'Economia política dos dados e da tecnologia' },
];

export const researchGroups: ResearchGroup[] = [
  {
    id: 'labid2',
    name: 'Labid² – Laboratório de Inovação e Direitos Digitais',
    institution: { en: 'UFBA', 'pt-BR': 'UFBA' },
    role: { en: 'Member', 'pt-BR': 'Integrante' },
    period: { en: 'Jun 2025 – Feb 2026', 'pt-BR': 'jun. 2025 – fev. 2026' },
    description: {
      en: 'Studies on innovation in law: personal data protection, the use of artificial intelligence, legal design and visual law, and new approaches to legal management.',
      'pt-BR': 'Estudos sobre inovação no Direito: proteção de dados pessoais, uso de inteligência artificial, legal design e visual law, e novas formas de gestão jurídica.',
    },
  },
  {
    id: 'carb',
    name: 'Centro Acadêmico Ruy Barbosa (CARB)',
    institution: { en: 'UFBA School of Law', 'pt-BR': 'Faculdade de Direito da UFBA' },
    role: { en: 'Director of Technological Innovation', 'pt-BR': 'Diretor de Inovação Tecnológica' },
    period: { en: 'Dec 2024 – Present', 'pt-BR': 'dez. 2024 – presente' },
    description: {
      en: 'Director of Technological Innovation since Nov 2025, with a focus on technology and digital rights; previously Vice Director of Technological Innovation and Marketing (Dec 2024 – Oct 2025), maintaining the association’s IT infrastructure and website and enabling HTTPS in coordination with the university’s IT department.',
      'pt-BR': 'Diretor de Inovação Tecnológica desde nov. 2025, com foco em tecnologia e direitos digitais; antes, Vice-Diretor de Inovação Tecnológica e Marketing (dez. 2024 – out. 2025), com manutenção da infraestrutura de TI e do site institucional e ativação do certificado de segurança junto à STI/UFBA.',
    },
  },
];

/** Add entries here as publications become available. Do not list unpublished or unverified works. */
export const publications: Publication[] = [];

export const academicIdentifiers: AcademicIdentifier[] = [
  { id: 'orcid', label: 'ORCID', value: '0009-0002-0449-7686', url: 'https://orcid.org/0009-0002-0449-7686' },
  { id: 'lattes', label: 'Lattes', value: 'lattes.cnpq.br/4047444124061674', url: 'http://lattes.cnpq.br/4047444124061674' },
];
