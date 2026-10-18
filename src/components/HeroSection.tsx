import { ArrowRight } from 'lucide-react';
import React from 'react';

export const HeroSection: React.FC = () => (
  <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32" aria-labelledby="hero-title">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="max-w-4xl space-y-7 sm:space-y-8">
        <h1
          id="hero-title"
          className="font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.03em] text-ink text-balance"
        >
          Ligamos desafios a oportunidades.
        </h1>

        <p className="text-lg sm:text-xl text-ink-2 font-light leading-relaxed max-w-xl text-pretty">
          Arquitectura, creative studio e construção. E, através da parceria com a Learn Code, soluções tecnológicas
          para organizações em Moçambique.
        </p>

        <div className="pt-1">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors"
          >
            <span>Fale connosco</span>
            <ArrowRight
              className="w-4 h-4 text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
);
