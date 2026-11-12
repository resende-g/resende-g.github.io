import type { Localized } from '../i18n/locales';

export type ProjectStatus = 'planning' | 'experimental' | 'prototype' | 'mvp' | 'firstRelease';

export interface ProjectModule {
  name: string;
  description: Localized;
  status: ProjectStatus;
  /** Optional source repository for a component maintained separately from the main project. */
  repositoryUrl?: string;
  repositoryLabel?: Localized;
}

export interface Project {
  id: string;
  name: string;
  description: Localized;
  icon: string;
  technologies: string[];
  status: ProjectStatus;
  /** Individual contribution, when it can be stated from the available record. */
  contribution?: Localized;
  /** Internal architecture, rendered inside the same project card. */
  modules?: ProjectModule[];
  repositoryUrl: string;
  /** Only link deployments that the project's own README documents. */
  demoUrl?: string;
}

/**
 * Descriptions are summarized from each repository's README (checked on 2026-11-12).
 * Keep them aligned with the repositories; do not add features or results that are not documented there.
 */
export const projects: Project[] = [
  {
    id: 'carb',
    name: 'CARB Portal',
    description: {
      en: 'Public full-stack portal for the Centro Acadêmico Ruy Barbosa (UFBA School of Law), released as v1.0.0. Includes PostgreSQL migrations and synthetic seed data, Supabase Auth with mandatory TOTP, RBAC/RLS, editorial workflows, private document storage, an administrative dashboard, and audit logs. This is a public prototype release, not an institutionally approved UFBA system; real personal data must not be used.',
      'pt-BR': 'Portal público full-stack do Centro Acadêmico Ruy Barbosa (Faculdade de Direito da UFBA), publicado na versão v1.0.0. Inclui migrations PostgreSQL e dados sintéticos, Supabase Auth com TOTP obrigatório, RBAC/RLS, fluxo editorial, armazenamento privado de documentos, painel administrativo e logs de auditoria. É uma versão pública de protótipo, não um sistema homologado institucionalmente pela UFBA; não deve receber dados pessoais reais.',
    },
    icon: 'projects/carb.png',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'pgTAP', 'Cloudflare Workers'],
    status: 'firstRelease',
    contribution: {
      en: 'Developed alongside the technology directorship at CARB, where I maintain the association’s IT infrastructure and website.',
      'pt-BR': 'Desenvolvido em paralelo à diretoria de inovação tecnológica do CARB, onde mantenho a infraestrutura de TI e o site da entidade.',
    },
    repositoryUrl: 'https://github.com/resende-g/carb',
    demoUrl: 'https://carb.portal-carb-prototipo.workers.dev',
  },
  {
    id: 'd-bmo',
    name: 'd-BMO (BE MORE DARK)',
    description: {
      en: 'Personal local-first AI and information-security project designed as one modular system: a handheld body, user interface, orchestration core, personal memory, document knowledge, and model evaluation. The central repository defines architecture, trust boundaries, privacy and permission rules, roadmap, and visual identity. Hardware and firmware live in a dedicated component repository, but remain part of this single system. The complete assistant is not yet runnable: central application modules are planned, while the physical body is under assembly. Its firmware compiles for ESP32-S3 in CI and has 538 automated tests using simulators; it has not yet been validated on the physical board.',
      'pt-BR': 'Projeto pessoal de IA local-first e segurança da informação, concebido como um único sistema modular: corpo portátil, interface, núcleo de orquestração, memória pessoal, conhecimento documental e avaliação de modelos. O repositório central define arquitetura, limites de confiança, regras de privacidade e permissões, roadmap e identidade visual. Hardware e firmware ficam em um repositório de componente dedicado, mas integram o mesmo sistema. O assistente completo ainda não é executável: os módulos centrais da aplicação estão planejados, enquanto o corpo físico está em montagem. O firmware compila para ESP32-S3 na CI e possui 538 testes automatizados com simuladores; ainda não foi validado na placa física.',
    },
    icon: 'projects/d-bmo.jpg',
    technologies: ['ESP32-S3', 'C++17', 'PlatformIO', 'Ollama', 'RAG', 'QLoRA', 'Hermes (experimental)'],
    status: 'experimental',
    modules: [
      {
        name: 'd-BMO Body',
        description: {
          en: 'Physical handheld based on the ESP32-S3 N16R8, with display, controls, audio, and modular firmware for radio, NFC, infrared, storage, power, and cartridges. The firmware is implemented and tested on a computer with simulators; hardware validation and final assembly are pending.',
          'pt-BR': 'Dispositivo portátil baseado no ESP32-S3 N16R8, com tela, controles, áudio e firmware modular para rádio, NFC, infravermelho, armazenamento, energia e cartuchos. O firmware está implementado e testado em computador com simuladores; a validação em hardware e a montagem final estão pendentes.',
        },
        status: 'experimental',
        repositoryUrl: 'https://github.com/resende-g/d-BMO-body',
        repositoryLabel: {
          en: 'Hardware and firmware',
          'pt-BR': 'Hardware e firmware',
        },
      },
      {
        name: 'd-BMO Interface',
        description: {
          en: 'Conversation interface, dashboard, configuration, system status, and controlled presentation of sources and memory.',
          'pt-BR': 'Interface conversacional, painel, configurações, estado do sistema e apresentação controlada de fontes e memória.',
        },
        status: 'planning',
      },
      {
        name: 'BMO Brain',
        description: {
          en: 'Orchestration core for sessions, context, module routing, tool selection, authorization, and policy enforcement. The initial design is a modular monolith, not a multi-agent system by default.',
          'pt-BR': 'Núcleo de orquestração de sessões, contexto, roteamento entre módulos, seleção de ferramentas, autorização e aplicação de políticas. O desenho inicial é um monólito modular, não um sistema multiagente por padrão.',
        },
        status: 'planning',
      },
      {
        name: 'BMO Heart',
        description: {
          en: 'User-controlled persistent personal memory for approved facts, preferences, projects, and decisions, with provenance, review, versioning, export, correction, and deletion.',
          'pt-BR': 'Memória pessoal persistente sob controle do usuário para fatos, preferências, projetos e decisões aprovados, com proveniência, revisão, versionamento, exportação, correção e exclusão.',
        },
        status: 'planning',
      },
      {
        name: 'BMO Knowledge',
        description: {
          en: 'Local document knowledge layer for ingestion, normalization, indexing, retrieval-augmented generation, and verifiable source references, with explicit separation between collections.',
          'pt-BR': 'Camada local de conhecimento documental para ingestão, normalização, indexação, recuperação aumentada por geração e referências verificáveis, com separação explícita entre coleções.',
        },
        status: 'planning',
      },
      {
        name: 'Skills & Policy Gate',
        description: {
          en: 'Declarative capabilities with explicit scopes and permissions, human approval for sensitive operations, and isolated execution for tools.',
          'pt-BR': 'Capacidades declarativas com escopos e permissões explícitos, aprovação humana para operações sensíveis e execução isolada de ferramentas.',
        },
        status: 'planning',
      },
      {
        name: 'BMO Model Lab',
        description: {
          en: 'Independent environment for model inventory, reproducible evaluation, and adaptation experiments. A QLoRA smoke test and exploratory A/B comparison are documented, but no consistent adapter improvement was observed and the evaluation must be repeated.',
          'pt-BR': 'Ambiente independente para inventário de modelos, avaliação reproduzível e experimentos de adaptação. Há registro de smoke test de QLoRA e comparação A/B exploratória, mas não foi observada melhora consistente com o adapter e a avaliação precisa ser repetida.',
        },
        status: 'experimental',
      },
    ],
    repositoryUrl: 'https://github.com/resende-g/d-BMO',
  },
  {
    id: 'prometeu',
    name: 'Prometeu',
    description: {
      en: 'Local converter from text-based PDF to reflowable EPUB 3, with no account, remote service, or telemetry. The CLI MVP has completed all five defined gates and is verified with synthetic data on macOS and Linux, including a six-job GitHub Actions matrix. It handles conservative paragraph reflow, semantic headings, chapter structure, hierarchical navigation, recurring-margin and page-number cleanup, and internal EPUB validation. A desktop application is in alpha; OCR, multi-column layouts, images, and AI are outside the MVP scope.',
      'pt-BR': 'Conversor local de PDF textual para EPUB 3 reflowable, sem conta, serviço remoto ou telemetria. O MVP da CLI concluiu os cinco gates definidos e foi verificado com dados sintéticos em macOS e Linux, incluindo uma matriz de seis jobs no GitHub Actions. Trata reflow conservador de parágrafos, títulos semânticos, estrutura de capítulos, navegação hierárquica, limpeza de margens recorrentes e paginação, além de validação interna do EPUB. O aplicativo desktop está em alpha; OCR, layouts multicoluna, imagens e IA estão fora do escopo do MVP.',
    },
    icon: 'projects/prometeu.png',
    technologies: ['Python', 'EPUB 3', 'pytest', 'Ruff', 'mypy', 'EPUBCheck'],
    status: 'mvp',
    repositoryUrl: 'https://github.com/resende-g/prometeu',
  },
  {
    id: 'gedep',
    name: 'GEDEP — Grupo de Estudos em Direito e Economia Política',
    description: {
      en: 'Academic study group at the UFBA School of Law focused on law and political economy. Its public website presents the group, its principles, meeting calendar, records, and academic production. The calendar is connected to the group’s public Google Calendar; the records and production sections are still being developed.',
      'pt-BR': 'Grupo de estudos da Faculdade de Direito da UFBA dedicado ao Direito e à Economia Política. O site público apresenta o grupo, sua carta de princípios, agenda de encontros, registros e produção acadêmica. O calendário está integrado à agenda pública do Google; as seções de registros e produção continuam em desenvolvimento.',
    },
    icon: 'projects/gedep.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages', 'Google Calendar'],
    status: 'firstRelease',
    repositoryUrl: 'https://github.com/gedep-marx/gedep-marx.github.io',
    demoUrl: 'https://gedep-marx.github.io/',
  },
];
