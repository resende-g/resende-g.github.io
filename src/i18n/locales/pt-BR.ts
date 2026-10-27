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
    bustAlt: 'Busto de vidro translúcido de Gabriel Almeida Resende, renderizado a partir de uma digitalização 3D',
    primaryCta: 'Ver projetos',
    secondaryCta: 'Entrar em contato',
    downloadCv: 'Baixar currículo',
    linksLabel: 'Perfis profissionais',
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
    title: 'Dois sistemas, uma exigência: dados em que se possa confiar',
    lead:
      'Os dois campos em que atuo, em números das fontes primárias. A escala do Judiciário brasileiro e o volume de ameaças digitais impõem as mesmas exigências: dados corretos, rastreabilidade e governança.',
    bridge:
      'No meu trabalho, essas exigências têm forma concreta: verificar completude, corretude e revocação de um acervo de legislação coletado de fontes oficiais, avaliar respostas de sistemas de IA e de mecanismos de busca jurídica e, antes disso, gerir vulnerabilidades e incidentes de phishing em uma instituição de saúde. Os módulos acima mostram a escala que torna esse trabalho necessário.',
    brazil: 'Brasil',
    eu: 'União Europeia',
    sources: 'Fontes',
    tableView: 'Todos os indicadores em tabela',
    justice: {
      title: 'Justiça: Brasil e União Europeia',
      lead: 'Demanda judicial por 100 habitantes e por magistrado, ano de referência 2024. Dados do CNJ comparados com dados da CEPEJ, conforme publicados no Justiça em Números 2025.',
      statueAlt: 'Ilustração estilizada da estátua “A Justiça”, de Alfredo Ceschiatti, em frente ao Supremo Tribunal Federal, em Brasília: figura sentada, com os olhos vendados e uma espada sobre o colo.',
      ratio: '{n}× no Brasil',
      ratioEu: '{n}× na UE',
      chartLabel: 'Comparação de indicadores judiciais entre Brasil e União Europeia, 2024',
      stockLabel: 'processos pendentes no Brasil ao final de 2024',
      stockNote: 'Total nacional, não é taxa por habitante. Eram {previous} ao final do ano anterior.',
      periodNote: 'Ano de referência 2024; dados divulgados com os relatórios de 2025. A comparação abrange apenas a União Europeia — não estabelece um ranking mundial de litigiosidade.',
      columns: { indicator: 'Indicador', unit: 'Unidade', brazil: 'Brasil', eu: 'União Europeia', ratio: 'Razão' },
      noteLabel: 'Observação',
    },
    cyber: {
      title: 'Ciberameaças: mapa demonstrativo e números de 2025',
      lead: 'De onde partem e onde chegam as ameaças digitais é uma questão global. O mapa é uma simulação animada; os números abaixo dele são estatísticas verificadas de 2025, cada uma com abrangência e método.',
      simulationBadge: 'Simulação',
      simulationNotice:
        'Eventos sintéticos gerados no seu navegador para demonstração. Não são ataques reais, não são dados em tempo real e não vêm de nenhum serviço de monitoramento.',
      mapLabel: 'Mapa-múndi estilizado com arcos animados entre cidades representando eventos cibernéticos simulados',
      staticMapLabel: 'Mapa-múndi estilizado com arcos de exemplo entre cidades representando eventos cibernéticos simulados (versão estática)',
      legend: 'Categorias de eventos (simulados)',
      pause: 'Pausar animação',
      resume: 'Retomar animação',
      paused: 'Animação pausada',
      reducedMotion: 'Versão estática exibida porque seu sistema prefere movimento reduzido.',
      noCanvas: 'Versão estática exibida porque o navegador não conseguiu desenhar o mapa animado.',
      statsTitle: 'Números verificados, 2025',
      scope: 'Abrangência',
      period: 'Período',
      method: 'O que é contado',
      growthTitle: 'Variação das detecções por categoria, 2025 vs. 2024',
      growthUnit: 'variação percentual das detecções (telemetria da Kaspersky)',
      growthLabel: 'Gráfico de barras agrupadas comparando o crescimento anual das detecções de backdoors, ladrões de senha e spyware na América Latina e no mundo',
      growthNote: 'Cada barra é a variação anual do número de detecções de uma categoria, na telemetria do fornecedor. As séries regional e global vêm de divulgações separadas e não são parcelas de um mesmo total.',
      noMixNote: 'Arquivos detectados, tentativas de phishing bloqueadas, usuários afetados e eventos simulados no mapa são medidas diferentes e não são comparáveis entre si.',
    },
  },
  footer: {
    builtWith: 'Site estático hospedado no GitHub Pages. Sem rastreamento ou analytics.',
    source: 'Código-fonte do site',
  },
};
