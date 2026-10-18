import { ArrowLeft, Check, Mail, MessageCircle } from 'lucide-react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { CONTACT, mailtoHref, whatsappHref } from '../config/site';
import { buildContactMessage, buildEmailSubject } from '../lib/contactMessage';
import {
  CONTACT_LIMITS,
  CONTACT_SUBJECT_KEYS,
  CONTACT_SUBJECTS,
  hasErrors,
  normaliseContactInput,
  validateContactFields,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFields,
} from '../lib/contactSchema';

type Stage = 'editing' | 'ready' | 'opened';
type Channel = 'whatsapp' | 'email';

interface FormValues {
  name: string;
  email: string;
  organization: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: FormValues = { name: '', email: '', organization: '', phone: '', subject: '', message: '' };

const inputClass =
  'w-full px-0 py-2.5 text-base sm:text-[15px] bg-transparent border-0 border-b border-ink/30 rounded-none focus:border-navy focus:outline-none focus-visible:outline-none transition-colors text-ink';
const inputErrorClass = 'border-red-700 focus:border-red-700';
const labelClass = 'block font-mono text-xs uppercase tracking-[0.16em] text-ink-2 mb-1.5';
const primaryButton =
  'inline-flex items-center justify-center gap-2.5 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors';
const secondaryButton =
  'inline-flex items-center justify-center gap-2.5 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-ink border border-ink/40 hover:border-ink hover:bg-paper-deep transition-colors';
const textLink =
  'inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy underline underline-offset-4';

export const ContactForm: React.FC = () => {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [stage, setStage] = useState<Stage>('editing');
  const [prepared, setPrepared] = useState<ContactFields | null>(null);
  const [channel, setChannel] = useState<Channel>('whatsapp');
  const panelRef = useRef<HTMLDivElement>(null);
  const firstErrorRef = useRef<ContactFieldName | null>(null);

  useEffect(() => {
    if (stage !== 'editing') panelRef.current?.focus();
  }, [stage]);

  useEffect(() => {
    const field = firstErrorRef.current;
    if (!field) return;
    firstErrorRef.current = null;
    document.getElementById(`${baseId}-${field}`)?.focus();
  }, [errors, baseId]);

  const fieldId = (name: ContactFieldName) => `${baseId}-${name}`;
  const errorId = (name: ContactFieldName) => `${baseId}-${name}-error`;

  const update =
    (name: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalised = normaliseContactInput(values);
    const validation = validateContactFields(normalised);
    if (hasErrors(validation)) {
      setErrors(validation);
      firstErrorRef.current = (Object.keys(validation) as ContactFieldName[])[0] ?? null;
      return;
    }
    setPrepared(normalised);
    setStage('ready');
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setPrepared(null);
    setStage('editing');
  };

  if (stage !== 'editing' && prepared) {
    const whatsappText = buildContactMessage(prepared, 'whatsapp');
    const emailText = buildContactMessage(prepared, 'email');
    const subjectLabel = prepared.subject ? CONTACT_SUBJECTS[prepared.subject] : '';

    return (
      <div ref={panelRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none space-y-6">
        {stage === 'opened' ? (
          <>
            <div className="flex items-center gap-3 text-ink">
              <Check className="w-5 h-5 text-orange-ink" aria-hidden="true" />
              <h3 className="font-display text-xl sm:text-2xl font-bold">Mensagem preparada.</h3>
            </div>
            <p className="text-base text-ink-2 font-light text-pretty max-w-prose">
              {channel === 'whatsapp'
                ? `A sua mensagem abriu no WhatsApp da YELA Corporation (${CONTACT.whatsappFormatted}). Depois de a enviar, respondemos pelo mesmo canal.`
                : `A sua mensagem abriu no seu programa de email, dirigida a ${CONTACT.email}. Depois de a enviar, respondemos por email.`}
            </p>
            <p className="text-sm text-ink-3 text-pretty max-w-prose">
              Não abriu nada? Pode{' '}
              <a
                href={channel === 'whatsapp' ? mailtoHref(buildEmailSubject(prepared), emailText) : whatsappHref(whatsappText)}
                target={channel === 'whatsapp' ? undefined : '_blank'}
                rel={channel === 'whatsapp' ? undefined : 'noopener noreferrer'}
                className="underline underline-offset-4 text-ink hover:text-orange-ink"
              >
                {channel === 'whatsapp' ? 'enviar por email' : 'enviar pelo WhatsApp'}
              </a>{' '}
              ou contactar-nos directamente: {CONTACT.whatsappFormatted} · {CONTACT.email}.
            </p>
            <button type="button" onClick={reset} className={textLink}>
              Nova mensagem
            </button>
          </>
        ) : (
          <>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">Escolha como enviar.</h3>
              <p className="mt-2 text-base text-ink-2 font-light text-pretty max-w-prose">
                A mensagem abre no WhatsApp ou no seu email, já preenchida. É você que a envia; o website não guarda
                nem transmite os seus dados.
              </p>
            </div>

            <dl className="border-t border-line divide-y divide-line-soft text-sm">
              <div className="py-2.5 grid grid-cols-[7rem_1fr] gap-3">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 pt-0.5">Nome</dt>
                <dd className="text-ink">{prepared.name}</dd>
              </div>
              {prepared.organization && (
                <div className="py-2.5 grid grid-cols-[7rem_1fr] gap-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 pt-0.5">Organização</dt>
                  <dd className="text-ink">{prepared.organization}</dd>
                </div>
              )}
              <div className="py-2.5 grid grid-cols-[7rem_1fr] gap-3">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 pt-0.5">Assunto</dt>
                <dd className="text-ink">{subjectLabel}</dd>
              </div>
              <div className="py-2.5 grid grid-cols-[7rem_1fr] gap-3">
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 pt-0.5">Mensagem</dt>
                <dd className="text-ink whitespace-pre-line">{prepared.message}</dd>
              </div>
            </dl>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref(whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setChannel('whatsapp');
                  setStage('opened');
                }}
                className={primaryButton}
              >
                <MessageCircle className="w-4 h-4 text-orange" aria-hidden="true" />
                Enviar pelo WhatsApp
              </a>
              <a
                href={mailtoHref(buildEmailSubject(prepared), emailText)}
                onClick={() => {
                  setChannel('email');
                  setStage('opened');
                }}
                className={secondaryButton}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Enviar por email
              </a>
            </div>

            <button type="button" onClick={() => setStage('editing')} className={textLink}>
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Editar mensagem
            </button>
          </>
        )}
      </div>
    );
  }

  const describedBy = (name: ContactFieldName) => (errors[name] ? errorId(name) : undefined);
  const FieldError: React.FC<{ name: ContactFieldName }> = ({ name }) =>
    errors[name] ? (
      <p id={errorId(name)} className="mt-1.5 text-sm text-red-800">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <div>
          <label htmlFor={fieldId('name')} className={labelClass}>
            Nome completo <span className="text-orange-ink" aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name.max}
            value={values.name}
            onChange={update('name')}
            aria-required="true"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={describedBy('name')}
            className={`${inputClass} ${errors.name ? inputErrorClass : ''}`}
          />
          <FieldError name="name" />
        </div>

        <div>
          <label htmlFor={fieldId('organization')} className={labelClass}>
            Organização <span className="normal-case tracking-normal text-ink-3">(opcional)</span>
          </label>
          <input
            id={fieldId('organization')}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={CONTACT_LIMITS.organization.max}
            value={values.organization}
            onChange={update('organization')}
            aria-invalid={errors.organization ? 'true' : undefined}
            aria-describedby={describedBy('organization')}
            className={`${inputClass} ${errors.organization ? inputErrorClass : ''}`}
          />
          <FieldError name="organization" />
        </div>

        <div>
          <label htmlFor={fieldId('email')} className={labelClass}>
            Email <span className="text-orange-ink" aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email.max}
            value={values.email}
            onChange={update('email')}
            aria-required="true"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={describedBy('email')}
            className={`${inputClass} ${errors.email ? inputErrorClass : ''}`}
          />
          <FieldError name="email" />
        </div>

        <div>
          <label htmlFor={fieldId('phone')} className={labelClass}>
            Telefone <span className="normal-case tracking-normal text-ink-3">(opcional)</span>
          </label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={CONTACT_LIMITS.phone.max}
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={errors.phone ? 'true' : undefined}
            aria-describedby={describedBy('phone')}
            className={`${inputClass} ${errors.phone ? inputErrorClass : ''}`}
          />
          <FieldError name="phone" />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId('subject')} className={labelClass}>
          Assunto <span className="text-orange-ink" aria-hidden="true">*</span>
        </label>
        <select
          id={fieldId('subject')}
          name="subject"
          value={values.subject}
          onChange={update('subject')}
          aria-required="true"
          aria-invalid={errors.subject ? 'true' : undefined}
          aria-describedby={describedBy('subject')}
          className={`${inputClass} ${errors.subject ? inputErrorClass : ''} appearance-none cursor-pointer bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%230f2439' stroke-width='1.5'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.25rem_center] pr-8`}
        >
          <option value="">Seleccione…</option>
          {CONTACT_SUBJECT_KEYS.map((key) => (
            <option key={key} value={key}>
              {CONTACT_SUBJECTS[key]}
            </option>
          ))}
        </select>
        <FieldError name="subject" />
      </div>

      <div>
        <label htmlFor={fieldId('message')} className={labelClass}>
          Mensagem <span className="text-orange-ink" aria-hidden="true">*</span>
        </label>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={5}
          maxLength={CONTACT_LIMITS.message.max}
          value={values.message}
          onChange={update('message')}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={describedBy('message')}
          className={`${inputClass} ${errors.message ? inputErrorClass : ''} resize-y min-h-28`}
        />
        <FieldError name="message" />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" className={primaryButton}>
          Preparar mensagem
        </button>
        <p className="text-xs text-ink-3 text-pretty">
          A mensagem abre no WhatsApp ou no seu email, já preenchida. Os dados servem apenas para responder ao seu pedido.{' '}
          <a href="/privacidade" className="underline underline-offset-4 hover:text-ink">
            Política de privacidade
          </a>
          .
        </p>
      </div>
    </form>
  );
};
