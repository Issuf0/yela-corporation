import type { ContactFields } from '../../src/lib/contactSchema';

export const INTERNAL_SUBJECT = 'Novo contacto — YELA Corporation';
export const ACK_SUBJECT = 'Recebemos o seu contacto — YELA Corporation';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Multi-line text → escaped HTML with <br> line breaks. */
function toHtmlParagraph(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

export function formatMaputoTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('pt-PT', {
    timeZone: 'Africa/Maputo',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
}

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

interface InternalNotificationInput {
  fields: ContactFields;
  submissionId: string;
  receivedAt: Date;
}

const STYLE = {
  body: 'margin:0;padding:32px 16px;background:#FAF8F5;color:#0B132B;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.55;',
  card: 'max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(11,19,43,0.12);',
  header: 'padding:24px 28px;border-bottom:1px solid rgba(11,19,43,0.12);',
  brand: 'font-size:12px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;color:#0B132B;',
  title: 'margin:8px 0 0;font-size:20px;font-weight:600;color:#0B132B;',
  content: 'padding:24px 28px;font-size:15px;',
  label: 'padding:10px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5B6478;vertical-align:top;width:34%;',
  value: 'padding:10px 0;color:#0B132B;vertical-align:top;',
  row: 'border-bottom:1px solid rgba(11,19,43,0.08);',
  message: 'margin:20px 0 0;padding:16px 0 0;border-top:1px solid rgba(11,19,43,0.12);white-space:normal;',
  footer: 'padding:16px 28px 24px;font-size:12px;color:#5B6478;border-top:1px solid rgba(11,19,43,0.12);',
  accent: 'color:#B45309;',
};

function wrap(title: string, content: string, footer: string): string {
  return `<!doctype html>
<html lang="pt-PT">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="${STYLE.body}">
  <div style="${STYLE.card}">
    <div style="${STYLE.header}">
      <div style="${STYLE.brand}">YELA Corporation</div>
      <h1 style="${STYLE.title}">${escapeHtml(title)}</h1>
    </div>
    <div style="${STYLE.content}">${content}</div>
    <div style="${STYLE.footer}">${footer}</div>
  </div>
</body>
</html>`;
}

export function buildInternalNotification({ fields, submissionId, receivedAt }: InternalNotificationInput): EmailContent {
  const timestamp = formatMaputoTimestamp(receivedAt);
  const organization = fields.organization || '—';
  const phone = fields.phone || '—';

  const rows: Array<[string, string]> = [
    ['Nome', escapeHtml(fields.name)],
    ['Email', `<a href="mailto:${escapeHtml(fields.email)}" style="${STYLE.accent}">${escapeHtml(fields.email)}</a>`],
    ['Organização', escapeHtml(organization)],
    ['Telefone', escapeHtml(phone)],
    ['Recebido em', `${escapeHtml(timestamp)} (Maputo)`],
    ['Referência', `<span style="font-family:monospace;font-size:13px;">${escapeHtml(submissionId)}</span>`],
  ];

  const table = `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows
    .map(([label, value]) => `<tr style="${STYLE.row}"><td style="${STYLE.label}">${label}</td><td style="${STYLE.value}">${value}</td></tr>`)
    .join('')}</table>`;

  const html = wrap(
    'Novo contacto através do website',
    `<p style="margin:0 0 16px;">Foi submetido um novo pedido de contacto através do formulário do website institucional.</p>
     ${table}
     <div style="${STYLE.message}">
       <div style="${STYLE.label};width:auto;padding:0 0 8px;">Mensagem</div>
       <div>${toHtmlParagraph(fields.message)}</div>
     </div>`,
    'Para responder ao visitante, basta responder a este email: o endereço de resposta já está preenchido com o contacto indicado.',
  );

  const text = [
    'Novo contacto através do website — YELA Corporation',
    '',
    `Nome: ${fields.name}`,
    `Email: ${fields.email}`,
    `Organização: ${organization}`,
    `Telefone: ${phone}`,
    `Recebido em: ${timestamp} (Maputo)`,
    `Referência: ${submissionId}`,
    '',
    'Mensagem:',
    fields.message,
    '',
    'Para responder ao visitante, basta responder a este email.',
  ].join('\n');

  return { subject: INTERNAL_SUBJECT, html, text };
}

export function buildVisitorAcknowledgement({ name }: { name: string }): EmailContent {
  const html = wrap(
    'Recebemos o seu contacto',
    `<p style="margin:0 0 16px;">Caro(a) ${escapeHtml(name)},</p>
     <p style="margin:0 0 16px;">Confirmamos a receção da sua mensagem através do website da YELA Corporation. Obrigado pelo seu contacto.</p>
     <p style="margin:0 0 16px;">A nossa equipa irá analisar o seu pedido com atenção e entrará em contacto consigo.</p>
     <p style="margin:24px 0 0;">Com os melhores cumprimentos,<br><strong>YELA Corporation</strong></p>`,
    'Esta mensagem foi enviada automaticamente. Se não efetuou este contacto, pode ignorar este email.',
  );

  const text = [
    `Caro(a) ${name},`,
    '',
    'Confirmamos a receção da sua mensagem através do website da YELA Corporation. Obrigado pelo seu contacto.',
    '',
    'A nossa equipa irá analisar o seu pedido com atenção e entrará em contacto consigo.',
    '',
    'Com os melhores cumprimentos,',
    'YELA Corporation',
    '',
    'Esta mensagem foi enviada automaticamente. Se não efetuou este contacto, pode ignorar este email.',
  ].join('\n');

  return { subject: ACK_SUBJECT, html, text };
}
