export interface EmailMessage {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export interface SendOptions {
  /** Unique per logical email; lets the provider ignore accidental duplicates. */
  idempotencyKey: string;
}

export type SendResult = { ok: true; id: string | null } | { ok: false; errorName: string };

export interface EmailSender {
  send(message: EmailMessage, options: SendOptions): Promise<SendResult>;
}
