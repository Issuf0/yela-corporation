import React from 'react';

export const NarrativeSection: React.FC = () => {
  return (
    <section id="apresentacao" className="py-20 sm:py-28 border-t border-[#0B132B]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Marker */}
        <div className="mb-8 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            02 — A YELA
          </span>
        </div>

        {/* Concise Editorial Statement (2 to 3 sentences) */}
        <div className="max-w-4xl space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B132B] leading-[1.3] text-balance">
            A YELA Corporation actua na aproximação estratégica entre organizações com desafios concretos e as oportunidades e soluções adequadas ao seu crescimento.
          </h2>
          <p className="text-base sm:text-xl text-slate-600 font-light leading-relaxed text-balance">
            Através de comunicação intencional, prospecção atenta e expansão de parcerias, estabelecemos as ligações necessárias para transformar necessidades em realizações com impacto real.
          </p>
        </div>

      </div>
    </section>
  );
};
