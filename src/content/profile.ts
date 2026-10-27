import type { Localized } from '../i18n/locales';

export interface ProfileLink {
  id: 'github' | 'linkedin' | 'orcid' | 'lattes';
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  /** Short professional identification shown under the name. */
  tagline: Localized;
  /** Brief integrated presentation (professional, technological, academic), kept generic about the employer's operations. */
  summary: Localized;
  location: Localized;
  links: ProfileLink[];
}

export const profile: Profile = {
  name: 'Gabriel Almeida Resende',
  tagline: {
    en: 'Legal Quality Analyst | AI Evaluation | Law & Technology',
    'pt-BR': 'Analista de Qualidade Jurídica | Avaliação de IA | Direito e Tecnologia',
  },
  summary: {
    en: 'I work on the quality of legal data at Jusbrasil, a Brazilian legal technology company: assessing the completeness, correctness and recall of legal content collections, validating automated collection, and evaluating responses from AI systems and legal search engines. My background combines an undergraduate technology degree in Information Security, a Bachelor of Laws in progress at the Federal University of Bahia (UFBA), and research interests in AI, data protection, and digital governance.',
    'pt-BR': 'Atuo na qualidade de dados jurídicos no Jusbrasil: avalio completude, corretude e revocação de acervos de conteúdo jurídico, valido a coleta automatizada e analiso respostas de sistemas de IA e mecanismos de busca jurídica. Minha formação combina o curso superior de tecnologia em Segurança da Informação, a graduação em Direito em andamento na Universidade Federal da Bahia (UFBA) e interesses de pesquisa em IA, proteção de dados e governança digital.',
  },
  location: { en: 'Salvador, Bahia, Brazil', 'pt-BR': 'Salvador, Bahia, Brasil' },
  links: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/resende-g' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/gabriel-almeida-resende' },
    { id: 'orcid', label: 'ORCID', url: 'https://orcid.org/0009-0002-0449-7686' },
    { id: 'lattes', label: 'Lattes', url: 'http://lattes.cnpq.br/4047444124061674' },
  ],
};
