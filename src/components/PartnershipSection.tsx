import React from 'react';
import { SectionMarker } from './SectionMarker';

const YELA_ROLE = [
  'Comunicação e marketing',
  'Produção e distribuição de conteúdos',
  'Prospecção e abordagem comercial',
  'Identificação e encaminhamento de oportunidades',
  'Apoio ao relacionamento comercial inicial',
  'Expansão a outras províncias e comunidades',
];

const LEARN_CODE_ROLE = [
  'Análise técnica das oportunidades e requisitos',
  'Orçamento técnico e definição da solução',
  'Desenvolvimento, testes e implementação',
  'Coordenação da equipa técnica',
  'Suporte e manutenção, nos termos de cada contrato',
];

const FLOW = [
  { step: '01', who: 'YELA', text: 'Identifica a oportunidade, aborda o potencial cliente e encaminha o pedido.' },
  { step: '02', who: 'Learn Code', text: 'Realiza a análise técnica e prepara a proposta e o orçamento.' },
  { step: '03', who: 'Ambas', text: 'Após a aceitação, a Learn Code executa a solução e ambas acompanham o relacionamento.' },
];

const RoleList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mt-5 border-t border-line divide-y divide-line-soft text-sm sm:text-base text-ink-2 font-light">
    {items.map((item) => (
      <li key={item} className="py-2.5">
        {item}
      </li>
    ))}
  </ul>
);

export const PartnershipSection: React.FC = () => (
  <section id="parceria" className="py-20 sm:py-28 border-t border-line" aria-labelledby="parceria-title">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <SectionMarker number="04" label="Parceria estratégica" className="mb-10 sm:mb-14" />

      <div className="max-w-3xl mb-12 sm:mb-16">
        <h2 id="parceria-title" className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight text-balance">
          YELA Corporation × Learn Code
        </h2>
        <p className="mt-3 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
          Tecnologia, comunicação e expansão: uma parceria complementar para ampliar o acesso a soluções digitais em
          Moçambique. A YELA aproxima organizações e oportunidades; a Learn Code concebe e executa as soluções
          tecnológicas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-8 border-t border-line items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange-ink">Comunicação &amp; mercado</p>
          <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-ink">YELA Corporation</h3>
          <RoleList items={YELA_ROLE} />
        </div>

        <div className="md:border-l md:border-line md:pl-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">Engenharia &amp; entrega</p>
          <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-ink">Learn Code</h3>
          <RoleList items={LEARN_CODE_ROLE} />
        </div>
      </div>

      <div className="mt-14 sm:mt-20 pt-8 border-t border-line">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">Como funciona</h3>
        <ol className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 list-none">
          {FLOW.map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="font-mono text-xs text-orange-ink tracking-wider pt-1" aria-hidden="true">
                {item.step}
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">{item.who}</p>
                <p className="mt-1 text-sm sm:text-base text-ink-2 font-light leading-relaxed text-pretty">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
