/**
 * Reads and validates server-side configuration from environment variables.
 * Values are never logged; only the *names* of missing variables are reported.
 */

export type SenderMode = 'resend' | 'mock';

export interface ContactConfig {
  fromEmail: string;
  yelaEmail: string;
  /** Only set when routing to Learn Code has been approved and configured. */
  learnCodeEmail: string | null;
  /** Send an acknowledgement to the visitor. Requires a verified sending domain. */
  ackEnabled: boolean;
}

export interface ResolvedConfig {
  contact: ContactConfig;
  senderMode: SenderMode;
  resendApiKey: string | null;
}

export type ConfigResult = { ok: true; value: ResolvedConfig } | { ok: false; missing: string[] };

export const SERVER_ENV_KEYS = [
  'RESEND_API_KEY',
  'CONTACT_FROM_EMAIL',
  'YELA_CONTACT_EMAIL',
  'LEARN_CODE_CONTACT_EMAIL',
  'CONTACT_ACK_ENABLED',
  'CONTACT_SENDER',
] as const;

type Env = Record<string, string | undefined>;

const ADDRESS_PATTERN = /^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/;

/** Accepts "addr@example.com" or "Display Name <addr@example.com>". */
export function isValidSenderAddress(value: string): boolean {
  const trimmed = value.trim();
  const match = /^(?:[^<>]+)?<([^<>]+)>$/.exec(trimmed);
  const address = match ? match[1]!.trim() : trimmed;
  return ADDRESS_PATTERN.test(address);
}

export function isValidRecipientAddress(value: string): boolean {
  return ADDRESS_PATTERN.test(value.trim());
}

function read(env: Env, key: string): string {
  return (env[key] ?? '').trim();
}

function isTruthy(value: string): boolean {
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function isProduction(env: Env): boolean {
  return read(env, 'VERCEL_ENV') === 'production' || read(env, 'NODE_ENV') === 'production';
}

export function resolveConfig(env: Env): ConfigResult {
  const missing: string[] = [];

  // The mock sender is a development/testing aid only. In production it is ignored.
  const wantsMock = read(env, 'CONTACT_SENDER').toLowerCase() === 'mock';
  const senderMode: SenderMode = wantsMock && !isProduction(env) ? 'mock' : 'resend';

  const resendApiKey = read(env, 'RESEND_API_KEY');
  if (senderMode === 'resend' && !resendApiKey) missing.push('RESEND_API_KEY');

  const fromEmail = read(env, 'CONTACT_FROM_EMAIL');
  if (!fromEmail) missing.push('CONTACT_FROM_EMAIL');
  else if (!isValidSenderAddress(fromEmail)) missing.push('CONTACT_FROM_EMAIL (formato inválido)');

  const yelaEmail = read(env, 'YELA_CONTACT_EMAIL');
  if (!yelaEmail) missing.push('YELA_CONTACT_EMAIL');
  else if (!isValidRecipientAddress(yelaEmail)) missing.push('YELA_CONTACT_EMAIL (formato inválido)');

  const learnCodeRaw = read(env, 'LEARN_CODE_CONTACT_EMAIL');
  if (learnCodeRaw && !isValidRecipientAddress(learnCodeRaw)) {
    missing.push('LEARN_CODE_CONTACT_EMAIL (formato inválido)');
  }

  if (missing.length > 0) return { ok: false, missing };

  return {
    ok: true,
    value: {
      senderMode,
      resendApiKey: resendApiKey || null,
      contact: {
        fromEmail,
        yelaEmail,
        learnCodeEmail: learnCodeRaw || null,
        ackEnabled: isTruthy(read(env, 'CONTACT_ACK_ENABLED')),
      },
    },
  };
}
