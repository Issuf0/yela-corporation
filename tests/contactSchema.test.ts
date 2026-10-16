import { describe, expect, it } from 'vitest';
import {
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
  isValidSubmissionId,
  normaliseContactInput,
  validateContactFields,
} from '../src/lib/contactSchema';

const valid = {
  name: 'Maria Silva',
  email: 'Maria.Silva@Example.com',
  organization: 'Exemplo, Lda',
  phone: '+258 84 000 0000',
  message: 'Gostaria de saber mais sobre a vossa atuação.',
};

describe('normaliseContactInput', () => {
  it('trims, collapses whitespace and lowercases the email', () => {
    const out = normaliseContactInput({ ...valid, name: '  Maria   Silva ', email: '  Maria.Silva@Example.com ' });
    expect(out.name).toBe('Maria Silva');
    expect(out.email).toBe('maria.silva@example.com');
  });

  it('normalises line endings and caps blank lines in the message', () => {
    const out = normaliseContactInput({ ...valid, message: 'Olá\r\n\r\n\r\n\r\nAdeus  \r\n' });
    expect(out.message).toBe('Olá\n\nAdeus');
  });

  it('strips control characters and tolerates non-string values', () => {
    const out = normaliseContactInput({ name: 'Ma\u0000ria', email: 42, organization: null, phone: ['x'], message: undefined });
    expect(out.name).toBe('Maria');
    expect(out.email).toBe('');
    expect(out.organization).toBe('');
    expect(out.phone).toBe('');
    expect(out.message).toBe('');
  });

  it('handles non-object input', () => {
    expect(normaliseContactInput(null).name).toBe('');
    expect(normaliseContactInput('x').email).toBe('');
  });
});

describe('validateContactFields', () => {
  const normalised = () => normaliseContactInput(valid);

  it('accepts a valid submission', () => {
    expect(validateContactFields(normalised())).toEqual({});
  });

  it('requires name, email and message', () => {
    const errors = validateContactFields({ ...normalised(), name: '', email: '', message: '' });
    expect(errors.name).toBe(CONTACT_MESSAGES.nameRequired);
    expect(errors.email).toBe(CONTACT_MESSAGES.emailRequired);
    expect(errors.message).toBe(CONTACT_MESSAGES.messageRequired);
  });

  it('enforces minimum lengths', () => {
    const errors = validateContactFields({ ...normalised(), name: 'M', message: 'Olá' });
    expect(errors.name).toBe(CONTACT_MESSAGES.nameTooShort);
    expect(errors.message).toBe(CONTACT_MESSAGES.messageTooShort);
  });

  it('enforces maximum lengths', () => {
    const errors = validateContactFields({
      ...normalised(),
      name: 'a'.repeat(CONTACT_LIMITS.name.max + 1),
      organization: 'a'.repeat(CONTACT_LIMITS.organization.max + 1),
      phone: '1'.repeat(CONTACT_LIMITS.phone.max + 1),
      message: 'a'.repeat(CONTACT_LIMITS.message.max + 1),
    });
    expect(errors.name).toBe(CONTACT_MESSAGES.nameTooLong);
    expect(errors.organization).toBe(CONTACT_MESSAGES.organizationTooLong);
    expect(errors.phone).toBe(CONTACT_MESSAGES.phoneTooLong);
    expect(errors.message).toBe(CONTACT_MESSAGES.messageTooLong);
  });

  it.each(['semarroba.com', 'a@b', 'a@b.', 'a b@c.pt', 'a@@b.pt', 'a@b..pt'])('rejects malformed email %s', (email) => {
    expect(validateContactFields({ ...normalised(), email }).email).toBe(CONTACT_MESSAGES.emailInvalid);
  });

  it.each(['abc', '+258 8x 000', '12345'])('rejects invalid phone %s', (phone) => {
    expect(validateContactFields({ ...normalised(), phone }).phone).toBe(CONTACT_MESSAGES.phoneInvalid);
  });

  it('allows empty optional fields', () => {
    expect(validateContactFields({ ...normalised(), organization: '', phone: '' })).toEqual({});
  });
});

describe('isValidSubmissionId', () => {
  it('accepts UUIDs and rejects everything else', () => {
    expect(isValidSubmissionId('3f2a7c1e-9b4d-4e6f-8a1b-2c3d4e5f6a7b')).toBe(true);
    expect(isValidSubmissionId('not-a-uuid')).toBe(false);
    expect(isValidSubmissionId(123)).toBe(false);
    expect(isValidSubmissionId(undefined)).toBe(false);
  });
});
