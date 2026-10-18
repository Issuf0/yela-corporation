import { ArrowRight } from 'lucide-react';
import React from 'react';
import { SignatureGraphic } from './SignatureGraphic';

export const HeroSection: React.FC = () => (
  <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden" aria-labelledby="hero-title">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-7 sm:space-y-8">
          <h1
            id="hero-title"
            className="font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold tracking-[-0.03em] text-ink text-balance"
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

        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-md p-5 sm:p-6 bg-white/40 border border-line">
            <SignatureGraphic className="w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
