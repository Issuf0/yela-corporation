import { describe, expect, it } from 'vitest';
import { isValidSenderAddress, resolveConfig } from '../server/config';

const base = {
  RESEND_API_KEY: 're_test',
  CONTACT_FROM_EMAIL: 'YELA Corporation <contacto@mail.example.com>',
  YELA_CONTACT_EMAIL: 'geral@example.com',
};

describe('resolveConfig', () => {
  it('resolves a complete production configuration', () => {
    const result = resolveConfig(base);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.senderMode).toBe('resend');
    expect(result.value.contact.learnCodeEmail).toBeNull();
    expect(result.value.contact.ackEnabled).toBe(false);
  });

  it('reports every missing variable by name', () => {
    const result = resolveConfig({});
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.missing).toEqual(['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'YELA_CONTACT_EMAIL']);
  });

  it('rejects malformed addresses', () => {
    const result = resolveConfig({ ...base, CONTACT_FROM_EMAIL: 'not-an-email', LEARN_CODE_CONTACT_EMAIL: 'x@' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.missing).toContain('CONTACT_FROM_EMAIL (formato inválido)');
    expect(result.missing).toContain('LEARN_CODE_CONTACT_EMAIL (formato inválido)');
  });

  it('enables optional routing and acknowledgement only when configured', () => {
    const result = resolveConfig({ ...base, LEARN_CODE_CONTACT_EMAIL: 'tech@example.org', CONTACT_ACK_ENABLED: 'true' });
    expect(result.ok && result.value.contact.learnCodeEmail).toBe('tech@example.org');
    expect(result.ok && result.value.contact.ackEnabled).toBe(true);
  });

  it('allows the mock sender without an API key outside production', () => {
    const { RESEND_API_KEY: _omit, ...rest } = base;
    const result = resolveConfig({ ...rest, CONTACT_SENDER: 'mock', NODE_ENV: 'development' });
    expect(result.ok && result.value.senderMode).toBe('mock');
  });

  it('ignores the mock sender in production', () => {
    const { RESEND_API_KEY: _omit, ...rest } = base;
    const result = resolveConfig({ ...rest, CONTACT_SENDER: 'mock', VERCEL_ENV: 'production' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.missing).toEqual(['RESEND_API_KEY']);
  });
});

describe('isValidSenderAddress', () => {
  it('accepts bare and display-name forms', () => {
    expect(isValidSenderAddress('a@b.pt')).toBe(true);
    expect(isValidSenderAddress('YELA <a@mail.b.pt>')).toBe(true);
    expect(isValidSenderAddress('YELA <a@b>')).toBe(false);
    expect(isValidSenderAddress('<>')).toBe(false);
  });
});
