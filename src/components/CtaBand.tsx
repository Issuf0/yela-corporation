import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Container } from './Layout';

interface CtaBandProps {
  title?: string;
  text?: string;
  href?: string;
  action?: string;
}

/** Convite ao contacto, reutilizado no fim das páginas. */
export const CtaBand: React.FC<CtaBandProps> = ({
  title = 'Há uma oportunidade para explorar?',
  text = 'Partilhe o desafio da sua organização. Respondemos pelo WhatsApp ou por email.',
  href = '/contacto',
  action = 'Fale connosco',
}) => (
  <section className="border-t border-line py-16 sm:py-24" aria-labelledby="cta-title">
    <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
      <div className="lg:col-span-8">
        <h2 id="cta-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight text-balance">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink-2 font-light leading-relaxed max-w-xl text-pretty">{text}</p>
      </div>
      <div className="lg:col-span-4 flex lg:justify-end">
        <a
          href={href}
          className="group inline-flex items-center gap-3 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors press"
        >
          <span>{action}</span>
          <ArrowRight className="w-4 h-4 text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </Container>
  </section>
);
