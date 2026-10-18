/**
 * Configuração central do site. Alterar aqui quando existir domínio próprio
 * ou quando os contactos da YELA mudarem.
 */
export const SITE_NAME = 'YELA Corporation';
export const LEGAL_NAME = 'YELA Corporation, SA';
export const TAGLINE = 'Arquitectura · Creative Studio · Construções';

export const CONTACT = {
  email: 'yelacorp.info@gmail.com',
  whatsappNumber: '+258845306215',
  whatsappFormatted: '+258 84 530 6215',
  city: 'Maputo',
  country: 'Moçambique',
} as const;

/** Redes sociais da YELA (endereços públicos, sem parâmetros de rastreio). */
export const SOCIAL = [
  { name: 'Instagram', handle: '@yela_corporation', url: 'https://www.instagram.com/yela_corporation' },
  { name: 'Facebook', handle: '/yelacorporation', url: 'https://www.facebook.com/yelacorporation' },
] as const;

export interface Partner {
  name: string;
  /** Área em que o parceiro actua (rótulo curto). */
  kind: string;
  /** Descrição em uma ou duas frases. */
  text: string;
  /** Ligação externa principal (website ou página pública). */
  url: string;
  /** Rótulo da ligação externa. */
  urlLabel: string;
  /** Página interna com mais detalhe, quando existe. */
  detailPath?: string;
}

/** Parceiros apresentados em /parcerias. Acrescentar aqui novos parceiros. */
export const PARTNERS: readonly Partner[] = [
  {
    name: 'Learn Code',
    kind: 'Tecnologia',
    text: 'Startup tecnológica moçambicana, de Marracuene, que desenvolve websites, aplicações móveis, sistemas, APIs e soluções com inteligência artificial, e forma programadores em Maputo. Parceira estratégica da YELA desde Setembro de 2026.',
    url: 'https://learn-code-ruddy.vercel.app/',
    urlLabel: 'Website da Learn Code',
    detailPath: '/parceria',
  },
  {
    name: 'OHOLO Podcast',
    kind: 'Media e conteúdos',
    text: 'Podcast que liga Nampula ao resto do país com conversas e conteúdos sobre a realidade moçambicana. Um espaço de divulgação e de proximidade com as comunidades.',
    url: 'https://www.facebook.com/oholopodcast',
    urlLabel: 'OHOLO Podcast no Facebook',
  },
];

const WHATSAPP_DIGITS = CONTACT.whatsappNumber.replace(/[^0-9]/g, '');

/** Liga à conversa de WhatsApp da YELA, opcionalmente com mensagem pré-preenchida. */
export function whatsappHref(text?: string): string {
  return text ? `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}` : `https://wa.me/${WHATSAPP_DIGITS}`;
}

/** Liga ao email da YELA com assunto e corpo pré-preenchidos. */
export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${CONTACT.email}${query ? `?${query}` : ''}`;
}
