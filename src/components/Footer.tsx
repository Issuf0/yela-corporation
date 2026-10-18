import { Mail, MessageCircle } from 'lucide-react';
import React from 'react';
import { NAV_PAGES } from '../config/nav';
import { CONTACT, LEGAL_NAME, SOCIAL, TAGLINE, whatsappHref } from '../config/site';
import { Monogram } from './Logo';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

const SOCIAL_ICONS: Record<(typeof SOCIAL)[number]['name'], React.FC<{ className?: string }>> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export const Footer: React.FC = () => (
  <footer className="border-t border-line py-10 sm:py-12 text-ink-3 text-xs">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
      <div className="md:col-span-5 flex items-start gap-3">
        <Monogram className="h-8 w-8 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-ink tracking-[0.22em] uppercase font-bold text-xs">{LEGAL_NAME}</p>
          <p className="text-ink-3 text-[11px] tracking-[0.12em] uppercase">{TAGLINE}</p>
          <p className="text-ink-3 font-light pt-1">
            {CONTACT.city}, {CONTACT.country}. Em parceria estratégica com a Learn Code.
          </p>
        </div>
      </div>

      <div className="md:col-span-3 space-y-1.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Contacto</p>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 py-1 text-ink hover:text-orange-ink transition-colors">
          <MessageCircle className="w-4 h-4 text-orange-ink shrink-0" aria-hidden="true" />
          <span>
            <span className="sr-only">WhatsApp: </span>
            {CONTACT.whatsappFormatted}
          </span>
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 py-1 text-ink hover:text-orange-ink transition-colors break-all">
          <Mail className="w-4 h-4 text-orange-ink shrink-0" aria-hidden="true" />
          <span>
            <span className="sr-only">Email: </span>
            {CONTACT.email}
          </span>
        </a>
        <ul className="flex items-center gap-2 pt-2 list-none" aria-label="Redes sociais">
          {SOCIAL.map((network) => {
            const Icon = SOCIAL_ICONS[network.name];
            return (
              <li key={network.name}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${network.name} da YELA Corporation`}
                  className="inline-flex items-center justify-center h-9 w-9 -ml-2 text-ink hover:text-orange-ink transition-colors rounded-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <nav aria-label="Navegação do rodapé" className="md:col-span-4 md:justify-self-end grid grid-cols-2 gap-x-8 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
        <a href="/" className="py-1.5 hover:text-ink transition-colors">
          Início
        </a>
        {NAV_PAGES.map((page) => (
          <a key={page.path} href={page.path} className="py-1.5 hover:text-ink transition-colors">
            {page.label}
          </a>
        ))}
        <a href="/privacidade" className="py-1.5 hover:text-ink transition-colors">
          Privacidade
        </a>
      </nav>

      <p className="md:col-span-12 pt-6 border-t border-line-soft text-ink-3 font-light">
        © {new Date().getFullYear()} {LEGAL_NAME}. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);
