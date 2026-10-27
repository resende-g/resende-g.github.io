import type { Localized } from '../i18n/locales';

export interface ExperienceEntry {
  id: string;
  role: Localized;
  organization: string;
  unit?: Localized;
  location: Localized;
  /** Display string, e.g. "Jul 2026 – Present". Kept as text to avoid locale-specific date logic. */
  period: Localized;
  summary?: Localized;
  highlights: Localized[];
}

/**
 * Public, generic descriptions: role, employer and period only where already public; activities described as
 * transferable skills, without internal team or system names, metrics, volumes or process details.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'jusbrasil-analyst',
    role: { en: 'Legal Quality Analyst I', 'pt-BR': 'Analista de Qualidade Jurídica I' },
    organization: 'Jusbrasil',
    location: { en: 'Salvador, Brazil', 'pt-BR': 'Salvador, BA' },
    period: { en: 'Jul 2026 – Present', 'pt-BR': 'jul. 2026 – presente' },
    summary: {
      en: 'Quality assurance of legal content datasets: completeness, correctness and recall, validation of automated collection, and evaluation of AI and search outputs in the legal domain.',
      'pt-BR': 'Garantia de qualidade de acervos de conteúdo jurídico: completude, corretude e revocação, validação da coleta automatizada e avaliação de saídas de IA e de busca no domínio jurídico.',
    },
    highlights: [
      {
        en: 'Designed and documented a reproducible, auditable quality-assurance method: sampling, verification against official sources, defect categorization and standardized reporting with evidence.',
        'pt-BR': 'Desenhei e documentei um método de garantia de qualidade reprodutível e auditável: amostragem, conferência contra fontes oficiais, categorização de defeitos e relatório padronizado com evidências.',
      },
      {
        en: 'Root-cause analysis of data defects, separating collection, indexing and source issues, and routing fixes to the responsible teams.',
        'pt-BR': 'Análise de causa-raiz de defeitos de dados, distinguindo problemas de coleta, de indexação e de fonte, e encaminhamento das correções aos times responsáveis.',
      },
      {
        en: 'Automated triage of structural anomalies in legal texts to prioritize review, with documented coverage limits.',
        'pt-BR': 'Triagem automatizada de anomalias estruturais em textos jurídicos para priorizar a revisão, com limites de cobertura documentados.',
      },
      {
        en: 'Validation of automated collection against official sources, distinguishing false positives from genuine failures and escalating with evidence.',
        'pt-BR': 'Validação da coleta automatizada contra fontes oficiais, separando falsos positivos de falhas reais e escalando com evidências.',
      },
      {
        en: 'Automation of recurring quality routines with AI-assisted tooling and SQL.',
        'pt-BR': 'Automação de rotinas recorrentes de qualidade com ferramentas assistidas por IA e SQL.',
      },
      {
        en: 'Evaluation of AI system responses, classifier outputs and search results in the legal domain for accuracy, adherence and quality.',
        'pt-BR': 'Avaliação de respostas de sistemas de IA, de classificadores e de resultados de busca no domínio jurídico quanto a precisão, aderência e qualidade.',
      },
      {
        en: 'Operating documentation and periodic reporting for management.',
        'pt-BR': 'Documentação operacional e relatórios periódicos para a gestão.',
      },
    ],
  },
  {
    id: 'jusbrasil-intern',
    role: { en: 'Data Collection Intern', 'pt-BR': 'Estagiário, Data Collection' },
    organization: 'Jusbrasil',
    location: { en: 'Salvador, Brazil', 'pt-BR': 'Salvador, BA' },
    period: { en: 'Nov 2025 – Jun 2026', 'pt-BR': 'nov. 2025 – jun. 2026' },
    highlights: [
      {
        en: 'Structural validation of converted legal publications (notes, tables, section hierarchy, metadata) before ingestion, reporting systematic defects with evidence.',
        'pt-BR': 'Validação estrutural de publicações jurídicas convertidas (notas, tabelas, hierarquia de seções, metadados) antes da ingestão, com relato de defeitos sistemáticos e evidências.',
      },
      {
        en: 'Recall validation of automated collection of case law and legislation, with root-cause reports.',
        'pt-BR': 'Validação de revocação da coleta automatizada de jurisprudência e legislação, com relatórios de causa-raiz.',
      },
      {
        en: 'Daily monitoring of official publications and evidence-based escalation.',
        'pt-BR': 'Acompanhamento diário de publicações oficiais e escalonamento baseado em evidências.',
      },
      {
        en: 'Annotation of legal documents for model training and authorship of annotation guidelines with quality criteria.',
        'pt-BR': 'Anotação de documentos jurídicos para treinamento de modelos e elaboração do guia de anotação com critérios de qualidade.',
      },
    ],
  },
  {
    id: 'bahiana-technician',
    role: { en: 'IT Technician', 'pt-BR': 'Técnico de Informática' },
    organization: 'Escola Bahiana de Medicina e Saúde Pública',
    location: { en: 'Salvador, Brazil', 'pt-BR': 'Salvador, BA' },
    period: { en: 'Sep 2022 – Oct 2025', 'pt-BR': 'set. 2022 – out. 2025' },
    highlights: [
      {
        en: 'End-user technical support and IT infrastructure management at a large healthcare institution, including system deployment and monitoring of performance, storage and network.',
        'pt-BR': 'Suporte técnico a usuários e gestão da infraestrutura de TI de instituição de saúde de grande porte, incluindo implantação de sistemas e monitoramento de desempenho, armazenamento e rede.',
      },
      {
        en: 'Vulnerability management, phishing incident handling and security awareness training for employees.',
        'pt-BR': 'Gestão de vulnerabilidades, tratamento de incidentes de phishing e treinamentos de conscientização em segurança da informação.',
      },
    ],
  },
  {
    id: 'bahiana-apprentice',
    role: { en: 'IT Support Apprentice', 'pt-BR': 'Jovem Aprendiz, Suporte de TI' },
    organization: 'Escola Bahiana de Medicina e Saúde Pública',
    location: { en: 'Salvador, Brazil', 'pt-BR': 'Salvador, BA' },
    period: { en: 'Sep 2020 – Aug 2022', 'pt-BR': 'set. 2020 – ago. 2022' },
    highlights: [
      {
        en: 'Supervised technical support, equipment maintenance, and support for information security initiatives.',
        'pt-BR': 'Suporte técnico supervisionado, manutenção de equipamentos e apoio a ações de segurança da informação.',
      },
    ],
  },
];
