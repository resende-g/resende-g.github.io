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

export const experience: ExperienceEntry[] = [
  {
    id: 'jusbrasil-analyst',
    role: { en: 'Legal Quality Analyst I', 'pt-BR': 'Analista de Qualidade Jurídica I' },
    organization: 'Jusbrasil',
    unit: { en: 'Data Collection · dataset quality team', 'pt-BR': 'Data Collection · Célula de Qualidade de Artefatos' },
    location: { en: 'Salvador, Brazil', 'pt-BR': 'Salvador, BA' },
    period: { en: 'Jul 2026 – Present', 'pt-BR': 'jul. 2026 – presente' },
    summary: {
      en: 'Responsible for the quality of the legislation dataset (normative acts collected from official sources): completeness, correctness, and recall metrics, plus web crawler validation.',
      'pt-BR': 'Responsável pela qualidade do artefato de Legislação (atos normativos coletados de fontes oficiais): métricas de completude, corretude e revocação, além da validação de crawlers.',
    },
    highlights: [
      {
        en: 'Redesigned the correctness QA methodology: reproducible SQL sampling in BigQuery with a documented seed, manual verification against the official source, and a standardized report with evidence and defects categorized by relevance, so each round can be replicated and audited.',
        'pt-BR': 'Redesenhei a metodologia de QA de corretude: amostragem reprodutível em SQL (BigQuery) com semente documentada, conferência manual contra a fonte oficial e relatório padronizado com evidências e defeitos categorizados por relevância, de modo que cada rodada possa ser replicada e auditada.',
      },
      {
        en: 'Root cause analysis of defects, distinguishing collection failures, indexing failures, and lag in the official source, redirecting fixes to the responsible team.',
        'pt-BR': 'Análise de causa-raiz de defeitos, distinguindo falhas de coleta, falhas de indexação e defasagem da fonte oficial, redirecionando correções ao time responsável.',
      },
      {
        en: 'Built automated triage of structural anomalies in the dataset (repealed provisions without strikethrough, duplicated article numbers, summary text inside the body) to prioritize QA samples, with documented coverage limits.',
        'pt-BR': 'Construí uma triagem automatizada de anomalias estruturais no acervo (revogação sem tachado, numeração de artigo repetida, ementa no corpo do texto) para priorizar amostras de QA, com limites de cobertura documentados.',
      },
      {
        en: 'Weekly snapshot on-call: investigate crawler discrepancies by source, separate false positives from genuine failures, and escalate cases with evidence in Jira.',
        'pt-BR': 'On-call semanal de snapshots: investigo divergências de crawlers por fonte, separo falsos positivos de falhas reais e escalono casos com evidências no Jira.',
      },
      {
        en: 'Created Claude Code skills (crawler validation, snapshot triage, backlog triage, daily status) integrated with BigQuery, Jira, and Slack through MCP connectors to standardize recurring QA routines.',
        'pt-BR': 'Criei skills para o Claude Code (validação de crawlers, triagem de snapshots, triagem de pendências e daily) integradas a BigQuery, Jira e Slack por conectores MCP, para padronizar rotinas recorrentes de QA.',
      },
      {
        en: 'Evaluate AI system responses, classifier outputs, and search engine results in the legal domain for accuracy, adherence, and quality.',
        'pt-BR': 'Avalio respostas de sistemas de IA, classificadores e mecanismos de busca no domínio jurídico quanto a precisão, aderência e qualidade dos resultados.',
      },
      {
        en: 'Documented the operating procedures for the legislation dataset and prepare weekly reports for management and senior leadership.',
        'pt-BR': 'Documentei as rotinas operacionais de Legislação e elaboro relatórios semanais para a gestão e a diretoria.',
      },
    ],
  },
  {
    id: 'jusbrasil-intern',
    role: { en: 'Data Collection Intern', 'pt-BR': 'Estagiário, Data Collection' },
    organization: 'Jusbrasil',
    unit: { en: 'Data Collection · datasets and operations', 'pt-BR': 'Data Collection · Artefatos & Operações' },
    location: { en: 'Salvador, Brazil', 'pt-BR': 'Salvador, BA' },
    period: { en: 'Nov 2025 – Jun 2026', 'pt-BR': 'nov. 2025 – jun. 2026' },
    highlights: [
      {
        en: 'Validated the structure of converted legal treatises (footnotes, tables, section hierarchy, metadata) for ingestion into Jus IA and legal search; identified a systemic footnote failure in a publisher batch and validated the fix.',
        'pt-BR': 'Validei a estrutura de obras doutrinárias convertidas (notas de rodapé, tabelas, hierarquia de seções e metadados) para ingestão no Jus IA e na pesquisa jurídica; identifiquei falha sistêmica de notas de rodapé em lote de editora e validei a correção.',
      },
      {
        en: 'Validated the recall of case law crawlers (state courts, regional labor courts, STJ, TST, electoral courts) and of new legislation crawlers, reporting root causes in Jira.',
        'pt-BR': 'Validei a revocação de crawlers de jurisprudência (TJs, TRTs, STJ, TST e tribunais eleitorais) e de novos crawlers de legislação e atos administrativos, com relatório de causa-raiz no Jira.',
      },
      {
        en: 'Monitored official gazettes daily and alerted the on-call based on evidence.',
        'pt-BR': 'Acompanhei diariamente os diários oficiais, acionando o on-call com base em evidências.',
      },
      {
        en: 'Annotated legal treatises in Label Studio for model training data and wrote the annotation guidelines with quality criteria.',
        'pt-BR': 'Anotei obras doutrinárias no Label Studio para treinamento de modelos e elaborei o guia de anotação com critérios de qualidade.',
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
        en: 'End-user technical support and IT infrastructure management at a large healthcare institution, including an OS image deployment server and monitoring of performance, storage, and network.',
        'pt-BR': 'Suporte técnico a usuários e gestão da infraestrutura de TI de instituição de saúde de grande porte, incluindo o servidor de deploy de imagens de sistema operacional e o monitoramento de desempenho, armazenamento e rede.',
      },
      {
        en: 'Vulnerability management with Microsoft Defender, phishing incident handling, and security awareness training for employees.',
        'pt-BR': 'Gestão de vulnerabilidades com Microsoft Defender, tratamento de incidentes de phishing e treinamentos de conscientização em segurança da informação.',
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
