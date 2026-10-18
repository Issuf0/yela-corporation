import { ArrowRight } from 'lucide-react';
import React from 'react';
import { nextPage } from '../config/nav';
import { Container } from './Layout';

/** Ligação editorial para a página seguinte, no fim de cada página. */
export const NextPage: React.FC<{ path: string }> = ({ path }) => {
  const next = nextPage(path);
  if (!next) return null;
  return (
    <nav aria-label="Página seguinte" className="border-t border-line">
      <Container>
        <a
          href={next.path}
          className="group flex items-center justify-between gap-6 py-8 sm:py-10 text-ink hover:text-orange-ink transition-colors"
        >
          <span className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Seguinte</span>
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight">{next.label}</span>
          </span>
          <ArrowRight className="w-6 h-6 shrink-0 text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </Container>
    </nav>
  );
};
