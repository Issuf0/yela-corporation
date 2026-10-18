import { Mail, MessageCircle } from 'lucide-react';
import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { Container, Layout } from '../components/Layout';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';
import { FacebookIcon, InstagramIcon } from '../components/SocialIcons';
import { CONTACT, SOCIAL, whatsappHref } from '../config/site';

const SOCIAL_ICONS: Record<(typeof SOCIAL)[number]['name'], React.FC<{ className?: string }>> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

const STEPS = [
  { title: 'Recebemos a sua mensagem', text: 'No WhatsApp ou no email da YELA, consoante o canal que escolher.' },
  { title: 'Respondemos para marcar uma conversa', text: 'Pelo mesmo canal, para perceber o contexto e os objectivos do seu pedido.' },
  { title: 'Se for tecnológico, envolvemos a Learn Code', text: 'Que faz a análise técnica e prepara a proposta, no âmbito da parceria.' },
];

const channelClass = 'group flex items-center gap-4 py-4 border-t border-line';

function initialSubjectFromUrl(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('assunto') ?? '';
}

export const ContactoPage: React.FC = () => (
  <Layout path="/contacto">
    <PageHero
      number="06"
      label="Contacto"
      title="Há uma oportunidade para explorar?"
      lede="Partilhe o desafio da sua organização para iniciarmos um diálogo directo e estruturado. Respondemos pelo WhatsApp ou por email."
    />

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="form-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionMarker number="§1" label="Canais directos" />
          <ul className="mt-8 text-ink-2 border-b border-line">
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
            {SOCIAL.map((network) => {
              const Icon = SOCIAL_ICONS[network.name];
              return (
                <li key={network.name}>
                  <a href={network.url} target="_blank" rel="noopener noreferrer" className={channelClass}>
                    <Icon className="w-4 h-4 text-orange-ink shrink-0" />
                    <span className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">{network.name}</span>
                      <span className="text-base text-ink group-hover:text-orange-ink transition-colors break-all">{network.handle}</span>
                    </span>
                  </a>
                </li>
              );
            })}
            <li className="flex items-center gap-4 py-4 border-t border-line">
              <span className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Localização</span>
                <span className="text-base text-ink">{CONTACT.city}, {CONTACT.country}</span>
              </span>
            </li>
          </ul>

          <div className="mt-12">
            <SectionMarker number="§3" label="O que acontece a seguir" />
            <ol className="mt-6 space-y-5 list-none">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-mono text-xs text-orange-ink tracking-wider pt-1" aria-hidden="true">0{index + 1}</span>
                  <div>
                    <p className="font-display text-base font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-sm text-ink-2 font-light leading-relaxed text-pretty">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-8">
          <SectionMarker number="§2" label="Escreva-nos" className="mb-8" />
          <h2 id="form-title" className="sr-only">Formulário de contacto</h2>
          <ContactForm initialSubject={initialSubjectFromUrl()} />
        </div>
      </Container>
    </section>
  </Layout>
);
