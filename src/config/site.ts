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
