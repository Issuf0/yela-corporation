import { ProjectCase } from '../types';

export const DEMO_PROJECTS: ProjectCase[] = [
  {
    id: 'proj-01',
    title: 'Portal de Gestão Logística e Rastreio de Frotas',
    clientSector: 'Logística & Distribuição Interprovincial',
    location: 'Maputo — Beira — Nampula',
    problem: 'Falta de visibilidade centralizada no transporte de mercadorias entre corredores rodoviários, atrasos em relatórios e perda de dados em papel.',
    solution: 'Ponte estratégica liderada pela YELA com levantamento operacional no terreno, seguida do desenvolvimento de aplicação web e mobile pela Learn Code.',
    result: 'Redução estimada em 65% no tempo de despacho de cargas e relatórios executivos em tempo real para os gestores de operações.',
    tags: ['Aplicação Web', 'Mobilidade', 'Expansão Territorial'],
    isDemo: true,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-02',
    title: 'Plataforma Corporativa & Captação de Clientes Institucionais',
    clientSector: 'Serviços Financeiros & Consultoria',
    location: 'Maputo Cidade',
    problem: 'Comunicação digital desajustada à estatura corporativa da empresa, resultando em baixa taxa de conversão e perda de credibilidade junto de parceiros internacionais.',
    solution: 'Reformulação da narrativa de marca e estratégia de prospecção conduzida pela YELA, associada ao desenvolvimento de portal institucional ultrarrápido pela Learn Code.',
    result: 'Aumento expressivo na captação de leads B2B qualificados no primeiro trimestre e integração com fluxo automatizado de propostas.',
    tags: ['Website Corporativo', 'Marketing B2B', 'Geração de Leads'],
    isDemo: true,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-03',
    title: 'Digitalização do Processo de Emissão de Faturas e Cobranças',
    clientSector: 'Comércio Grossista & Distribuição',
    location: 'Sofala (Beira)',
    problem: 'Dependência de talões físicos e processos de reconciliação bancária manuais com reconciliações demoradas e frequentes discrepâncias de inventário.',
    solution: 'Diagnóstico dos fluxos comerciais pela YELA e arquitetura de sistema de gestão personalizada com sincronização bancária pela Learn Code.',
    result: 'Processos de emissão acelerados em 80%, diminuição drástica de erros de faturação e conciliação em minutos.',
    tags: ['Digitalização de Processos', 'Software Personalizado'],
    isDemo: true,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'proj-04',
    title: 'App de Coleta de Dados em Campo e Inquéritos Rurais',
    clientSector: 'Organização de Desenvolvimento Comunitário',
    location: 'Zambézia & Niassa',
    problem: 'Dificuldade de recolher indicadores socioeconómicos em zonas remotas sem cobertura de rede móvel estável, gerando atrasos em relatórios para financiadores.',
    solution: 'Compreensão aprofundada dos desafios locais pela equipa YELA, com implementação de app móvel com sincronização offline inteligente pela Learn Code.',
    result: 'Coleta fiável de dados por agentes no terreno, com sincronização automática imediata ao atingir áreas com conectividade.',
    tags: ['App Mobile', 'Modo Offline', 'Impacto Social'],
    isDemo: true,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
  }
];
