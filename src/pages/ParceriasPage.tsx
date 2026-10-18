import { ArrowRight, ArrowUpRight } from 'lucide-react';
import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { NextPage } from '../components/NextPage';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';
import { PARTNERS } from '../config/site';

const linkClass = 'group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy';
const iconClass = 'w-3.5 h-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-1';

export const ParceriasPage: React.FC = () => (
  <Layout path="/parcerias">
    <PageHero
      number="05"
      label="Parcerias"
      title="Trabalhamos com quem amplia o nosso alcance."
      lede="A YELA articula parcerias com organizações especializadas para levar mais longe cada projecto: em tecnologia, em comunicação e junto das comunidades."
    />

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="parceiros-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§1" label="Parceiros" />
        </div>
        <div className="lg:col-span-9">
          <h2 id="parceiros-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance max-w-3xl">
            Organizações com quem a YELA trabalha.
          </h2>
          <ul className="mt-10 border-t border-line divide-y divide-line list-none">
            {PARTNERS.map((partner, index) => (
              <li key={partner.name} className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-4">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">
                    <span className="text-orange-ink" aria-hidden="true">0{index + 1}</span>
                    <span aria-hidden="true"> — </span>
                    {partner.kind}
                  </p>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">{partner.name}</h3>
                </div>
                <div className="md:col-span-8 space-y-5">
                  <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">{partner.text}</p>
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {partner.urlLabel}
                      <ArrowUpRight className={iconClass} aria-hidden="true" />
                      <span className="sr-only"> (abre numa nova janela)</span>
                    </a>
                    {partner.detailPath && (
                      <a href={partner.detailPath} className={linkClass}>
                        Ver a parceria em detalhe
                        <ArrowRight className={iconClass} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>

    <CtaBand
      title="Quer ser parceiro da YELA?"
      text="Se a sua organização partilha a nossa ambição de servir melhor as empresas, instituições e comunidades de Moçambique, fale connosco."
      href="/contacto?assunto=outro"
      action="Propor parceria"
    />
    <NextPage path="/parcerias" />
  </Layout>
);
