import { describe, expect, it } from 'vitest';
import { clientIpFromHeaders, createContactWebHandler } from '../server/contact/webHandler';
import { createMockSender, type MockSender } from '../server/email/mockSender';
import { logger, validPayload } from './helpers';

const ENV = {
  CONTACT_SENDER: 'mock',
  NODE_ENV: 'test',
  CONTACT_FROM_EMAIL: 'YELA <contacto@mail.example.com>',
  YELA_CONTACT_EMAIL: 'geral@example.com',
};

function build(env: Record<string, string> = ENV) {
  const sender: MockSender = createMockSender();
  const handle = createContactWebHandler({ env: () => env, logger, senderFactory: () => sender });
  return { handle, sender };
}

function post(body: unknown, headers: Record<string, string> = {}) {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request('https://www.example.com/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://www.example.com',
      host: 'www.example.com',
      'sec-fetch-site': 'same-origin',
      'x-forwarded-for': '203.0.113.5, 10.0.0.1',
      ...headers,
    },
    body: raw,
  });
}

describe('createContactWebHandler', () => {
  it('turns a valid request into a 200 JSON response and sends the email', async () => {
    const { handle, sender } = build();
    const payload = { ...validPayload(), startedAt: Date.now() - 20_000 };
    const response = await handle(post(payload));
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ ok: true });
    expect(sender.sent).toHaveLength(1);
  });

  it('returns 413 when Content-Length declares an oversized body', async () => {
    const { handle } = build();
    const response = await handle(post(validPayload(), { 'content-length': String(1024 * 1024) }));
    expect(response.status).toBe(413);
  });

  it('returns 503 when the server is not configured', async () => {
    const { handle, sender } = build({ NODE_ENV: 'test' });
    const response = await handle(post({ ...validPayload(), startedAt: Date.now() - 20_000 }));
    expect(response.status).toBe(503);
    expect(response.headers.get('retry-after')).toBe('600');
    expect(sender.sent).toHaveLength(0);
  });

  it('returns 405 for GET', async () => {
    const { handle } = build();
    const response = await handle(new Request('https://www.example.com/api/contact'));
    expect(response.status).toBe(405);
  });
});

describe('clientIpFromHeaders', () => {
  it('takes the first forwarded hop, then x-real-ip, then a shared bucket', () => {
    expect(clientIpFromHeaders(new Headers({ 'x-forwarded-for': '203.0.113.5, 10.0.0.1' }))).toBe('203.0.113.5');
    expect(clientIpFromHeaders(new Headers({ 'x-real-ip': '198.51.100.1' }))).toBe('198.51.100.1');
    expect(clientIpFromHeaders(new Headers())).toBe('unknown');
  });
});
