import React from 'react';

export const PartnershipSection: React.FC = () => {
  return (
    <section id="parceria" className="py-20 sm:py-28 border-t border-[#0B132B]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Marker */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            04 — Parceria estratégica
          </span>
        </div>

        {/* Title */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B132B] tracking-tight text-balance">
            YELA Corporation × Learn Code
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Uma articulação complementar que une estratégia de mercado e capacidade comprovada de execução tecnológica.
          </p>
        </div>

        {/* Balanced Two-Column Composition with Subtle Separator (No large dark blocks, no nested boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-8 border-t border-[#0B132B]/10 items-start">
          
          {/* YELA Corporation Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-700 block">
              Comunicação & Mercado
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B132B]">
              YELA Corporation
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Comunicação, marketing, prospecção comercial e expansão territorial.
            </p>
          </div>

          {/* Learn Code Column */}
          <div className="space-y-3 md:border-l md:border-[#0B132B]/10 md:pl-16">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Engenharia & Soluções
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B132B]">
              Learn Code
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Análise técnica, orçamentação, desenvolvimento e implementação de soluções tecnológicas.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
