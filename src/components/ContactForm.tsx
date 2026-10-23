import { ArrowLeft, Check, Mail, MessageCircle } from 'lucide-react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { CONTACT, mailtoHref, whatsappHref } from '../config/site';
import { buildContactMessage, buildEmailSubject } from '../lib/contactMessage';
import {
  CONTACT_LIMITS,
  CONTACT_SUBJECT_KEYS,
  CONTACT_SUBJECTS,
  hasErrors,
  resolveSubject,
  normaliseContactInput,
  validateContactFields,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFields,
} from '../lib/contactSchema';
import { openChannel } from '../lib/openLink';

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
  'w-full px-0 py-2.5 text-base sm:text-[15px] bg-transparent border-0 border-b border-ink/30 rounded-none focus:border-navy focus:outline-none focus-visible:outline-none transition-colors text-ink placeholder:text-ink-3/60';
const inputErrorClass = 'border-red-700 focus:border-red-700';
const labelClass = 'block font-mono text-xs uppercase tracking-[0.16em] text-ink-2 mb-1.5';
const primaryButton =
  'inline-flex items-center justify-center gap-2.5 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors whitespace-nowrap press';
const secondaryButton =
  'inline-flex items-center justify-center gap-2.5 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-ink border border-ink/40 hover:border-ink hover:bg-paper-deep transition-colors whitespace-nowrap press';
const textLink =
  'inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy underline underline-offset-4';

interface ContactFormProps {
  /** Assunto pré-seleccionado (ex.: vindo de ?assunto=tecnologia). */
  initialSubject?: string;
}

/** Ligações prontas para cada canal, a partir dos campos já normalizados. */
function channelLinks(fields: ContactFields) {
  return {
    whatsapp: whatsappHref(buildContactMessage(fields, 'whatsapp')),
    email: mailtoHref(buildEmailSubject(fields), buildContactMessage(fields, 'email')),
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialSubject = '' }) => {
  const baseId = useId();
  const [values, setValues] = useState<FormValues>({
    ...EMPTY,
    subject: resolveSubject(initialSubject),
  });
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [sent, setSent] = useState<{ channel: Channel; fields: ContactFields } | null>(null);
  const channelRef = useRef<Channel>('whatsapp');
  const panelRef = useRef<HTMLDivElement>(null);
  const firstErrorRef = useRef<ContactFieldName | null>(null);

  useEffect(() => {
    if (sent) panelRef.current?.focus();
  }, [sent]);

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
    const channel = channelRef.current;
    const fields = normaliseContactInput(values);
    const validation = validateContactFields(fields);
    if (hasErrors(validation)) {
      setErrors(validation);
      firstErrorRef.current = (Object.keys(validation) as ContactFieldName[])[0] ?? null;
      return;
    }
    openChannel(channelLinks(fields)[channel], channel);
    setSent({ channel, fields });
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSent(null);
  };

  if (sent) {
    const links = channelLinks(sent.fields);
    const other: Channel = sent.channel === 'whatsapp' ? 'email' : 'whatsapp';
    return (
      <div ref={panelRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none space-y-6 animate-fade">
        <div className="flex items-center gap-3 text-ink">
          <Check className="w-5 h-5 text-orange-ink" aria-hidden="true" />
          <h3 className="font-display text-xl sm:text-2xl font-bold">
            {sent.channel === 'whatsapp' ? 'Mensagem aberta no WhatsApp.' : 'Mensagem aberta no seu email.'}
          </h3>
        </div>
        <p className="text-base text-ink-2 font-light text-pretty max-w-prose">
          {sent.channel === 'whatsapp'
            ? `Falta só carregar em enviar na conversa com a YELA Corporation (${CONTACT.whatsappFormatted}). Respondemos pelo mesmo canal.`
            : `Falta só carregar em enviar no seu programa de email, para ${CONTACT.email}. Respondemos por email.`}
        </p>
        <p className="text-sm text-ink-3 text-pretty max-w-prose">
          Não abriu nada?{' '}
          <a
            href={links[other]}
            target={other === 'whatsapp' ? '_blank' : undefined}
            rel={other === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className="underline underline-offset-4 text-ink hover:text-orange-ink"
          >
            {other === 'whatsapp' ? 'Enviar pelo WhatsApp' : 'Enviar por email'}
          </a>{' '}
          ou{' '}
          <a
            href={links[sent.channel]}
            target={sent.channel === 'whatsapp' ? '_blank' : undefined}
            rel={sent.channel === 'whatsapp' ? 'noopener noreferrer' : undefined}
            className="underline underline-offset-4 text-ink hover:text-orange-ink"
          >
            tentar de novo
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <button type="button" onClick={() => setSent(null)} className={textLink}>
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Voltar ao formulário
          </button>
          <button type="button" onClick={reset} className={textLink}>
            Nova mensagem
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (name: ContactFieldName, extra?: string) =>
    [errors[name] ? errorId(name) : null, extra ?? null].filter(Boolean).join(' ') || undefined;
  const FieldError: React.FC<{ name: ContactFieldName }> = ({ name }) =>
    errors[name] ? (
      <p id={errorId(name)} className="mt-1.5 text-sm text-red-800 animate-fade">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <p className="text-sm text-ink-3">
        Campos assinalados com <span className="text-orange-ink">*</span> são obrigatórios.
      </p>

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
            placeholder="+258 8x xxx xxxx"
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
          placeholder="Descreva o contexto, o objectivo e, se souber, o prazo."
          maxLength={CONTACT_LIMITS.message.max}
          value={values.message}
          onChange={update('message')}
          aria-required="true"
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={describedBy('message', `${baseId}-message-hint`)}
          className={`${inputClass} ${errors.message ? inputErrorClass : ''} resize-y min-h-28`}
        />
        <div className="mt-1.5 flex justify-between gap-4">
          <FieldError name="message" />
          <p id={`${baseId}-message-hint`} className="ml-auto text-xs text-ink-3 tabular-nums">
            {values.message.length} / {CONTACT_LIMITS.message.max}
          </p>
        </div>
      </div>

      <div className="pt-2 space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Enviar por</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" onClick={() => (channelRef.current = 'whatsapp')} className={primaryButton}>
            <MessageCircle className="w-4 h-4 text-orange" aria-hidden="true" />
            Enviar pelo WhatsApp
          </button>
          <button type="submit" onClick={() => (channelRef.current = 'email')} className={secondaryButton}>
            <Mail className="w-4 h-4" aria-hidden="true" />
            Enviar por email
          </button>
        </div>
        <p className="text-xs text-ink-3 text-pretty max-w-prose">
          A mensagem abre já preenchida no canal que escolher; é você que a envia. Os dados servem apenas para responder
          ao seu pedido.{' '}
          <a href="/privacidade" className="underline underline-offset-4 hover:text-ink">
            Política de privacidade
          </a>
          .
        </p>
      </div>
    </form>
  );
};
