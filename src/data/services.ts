import type { ContactSubject } from '../lib/contactSchema';

/** Áreas de serviços da YELA, conforme o Portfólio de Serviços (roll-up 1). */
export interface ServiceArea {
  /** Âncora na página de actuação e sufixo de rota. */
  id: string;
  number: string;
  title: string;
  /** Frase curta usada na homepage e no topo da secção. */
  lede: string;
  /** Parágrafo de enquadramento. */
  text: string;
  /** Serviços tal como constam do portfólio. */
  services: string[];
  /** Assunto pré-seleccionado no formulário de contacto. */
  subject: ContactSubject;
  cta: string;
  /** Executado em parceria com a Learn Code. */
  withLearnCode?: boolean;
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'arquitectura-construcao',
    number: '01',
    title: 'Arquitectura & Construção',
    lede: 'Da ideia ao projecto, e do projecto à obra.',
    text: 'Projectamos espaços funcionais, sustentáveis e inspiradores, e transformamos projectos em realidade com qualidade e eficiência, do planeamento à fiscalização.',
    services: [
      'Projectos arquitectónicos',
      'Planeamento físico e urbano',
      'Modelação 2D e 3D',
      'Renderização arquitectónica',
      'Fiscalização de obras',
      'Orçamentação e acompanhamento técnico',
      'Construção e reabilitação',
    ],
    subject: 'arquitectura',
    cta: 'Falar sobre um projecto ou obra',
  },
  {
    id: 'branding-design',
    number: '02',
    title: 'Branding & Design',
    lede: 'Marcas com identidade clara e consistente.',
    text: 'Construímos marcas e a comunicação visual que as sustenta: do logótipo ao manual de marca, dos materiais promocionais às apresentações corporativas.',
    services: [
      'Criação de logótipos',
      'Identidade visual',
      'Manual de marca',
      'Design gráfico',
      'Materiais promocionais',
      'Design para redes sociais',
      'Apresentações corporativas',
    ],
    subject: 'branding',
    cta: 'Falar sobre a sua marca',
  },
  {
    id: 'marketing-digital',
    number: '03',
    title: 'Marketing Digital',
    lede: 'Presença, conteúdo e crescimento.',
    text: 'Planeamos e gerimos a presença digital de marcas e negócios, com conteúdo, publicidade e campanhas orientadas para o posicionamento e o crescimento.',
    services: [
      'Gestão de redes sociais',
      'Planeamento de conteúdo',
      'Publicidade digital',
      'Gestão de campanhas',
      'Copywriting',
      'Posicionamento de marca',
      'Estratégias de crescimento',
    ],
    subject: 'marketing',
    cta: 'Falar sobre marketing digital',
  },
  {
    id: 'audiovisual-multimedia',
    number: '04',
    title: 'Audiovisual & Multimédia',
    lede: 'Imagem, vídeo e som ao serviço da mensagem.',
    text: 'Produzimos fotografia, vídeo e conteúdos multimédia, da cobertura de eventos ao podcast, com uma equipa própria de produção audiovisual.',
    services: [
      'Fotografia',
      'Produção de vídeo',
      'Cobertura de eventos',
      'Motion graphics',
      'Edição de vídeo',
      'Podcasts',
      'Produção de conteúdo',
    ],
    subject: 'audiovisual',
    cta: 'Falar sobre produção audiovisual',
  },
  {
    id: 'solucoes-digitais',
    number: '05',
    title: 'Soluções Digitais',
    lede: 'Websites, lojas online e transformação digital.',
    text: 'Levamos os negócios para o digital: websites institucionais, landing pages, lojas online e gestão de plataformas. A concepção e o desenvolvimento técnico são assegurados pela Learn Code, parceira tecnológica da YELA.',
    services: [
      'Websites institucionais',
      'Landing pages',
      'Lojas online',
      'Gestão de plataformas',
      'Transformação digital',
      'Soluções tecnológicas',
    ],
    subject: 'digital',
    cta: 'Pedir uma solução digital',
    withLearnCode: true,
  },
  {
    id: 'formacao-consultoria',
    number: '06',
    title: 'Formação & Consultoria',
    lede: 'Capacitar pessoas e fortalecer negócios.',
    text: 'Formamos profissionais e acompanhamos empresas, empreendedores e startups com consultoria estratégica, mentoria e desenvolvimento de negócios.',
    services: [
      'Formação profissional',
      'Capacitação empresarial',
      'Mentoria',
      'Consultoria estratégica',
      'Desenvolvimento de negócios',
      'Apoio a startups',
    ],
    subject: 'formacao',
    cta: 'Falar sobre formação ou consultoria',
  },
];

/** Os três pilares institucionais (roll-up 2). */
export const PILLARS = [
  { title: 'Arquitectura', text: 'Projectamos espaços funcionais, sustentáveis e inspiradores.' },
  { title: 'Construção', text: 'Transformamos projectos em realidade com qualidade e eficiência.' },
  { title: 'Estúdio Criativo', text: 'Construímos marcas, comunicação e experiências que geram impacto.' },
];

export const MISSION =
  'Fornecer soluções integradas e inovadoras nas áreas de arquitectura, construção, tecnologia, marketing e desenvolvimento empresarial, contribuindo para o crescimento sustentável dos nossos clientes e comunidades.';

export const VISION =
  'Ser uma referência nacional e regional em soluções criativas, tecnológicas e estratégicas, reconhecida pela excelência, inovação e impacto no desenvolvimento económico e social.';

export const VALUES = ['Inovação', 'Criatividade', 'Excelência', 'Integridade', 'Compromisso', 'Sustentabilidade', 'Profissionalismo'];

export const PROMISE = ['Da ideia ao projecto.', 'Do projecto à execução.', 'Da marca ao crescimento.'];

/** Estrutura organizacional (documento interno da YELA). */
export const TEAM = {
  lead: { name: 'Augusto J. Samajo', role: 'CEO / Director Executivo' },
  departments: [
    {
      name: 'Formação',
      members: [
        { name: 'Chelton Guambe', role: 'Formador' },
        { name: 'Alberto Giramo', role: 'Formador' },
      ],
    },
    {
      name: 'Produção Audiovisual e Media',
      members: [
        { name: 'Hugo Oliveira', role: 'Coordenador do Oholo Podcast' },
        { name: 'Davy Mariano', role: 'Técnico de Produção Audiovisual' },
      ],
    },
    {
      name: 'Administrativo e Financeiro',
      members: [{ name: 'Josafate Valzim', role: 'Assistente Administrativo e Financeiro' }],
    },
  ],
};
