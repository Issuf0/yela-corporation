import type { ConfigResult, ContactConfig } from '../server/config';
import { createRateLimiter } from '../server/contact/antiSpam';
import type { ContactRequestInput } from '../server/contact/handler';
import { silentLogger } from '../server/logger';

export const SUBMISSION_ID = '3f2a7c1e-9b4d-4e6f-8a1b-2c3d4e5f6a7b';
export const NOW = Date.UTC(2026, 9, 16, 10, 30, 0);

export const validPayload = () => ({
  submissionId: SUBMISSION_ID,
  startedAt: NOW - 20_000,
  website: '',
  name: 'Maria Silva',
  email: 'maria.silva@example.com',
  organization: 'Exemplo, Lda',
  phone: '+258 84 000 0000',
  subject: 'arquitectura',
  message: 'Gostaria de saber mais sobre a vossa atuação em Nampula.',
});

export const okConfig = (overrides: Partial<ContactConfig> = {}): ConfigResult => ({
  ok: true,
  value: {
    senderMode: 'mock',
    resendApiKey: null,
    contact: {
      fromEmail: 'YELA Corporation <contacto@mail.example.com>',
      yelaEmail: 'geral@example.com',
      learnCodeEmail: null,
      ackEnabled: false,
      ...overrides,
    },
  },
});

export const input = (overrides: Partial<ContactRequestInput> = {}, body: unknown = validPayload()): ContactRequestInput => {
  const rawBody = typeof body === 'string' ? body : JSON.stringify(body);
  return {
    method: 'POST',
    contentType: 'application/json',
    origin: 'https://www.example.com',
    host: 'www.example.com',
    secFetchSite: 'same-origin',
    ip: '203.0.113.10',
    rawBody,
    bodyBytes: new TextEncoder().encode(rawBody).byteLength,
    now: NOW,
    ...overrides,
  };
};

export const freshLimiter = () => createRateLimiter({ limit: 6, windowMs: 10 * 60_000 });
export const logger = silentLogger;
