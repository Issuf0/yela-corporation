import React from 'react';

interface Capability {
  number: string;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Comunicação e Marketing',
    description: 'Construção de presença institucional com clareza e autoridade para aproximar organizações dos seus interlocutores estratégicos.',
  },
  {
    number: '02',
    title: 'Prospecção Comercial',
    description: 'Diagnóstico criterioso de necessidades operacionais para identificar oportunidades concretas de modernização e valor.',
  },
  {
    number: '03',
    title: 'Expansão de Oportunidades',
    description: 'Articulação territorial e institucional de novos canais para aproximar desafios locais a capacidades comprovadas.',
  },
];

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="actuacao" className="py-20 sm:py-28 border-t border-[#0B132B]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Marker */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            03 — Áreas de actuação
          </span>
        </div>

        {/* Editorial Layout with Subtle Hairline Dividers (1 sentence per area, no cards or lists) */}
        <div className="border-t border-[#0B132B]/10 divide-y divide-[#0B132B]/10">
          {capabilities.map((item) => (
            <div
              key={item.number}
              className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-amber-700 tracking-wider">
                  {item.number}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
