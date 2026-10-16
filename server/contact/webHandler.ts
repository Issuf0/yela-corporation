import { resolveConfig, type ResolvedConfig } from '../config';
import { createSender } from '../email/createSender';
import type { EmailSender } from '../email/types';
import { consoleLogger, type Logger } from '../logger';
import { createRateLimiter, type RateLimiter } from './antiSpam';
import { handleContactRequest, MAX_BODY_BYTES, RESPONSE_MESSAGES, type ContactResult } from './handler';

export interface WebHandlerOptions {
  env?: () => Record<string, string | undefined>;
  rateLimiter?: RateLimiter;
  logger?: Logger;
  senderFactory?: (config: ResolvedConfig, logger: Logger) => EmailSender;
}

/** Best-effort client IP behind Vercel's proxy; falls back to a shared bucket. */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || headers.get('x-real-ip')?.trim() || 'unknown';
}

function toResponse(result: ContactResult): Response {
  return Response.json(result.body, {
    status: result.status,
    headers: { 'Cache-Control': 'no-store', ...(result.headers ?? {}) },
  });
}

/**
 * Builds a `(Request) => Promise<Response>` handler. Used unchanged by the
 * Vercel function (api/contact.ts) and by the Vite dev-server middleware.
 */
export function createContactWebHandler(options: WebHandlerOptions = {}) {
  const logger = options.logger ?? consoleLogger;
  const rateLimiter = options.rateLimiter ?? createRateLimiter({ limit: 6, windowMs: 10 * 60_000 });
  const readEnv = options.env ?? (() => process.env);
  const senderFactory = options.senderFactory ?? createSender;

  return async function handle(request: Request): Promise<Response> {
    const config = resolveConfig(readEnv());
    const sender = config.ok ? senderFactory(config.value, logger) : null;

    const declared = Number(request.headers.get('content-length') ?? '0');
    let rawBody = '';
    let bodyBytes = Number.isFinite(declared) ? declared : 0;
    if (bodyBytes <= MAX_BODY_BYTES && request.method.toUpperCase() === 'POST') {
      try {
        rawBody = await request.text();
        bodyBytes = Math.max(bodyBytes, new TextEncoder().encode(rawBody).byteLength);
        if (bodyBytes > MAX_BODY_BYTES) rawBody = '';
      } catch {
        return toResponse({ status: 400, body: { ok: false, code: 'bad_request', message: RESPONSE_MESSAGES.badRequest } });
      }
    }

    const result = await handleContactRequest(
      {
        method: request.method,
        contentType: request.headers.get('content-type'),
        origin: request.headers.get('origin'),
        host: request.headers.get('x-forwarded-host') ?? request.headers.get('host'),
        secFetchSite: request.headers.get('sec-fetch-site'),
        ip: clientIpFromHeaders(request.headers),
        rawBody,
        bodyBytes,
        now: Date.now(),
      },
      { config, sender, rateLimiter, logger },
    );
    return toResponse(result);
  };
}
