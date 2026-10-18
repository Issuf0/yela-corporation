import React from 'react';
import { SectionMarker } from './SectionMarker';

export const NarrativeSection: React.FC = () => (
  <section id="apresentacao" className="py-20 sm:py-28 border-t border-line" aria-labelledby="apresentacao-title">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionMarker number="02" label="A YELA" className="mb-8 sm:mb-12" />

      <div className="max-w-4xl space-y-6">
        <h2
          id="apresentacao-title"
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink leading-[1.3] text-balance"
        >
          A YELA Corporation é uma sociedade moçambicana, sediada em Maputo, que actua em arquitectura, creative studio e
          construções.
        </h2>
        <p className="text-base sm:text-xl text-ink-2 font-light leading-relaxed text-pretty">
          Aproximamos organizações com desafios concretos das soluções certas: projectamos, comunicamos e construímos
          com rigor, e articulamos parcerias que ampliam o alcance de cada projecto.
        </p>
      </div>
    </div>
  </section>
);
