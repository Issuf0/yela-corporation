import { describe, expect, it } from 'vitest';
import { mailtoHref, whatsappHref } from '../src/config/site';
import { buildContactMessage, buildEmailSubject } from '../src/lib/contactMessage';
import type { ContactFields } from '../src/lib/contactSchema';

const fields: ContactFields = {
  name: 'Maria Silva',
  email: 'maria@example.com',
  organization: '',
  phone: '+258 84 000 0000',
  subject: 'tecnologia',
  message: 'Linha 1\nLinha 2',
};

describe('buildContactMessage', () => {
  it('formats the WhatsApp message with emphasis and omits empty optional fields', () => {
    const text = buildContactMessage(fields, 'whatsapp');
    expect(text).toContain('*Nome:* Maria Silva');
    expect(text).not.toContain('Organização');
    expect(text).toContain('*Telefone:* +258 84 000 0000');
    expect(text).toContain('*Assunto:* Soluções tecnológicas (parceria Learn Code)');
    expect(text).toContain('*Mensagem:*\nLinha 1\nLinha 2');
    expect(text).toContain('_Enviado através do website da YELA Corporation._');
  });

  it('formats the email body without markdown emphasis', () => {
    const text = buildContactMessage({ ...fields, organization: 'Exemplo, Lda' }, 'email');
    expect(text).toContain('Nome: Maria Silva');
    expect(text).toContain('Organização: Exemplo, Lda');
    expect(text).not.toContain('*');
    expect(text).not.toContain('_Enviado');
  });

  it('builds the email subject from the chosen topic', () => {
    expect(buildEmailSubject(fields)).toBe('Contacto via website — Soluções tecnológicas (parceria Learn Code)');
  });
});

describe('site links', () => {
  it('builds a wa.me link with the YELA number and encoded text', () => {
    expect(whatsappHref()).toBe('https://wa.me/258845306215');
    expect(whatsappHref('Olá *YELA*')).toBe('https://wa.me/258845306215?text=Ol%C3%A1%20*YELA*');
  });

  it('builds a mailto link with subject and body', () => {
    const href = mailtoHref('Assunto X', 'Linha 1\nLinha 2');
    expect(href.startsWith('mailto:yelacorp.info@gmail.com?')).toBe(true);
    expect(href).toContain('subject=Assunto%20X');
    expect(href).toContain('body=Linha%201%0ALinha%202');
  });
});
