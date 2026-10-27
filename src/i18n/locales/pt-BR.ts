import type { Dictionary } from './en';

export const ptBR: Dictionary = {
  meta: {
    title: 'Gabriel Almeida Resende — Analista de Qualidade Jurídica | Avaliação de IA | Direito e Tecnologia',
    description:
      'Portfólio de Gabriel Almeida Resende: qualidade de dados jurídicos, avaliação de sistemas de IA e busca jurídica, segurança da informação e pesquisa acadêmica na interseção entre Direito e tecnologia.',
  },
  nav: {
    label: 'Navegação principal',
    impact: 'Dados',
    papers: 'Papers',
    projects: 'Projetos',
    curriculum: 'Currículo',
    organizations: 'Organizações',
    skipToContent: 'Ir para o conteúdo',
  },
  brand: {
    shortName: 'Resende',
    logoAlt: 'Marca Resende',
  },
  language: {
    label: 'Idioma',
    switchTo: 'Mudar para {name}',
  },
  hero: {
    primaryCta: 'Ver projetos',
    secondaryCta: 'Entrar em contato',
    downloadCv: 'Baixar currículo',
    linksLabel: 'Código e perfis profissionais',
    academicLabel: 'Perfis acadêmicos e contato',
  },
  panels: {
    papers: { title: 'Papers recentes', lead: 'Publicações, interesses de pesquisa e identificadores acadêmicos.' },
    projects: { title: 'Projetos', lead: 'Repositórios públicos. As descrições seguem o README de cada projeto; a situação reflete o que está documentado ali.' },
    curriculum: { title: 'Currículo', lead: 'Experiência profissional, formação acadêmica e competências.' },
    organizations: { title: 'Organizações', lead: 'Empregadores, universidades e grupos do histórico profissional e acadêmico.' },
  },
  curriculum: {
    experience: 'Experiência profissional',
    education: 'Formação acadêmica',
    certifications: 'Certificações e cursos',
    skills: 'Competências e tecnologias',
  },
  experience: {
    highlightsLabel: 'Destaques',
    present: 'presente',
  },
  projects: {
    repository: 'Código-fonte',
    demo: 'Protótipo online',
    technologies: 'Tecnologias',
    status: 'Situação',
    role: 'Contribuição',
    statusValues: {
      planning: 'Em planejamento',
      experimental: 'Experimental',
      prototype: 'Protótipo',
      mvp: 'MVP',
      firstRelease: 'Primeira versão pública',
    },
  },
  education: {
    statusValues: {
      completed: 'Concluído',
      inProgress: 'Em andamento',
    },
    expected: 'previsão',
  },
  research: {
    interests: 'Interesses de pesquisa',
    groups: 'Grupos e atividades acadêmicas',
    publications: 'Publicações',
    publicationsEmpty: 'Nenhuma publicação listada ainda. Referências e links serão adicionados aqui.',
    identifiers: 'Identificadores acadêmicos',
  },
  contact: {
    email: 'E-mail',
  },
  impact: {
    title: 'Dois campos, uma exigência: dados em que se possa confiar',
    lead: 'Um recorte dos dois campos em que atuo. Ambos se resolvem em dados corretos, rastreabilidade e governança — o núcleo do meu trabalho em qualidade de dados jurídicos e em segurança da informação.',
    brazil: 'Brasil',
    eu: 'União Europeia',
    sources: 'Fontes',
    justice: {
      title: 'Justiça no Brasil, comparada com a União Europeia',
      lead: 'Demanda judicial em 2024, com dados do CNJ comparados a dados da CEPEJ.',
      statueAlt: 'Ilustração estilizada da estátua “A Justiça”, de Alfredo Ceschiatti, em frente ao Supremo Tribunal Federal, em Brasília: figura sentada, com os olhos vendados e uma espada sobre o colo.',
      ratio: '{n}× no Brasil',
      chartLabel: 'Comparação de indicadores judiciais entre Brasil e União Europeia, 2024',
      periodNote: 'Ano de referência 2024, divulgado com os relatórios de 2025. Comparação apenas com a UE; não é um ranking mundial.',
    },
    cyber: {
      title: 'Cibersegurança no Brasil',
      lead: 'Um mapa demonstrativo e números do relatório de 2025 da Brasscom.',
      simulationBadge: 'Simulação',
      simulationNotice: 'O mapa mostra eventos sintéticos desenhados no seu navegador, não ataques reais nem dados em tempo real.',
      mapLabel: 'Mapa de vidro do Brasil com rastros prateados animados representando eventos cibernéticos simulados',
      staticMapLabel: 'Mapa de vidro do Brasil com rastros prateados de exemplo representando eventos cibernéticos simulados (versão estática)',
      pause: 'Pausar',
      resume: 'Retomar',
      reducedMotion: 'Versão estática: seu sistema prefere movimento reduzido.',
      noCanvas: 'Versão estática: o navegador não conseguiu desenhar a animação.',
    },
  },
  footer: {
    builtWith: 'Site estático hospedado no GitHub Pages. Sem rastreamento ou analytics.',
    source: 'Código-fonte do site',
  },
};
