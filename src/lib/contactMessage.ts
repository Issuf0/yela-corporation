import { CONTACT_SUBJECTS, type ContactFields } from './contactSchema';

/** Texto da mensagem que o visitante envia pelo WhatsApp (com realce) ou por email (sem realce). */
export function buildContactMessage(fields: ContactFields, format: 'whatsapp' | 'email'): string {
  const b = (label: string) => (format === 'whatsapp' ? `*${label}*` : label);
  const subject = fields.subject ? CONTACT_SUBJECTS[fields.subject] : 'Não especificado';
  const lines = [
    'Olá YELA Corporation,',
    '',
    `${b('Nome:')} ${fields.name}`,
    fields.organization ? `${b('Organização:')} ${fields.organization}` : null,
    `${b('Email:')} ${fields.email}`,
    fields.phone ? `${b('Telefone:')} ${fields.phone}` : null,
    `${b('Assunto:')} ${subject}`,
    '',
    `${b('Mensagem:')}`,
    fields.message,
    '',
    format === 'whatsapp' ? '_Enviado através do website da YELA Corporation._' : 'Enviado através do website da YELA Corporation.',
  ];
  return lines.filter((line): line is string => line !== null).join('\n');
}

export function buildEmailSubject(fields: ContactFields): string {
  const subject = fields.subject ? CONTACT_SUBJECTS[fields.subject] : 'Contacto';
  return `Contacto via website — ${subject}`;
}
