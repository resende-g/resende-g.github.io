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
 * Descriptions are summarized from each repository's README (checked on 2026-11-05).
 * Keep them aligned with the repositories; do not add features or results that are not documented there.
 * Order: maturity and closeness to law, AI and security first; projects not built yet last.
 */
export const projects: Project[] = [
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
    id: 'd-bmo',
    name: 'd-BMO (BE MORE DARK)',
    description: {
      en: 'Personal local-first AI assistant meant to grow from a document-query prototype into a modular, auditable infrastructure under the user’s control, with planned modules for orchestration (BMO Brain), persistent personal memory (BMO Heart), document retrieval (BMO Knowledge), and model evaluation (BMO Model Lab). The repository publishes the architecture, security and governance, roadmap, evaluation protocol, and brand documentation, plus the record of a QLoRA smoke test on Qwen3-1.7B with an exploratory A/B comparison: no consistent improvement from the adapter was observed, and the comparison is confounded by different tokenizers/templates between conditions, so it must be repeated. The README states the repository holds documentation only: application code and the evaluation harness are not versioned yet, and no base model has been chosen.',
      'pt-BR': 'Assistente pessoal de IA local-first, pensado para evoluir de um protótipo de consulta documental para uma infraestrutura modular, auditável e controlada pelo usuário, com módulos previstos de orquestração (BMO Brain), memória pessoal persistente (BMO Heart), recuperação documental (BMO Knowledge) e avaliação de modelos (BMO Model Lab). O repositório publica arquitetura, segurança e governança, roadmap, protocolo de avaliação e documentação de identidade visual, além do registro de um smoke test de QLoRA no Qwen3-1.7B com comparação A/B exploratória: não houve melhora consistente com o adapter, e a comparação está confundida por tokenizer/template diferentes entre as condições, por isso precisa ser repetida. O README registra que o repositório contém apenas documentação: o código de aplicação e o harness de avaliação ainda não estão versionados, e nenhum modelo-base foi escolhido.',
    },
    technologies: ['Ollama', 'Local LLMs', 'RAG', 'QLoRA', 'Qwen3', 'Ubuntu'],
    status: 'experimental',
    repositoryUrl: 'https://github.com/resende-g/d-BMO',
  },
  {
    id: 'd-bmo-body',
    name: 'd-BMO-body',
    description: {
      en: 'Hardware for d-BMO: a DIY handheld for hands-on information security study, in the style of the Flipper Zero, with the body of a vertical retro emulation handheld and an original character. Platform confirmed as the ESP32-S3 N16R8 (an ESP32-P4 migration was deferred to a future v2). Planned features: sub-GHz 433 MHz radio (CC1101), NFC (PN532), infrared, Wi-Fi, and Bluetooth on the Bruce firmware, retro games through Retro-Go, audio and microphone, and an agent mode in which the device connects to the d-BMO assistant without access to personal memory and without remote triggering of the RF, NFC, and IR tools. On the bench, the board, display, and three buttons run a custom Bruce build; the CC1101 is not tested yet, the first batch of peripherals (NFC, IR, audio, and microphone) is on order, the battery and charging module have not been bought yet, and the device is not assembled. The RF, NFC, and IR functions are meant for studying protocols on one’s own equipment, in a lab, or in CTFs.',
      'pt-BR': 'Hardware do d-BMO: aparelho portátil DIY para estudar segurança da informação na prática, no estilo do Flipper Zero, com corpo de videogame portátil de emulação vertical e personagem original. Plataforma confirmada: ESP32-S3 N16R8 (a migração para ESP32-P4 foi adiada para uma futura v2). Previstos: rádio sub-GHz 433 MHz (CC1101), NFC (PN532), infravermelho, Wi-Fi e Bluetooth com o firmware Bruce, jogos retrô via Retro-Go, áudio e microfone, e um modo agente em que o aparelho se conecta ao assistente d-BMO sem acesso à memória pessoal e sem acionamento remoto das ferramentas de RF, NFC e IR. Na bancada, placa, tela e três botões rodam um build próprio do Bruce; o CC1101 ainda não foi testado, o primeiro lote de periféricos (NFC, IR, áudio e microfone) está a caminho, a bateria e o módulo de carga ainda não foram comprados e o aparelho não está montado. As funções de RF, NFC e IR servem para estudar protocolos em equipamento próprio, em laboratório ou em CTFs.',
    },
    technologies: ['ESP32-S3', 'CC1101', 'PN532', 'Bruce', 'Retro-Go', 'MicroPython'],
    status: 'experimental',
    repositoryUrl: 'https://github.com/resende-g/d-BMO-body',
  },
];
