import { Resend } from 'resend';
import type { EmailSender } from './types';

/**
 * EmailSender backed by the official Resend Node SDK.
 * Docs: https://resend.com/docs/send-with-nodejs
 * The SDK resolves `{ data, error }` and does not throw on API errors; network
 * failures are still caught so callers only ever see a SendResult.
 */
export function createResendSender(apiKey: string): EmailSender {
  const client = new Resend(apiKey);

  return {
    async send(message, { idempotencyKey }) {
      try {
        const { data, error } = await client.emails.send(
          {
            from: message.from,
            to: message.to,
            subject: message.subject,
            html: message.html,
            text: message.text,
            ...(message.replyTo ? { replyTo: message.replyTo } : {}),
          },
          { idempotencyKey },
        );
        if (error) return { ok: false, errorName: error.name ?? 'unknown_error' };
        return { ok: true, id: data?.id ?? null };
      } catch {
        return { ok: false, errorName: 'network_error' };
      }
    },
  };
}
