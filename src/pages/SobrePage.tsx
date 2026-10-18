import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { NextPage } from '../components/NextPage';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';
import { CONTACT, LEGAL_NAME } from '../config/site';

const PRINCIPLES = [
  { title: 'Rigor e responsabilidade', text: 'Cada projecto tem um responsável, um prazo e um padrão de qualidade assumido desde o início.' },
  { title: 'Transparência', text: 'Comunicação directa com o cliente em todas as fases: o que vai ser feito, por quem e quando.' },
  { title: 'Complementaridade', text: 'Trabalhamos com parceiros especializados quando isso serve melhor o cliente, sem confundir papéis.' },
  { title: 'Proximidade', text: 'Sediados em Maputo e disponíveis para projectos noutras províncias e comunidades.' },
];

export const SobrePage: React.FC = () => (
  <Layout path="/sobre">
    <PageHero
      number="02"
      label="A YELA"
      title="Projectamos, comunicamos e construímos."
      lede={`${LEGAL_NAME} é uma sociedade moçambicana, sediada em ${CONTACT.city}, que actua em arquitectura, creative studio e construções.`}
    />

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="quem-somos">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§1" label="Quem somos" />
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-5 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
          <h2 id="quem-somos" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance">
            Uma só equipa para três momentos de um projecto: pensar, comunicar e construir.
          </h2>
          <p>
            A YELA nasce da convicção de que um bom projecto se decide tanto no desenho como na forma como é comunicado
            e, por fim, executado. Por isso reunimos arquitectura, criação e construção sob a mesma responsabilidade.
          </p>
          <p>
            Trabalhamos com empresas, instituições e particulares que precisam de respostas concretas: um edifício, uma
            marca, uma obra. E, quando o desafio é tecnológico, contamos com a Learn Code, nossa parceira estratégica.
          </p>
          <dl className="pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Sede</dt>
              <dd className="mt-1 text-ink">{CONTACT.city}, {CONTACT.country}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Forma jurídica</dt>
              <dd className="mt-1 text-ink">Sociedade anónima (SA)</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Liderança</dt>
              <dd className="mt-1 text-ink">Augusto J. Samajo, Fundador e CEO</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="como-trabalhamos">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§2" label="Como trabalhamos" />
        </div>
        <div className="lg:col-span-9">
          <h2 id="como-trabalhamos" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance max-w-3xl">
            Quatro compromissos que valem para todos os projectos.
          </h2>
          <ol className="mt-10 border-t border-line divide-y divide-line list-none">
            {PRINCIPLES.map((item, index) => (
              <li key={item.title} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                <span className="md:col-span-1 font-mono text-xs text-orange-ink tracking-wider" aria-hidden="true">0{index + 1}</span>
                <h3 className="md:col-span-4 font-display text-lg sm:text-xl font-bold text-ink tracking-tight">{item.title}</h3>
                <p className="md:col-span-7 text-base text-ink-2 font-light leading-relaxed text-pretty">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="parceiros">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§3" label="Parceiros" />
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-5">
          <h2 id="parceiros" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance">
            Learn Code, parceira tecnológica.
          </h2>
          <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
            Startup tecnológica moçambicana, de Marracuene, que desenvolve websites, aplicações móveis, sistemas, APIs
            e soluções com inteligência artificial. Em parceria desde Setembro de 2026, a Learn Code concebe e executa as
            soluções digitais que a YELA leva aos seus clientes.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="/parceria" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy underline underline-offset-4">
              Ver a parceria em detalhe
            </a>
            <a href="/parcerias" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy underline underline-offset-4">
              Todos os parceiros
            </a>
          </div>
        </div>
      </Container>
    </section>

    <CtaBand title="Vamos conversar sobre o seu projecto?" text="Conte-nos o que precisa: um edifício, uma marca, uma obra ou uma solução digital." />
    <NextPage path="/sobre" />
  </Layout>
);
