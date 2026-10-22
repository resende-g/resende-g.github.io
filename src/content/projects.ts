import type { Localized } from '../i18n/locales';

export type ProjectStatus = 'planning' | 'experimental' | 'prototype' | 'mvp' | 'firstRelease';

export interface Project {
  id: string;
  name: string;
  description: Localized;
  technologies: string[];
  status: ProjectStatus;
  /** Individual contribution, when it can be stated from the available record. */
  contribution?: Localized;
  repositoryUrl: string;
  /** Only link deployments that the project's own README documents. */
  demoUrl?: string;
}

/**
 * Descriptions are summarized from each repository's README (checked on 2026-10-22).
 * Keep them aligned with the repositories; do not add features or results that are not documented there.
 */
export const projects: Project[] = [
  {
    id: 'prometeu',
    name: 'Prometeu',
    description: {
      en: 'Local converter from text-based PDF to reflowable EPUB 3, with no account, remote service, or telemetry. Handles paragraph reflow, heading levels, chapters, a hierarchical table of contents, removal of recurring margins and page numbers, and an internal EPUB 3 validation step before publishing. Ships a CLI; a desktop preview app exists in an early stage.',
      'pt-BR': 'Conversor local de PDF textual para EPUB 3 reflowable, sem conta, serviço remoto ou telemetria. Trata reflow de parágrafos, níveis de título, capítulos, sumário hierárquico, remoção de margens recorrentes e números de página, com validação interna de EPUB 3 antes da publicação. Oferece uma CLI; há um aplicativo desktop em estágio inicial.',
    },
    technologies: ['Python', 'EPUB 3', 'pytest', 'Ruff', 'mypy'],
    status: 'experimental',
    repositoryUrl: 'https://github.com/resende-g/prometeu',
  },
  {
    id: 'carb',
    name: 'CARB Portal',
    description: {
      en: 'Full-stack public portal for the Centro Acadêmico Ruy Barbosa (law student association at UFBA): editorial tools for posts, revisions, and documents, role-based access with mandatory TOTP, private file storage, an admin dashboard, and audit logs. The README states it is not an approved institutional system and should not be used with real personal data yet.',
      'pt-BR': 'Portal público full-stack do Centro Acadêmico Ruy Barbosa (UFBA): ferramentas editoriais para posts, revisões e documentos, controle de acesso por papéis com TOTP obrigatório, armazenamento privado de arquivos, painel administrativo e logs de auditoria. O README registra que não é um sistema institucional homologado e que ainda não deve ser usado com dados pessoais reais.',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Cloudflare Workers'],
    status: 'firstRelease',
    contribution: {
      en: 'Developed alongside the technology directorship at CARB, where I maintain the association’s IT infrastructure and website.',
      'pt-BR': 'Desenvolvido em paralelo à diretoria de inovação tecnológica do CARB, onde mantenho a infraestrutura de TI e o site da entidade.',
    },
    repositoryUrl: 'https://github.com/resende-g/carb',
    demoUrl: 'https://carb.portal-carb-prototipo.workers.dev',
  },
  {
    id: 'dark-bmo',
    name: 'dark-BMO',
    description: {
      en: 'DIY handheld multitool for hands-on information security study, in the style of the Flipper Zero, built around an ESP32-S3 with a look inspired by BMO from Adventure Time. Planned features: sub-GHz 433 MHz radio (CC1101), NFC (PN532), infrared, Wi-Fi, and Bluetooth on the Bruce firmware, plus retro games through Retro-Go. The README states the project is planned, with parts partially purchased and not yet assembled; the RF, NFC, and IR functions are meant for studying protocols on one’s own equipment, in a lab, or in CTFs.',
      'pt-BR': 'Multitool portátil DIY para estudar segurança da informação na prática, no estilo do Flipper Zero, baseado em ESP32-S3 e com visual inspirado no BMO de Hora de Aventura. Previstos: rádio sub-GHz 433 MHz (CC1101), NFC (PN532), infravermelho, Wi-Fi e Bluetooth com o firmware Bruce, além de jogos retrô via Retro-Go. O README registra que o projeto está planejado, com peças parcialmente compradas e ainda não montado; as funções de RF, NFC e IR servem para estudar protocolos em equipamento próprio, em laboratório ou em CTFs.',
    },
    technologies: ['ESP32-S3', 'CC1101', 'PN532', 'Bruce', 'Retro-Go', 'MicroPython'],
    status: 'planning',
    repositoryUrl: 'https://github.com/resende-g/dark-BMO',
  },
  {
    id: 'bmo',
    name: 'BMO',
    description: {
      en: 'Experimental local assistant for querying documents with models run through Ollama, prioritizing local execution, verifiable references, and separation between document collections. The MVP targets a command-line tool on Ubuntu that answers questions about a public document using locally retrieved passages and shows each passage with its source. The README states the MVP is not finished and the repository currently holds only the initial documentation; the prototype code is not in it yet.',
      'pt-BR': 'Assistente local experimental para consultar documentos com modelos executados pelo Ollama, com prioridade para execução local, referências verificáveis e separação entre coleções de documentos. O MVP prevê uma ferramenta de linha de comando no Ubuntu que responda perguntas sobre um documento público usando trechos recuperados localmente e mostre cada trecho com sua fonte. O README registra que o MVP não está concluído e que o repositório, por enquanto, contém só a documentação inicial; o código do protótipo ainda não está nele.',
    },
    technologies: ['Ollama', 'Local LLMs', 'Ubuntu'],
    status: 'experimental',
    repositoryUrl: 'https://github.com/resende-g/BMO',
  },
  {
    id: 'esperanca',
    name: 'Esperança — Multi-door Justice Chatbot',
    description: {
      en: 'AI assistant prototype built for the TJBA (Bahia State Court) Hackathon+ 2025: helps citizens understand their rights in plain language and find the appropriate route to resolve a problem (conciliation, mediation, administrative bodies, digital channels), with accessibility features planned.',
      'pt-BR': 'Protótipo de assistente de IA desenvolvido para o Hackathon+ TJBA 2025: ajuda o cidadão a entender seus direitos em linguagem simples e a encontrar a via adequada para resolver um problema (conciliação, mediação, órgãos administrativos, canais digitais), com recursos de acessibilidade previstos.',
    },
    technologies: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase (planned)'],
    status: 'prototype',
    contribution: {
      en: 'Hackathon participation with an AI agent prototype focused on access to justice.',
      'pt-BR': 'Participação no hackathon com protótipo de agente de IA voltado ao acesso à justiça.',
    },
    repositoryUrl: 'https://github.com/resende-g/Hackthon-TjBa',
  },
];
