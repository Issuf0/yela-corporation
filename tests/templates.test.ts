import { describe, expect, it } from 'vitest';
import {
  ACK_SUBJECT,
  buildInternalNotification,
  buildVisitorAcknowledgement,
  escapeHtml,
  formatMaputoTimestamp,
  INTERNAL_SUBJECT,
} from '../server/email/templates';

const fields = {
  name: 'Maria <Silva>',
  email: 'maria@example.com',
  organization: 'Exemplo & Filhos',
  phone: '',
  message: 'Linha 1\nLinha 2 <script>alert(1)</script>',
};

describe('templates', () => {
  it('escapes HTML', () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;');
  });

  it('builds the internal notification with the agreed subject and all fields', () => {
    const content = buildInternalNotification({
      fields,
      submissionId: '3f2a7c1e-9b4d-4e6f-8a1b-2c3d4e5f6a7b',
      receivedAt: new Date(Date.UTC(2026, 9, 16, 10, 30)),
    });
    expect(content.subject).toBe(INTERNAL_SUBJECT);
    expect(content.subject).toBe('Novo contacto — YELA Corporation');
    expect(content.html).toContain('Maria &lt;Silva&gt;');
    expect(content.html).toContain('Exemplo &amp; Filhos');
    expect(content.html).not.toContain('<script>');
    expect(content.html).toContain('Linha 1<br>Linha 2');
    expect(content.html).toContain('3f2a7c1e-9b4d-4e6f-8a1b-2c3d4e5f6a7b');
    expect(content.html).toContain('—'); // empty phone rendered as a dash
    expect(content.text).toContain('Nome: Maria <Silva>');
    expect(content.text).toContain('Telefone: —');
    expect(content.text).toContain('Mensagem:\nLinha 1\nLinha 2');
  });

  it('formats the timestamp in Maputo time (UTC+2)', () => {
    const formatted = formatMaputoTimestamp(new Date(Date.UTC(2026, 9, 16, 10, 30)));
    expect(formatted).toContain('12:30');
    expect(formatted).toMatch(/2026/);
  });

  it('builds a visitor acknowledgement with no internal details', () => {
    const content = buildVisitorAcknowledgement({ name: 'Maria' });
    expect(content.subject).toBe(ACK_SUBJECT);
    expect(content.html).toContain('Caro(a) Maria');
    expect(content.html).not.toMatch(/learn ?code/i);
    expect(content.text).not.toMatch(/resend/i);
    expect(content.text).not.toMatch(/\d+\s*(horas|dias)/i); // no response-time promise
  });
});
