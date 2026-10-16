import { Campaign, Lead, LeadNote, LeadStatus, PartnershipProject, SimulatedEmail, StatusHistoryEntry } from '../types';
import { emailService } from './emailService';

const STORAGE_KEYS = {
  LEADS: 'yela_corp_leads_v1',
  EMAILS: 'yela_corp_simulated_emails_v1',
  CAMPAIGNS: 'yela_corp_campaigns_v1',
  PARTNERSHIP_PROJECTS: 'yela_corp_partnership_deals_v1',
};

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'CMP-2026-Q1-DIGITAL',
    name: 'Transformação Digital PMEs Moçambique',
    channel: 'LinkedIn Ads & Conteúdo Orgânico',
    period: 'Jan — Mar 2026',
    sourceCode: 'linkedin-q1',
    leadsGenerated: 7,
    leadsQualified: 5,
    conversions: 2,
    active: true,
  },
  {
    id: 'CMP-2026-EXP-NORTE',
    name: 'Iniciativa Expansão Corredor Norte',
    channel: 'Prospecção Comercial Direta (Nampula/Nacala)',
    period: 'Fev — Abr 2026',
    sourceCode: 'prospeccao-norte',
    leadsGenerated: 5,
    leadsQualified: 3,
    conversions: 1,
    active: true,
  },
  {
    id: 'CMP-2026-MOZTECH',
    name: 'Fórum MozTech & Conexões Corporativas',
    channel: 'Evento Empresarial & Networking',
    period: 'Março 2026',
    sourceCode: 'moztech-2026',
    leadsGenerated: 4,
    leadsQualified: 3,
    conversions: 1,
    active: true,
  },
  {
    id: 'CMP-2026-ORGANIC',
    name: 'Tráfego Orgânico & Referenciação YELA',
    channel: 'Website Institucional & SEO',
    period: 'Contínuo',
    sourceCode: 'web-organic',
    leadsGenerated: 6,
    leadsQualified: 4,
    conversions: 1,
    active: true,
  },
];

const INITIAL_PARTNERSHIP_PROJECTS: PartnershipProject[] = [
  {
    id: 'PRJ-PARC-001',
    leadId: 'YELA-2026-0004',
    clientName: 'Transportes & Logística do Rovuma, Lda',
    projectTitle: 'Sistema de Rastreio e Gestão de Despachos',
    serviceName: 'Sistema de Gestão Personalizado (ERP/CRM)',
    totalReceivedMZN: 850000,
    approvedDirectCostsMZN: 150000,
    netShareableMZN: 700000,
    learnCodeShareMZN: 490000, // 70%
    yelaShareMZN: 210000, // 30%
    status: 'Em Desenvolvimento',
    dateInitiated: '2026-02-15',
  },
  {
    id: 'PRJ-PARC-002',
    leadId: 'YELA-2026-0005',
    clientName: 'Sociedade de Distribuição de Sofala, SA',
    projectTitle: 'Automação de Faturação e Vendas em Campo',
    serviceName: 'Digitalização e Automação de Processos',
    totalReceivedMZN: 520000,
    approvedDirectCostsMZN: 80000,
    netShareableMZN: 440000,
    learnCodeShareMZN: 308000, // 70%
    yelaShareMZN: 132000, // 30%
    status: 'Faturado',
    dateInitiated: '2026-01-20',
  },
  {
    id: 'PRJ-PARC-003',
    leadId: 'YELA-2026-0008',
    clientName: 'Grupo Agro-Pecuário Zambézia Viva',
    projectTitle: 'App Mobile de Inquéritos e Gestão Rural',
    serviceName: 'Aplicação Mobile (iOS & Android)',
    totalReceivedMZN: 680000,
    approvedDirectCostsMZN: 110000,
    netShareableMZN: 570000,
    learnCodeShareMZN: 399000, // 70%
    yelaShareMZN: 171000, // 30%
    status: 'Em Análise Técnica',
    dateInitiated: '2026-03-02',
  },
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 'YELA-2026-0001',
    createdAt: '2026-03-20T09:45:00Z',
    fullName: 'Amílcar Mondlane',
    companyName: 'Coral Seguros & Mediação, SA',
    email: 'amilcar.mondlane@coralseguros.co.mz',
    phone: '+258 84 312 8900',
    province: 'Maputo Cidade',
    serviceId: 'portal-web',
    serviceName: 'Aplicação Web & Portal de Clientes',
    challengeDescription: 'Necessitamos de modernizar o portal onde corretores e clientes consultam apólices e participam sinistros, reduzindo a sobrecarga no call center em Maputo.',
    estimatedBudget: '500.000 MT — 1.000.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Redes Sociais (LinkedIn, Facebook, Instagram)',
    consentEmail: true,
    status: 'Novo',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-Q1-DIGITAL',
    sourceChannel: 'LinkedIn Campanha Q1',
    notes: [
      {
        id: 'note-1',
        createdAt: '2026-03-20T10:00:00Z',
        author: 'Prospecção YELA',
        text: 'Lead submetido recentemente. Perfil de decisão de nível executivo. Agendar chamada para qualificação preliminar.',
      },
    ],
    history: [
      {
        fromStatus: 'Novo',
        toStatus: 'Novo',
        changedAt: '2026-03-20T09:45:00Z',
        changedBy: 'Sistema YELA',
        note: 'Lead criado via formulário do website.',
      },
    ],
  },
  {
    id: 'YELA-2026-0002',
    createdAt: '2026-03-19T14:20:00Z',
    fullName: 'Fátima Abdala',
    companyName: 'Nampula Agro-Trading Global',
    email: 'f.abdala@nampulatrading.mz',
    phone: '+258 86 554 1209',
    province: 'Nampula',
    serviceId: 'sistema-personalizado',
    serviceName: 'Sistema de Gestão Personalizado (ERP/CRM)',
    challengeDescription: 'Controlamos stocks de amêndoa e milho entre Nacala e Nampula com planilhas Excel desfasadas. Precisamos de rastreabilidade de lotes e cálculo de perdas.',
    estimatedBudget: 'Mais de 1.000.000 MT',
    intendedTimeline: '3 a 6 meses',
    foundUsVia: 'Prospecção Comercial YELA',
    consentEmail: true,
    status: 'Contactado',
    sourcePage: '/solicitar-solucao',
    campaignId: 'CMP-2026-EXP-NORTE',
    sourceChannel: 'Expansão Corredor Norte',
    notes: [
      {
        id: 'note-2-1',
        createdAt: '2026-03-19T16:30:00Z',
        author: 'Helena Matsinhe (YELA)',
        text: 'Realizada primeira ligação telefónica com a Dra. Fátima. Requisitos orçamentais condizentes. Envio agendado para detalhe de cadência técnica.',
      },
    ],
    history: [
      {
        fromStatus: 'Novo',
        toStatus: 'Contactado',
        changedAt: '2026-03-19T16:30:00Z',
        changedBy: 'Helena Matsinhe (YELA)',
        note: 'Primeiro contacto efetuado com sucesso.',
      },
    ],
  },
  {
    id: 'YELA-2026-0003',
    createdAt: '2026-03-18T11:10:00Z',
    fullName: 'Célio Chissano',
    companyName: 'Clínica Polivalente da Beira',
    email: 'c.chissano@clinicapolivalente.co.mz',
    phone: '+258 82 780 4321',
    province: 'Sofala',
    serviceId: 'digitalizacao-processos',
    serviceName: 'Digitalização e Automação de Processos',
    challengeDescription: 'Queremos eliminar as fichas médicas em papel nos postos de triagem e permitir agendamento de consultas com alertas de SMS aos utentes.',
    estimatedBudget: '250.000 MT — 500.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Recomendação ou Contacto Direto',
    consentEmail: true,
    status: 'Qualificado',
    sourcePage: '/servicos',
    campaignId: 'CMP-2026-ORGANIC',
    sourceChannel: 'Website Orgânico',
    notes: [
      {
        id: 'note-3-1',
        createdAt: '2026-03-18T15:00:00Z',
        author: 'Comercial YELA',
        text: 'Diagnóstico de dores concluído. Encaminhado formalmente para a equipa da Learn Code para levantamento dos fluxos clínicos e especificação técnica.',
      },
    ],
    history: [
      {
        fromStatus: 'Novo',
        toStatus: 'Contactado',
        changedAt: '2026-03-18T12:00:00Z',
        changedBy: 'Comercial YELA',
      },
      {
        fromStatus: 'Contactado',
        toStatus: 'Qualificado',
        changedAt: '2026-03-18T15:00:00Z',
        changedBy: 'Direção de Negócios YELA',
        note: 'Encaminhado com dossiê preliminar para a Learn Code.',
      },
    ],
  },
  {
    id: 'YELA-2026-0004',
    createdAt: '2026-02-10T16:00:00Z',
    fullName: 'Inácio Macamo',
    companyName: 'Transportes & Logística do Rovuma, Lda',
    email: 'inacio.macamo@rovumalog.co.mz',
    phone: '+258 84 990 1144',
    province: 'Tete',
    serviceId: 'sistema-personalizado',
    serviceName: 'Sistema de Gestão Personalizado (ERP/CRM)',
    challengeDescription: 'Sistema de gestão de despachos e controlo de consumo de combustível para frota interprovincial em Tete e Moatize.',
    estimatedBudget: '500.000 MT — 1.000.000 MT',
    intendedTimeline: '3 a 6 meses',
    foundUsVia: 'Prospecção Comercial YELA',
    consentEmail: true,
    status: 'Convertido',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-EXP-NORTE',
    sourceChannel: 'Prospecção Corredor Centro/Norte',
    notes: [
      {
        id: 'n4-1',
        createdAt: '2026-02-14T09:00:00Z',
        author: 'Learn Code Tech Lead',
        text: 'Proposta técnica aprovada pelo conselho da Rovuma. Contrato de desenvolvimento assinado.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-02-11T10:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-02-12T14:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Qualificado', toStatus: 'Proposta', changedAt: '2026-02-13T17:00:00Z', changedBy: 'Learn Code' },
      { fromStatus: 'Proposta', toStatus: 'Convertido', changedAt: '2026-02-15T11:00:00Z', changedBy: 'Parceria YELA × Learn Code' },
    ],
  },
  {
    id: 'YELA-2026-0005',
    createdAt: '2026-01-15T08:30:00Z',
    fullName: 'Esperança Langa',
    companyName: 'Sociedade de Distribuição de Sofala, SA',
    email: 'esperanca.langa@sofala-distrib.co.mz',
    phone: '+258 87 234 9011',
    province: 'Sofala',
    serviceId: 'digitalizacao-processos',
    serviceName: 'Digitalização e Automação de Processos',
    challengeDescription: 'Automatização de ordens de fornecimento para armazéns na Beira e Dondo.',
    estimatedBudget: '500.000 MT — 1.000.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Evento / Conferência Empresarial',
    consentEmail: true,
    status: 'Convertido',
    sourcePage: '/contactos',
    campaignId: 'CMP-2026-MOZTECH',
    sourceChannel: 'Networking Empresarial',
    notes: [
      {
        id: 'n5-1',
        createdAt: '2026-01-20T10:00:00Z',
        author: 'Financeiro YELA',
        text: 'Projeto entregue com sucesso e faturado. Participação líquida de 30% para a YELA e 70% Learn Code apurada.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Qualificado', changedAt: '2026-01-16T10:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Qualificado', toStatus: 'Proposta', changedAt: '2026-01-18T14:00:00Z', changedBy: 'Learn Code' },
      { fromStatus: 'Proposta', toStatus: 'Convertido', changedAt: '2026-01-20T09:00:00Z', changedBy: 'Parceria' },
    ],
  },
  {
    id: 'YELA-2026-0006',
    createdAt: '2026-03-17T17:15:00Z',
    fullName: 'Joaquim Sitoe',
    companyName: 'Hotelaria & Resorts Costa do Sol',
    email: 'j.sitoe@costadosolresorts.co.mz',
    phone: '+258 84 712 5590',
    province: 'Inhambane',
    serviceId: 'website-institucional',
    serviceName: 'Website Institucional de Alta Performance',
    challengeDescription: 'Pretendemos renovar completamente o portal do resort com motor de reservas direto, suporte multilíngue (português e inglês) e fotografias em alta resolução sem lentidão.',
    estimatedBudget: '100.000 MT — 250.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Pesquisa Online / Google',
    consentEmail: true,
    status: 'Proposta',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-ORGANIC',
    sourceChannel: 'Google Orgânico',
    notes: [
      {
        id: 'n6-1',
        createdAt: '2026-03-18T11:00:00Z',
        author: 'Learn Code Proposal Desk',
        text: 'Caderno de especificações e mockup funcional enviados ao cliente no valor de 220.000 MT. Aguarda aprovação do conselho de administração.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-17T18:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-03-18T09:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Qualificado', toStatus: 'Proposta', changedAt: '2026-03-18T11:00:00Z', changedBy: 'Learn Code' },
    ],
  },
  {
    id: 'YELA-2026-0007',
    createdAt: '2026-03-16T13:40:00Z',
    fullName: 'Marlene Tembe',
    companyName: 'Sociedade de Advogados Tembe & Associados',
    email: 'marlene@tembe-advogados.co.mz',
    phone: '+258 85 401 2288',
    province: 'Maputo Cidade',
    serviceId: 'website-institucional',
    serviceName: 'Website Institucional de Alta Performance',
    challengeDescription: 'Reforço de identidade corporativa e repositório seguro de artigos jurídicos para clientes empresariais nacionais e internacionais.',
    estimatedBudget: '100.000 MT — 250.000 MT',
    intendedTimeline: 'Flexível',
    foundUsVia: 'Redes Sociais (LinkedIn, Facebook, Instagram)',
    consentEmail: true,
    status: 'Novo',
    sourcePage: '/sobre',
    campaignId: 'CMP-2026-Q1-DIGITAL',
    sourceChannel: 'LinkedIn Ads',
    notes: [],
    history: [
      { fromStatus: 'Novo', toStatus: 'Novo', changedAt: '2026-03-16T13:40:00Z', changedBy: 'Formulário Público' },
    ],
  },
  {
    id: 'YELA-2026-0008',
    createdAt: '2026-03-01T15:20:00Z',
    fullName: 'Bernardo Cuamba',
    companyName: 'Grupo Agro-Pecuário Zambézia Viva',
    email: 'b.cuamba@zambeziaviva.co.mz',
    phone: '+258 82 602 1199',
    province: 'Zambézia',
    serviceId: 'aplicacao-mobile',
    serviceName: 'Aplicação Mobile (iOS & Android)',
    challengeDescription: 'App de recolha de dados de vacinação e pesagem de gado com funcionamento 100% offline nos distritos de Mocuba e Gurué.',
    estimatedBudget: '500.000 MT — 1.000.000 MT',
    intendedTimeline: '3 a 6 meses',
    foundUsVia: 'Prospecção Comercial YELA',
    consentEmail: true,
    status: 'Proposta',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-EXP-NORTE',
    sourceChannel: 'Expansão Regional Centro',
    notes: [
      {
        id: 'n8-1',
        createdAt: '2026-03-04T10:00:00Z',
        author: 'YELA & Learn Code',
        text: 'Reunião conjunta via Zoom com o diretor de operações. Learn Code elaborou proposta com prazo de entrega de 90 dias.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-02T10:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-03-03T11:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Qualificado', toStatus: 'Proposta', changedAt: '2026-03-04T10:00:00Z', changedBy: 'Learn Code' },
    ],
  },
  {
    id: 'YELA-2026-0009',
    createdAt: '2026-03-12T09:10:00Z',
    fullName: 'Raúl Cuna',
    companyName: 'Construções do Sul, E.I.',
    email: 'geral@constsul.co.mz',
    phone: '+258 84 112 0044',
    province: 'Gaza',
    serviceId: 'consultoria-tecnologica',
    serviceName: 'Diagnóstico & Consultoria Tecnológica',
    challengeDescription: 'Auditoria à infraestrutura de redes e avaliação de software de medição de obras civis.',
    estimatedBudget: 'Até 100.000 MT',
    intendedTimeline: 'Flexível',
    foundUsVia: 'Pesquisa Online / Google',
    consentEmail: true,
    status: 'Não convertido',
    sourcePage: '/servicos',
    campaignId: 'CMP-2026-ORGANIC',
    sourceChannel: 'Pesquisa Orgânica',
    notes: [
      {
        id: 'n9-1',
        createdAt: '2026-03-14T15:00:00Z',
        author: 'Comercial YELA',
        text: 'Cliente optou por adiar investimentos para o próximo ano fiscal devido a reestruturação societária.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-13T10:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Não convertido', changedAt: '2026-03-14T15:00:00Z', changedBy: 'YELA' },
    ],
  },
  {
    id: 'YELA-2026-0010',
    createdAt: '2026-03-11T14:50:00Z',
    fullName: 'Nádia Bila',
    companyName: 'Academia Moderna de Competências',
    email: 'nadia.bila@amc.edu.mz',
    phone: '+258 86 910 8822',
    province: 'Maputo Província',
    serviceId: 'aplicacao-web',
    serviceName: 'Aplicação Web & Portal de Clientes',
    challengeDescription: 'Plataforma de inscrições, pagamentos com M-Pesa / Emola e emissão automática de certificados com QR code para formandos.',
    estimatedBudget: '250.000 MT — 500.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Evento / Conferência Empresarial',
    consentEmail: true,
    status: 'Qualificado',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-MOZTECH',
    sourceChannel: 'MozTech Networking',
    notes: [
      {
        id: 'n10-1',
        createdAt: '2026-03-13T11:00:00Z',
        author: 'YELA Business Dev',
        text: 'Necessidade muito clara. Learn Code já tem acelerador de pagamentos móveis que reduz o tempo de desenvolvimento.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-12T09:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-03-13T11:00:00Z', changedBy: 'YELA' },
    ],
  },
  {
    id: 'YELA-2026-0011',
    createdAt: '2026-03-08T10:25:00Z',
    fullName: 'Abdul Cassam',
    companyName: 'Cabo Delgado Suprimentos Industriais',
    email: 'a.cassam@cdsuprimentos.co.mz',
    phone: '+258 84 502 9911',
    province: 'Cabo Delgado',
    serviceId: 'sistema-personalizado',
    serviceName: 'Sistema de Gestão Personalizado (ERP/CRM)',
    challengeDescription: 'Gestão de fornecedores de segurança, equipamentos industriais e requisições para a península de Afungi.',
    estimatedBudget: 'Mais de 1.000.000 MT',
    intendedTimeline: '3 a 6 meses',
    foundUsVia: 'Prospecção Comercial YELA',
    consentEmail: true,
    status: 'Proposta',
    sourcePage: '/solicitar-solucao',
    campaignId: 'CMP-2026-EXP-NORTE',
    sourceChannel: 'Expansão Norte Pemba',
    notes: [
      {
        id: 'n11-1',
        createdAt: '2026-03-10T14:30:00Z',
        author: 'Learn Code Solutions Architect',
        text: 'Proposta técnica de ERP modular submetida. Reunião de esclarecimentos de segurança marcada para quinta-feira.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-08T16:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-03-09T10:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Qualificado', toStatus: 'Proposta', changedAt: '2026-03-10T14:30:00Z', changedBy: 'Learn Code' },
    ],
  },
  {
    id: 'YELA-2026-0012',
    createdAt: '2026-03-05T12:00:00Z',
    fullName: 'Filomena Nhantumbo',
    companyName: 'Rede Farma Mais Moçambique',
    email: 'f.nhantumbo@farmamais.co.mz',
    phone: '+258 82 344 7711',
    province: 'Maputo Cidade',
    serviceId: 'aplicacao-mobile',
    serviceName: 'Aplicação Mobile (iOS & Android)',
    challengeDescription: 'App de lealdade e consulta de stock de medicamentos em 8 farmácias da região metropolitana de Maputo e Matola.',
    estimatedBudget: '500.000 MT — 1.000.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Redes Sociais (LinkedIn, Facebook, Instagram)',
    consentEmail: true,
    status: 'Qualificado',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-Q1-DIGITAL',
    sourceChannel: 'Campanha Social Q1',
    notes: [],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-06T09:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-03-07T14:00:00Z', changedBy: 'YELA' },
    ],
  },
  {
    id: 'YELA-2026-0013',
    createdAt: '2026-03-02T16:45:00Z',
    fullName: 'Delfim Mabunda',
    companyName: 'Niassa Minerais & Serviços',
    email: 'mabunda@niassaminerais.mz',
    phone: '+258 87 111 4050',
    province: 'Niassa',
    serviceId: 'consultoria-tecnologica',
    serviceName: 'Diagnóstico & Consultoria Tecnológica',
    challengeDescription: 'Estudo de viabilidade de comunicação via satélite e sistema de controlo de pesagem de camiões em Lichinga.',
    estimatedBudget: 'Sob avaliação técnica conjunta',
    intendedTimeline: 'Planeamento estratégico (> 6 meses)',
    foundUsVia: 'Recomendação ou Contacto Direto',
    consentEmail: true,
    status: 'Contactado',
    sourcePage: '/sobre',
    campaignId: 'CMP-2026-ORGANIC',
    sourceChannel: 'Referenciação Institucional',
    notes: [],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-03-03T11:00:00Z', changedBy: 'YELA' },
    ],
  },
  {
    id: 'YELA-2026-0014',
    createdAt: '2026-02-27T10:15:00Z',
    fullName: 'Sónia Manjate',
    companyName: 'Manica Agrícola & Frutos',
    email: 's.manjate@manicafrutos.co.mz',
    phone: '+258 84 908 6123',
    province: 'Manica',
    serviceId: 'digitalizacao-processos',
    serviceName: 'Digitalização e Automação de Processos',
    challengeDescription: 'Automatização de certificados de exportação fitossanitária e controlo de lotes de citrinos para a Europa.',
    estimatedBudget: '250.000 MT — 500.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Prospecção Comercial YELA',
    consentEmail: true,
    status: 'Qualificado',
    sourcePage: '/servicos',
    campaignId: 'CMP-2026-EXP-NORTE',
    sourceChannel: 'Prospecção Central',
    notes: [
      {
        id: 'n14-1',
        createdAt: '2026-03-01T09:30:00Z',
        author: 'Comercial YELA',
        text: 'Qualificado com sucesso. Análise técnica agendada com engenheiros da Learn Code.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Contactado', changedAt: '2026-02-28T09:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Contactado', toStatus: 'Qualificado', changedAt: '2026-03-01T09:30:00Z', changedBy: 'YELA' },
    ],
  },
  {
    id: 'YELA-2026-0015',
    createdAt: '2026-02-20T11:30:00Z',
    fullName: 'Gildo Chirindza',
    companyName: 'Chirindza Consultores Associados',
    email: 'gildo@chirindzaconsult.mz',
    phone: '+258 82 888 2390',
    province: 'Maputo Cidade',
    serviceId: 'website-institucional',
    serviceName: 'Website Institucional de Alta Performance',
    challengeDescription: 'Portal institucional corporativo para posicionamento em licitações e parcerias com agências da ONU.',
    estimatedBudget: '100.000 MT — 250.000 MT',
    intendedTimeline: 'Urgente (menos de 1 mês)',
    foundUsVia: 'Parceiro Learn Code',
    consentEmail: true,
    status: 'Convertido',
    sourcePage: '/solucoes',
    campaignId: 'CMP-2026-ORGANIC',
    sourceChannel: 'Ponte Learn Code — YELA',
    notes: [
      {
        id: 'n15-1',
        createdAt: '2026-02-25T14:00:00Z',
        author: 'Project Manager YELA',
        text: 'Website entregue em tempo recorde com excelente feedback do cliente.',
      },
    ],
    history: [
      { fromStatus: 'Novo', toStatus: 'Qualificado', changedAt: '2026-02-21T09:00:00Z', changedBy: 'YELA' },
      { fromStatus: 'Qualificado', toStatus: 'Proposta', changedAt: '2026-02-22T15:00:00Z', changedBy: 'Learn Code' },
      { fromStatus: 'Proposta', toStatus: 'Convertido', changedAt: '2026-02-25T14:00:00Z', changedBy: 'YELA × Learn Code' },
    ],
  },
  {
    id: 'YELA-2026-0016',
    createdAt: '2026-03-21T07:15:00Z',
    fullName: 'Ana Paula Guambe',
    companyName: 'Inovação e Comércio do Limpopo',
    email: 'ap.guambe@limpopocomercio.co.mz',
    phone: '+258 86 109 4433',
    province: 'Gaza',
    serviceId: 'website-institucional',
    serviceName: 'Website Institucional de Alta Performance',
    challengeDescription: 'Criação de portal de apresentação para produtos agrícolas processados no Chókwè e venda em grosso.',
    estimatedBudget: '100.000 MT — 250.000 MT',
    intendedTimeline: '1 a 2 meses',
    foundUsVia: 'Pesquisa Online / Google',
    consentEmail: true,
    status: 'Novo',
    sourcePage: '/',
    campaignId: 'CMP-2026-ORGANIC',
    sourceChannel: 'Website Orgânico',
    notes: [],
    history: [
      { fromStatus: 'Novo', toStatus: 'Novo', changedAt: '2026-03-21T07:15:00Z', changedBy: 'Formulário Homepage' },
    ],
  },
];

export const leadStorage = {
  getLeads(): Lead[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    this.saveLeads(INITIAL_LEADS);
    return INITIAL_LEADS;
  },

  saveLeads(leads: Lead[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch {
      // ignore
    }
  },

  getLeadById(id: string): Lead | undefined {
    return this.getLeads().find((l) => l.id === id);
  },

  async createLead(input: {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    province: string;
    serviceId: string;
    serviceName: string;
    challengeDescription: string;
    estimatedBudget?: string;
    intendedTimeline?: string;
    foundUsVia: string;
    consentEmail: boolean;
    sourcePage: string;
    campaignId?: string;
    sourceChannel?: string;
  }): Promise<{ lead: Lead; sentEmails: SimulatedEmail[] }> {
    const leads = this.getLeads();
    const nextSeq = leads.length + 1;
    const formattedId = `YELA-2026-${String(nextSeq).padStart(4, '0')}`;
    const nowIso = new Date().toISOString();

    const newLead: Lead = {
      id: formattedId,
      createdAt: nowIso,
      fullName: input.fullName,
      companyName: input.companyName,
      email: input.email,
      phone: input.phone,
      province: input.province,
      serviceId: input.serviceId,
      serviceName: input.serviceName,
      challengeDescription: input.challengeDescription,
      estimatedBudget: input.estimatedBudget,
      intendedTimeline: input.intendedTimeline,
      foundUsVia: input.foundUsVia,
      consentEmail: input.consentEmail,
      status: 'Novo',
      sourcePage: input.sourcePage || '/',
      campaignId: input.campaignId || 'CMP-2026-ORGANIC',
      sourceChannel: input.sourceChannel || 'Website Institucional',
      notes: [
        {
          id: `note-${Date.now()}`,
          createdAt: nowIso,
          author: 'Sistema YELA',
          text: 'Lead criado pelo utilizador no formulário de soluções. Notificações automáticas simuladas para Learn Code e YELA.',
        },
      ],
      history: [
        {
          fromStatus: 'Novo',
          toStatus: 'Novo',
          changedAt: nowIso,
          changedBy: 'Utilizador (Web)',
          note: 'Submissão de pedido de solução registada com sucesso.',
        },
      ],
    };

    // Prepend new lead
    const updated = [newLead, ...leads];
    this.saveLeads(updated);

    // Update campaign counter if campaignId matches
    this.incrementCampaignLeads(newLead.campaignId);

    // Trigger simulated emails
    const sentEmails = await emailService.processLeadEmails(newLead);
    this.saveEmails(sentEmails);

    return { lead: newLead, sentEmails };
  },

  updateLeadStatus(
    id: string,
    newStatus: LeadStatus,
    author: string = 'Gestor YELA',
    noteText?: string
  ): Lead | undefined {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return undefined;

    const current = leads[index];
    const oldStatus = current.status;
    const nowIso = new Date().toISOString();

    const historyEntry: StatusHistoryEntry = {
      fromStatus: oldStatus,
      toStatus: newStatus,
      changedAt: nowIso,
      changedBy: author,
      note: noteText || `Estado alterado de ${oldStatus} para ${newStatus}`,
    };

    const updatedLead: Lead = {
      ...current,
      status: newStatus,
      history: [historyEntry, ...(current.history || [])],
    };

    if (noteText) {
      updatedLead.notes = [
        {
          id: `note-${Date.now()}`,
          createdAt: nowIso,
          author,
          text: `[Mudança para ${newStatus}] ${noteText}`,
        },
        ...updatedLead.notes,
      ];
    }

    leads[index] = updatedLead;
    this.saveLeads(leads);

    // Update campaign metrics if qualified or converted
    if (newStatus === 'Qualificado') {
      this.incrementCampaignQualified(updatedLead.campaignId);
    } else if (newStatus === 'Convertido') {
      this.incrementCampaignConverted(updatedLead.campaignId);
    }

    return updatedLead;
  },

  addLeadNote(id: string, author: string, text: string): Lead | undefined {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return undefined;

    const current = leads[index];
    const newNote: LeadNote = {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: author || 'Equipa YELA',
      text,
    };

    const updatedLead: Lead = {
      ...current,
      notes: [newNote, ...current.notes],
    };

    leads[index] = updatedLead;
    this.saveLeads(leads);
    return updatedLead;
  },

  // Emails Storage
  getEmails(): SimulatedEmail[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.EMAILS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  },

  getEmailsByLeadId(leadId: string): SimulatedEmail[] {
    return this.getEmails().filter((e) => e.leadId === leadId);
  },

  saveEmails(newEmails: SimulatedEmail[]): void {
    try {
      const current = this.getEmails();
      const updated = [...newEmails, ...current];
      localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(updated.slice(0, 100)));
    } catch {
      // ignore
    }
  },

  // Campaigns
  getCampaigns(): Campaign[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    this.saveCampaigns(INITIAL_CAMPAIGNS);
    return INITIAL_CAMPAIGNS;
  },

  saveCampaigns(campaigns: Campaign[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    } catch {
      // ignore
    }
  },

  incrementCampaignLeads(campaignId?: string): void {
    if (!campaignId) return;
    const campaigns = this.getCampaigns();
    const target = campaigns.find((c) => c.id === campaignId || c.sourceCode === campaignId);
    if (target) {
      target.leadsGenerated += 1;
      this.saveCampaigns(campaigns);
    }
  },

  incrementCampaignQualified(campaignId?: string): void {
    if (!campaignId) return;
    const campaigns = this.getCampaigns();
    const target = campaigns.find((c) => c.id === campaignId || c.sourceCode === campaignId);
    if (target) {
      target.leadsQualified += 1;
      this.saveCampaigns(campaigns);
    }
  },

  incrementCampaignConverted(campaignId?: string): void {
    if (!campaignId) return;
    const campaigns = this.getCampaigns();
    const target = campaigns.find((c) => c.id === campaignId || c.sourceCode === campaignId);
    if (target) {
      target.conversions += 1;
      this.saveCampaigns(campaigns);
    }
  },

  // Partnership Deals (70% Learn Code / 30% YELA)
  getPartnershipProjects(): PartnershipProject[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PARTNERSHIP_PROJECTS);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    this.savePartnershipProjects(INITIAL_PARTNERSHIP_PROJECTS);
    return INITIAL_PARTNERSHIP_PROJECTS;
  },

  savePartnershipProjects(projects: PartnershipProject[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PARTNERSHIP_PROJECTS, JSON.stringify(projects));
    } catch {
      // ignore
    }
  },

  resetToDemo(): void {
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.EMAILS);
    localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEYS.PARTNERSHIP_PROJECTS);
  },
};
