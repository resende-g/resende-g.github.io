import type { Localized } from '../i18n/locales';

export interface ProfileLink {
  id: 'github' | 'linkedin' | 'orcid' | 'lattes';
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  /** Short professional identification shown under the name, one item per role or field. */
  tagline: Localized[];
  /** Brief integrated presentation (professional, technological, academic), kept generic about the employer's operations. */
  summary: Localized;
  location: Localized;
  links: ProfileLink[];
}

export const profile: Profile = {
  name: 'Gabriel Almeida Resende',
  tagline: [
    { en: 'Legal Quality Analyst', 'pt-BR': 'Analista de Qualidade Jurídica' },
    { en: 'AI Evaluation', 'pt-BR': 'Avaliação de IA' },
    { en: 'Law & Technology', 'pt-BR': 'Direito e Tecnologia' },
  ],
  summary: {
    en: 'I work on legal data quality at Jusbrasil, a Brazilian legal technology company: completeness, correctness and recall of legal content collections, validation of automated collection, and evaluation of AI and legal search outputs. Undergraduate technology degree in Information Security; Bachelor of Laws in progress at the Federal University of Bahia (UFBA).',
    'pt-BR': 'Atuo na qualidade de dados jurídicos no Jusbrasil: completude, corretude e revocação de acervos de conteúdo jurídico, validação da coleta automatizada e avaliação de respostas de IA e de busca jurídica. Tecnólogo em Segurança da Informação; graduação em Direito em andamento na UFBA.',
  },
  location: { en: 'Salvador, Bahia, Brazil', 'pt-BR': 'Salvador, Bahia, Brasil' },
  links: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/resende-g' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/gabriel-almeida-resende' },
    { id: 'orcid', label: 'ORCID', url: 'https://orcid.org/0009-0002-0449-7686' },
    { id: 'lattes', label: 'Lattes', url: 'http://lattes.cnpq.br/4047444124061674' },
  ],
};
