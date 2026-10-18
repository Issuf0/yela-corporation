import { ArrowRight } from 'lucide-react';
import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { NextPage } from '../components/NextPage';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';

interface Area {
  id: string;
  number: string;
  title: string;
  lede: string;
  text: string;
  typical: string[];
  subject: string;
  cta: string;
}

const AREAS: Area[] = [
  {
    id: 'arquitectura',
    number: '01',
    title: 'Arquitectura',
    lede: 'Projectos pensados para responder a necessidades reais, com rigor técnico e atenção ao contexto.',
    text: 'Do primeiro esboço ao projecto de execução, desenhamos espaços que servem quem os usa: funcionais, duráveis e adequados ao clima, ao terreno e ao orçamento.',
    typical: ['Estudo prévio e anteprojecto', 'Projecto de licenciamento e de execução', 'Remodelação e ampliação de edifícios existentes', 'Acompanhamento do projecto em obra'],
    subject: 'arquitectura',
    cta: 'Falar sobre um projecto de arquitectura',
  },
  {
    id: 'creative-studio',
    number: '02',
    title: 'Creative Studio',
    lede: 'Identidade, comunicação e conteúdos que dão forma e voz a marcas e organizações.',
    text: 'Ajudamos organizações a dizer com clareza o que fazem e a quem se dirigem: da identidade visual aos conteúdos que sustentam a comunicação no dia-a-dia.',
    typical: ['Identidade visual e materiais de marca', 'Comunicação institucional e campanhas', 'Produção de conteúdos para canais digitais', 'Apresentações, brochuras e sinalética'],
    subject: 'creative',
    cta: 'Falar sobre comunicação ou marca',
  },
  {
    id: 'construcoes',
    number: '03',
    title: 'Construções',
    lede: 'Execução de obras e intervenções com planeamento, acompanhamento e responsabilidade em cada fase.',
    text: 'Transformamos o projecto em obra com planeamento realista, equipas coordenadas e controlo de prazos, custos e qualidade, com informação regular ao cliente.',
    typical: ['Construção nova e reabilitação', 'Obras de remodelação e acabamentos', 'Coordenação de equipas e fornecedores', 'Fiscalização e controlo de qualidade'],
    subject: 'arquitectura',
    cta: 'Falar sobre uma obra',
  },
];

export const ActuacaoPage: React.FC = () => (
  <Layout path="/actuacao">
    <PageHero
      number="03"
      label="Áreas de actuação"
      title="Três áreas, uma mesma exigência."
      lede="Arquitectura, creative studio e construções: em cada uma, o mesmo rigor, a mesma transparência e a mesma responsabilidade pelo resultado."
    >
      <nav aria-label="Secções desta página" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.16em]">
        {AREAS.map((area) => (
          <a key={area.id} href={`#${area.id}`} className="py-2 text-ink-2 hover:text-orange-ink">
            <span className="text-orange-ink">{area.number}</span> {area.title}
          </a>
        ))}
      </nav>
    </PageHero>

    {AREAS.map((area) => (
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
              <a
                href={`/contacto?assunto=${area.subject}`}
                className="group inline-flex items-center gap-2 pt-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy"
              >
                {area.cta}
                <ArrowRight className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
            <div className="md:col-span-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Tipicamente</h3>
              <ul className="mt-3 border-t border-line divide-y divide-line-soft text-sm sm:text-base text-ink-2 font-light">
                {area.typical.map((item) => (
                  <li key={item} className="py-2.5">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    ))}

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="tecnologia-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="+" label="Com a Learn Code" />
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-5">
          <h2 id="tecnologia-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance">
            E quando o desafio é tecnológico?
          </h2>
          <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
            Websites, aplicações móveis, sistemas de gestão, APIs e soluções com inteligência artificial são concebidos
            e desenvolvidos pela Learn Code, parceira tecnológica da YELA. Nós identificamos a necessidade e acompanhamos
            a relação; a Learn Code analisa, orça e executa.
          </p>
          <a href="/parceria" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy underline underline-offset-4">
            Como funciona a parceria
          </a>
        </div>
      </Container>
    </section>

    <CtaBand />
    <NextPage path="/actuacao" />
  </Layout>
);
