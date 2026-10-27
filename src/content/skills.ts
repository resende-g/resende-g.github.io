import type { Localized } from '../i18n/locales';

export interface SkillGroup {
  id: string;
  title: Localized;
  items: Localized[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'legal-data-quality',
    title: { en: 'Legal & data quality', 'pt-BR': 'Qualidade jurídica e de dados' },
    items: [
      { en: 'QA of legislation, legal publications, case law and official gazettes', 'pt-BR': 'QA de legislação, publicações jurídicas, jurisprudência e diários oficiais' },
      { en: 'Completeness, correctness and recall metrics', 'pt-BR': 'Métricas de completude, corretude e revocação' },
      { en: 'Reproducible sampling and validation against official sources', 'pt-BR': 'Amostragem reprodutível e validação contra fonte oficial' },
      { en: 'Root-cause analysis and defect categorization', 'pt-BR': 'Análise de causa-raiz e categorização de defeitos' },
      { en: 'Validation of automated data collection', 'pt-BR': 'Validação de coleta automatizada de dados' },
    ],
  },
  {
    id: 'ai-evaluation',
    title: { en: 'AI evaluation & automation', 'pt-BR': 'Avaliação de IA e automação' },
    items: [
      { en: 'Critical evaluation of LLM outputs, classifiers and search engines', 'pt-BR': 'Avaliação crítica de saídas de LLMs, classificadores e mecanismos de busca' },
      { en: 'AI-assisted automation of recurring routines (Claude Code, skills, MCP)', 'pt-BR': 'Automação de rotinas recorrentes assistida por IA (Claude Code, skills, MCP)' },
      { en: 'Prompt engineering for legal contexts', 'pt-BR': 'Engenharia de prompts em contexto jurídico' },
      { en: 'Data annotation and annotation guidelines', 'pt-BR': 'Anotação de dados e guias de anotação' },
    ],
  },
  {
    id: 'tools',
    title: { en: 'Tools & platforms', 'pt-BR': 'Ferramentas e plataformas' },
    items: [
      { en: 'SQL and cloud data warehouses', 'pt-BR': 'SQL e data warehouses em nuvem' },
      { en: 'Dashboards and data analysis', 'pt-BR': 'Dashboards e análise de dados' },
      { en: 'Issue tracking and documentation tools', 'pt-BR': 'Ferramentas de rastreamento de demandas e documentação' },
      { en: 'Git, GitHub', 'pt-BR': 'Git, GitHub' },
    ],
  },
  {
    id: 'software',
    title: { en: 'Software development', 'pt-BR': 'Desenvolvimento de software' },
    items: [
      { en: 'Python', 'pt-BR': 'Python' },
      { en: 'TypeScript, React, Next.js, Vite', 'pt-BR': 'TypeScript, React, Next.js, Vite' },
      { en: 'PostgreSQL, Supabase', 'pt-BR': 'PostgreSQL, Supabase' },
    ],
  },
  {
    id: 'security',
    title: { en: 'Information security & data protection', 'pt-BR': 'Segurança da informação e proteção de dados' },
    items: [
      { en: 'LGPD (Brazilian General Data Protection Law)', 'pt-BR': 'LGPD' },
      { en: 'ISO/IEC 27001/27002, CIS Controls', 'pt-BR': 'ISO/IEC 27001/27002, CIS Controls' },
      { en: 'Vulnerability management and phishing response', 'pt-BR': 'Gestão de vulnerabilidades e resposta a phishing' },
      { en: 'Security awareness training', 'pt-BR': 'Conscientização em segurança' },
    ],
  },
  {
    id: 'legal-domain',
    title: { en: 'Legal domain knowledge', 'pt-BR': 'Conhecimento jurídico e documental' },
    items: [
      { en: 'Brazilian normative acts: validity periods and amendments', 'pt-BR': 'Atos normativos: vigência e alterações' },
      { en: 'Legal document types', 'pt-BR': 'Tipologia de documentos jurídicos' },
      { en: 'Structure of the Brazilian judiciary', 'pt-BR': 'Estrutura do Judiciário brasileiro' },
    ],
  },
  {
    id: 'languages',
    title: { en: 'Languages', 'pt-BR': 'Idiomas' },
    items: [
      { en: 'Portuguese (native)', 'pt-BR': 'Português (nativo)' },
      { en: 'English (intermediate)', 'pt-BR': 'Inglês (intermediário)' },
    ],
  },
];
