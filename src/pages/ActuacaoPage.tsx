import { ArrowRight } from 'lucide-react';
import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { NextPage } from '../components/NextPage';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';
import { SERVICE_AREAS } from '../data/services';

export const ActuacaoPage: React.FC = () => (
  <Layout path="/actuacao">
    <PageHero
      number="03"
      label="Áreas de actuação"
      title="Seis áreas, uma mesma exigência."
      lede="Soluções estratégicas para marcas e negócios que querem crescer e destacar-se: da arquitectura à formação, com o mesmo rigor, a mesma transparência e a mesma responsabilidade pelo resultado."
    >
      <nav aria-label="Secções desta página" className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1 font-mono text-xs uppercase tracking-[0.16em]">
        {SERVICE_AREAS.map((area) => (
          <a key={area.id} href={`#${area.id}`} className="py-2 text-ink-2 hover:text-orange-ink">
            <span className="text-orange-ink">{area.number}</span> {area.title}
          </a>
        ))}
      </nav>
    </PageHero>

    {SERVICE_AREAS.map((area) => (
      <section key={area.id} id={area.id} className="py-16 sm:py-24 border-t border-line" aria-labelledby={`${area.id}-title`}>
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <SectionMarker number={area.number} label={area.title} />
          </div>
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            <div className="md:col-span-7 space-y-5">
              <h2 id={`${area.id}-title`} className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight text-balance">
                {area.title}
              </h2>
              <p className="text-lg text-ink font-light leading-relaxed text-pretty">{area.lede}</p>
              <p className="text-base text-ink-2 font-light leading-relaxed text-pretty">{area.text}</p>
              {area.withLearnCode && (
                <p className="text-sm text-ink-3">
                  Execução técnica pela Learn Code.{' '}
                  <a href="/parceria" className="underline underline-offset-4 hover:text-ink">
                    Saber como funciona a parceria
                  </a>
                  .
                </p>
              )}
              <a
                href={`/contacto?assunto=${area.subject}`}
                className="group inline-flex items-center gap-2 pt-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy"
              >
                {area.cta}
                <ArrowRight className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
            <div className="md:col-span-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Serviços</h3>
              <ul className="mt-3 border-t border-line divide-y divide-line-soft text-sm sm:text-base text-ink-2 font-light">
                {area.services.map((item) => (
                  <li key={item} className="py-2.5">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    ))}

    <CtaBand />
    <NextPage path="/actuacao" />
  </Layout>
);
