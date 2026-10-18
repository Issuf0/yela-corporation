import { Mail, MessageCircle } from 'lucide-react';
import React from 'react';
import { CONTACT, whatsappHref } from '../config/site';
import { ContactForm } from './ContactForm';
import { SectionMarker } from './SectionMarker';

const channelClass = 'group flex items-center gap-4 py-4 border-t border-line hover:text-ink';

export const ContactSection: React.FC = () => (
  <section id="contacto" className="py-20 sm:py-28 border-t border-line" aria-labelledby="contacto-title">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionMarker number="05" label="Contacto" className="mb-10 sm:mb-14" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contacto-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight text-balance">
            Há uma oportunidade para explorar?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty max-w-md">
            Partilhe o desafio da sua organização para iniciarmos um diálogo directo e estruturado.
          </p>

          <ul className="mt-10 max-w-md text-ink-2 border-b border-line">
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={channelClass}>
                <MessageCircle className="w-4 h-4 text-orange-ink shrink-0" aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">WhatsApp</span>
                  <span className="text-base text-ink group-hover:text-orange-ink transition-colors">{CONTACT.whatsappFormatted}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className={channelClass}>
                <Mail className="w-4 h-4 text-orange-ink shrink-0" aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Email</span>
                  <span className="text-base text-ink group-hover:text-orange-ink transition-colors break-all">{CONTACT.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 py-4 border-t border-line">
              <span className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Localização</span>
                <span className="text-base text-ink">
                  {CONTACT.city}, {CONTACT.country}
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);
