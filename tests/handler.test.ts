import { describe, expect, it } from 'vitest';
import { createRateLimiter } from '../server/contact/antiSpam';
import { handleContactRequest, MAX_BODY_BYTES, RESPONSE_MESSAGES, type ContactHandlerDeps } from '../server/contact/handler';
import { createMockSender } from '../server/email/mockSender';
import { freshLimiter, input, logger, okConfig, SUBMISSION_ID, validPayload } from './helpers';

/** Runs the handler; `sender` in the result is the default mock (ignored when deps override it). */
const run = (overrides: Parameters<typeof input>[0] = {}, body?: unknown, deps: Partial<ContactHandlerDeps> = {}) => {
  const sender = createMockSender();
  return handleContactRequest(input(overrides, body), {
    config: okConfig(),
    sender,
    rateLimiter: freshLimiter(),
    logger,
    ...deps,
  }).then((result) => ({ result, sender }));
};

describe('handleContactRequest — guards', () => {
  it('rejects non-POST', async () => {
    const { result } = await run({ method: 'GET' });
    expect(result.status).toBe(405);
    expect(result.headers?.Allow).toBe('POST');
  });

  it('rejects non-JSON content types', async () => {
    const { result } = await run({ contentType: 'application/x-www-form-urlencoded' });
    expect(result.status).toBe(415);
  });

  it('rejects cross-site requests', async () => {
    const a = await run({ secFetchSite: 'cross-site' });
    expect(a.result.status).toBe(403);
    const b = await run({ secFetchSite: null, origin: 'https://evil.example', host: 'www.example.com' });
    expect(b.result.status).toBe(403);
  });

  it('accepts same-site requests without Sec-Fetch-Site when Origin matches host', async () => {
    const { result } = await run({ secFetchSite: null, origin: 'https://www.example.com', host: 'www.example.com' });
    expect(result.status).toBe(200);
  });

  it('rejects oversized payloads', async () => {
    const { result } = await run({ bodyBytes: MAX_BODY_BYTES + 1, rawBody: '' });
    expect(result.status).toBe(413);
  });

  it('rejects malformed JSON and non-object bodies', async () => {
    expect((await run({}, '{not json')).result.status).toBe(400);
    expect((await run({}, '[1,2]')).result.status).toBe(400);
    expect((await run({}, 'null')).result.status).toBe(400);
  });

  it('rejects a missing or invalid submissionId', async () => {
    const { result } = await run({}, { ...validPayload(), submissionId: 'abc' });
    expect(result.status).toBe(400);
  });

  it('returns field errors for invalid data without sending', async () => {
    const { result, sender } = await run({}, { ...validPayload(), email: 'bad', message: 'curta' });
    expect(result.status).toBe(400);
    expect(result.body.ok).toBe(false);
    if (result.body.ok) return;
    expect(result.body.code).toBe('validation_failed');
    expect(result.body.fieldErrors?.email).toBeDefined();
    expect(result.body.fieldErrors?.message).toBeDefined();
    expect(sender.sent).toHaveLength(0);
  });

  it('rate limits per IP with Retry-After', async () => {
    const rateLimiter = createRateLimiter({ limit: 2, windowMs: 60_000 });
    const sender = createMockSender();
    const deps = { config: okConfig(), sender, rateLimiter, logger };
    expect((await handleContactRequest(input(), deps)).status).toBe(200);
    expect((await handleContactRequest(input(), deps)).status).toBe(200);
    const third = await handleContactRequest(input(), deps);
    expect(third.status).toBe(429);
    expect(third.headers?.['Retry-After']).toBeDefined();
    expect((await handleContactRequest(input({ ip: '198.51.100.7' }), deps)).status).toBe(200);
  });
});

describe('handleContactRequest — anti-spam', () => {
  it('silently discards a filled honeypot', async () => {
    const { result, sender } = await run({}, { ...validPayload(), website: 'http://spam' });
    expect(result.status).toBe(200);
    expect(result.body).toEqual({ ok: true });
    expect(sender.sent).toHaveLength(0);
  });

  it('silently discards a submission that was too fast', async () => {
    const { result, sender } = await run({}, { ...validPayload(), startedAt: input().now - 500 });
    expect(result.status).toBe(200);
    expect(sender.sent).toHaveLength(0);
  });
});

describe('handleContactRequest — delivery', () => {
  it('sends exactly one internal notification with the agreed subject, reply-to and idempotency key', async () => {
    const { result, sender } = await run();
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(sender.sent).toHaveLength(1);
    const [first] = sender.sent;
    expect(first?.message.to).toEqual(['geral@example.com']);
    expect(first?.message.from).toBe('YELA Corporation <contacto@mail.example.com>');
    expect(first?.message.subject).toBe('Novo contacto — YELA Corporation');
    expect(first?.message.replyTo).toBe('maria.silva@example.com');
    expect(first?.options.idempotencyKey).toBe(`contact/${SUBMISSION_ID}/yela`);
    expect(first?.message.html).toContain('Maria Silva');
    expect(first?.message.text).toContain('Exemplo, Lda');
  });

  it('a retry with the same submissionId yields the same idempotency key', async () => {
    const sender = createMockSender();
    const deps = { config: okConfig(), sender, rateLimiter: freshLimiter(), logger };
    await handleContactRequest(input(), deps);
    await handleContactRequest(input(), deps);
    expect(sender.sent.map((s) => s.options.idempotencyKey)).toEqual([
      `contact/${SUBMISSION_ID}/yela`,
      `contact/${SUBMISSION_ID}/yela`,
    ]);
  });

  it('copies Learn Code only for technology enquiries and only when configured', async () => {
    const tech = { ...validPayload(), subject: 'tecnologia' };
    const withRouting = okConfig({ learnCodeEmail: 'tech@example.org' });

    const a = await run({}, tech, { config: withRouting });
    expect(a.sender.sent).toHaveLength(2);
    expect(a.sender.sent[1]?.message.to).toEqual(['tech@example.org']);
    expect(a.sender.sent[1]?.message.subject).toBe('Novo contacto — YELA Corporation');
    expect(a.sender.sent[1]?.message.text).toContain('encaminhado no âmbito da parceria');
    expect(a.sender.sent[1]?.options.idempotencyKey).toBe(`contact/${SUBMISSION_ID}/learncode`);
    expect(a.sender.sent[0]?.message.text).not.toContain('encaminhado no âmbito da parceria');

    const b = await run({}, { ...validPayload(), subject: 'arquitectura' }, { config: withRouting });
    expect(b.sender.sent).toHaveLength(1);

    const c = await run({}, tech, { config: okConfig({ learnCodeEmail: null }) });
    expect(c.sender.sent).toHaveLength(1);
  });

  it('rejects an unknown subject with a field error', async () => {
    const { result, sender } = await run({}, { ...validPayload(), subject: 'financeiro' });
    expect(result.status).toBe(400);
    expect(result.body.ok === false && result.body.fieldErrors?.subject).toBeDefined();
    expect(sender.sent).toHaveLength(0);
  });

  it('sends the visitor acknowledgement only when enabled', async () => {
    const { sender } = await run({}, undefined, { config: okConfig({ ackEnabled: true }) });
    expect(sender.sent).toHaveLength(2);
    expect(sender.sent[1]?.message.to).toEqual(['maria.silva@example.com']);
    expect(sender.sent[1]?.message.subject).toBe('Recebemos o seu contacto — YELA Corporation');
    expect(sender.sent[1]?.message.replyTo).toBeUndefined();
    expect(sender.sent[1]?.options.idempotencyKey).toBe(`contact/${SUBMISSION_ID}/ack`);
  });

  it('returns 503 and sends nothing when configuration is incomplete', async () => {
    const { result } = await run({}, undefined, {
      config: { ok: false, missing: ['RESEND_API_KEY'] },
      sender: null,
    });
    expect(result.status).toBe(503);
    expect(result.body.ok).toBe(false);
    if (result.body.ok) return;
    expect(result.body.message).toBe(RESPONSE_MESSAGES.serviceUnavailable);
    expect(JSON.stringify(result.body)).not.toContain('RESEND');
  });

  it('returns a generic 502 when the provider fails, hiding provider details', async () => {
    const failing = createMockSender({ failWith: 'validation_error: domain not verified' });
    const { result } = await run({}, undefined, { sender: failing });
    expect(result.status).toBe(502);
    expect(result.body.ok).toBe(false);
    if (result.body.ok) return;
    expect(result.body.code).toBe('delivery_failed');
    expect(result.body.message).toBe(RESPONSE_MESSAGES.deliveryFailed);
    expect(JSON.stringify(result.body)).not.toContain('domain not verified');
  });

  it('still returns 200 when only a secondary delivery fails', async () => {
    let calls = 0;
    const sender = {
      sent: [] as never[],
      async send() {
        calls += 1;
        return calls === 1 ? ({ ok: true, id: 'x' } as const) : ({ ok: false, errorName: 'boom' } as const);
      },
    };
    const { result } = await run({}, undefined, { config: okConfig({ ackEnabled: true }), sender });
    expect(result.status).toBe(200);
    expect(calls).toBe(2);
  });

  it('escapes HTML from the visitor inside the email body', async () => {
    const { sender } = await run({}, { ...validPayload(), message: 'Olá <img src=x onerror=alert(1)> mundo e mais texto' });
    expect(sender.sent[0]?.message.html).not.toContain('<img');
    expect(sender.sent[0]?.message.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
  });
});
