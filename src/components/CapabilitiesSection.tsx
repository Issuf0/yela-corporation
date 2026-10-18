import React from 'react';
import { SectionMarker } from './SectionMarker';

interface Capability {
  number: string;
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    number: '01',
    title: 'Arquitectura',
    description:
      'Projectos de arquitectura pensados para responder a necessidades reais, com rigor técnico e atenção ao contexto.',
  },
  {
    number: '02',
    title: 'Creative Studio',
    description: 'Identidade, comunicação e conteúdos que dão forma e voz a marcas e organizações.',
  },
  {
    number: '03',
    title: 'Construções',
    description: 'Execução de obras e intervenções com planeamento, acompanhamento e responsabilidade em cada fase.',
  },
];

export const CapabilitiesSection: React.FC = () => (
  <section id="actuacao" className="py-20 sm:py-28 border-t border-line" aria-labelledby="actuacao-title">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionMarker number="03" label="Áreas de actuação" className="mb-4" />
      <h2 id="actuacao-title" className="sr-only">
        Áreas de actuação
      </h2>

      <ol className="mt-8 sm:mt-10 border-t border-line divide-y divide-line list-none">
        {CAPABILITIES.map((item) => (
          <li key={item.number} className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
            <span className="md:col-span-1 font-mono text-xs text-orange-ink tracking-wider" aria-hidden="true">
              {item.number}
            </span>
            <h3 className="md:col-span-4 font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">{item.title}</h3>
            <p className="md:col-span-7 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
