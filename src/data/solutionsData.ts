import { ServiceItem } from '../types';

export const DIGITAL_SOLUTIONS: ServiceItem[] = [
  {
    id: 'website-institucional',
    name: 'Website Institucional de Alta Performance',
    category: 'Presença Digital & Marca',
    badge: 'Solução Digital',
    iconName: 'Globe',
    shortDesc: 'Portais corporativos responsivos, rápidos e orientados à conversão e credibilidade institucional.',
    fullDesc: 'Concepção de estrutura institucional contemporânea, optimizada para SEO, adaptabilidade mobile e geração contínua de contactos empresariais. Uma presença sólida para posicionar a sua empresa em Moçambique e no mercado regional.',
    problemSolved: 'Empresas sem presença digital credível, websites desactualizados ou páginas lentas que não convertem visitantes em clientes reais.',
    targetAudience: 'PMEs, empresas de serviços corporativos, instituições, indústrias e consultoras moçambicanas.',
    highlights: [
      'Encaminhado para arquitetura técnica Learn Code',
      'Optimização extrema para dispositivos móveis',
      'Painel de gestão de conteúdos intuitivo',
      'Formulários com tracking de leads e segurança'
    ]
  },
  {
    id: 'aplicacao-web',
    name: 'Aplicação Web & Portal de Clientes',
    category: 'Sistemas Cloud',
    badge: 'Solução Digital',
    iconName: 'LayoutGrid',
    shortDesc: 'Plataformas SaaS, intranets corporativas e portais interativos para gestão e prestação de serviços online.',
    fullDesc: 'Aplicações web modernas desenvolvidas à medida dos fluxos operacionais da sua instituição. Permite que clientes, colaboradores ou parceiros interajam com dados em tempo real com máxima segurança.',
    problemSolved: 'Operações manuais dispersas por folhas de cálculo, falta de centralização na interação com clientes e lentidão no atendimento.',
    targetAudience: 'Bancos, seguradoras, distribuidoras, empresas de logística e empresas de serviços com alto volume de clientes.',
    highlights: [
      'Levantamento de requisitos conduzido pela YELA',
      'Arquitectura de base de dados e segurança pela Learn Code',
      'Integrações via API e autenticação segura',
      'Escalabilidade em servidores cloud'
    ]
  },
  {
    id: 'aplicacao-mobile',
    name: 'Aplicação Mobile (iOS & Android)',
    category: 'Mobilidade & Apps',
    badge: 'Solução Digital',
    iconName: 'Smartphone',
    shortDesc: 'Aplicações móveis nativas ou multiplataforma focadas em conveniência, fidelização e serviços no terreno.',
    fullDesc: 'Desenvolvimento de aplicações para smartphone que aproximam a sua organização do público moçambicano, com operação eficiente mesmo em condições de largura de banda reduzida.',
    problemSolved: 'Dificuldade em manter clientes engajados, falta de canais diretos para vendas/serviços e equipas de campo sem ferramentas móveis conectadas.',
    targetAudience: 'Operadores de retalho, microfinanças, serviços de entregas, frotas e serviços públicos.',
    highlights: [
      'Compatibilidade iOS e Android',
      'Modo offline e sincronização inteligente',
      'Notificações push institucionais',
      'Desenvolvimento e suporte técnico contínuo pela Learn Code'
    ]
  },
  {
    id: 'sistema-personalizado',
    name: 'Sistema de Gestão Personalizado (ERP/CRM)',
    category: 'Software Corporativo',
    badge: 'Solução Digital',
    iconName: 'Database',
    shortDesc: 'Software operacional tailor-made para controlo financeiro, stocks, faturação, recursos humanos e clientes.',
    fullDesc: 'Desenvolvimento de sistemas construídos exactamente para a realidade e regras de negócio da sua organização em Moçambique, sem a rigidez ou custos excessivos de licenças genéricas internacionais.',
    problemSolved: 'Sistemas importados desajustados à legislação e moeda moçambicana (Metical), processos descentralizados e ausência de relatórios executivos.',
    targetAudience: 'Empresas em expansão territorial, indústrias, cadeias de distribuição e operadores de serviços.',
    highlights: [
      'Diagnóstico de oportunidades operacionais pela YELA',
      'Desenvolvimento integral pela equipa de engenharia Learn Code',
      'Modelagem relacional e dashboards executivos',
      'Formação de utilizadores e garantia técnica'
    ]
  },
  {
    id: 'digitalizacao-processos',
    name: 'Digitalização e Automação de Processos',
    category: 'Eficiência Operacional',
    badge: 'Solução Digital',
    iconName: 'Cpu',
    shortDesc: 'Eliminação de papel e fluxos manuais através de fluxos de aprovação automatizados e integração de dados.',
    fullDesc: 'Mapeamento minucioso dos estrangulamentos na sua organização e desenho de pipelines digitais que reduzem o tempo de resposta entre departamentos de dias para minutos.',
    problemSolved: 'Processos burocráticos lentos, erros humanos na transcrição de documentos físicos e perdas de prazos críticos.',
    targetAudience: 'Organizações não-governamentais, escritórios de advocacia, instituições educativas e departamentos de RH e compras.',
    highlights: [
      'Auditoria de fluxos operacionais',
      'Automatismos e triggers de notificação',
      'Rastreabilidade e auditoria digital',
      'Execução e integração de software pela Learn Code'
    ]
  },
  {
    id: 'consultoria-tecnologica',
    name: 'Diagnóstico & Consultoria Tecnológica',
    category: 'Estratégia & Inovação',
    badge: 'Consultoria Estratégica',
    iconName: 'Compass',
    shortDesc: 'Análise estratégica de infraestrutura, software e necessidades de expansão digital para a sua instituição.',
    fullDesc: 'Avaliamos a maturidade digital da sua organização, definimos o roadmap tecnológico adequado e preparamos os cadernos de encargos técnicos para execução sem desperdício de recursos.',
    problemSolved: 'Incerteza sobre quais tecnologias adoptar, orçamentos inflacionados sem entrega de valor real e falta de alinhamento entre estratégia de negócio e TI.',
    targetAudience: 'Direcções executivas, conselhos de administração e gestores de inovação e tecnologia.',
    highlights: [
      'Ponte estratégica entre visão de negócio (YELA) e arquitetura (Learn Code)',
      'Relatório de diagnóstico e recomendações com estimativa de custos',
      'Planeamento faseado de investimento',
      'Supervisão e acompanhamento contínuo'
    ]
  }
];

export const YELA_CORE_SERVICES = [
  {
    id: 'comunicacao-estrategica',
    title: 'Comunicação Institucional & Corporativa',
    description: 'Construção de narrativas sólidas, posicionamento de autoridade e diálogo estruturado com o ecossistema empresarial moçambicano.',
    icon: 'Megaphone',
    details: 'Ajudamos organizações a articularem a sua proposta de valor com clareza, gerando confiança junto de parceiros, investidores e clientes.'
  },
  {
    id: 'marketing-posicionamento',
    title: 'Marketing & Posicionamento de Mercado',
    description: 'Campanhas direccionadas para geração de notoriedade qualificada e atracção de decisores empresariais.',
    icon: 'Target',
    details: 'Estratégias de marketing de canal múltiplo em Moçambique com mensuração de resultados e alinhamento comercial.'
  },
  {
    id: 'prospeccao-comercial',
    title: 'Prospecção Comercial & Qualificação',
    description: 'Identificação ativa de oportunidades de negócio, abordagem a decisores e filtragem rigorosa de necessidades.',
    icon: 'Briefcase',
    details: 'Mapeamos empresas que necessitam de soluções e conduzimos as conversas iniciais para compreender o desafio antes do desenho técnico.'
  },
  {
    id: 'desenvolvimento-oportunidades',
    title: 'Desenvolvimento de Oportunidades',
    description: 'Transformação de dores operacionais e gargalos de negócio em casos de uso viáveis e estruturados.',
    icon: 'Sparkles',
    details: 'Fazemos o diagnóstico preliminar e a ponte estruturada entre o cliente e a equipa técnica para que os projetos nasçam com foco no valor.'
  },
  {
    id: 'expansao-territorial',
    title: 'Expansão Territorial em Moçambique',
    description: 'Rede de presença e relacionamento comercial entre Maputo, Sofala, Nampula, Tete e demais províncias.',
    icon: 'MapPin',
    details: 'Capilaridade para conectar organizações em todo o território nacional às melhores soluções de transformação digital.'
  },
  {
    id: 'ponte-tecnologica',
    title: 'Ligação Estratégica Cliente-Tecnologia',
    description: 'Gestão de relacionamento contínuo em parceria estratégica com a Learn Code para entrega técnica e suporte.',
    icon: 'Repeat',
    details: 'Garantimos que o cliente é acompanhado com proximidade humana desde o primeiro contacto até à implementação final.'
  }
];
