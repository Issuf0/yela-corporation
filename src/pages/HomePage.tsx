import { ArrowRight } from 'lucide-react';
import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { SectionMarker } from '../components/SectionMarker';

const AREAS = [
  { number: '01', title: 'Arquitectura', href: '/actuacao#arquitectura', text: 'Projectos pensados para responder a necessidades reais, com rigor técnico e atenção ao contexto.' },
  { number: '02', title: 'Creative Studio', href: '/actuacao#creative-studio', text: 'Identidade, comunicação e conteúdos que dão forma e voz a marcas e organizações.' },
  { number: '03', title: 'Construções', href: '/actuacao#construcoes', text: 'Execução de obras e intervenções com planeamento, acompanhamento e responsabilidade em cada fase.' },
];

const arrow = 'inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy';

export const HomePage: React.FC = () => (
  <Layout path="/">
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32" aria-labelledby="hero-title">
      <Container>
        <div className="max-w-4xl space-y-7 sm:space-y-8">
          <h1 id="hero-title" className="font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.03em] text-ink text-balance">
            Ligamos desafios a oportunidades.
          </h1>
          <p className="text-lg sm:text-xl text-ink-2 font-light leading-relaxed max-w-xl text-pretty">
            Arquitectura, creative studio e construção em Maputo. E, através da parceria com a Learn Code, soluções
            tecnológicas para organizações em todo o Moçambique.
          </p>
          <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-5">
            <a href="/contacto" className="group inline-flex items-center gap-3 min-h-12 px-7 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors">
              <span>Fale connosco</span>
              <ArrowRight className="w-4 h-4 text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="/sobre" className={arrow}>
              Conhecer a YELA
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>

    <section className="py-20 sm:py-28 border-t border-line" aria-labelledby="home-sobre">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="02" label="A YELA" />
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-6">
          <h2 id="home-sobre" className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink leading-[1.3] text-balance">
            Uma sociedade moçambicana que projecta, comunica e constrói.
          </h2>
          <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
            A YELA Corporation, SA, sediada em Maputo, aproxima organizações com desafios concretos das soluções
            certas: em arquitectura, em comunicação e em obra. E articula parcerias que ampliam o alcance de cada
            projecto.
          </p>
          <a href="/sobre" className={arrow}>
            Sobre a YELA
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>

    <section className="py-20 sm:py-28 border-t border-line" aria-labelledby="home-areas">
      <Container>
        <div className="flex items-end justify-between gap-6 mb-4">
          <SectionMarker number="03" label="Áreas de actuação" />
          <a href="/actuacao" className={`${arrow} hidden sm:inline-flex`}>
            Ver todas
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
        <h2 id="home-areas" className="sr-only">Áreas de actuação</h2>
        <ol className="mt-8 sm:mt-10 border-t border-line divide-y divide-line list-none">
          {AREAS.map((area) => (
            <li key={area.number}>
              <a href={area.href} className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline hover:bg-paper-deep/60 transition-colors -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                <span className="md:col-span-1 font-mono text-xs text-orange-ink tracking-wider" aria-hidden="true">{area.number}</span>
                <h3 className="md:col-span-4 font-display text-xl sm:text-2xl font-bold text-ink tracking-tight group-hover:text-orange-ink transition-colors">{area.title}</h3>
                <p className="md:col-span-6 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">{area.text}</p>
                <ArrowRight className="hidden md:block md:col-span-1 justify-self-end w-5 h-5 text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </section>

    <section className="py-20 sm:py-28 border-t border-line" aria-labelledby="home-parceria">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="04" label="Parceria estratégica" />
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-6">
          <h2 id="home-parceria" className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink leading-[1.3] text-balance">
            YELA Corporation × Learn Code: tecnologia, comunicação e expansão.
          </h2>
          <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
            Desde Setembro de 2026, a YELA leva soluções digitais às organizações que acompanha: websites, aplicações,
            sistemas e inteligência artificial, desenvolvidos pela Learn Code. A YELA identifica a oportunidade e
            acompanha a relação; a Learn Code analisa, orça e executa.
          </p>
          <p className="font-display text-lg sm:text-xl font-semibold text-ink">Capacitar. Fortalecer. Transformar.</p>
          <a href="/parceria" className={arrow}>
            Como funciona a parceria
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>

    <CtaBand />
  </Layout>
);
