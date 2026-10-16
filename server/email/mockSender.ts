import type { EmailMessage, EmailSender, SendOptions } from './types';
import type { Logger } from '../logger';

export interface MockSentEmail {
  message: EmailMessage;
  options: SendOptions;
}

export interface MockSender extends EmailSender {
  readonly sent: MockSentEmail[];
}

/**
 * In-memory sender for development and tests. Records every message and can
 * be told to fail. In development it logs recipients and subject only
 * (never the body) so the console does not accumulate personal data.
 */
export function createMockSender(options: { failWith?: string; logger?: Logger } = {}): MockSender {
  const sent: MockSentEmail[] = [];
  return {
    sent,
    async send(message, sendOptions) {
      sent.push({ message, options: sendOptions });
      if (options.failWith) return { ok: false, errorName: options.failWith };
      options.logger?.info('email.mock_sent', {
        to: message.to.map((address) => address.replace(/^[^@]+/, '***')),
        subject: message.subject,
        idempotencyKey: sendOptions.idempotencyKey,
      });
      return { ok: true, id: `mock-${sent.length}` };
    },
  };
}
