import {
  hasErrors,
  isValidSubmissionId,
  normaliseContactInput,
  validateContactFields,
  type ContactFieldErrors,
} from '../../src/lib/contactSchema';
import type { ConfigResult } from '../config';
import { buildInternalNotification, buildVisitorAcknowledgement } from '../email/templates';
import type { EmailSender } from '../email/types';
import type { Logger } from '../logger';
import { isSuspectedSpam, type RateLimiter } from './antiSpam';

export const MAX_BODY_BYTES = 16 * 1024;

export type ContactErrorCode =
  | 'method_not_allowed'
  | 'unsupported_media_type'
  | 'forbidden_origin'
  | 'payload_too_large'
  | 'bad_request'
  | 'validation_failed'
  | 'rate_limited'
  | 'service_unavailable'
  | 'delivery_failed';

export type ContactResponseBody =
  | { ok: true }
  | { ok: false; code: ContactErrorCode; message: string; fieldErrors?: ContactFieldErrors };

export interface ContactResult {
  status: number;
  body: ContactResponseBody;
  headers?: Record<string, string>;
}

export interface ContactRequestInput {
  method: string;
  contentType: string | null;
  origin: string | null;
  host: string | null;
  secFetchSite: string | null;
  ip: string;
  /** Raw request body (already read). Empty when `bodyBytes` exceeds the limit. */
  rawBody: string;
  bodyBytes: number;
  now: number;
}

export interface ContactHandlerDeps {
  config: ConfigResult;
  /** Null when configuration is incomplete. */
  sender: EmailSender | null;
  rateLimiter: RateLimiter;
  logger: Logger;
}

/** Visitor-facing messages. Never include provider or internal details. */
export const RESPONSE_MESSAGES = {
  methodNotAllowed: 'Método não suportado.',
  unsupportedMediaType: 'O pedido deve ser enviado em formato JSON.',
  forbiddenOrigin: 'Origem do pedido não autorizada.',
  payloadTooLarge: 'O pedido excede o tamanho permitido.',
  badRequest: 'Não foi possível interpretar o pedido. Atualize a página e tente novamente.',
  validationFailed: 'Verifique os campos assinalados.',
  rateLimited: 'Recebemos demasiados pedidos deste dispositivo. Aguarde alguns minutos e tente novamente.',
  serviceUnavailable: 'O envio de mensagens está temporariamente indisponível. Tente novamente mais tarde.',
  deliveryFailed: 'Não foi possível submeter o seu pedido. Tente novamente dentro de alguns instantes.',
} as const;

function fail(status: number, code: ContactErrorCode, message: string, extra?: Partial<ContactResult>): ContactResult {
  return { status, body: { ok: false, code, message }, ...extra };
}

function isSameOrigin(input: ContactRequestInput): boolean {
  // Browsers send Sec-Fetch-Site on all modern requests; honour it when present.
  if (input.secFetchSite && !['same-origin', 'same-site', 'none'].includes(input.secFetchSite)) return false;
  // When an Origin header is present it must match the host we are serving.
  if (input.origin && input.host) {
    try {
      return new URL(input.origin).host.toLowerCase() === input.host.toLowerCase();
    } catch {
      return false;
    }
  }
  return true;
}

export async function handleContactRequest(input: ContactRequestInput, deps: ContactHandlerDeps): Promise<ContactResult> {
  const { logger } = deps;

  if (input.method.toUpperCase() !== 'POST') {
    return fail(405, 'method_not_allowed', RESPONSE_MESSAGES.methodNotAllowed, { headers: { Allow: 'POST' } });
  }
  if (!input.contentType || !input.contentType.toLowerCase().startsWith('application/json')) {
    return fail(415, 'unsupported_media_type', RESPONSE_MESSAGES.unsupportedMediaType);
  }
  if (!isSameOrigin(input)) {
    logger.warn('contact.forbidden_origin', { secFetchSite: input.secFetchSite });
    return fail(403, 'forbidden_origin', RESPONSE_MESSAGES.forbiddenOrigin);
  }
  if (input.bodyBytes > MAX_BODY_BYTES) {
    return fail(413, 'payload_too_large', RESPONSE_MESSAGES.payloadTooLarge);
  }

  const limit = deps.rateLimiter.check(input.ip, input.now);
  if (!limit.allowed) {
    logger.warn('contact.rate_limited', { retryAfterSeconds: limit.retryAfterSeconds });
    return fail(429, 'rate_limited', RESPONSE_MESSAGES.rateLimited, {
      headers: { 'Retry-After': String(limit.retryAfterSeconds) },
    });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(input.rawBody);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    payload = parsed as Record<string, unknown>;
  } catch {
    return fail(400, 'bad_request', RESPONSE_MESSAGES.badRequest);
  }

  if (!isValidSubmissionId(payload.submissionId)) {
    return fail(400, 'bad_request', RESPONSE_MESSAGES.badRequest);
  }
  const submissionId = payload.submissionId.toLowerCase();

  const fields = normaliseContactInput(payload);
  const fieldErrors = validateContactFields(fields);
  if (hasErrors(fieldErrors)) {
    return {
      status: 400,
      body: { ok: false, code: 'validation_failed', message: RESPONSE_MESSAGES.validationFailed, fieldErrors },
    };
  }

  // Bots get a generic success so they learn nothing; nothing is sent.
  if (isSuspectedSpam({ website: payload.website, startedAt: payload.startedAt }, input.now)) {
    logger.info('contact.discarded_as_spam', { submissionId });
    return { status: 200, body: { ok: true } };
  }

  if (!deps.config.ok || !deps.sender) {
    const missing = deps.config.ok ? [] : deps.config.missing;
    logger.error('contact.not_configured', { missing });
    return fail(503, 'service_unavailable', RESPONSE_MESSAGES.serviceUnavailable, {
      headers: { 'Retry-After': '600' },
    });
  }

  const { contact } = deps.config.value;
  const sender = deps.sender;
  const receivedAt = new Date(input.now);
  const notification = buildInternalNotification({ fields, submissionId, receivedAt });

  const internal = await sender.send(
    { from: contact.fromEmail, to: [contact.yelaEmail], replyTo: fields.email, ...notification },
    { idempotencyKey: `contact/${submissionId}/yela` },
  );
  if (!internal.ok) {
    logger.error('contact.delivery_failed', { submissionId, errorName: internal.errorName });
    return fail(502, 'delivery_failed', RESPONSE_MESSAGES.deliveryFailed);
  }

  // Secondary deliveries are best-effort: the request has already been received by YELA.
  // Learn Code only receives technology enquiries (partnership agreement, clause 7), and only when configured.
  const secondary: Promise<void>[] = [];
  if (contact.learnCodeEmail && fields.subject === 'tecnologia') {
    const partnerNotification = buildInternalNotification({ fields, submissionId, receivedAt, audience: 'partner' });
    secondary.push(
      sender
        .send(
          { from: contact.fromEmail, to: [contact.learnCodeEmail], replyTo: fields.email, ...partnerNotification },
          { idempotencyKey: `contact/${submissionId}/learncode` },
        )
        .then((result) => {
          if (!result.ok) logger.warn('contact.learncode_copy_failed', { submissionId, errorName: result.errorName });
        }),
    );
  }
  if (contact.ackEnabled) {
    const ack = buildVisitorAcknowledgement({ name: fields.name });
    secondary.push(
      sender
        .send({ from: contact.fromEmail, to: [fields.email], ...ack }, { idempotencyKey: `contact/${submissionId}/ack` })
        .then((result) => {
          if (!result.ok) logger.warn('contact.ack_failed', { submissionId, errorName: result.errorName });
        }),
    );
  }
  await Promise.all(secondary);

  logger.info('contact.accepted', { submissionId });
  return { status: 200, body: { ok: true } };
}
