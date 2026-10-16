/**
 * Shared contact-form schema: used by the browser (immediate feedback) and by
 * the server (authoritative validation). Zero dependencies on purpose.
 */

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  organization: { max: 160 },
  phone: { min: 6, max: 40 },
  message: { min: 10, max: 3000 },
} as const;

export interface ContactFields {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
}

export type ContactFieldName = keyof ContactFields;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export const CONTACT_FIELD_NAMES: readonly ContactFieldName[] = [
  'name',
  'email',
  'organization',
  'phone',
  'message',
];

export const CONTACT_MESSAGES = {
  nameRequired: 'Indique o seu nome completo.',
  nameTooShort: `O nome deve ter pelo menos ${CONTACT_LIMITS.name.min} caracteres.`,
  nameTooLong: `O nome não pode exceder ${CONTACT_LIMITS.name.max} caracteres.`,
  emailRequired: 'Indique o seu endereço de email.',
  emailInvalid: 'Indique um endereço de email válido.',
  emailTooLong: `O email não pode exceder ${CONTACT_LIMITS.email.max} caracteres.`,
  organizationTooLong: `A organização não pode exceder ${CONTACT_LIMITS.organization.max} caracteres.`,
  phoneInvalid: 'Indique um número de telefone válido (apenas dígitos, espaços, +, -, parênteses).',
  phoneTooLong: `O telefone não pode exceder ${CONTACT_LIMITS.phone.max} caracteres.`,
  messageRequired: 'Escreva a sua mensagem.',
  messageTooShort: `A mensagem deve ter pelo menos ${CONTACT_LIMITS.message.min} caracteres.`,
  messageTooLong: `A mensagem não pode exceder ${CONTACT_LIMITS.message.max} caracteres.`,
} as const;

// Pragmatic email check: one "@", no whitespace, dotted domain with a TLD of
// at least two letters. Deliberately not a full RFC 5322 parser.
const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9 ().-]+$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/** Trim, drop control characters and collapse internal whitespace (single-line fields). */
export function normaliseLine(value: unknown): string {
  return asString(value).replace(CONTROL_CHARS, '').replace(/\s+/g, ' ').trim();
}

/** Trim, drop control characters, normalise line endings, cap blank lines (multi-line fields). */
export function normaliseText(value: unknown): string {
  return asString(value)
    .replace(CONTROL_CHARS, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Build a clean, fully-typed ContactFields object from untrusted input. */
export function normaliseContactInput(raw: unknown): ContactFields {
  const source = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    name: normaliseLine(source.name),
    email: normaliseLine(source.email).toLowerCase(),
    organization: normaliseLine(source.organization),
    phone: normaliseLine(source.phone),
    message: normaliseText(source.message),
  };
}

/** Validate already-normalised fields. Returns an empty object when valid. */
export function validateContactFields(fields: ContactFields): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!fields.name) errors.name = CONTACT_MESSAGES.nameRequired;
  else if (fields.name.length < CONTACT_LIMITS.name.min) errors.name = CONTACT_MESSAGES.nameTooShort;
  else if (fields.name.length > CONTACT_LIMITS.name.max) errors.name = CONTACT_MESSAGES.nameTooLong;

  if (!fields.email) errors.email = CONTACT_MESSAGES.emailRequired;
  else if (fields.email.length > CONTACT_LIMITS.email.max) errors.email = CONTACT_MESSAGES.emailTooLong;
  else if (!EMAIL_PATTERN.test(fields.email)) errors.email = CONTACT_MESSAGES.emailInvalid;

  if (fields.organization.length > CONTACT_LIMITS.organization.max) {
    errors.organization = CONTACT_MESSAGES.organizationTooLong;
  }

  if (fields.phone) {
    const digits = fields.phone.replace(/\D/g, '').length;
    if (fields.phone.length > CONTACT_LIMITS.phone.max) errors.phone = CONTACT_MESSAGES.phoneTooLong;
    else if (!PHONE_PATTERN.test(fields.phone) || digits < CONTACT_LIMITS.phone.min) {
      errors.phone = CONTACT_MESSAGES.phoneInvalid;
    }
  }

  if (!fields.message) errors.message = CONTACT_MESSAGES.messageRequired;
  else if (fields.message.length < CONTACT_LIMITS.message.min) errors.message = CONTACT_MESSAGES.messageTooShort;
  else if (fields.message.length > CONTACT_LIMITS.message.max) errors.message = CONTACT_MESSAGES.messageTooLong;

  return errors;
}

export function hasErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Client-generated identifier reused on retries so the server can deduplicate. */
export function isValidSubmissionId(value: unknown): value is string {
  return typeof value === 'string' && UUID_PATTERN.test(value);
}
