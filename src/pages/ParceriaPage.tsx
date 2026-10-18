import { ArrowRight } from 'lucide-react';
import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { NextPage } from '../components/NextPage';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';
import { PARTNERS } from '../config/site';

const LEARN_CODE = PARTNERS.find((p) => p.name === 'Learn Code')!;

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
  'Apoio técnico durante a negociação, quando necessário',
];

const FLOW = [
  { who: 'YELA', text: 'Identifica a oportunidade, aborda o potencial cliente e regista a origem do contacto.' },
  { who: 'Learn Code', text: 'Realiza a análise técnica dos requisitos e prepara a proposta e o orçamento.' },
  { who: 'YELA + Learn Code', text: 'A YELA apoia a relação comercial; a Learn Code valida a componente técnica e o preço final.' },
  { who: 'Learn Code', text: 'Após a aceitação do cliente, executa o projecto; ambas acompanham o relacionamento.' },
];

const PRINCIPLES = [
  { title: 'Boa-fé e transparência', text: 'Na comunicação com o cliente e na tomada de decisões entre as partes.' },
  { title: 'Complementaridade', text: 'Cada organização faz o que sabe fazer melhor, respeitando a especialização da outra.' },
  { title: 'Responsabilidade', text: 'Cada parte responde pela execução das actividades que assume.' },
  { title: 'Confidencialidade', text: 'Informações comerciais, técnicas e dados de clientes são tratados com reserva.' },
];

const SOLUTIONS = ['Websites e portais institucionais', 'Aplicações móveis', 'Sistemas de gestão e APIs', 'Soluções com inteligência artificial'];

const RoleList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mt-5 border-t border-line divide-y divide-line-soft text-sm sm:text-base text-ink-2 font-light">
    {items.map((item) => (
      <li key={item} className="py-2.5">{item}</li>
    ))}
  </ul>
);

export const ParceriaPage: React.FC = () => (
  <Layout path="/parceria">
    <PageHero
      number="04"
      label="Parceria estratégica"
      title="YELA Corporation × Learn Code"
      lede="Tecnologia, comunicação e expansão: uma parceria complementar, em vigor desde Setembro de 2026, para ampliar o acesso a soluções digitais em Moçambique."
    >
      <p className="mt-8 font-display text-xl sm:text-2xl font-semibold text-ink">Capacitar. Fortalecer. Transformar.</p>
    </PageHero>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="porque-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§1" label="Porquê" />
        </div>
        <div className="lg:col-span-9 max-w-3xl space-y-5">
          <h2 id="porque-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance">
            Duas competências que se completam.
          </h2>
          <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
            A Learn Code contribui com desenvolvimento tecnológico, análise e execução de soluções digitais. A YELA
            contribui com comunicação, prospecção e expansão territorial. Juntas, transformam essa complementaridade numa
            relação organizada, transparente e orientada para resultados.
          </p>
          <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
            Para quem contacta a YELA, isto significa uma porta única: o mesmo interlocutor para um projecto de
            arquitectura, uma marca, uma campanha ou uma solução digital, com a execução técnica entregue a quem a
            domina. Toda a área de Soluções Digitais da YELA é executada com a Learn Code.
          </p>
        </div>
      </Container>
    </section>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="papeis-title">
      <Container>
        <SectionMarker number="§2" label="Responsabilidades" className="mb-8" />
        <h2 id="papeis-title" className="sr-only">Responsabilidades de cada parte</h2>
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
      </Container>
    </section>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="fluxo-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§3" label="Como funciona" />
        </div>
        <div className="lg:col-span-9">
          <h2 id="fluxo-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance max-w-3xl">
            O percurso de um projecto, do primeiro contacto à entrega.
          </h2>
          <ol className="mt-10 border-t border-line divide-y divide-line list-none">
            {FLOW.map((step, index) => (
              <li key={step.text} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                <span className="md:col-span-1 font-mono text-xs text-orange-ink tracking-wider" aria-hidden="true">0{index + 1}</span>
                <h3 className="md:col-span-3 font-display text-lg font-bold text-ink tracking-tight">{step.who}</h3>
                <p className="md:col-span-8 text-base text-ink-2 font-light leading-relaxed text-pretty">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="learncode-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§4" label="A Learn Code" />
        </div>
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-7 space-y-5">
            <h2 id="learncode-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance">
              Startup tecnológica moçambicana, de Marracuene.
            </h2>
            <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
              A Learn Code desenvolve software e soluções com inteligência artificial para empresas e instituições em
              Moçambique, e forma programadores em Maputo. É responsável pelo suporte técnico e pela manutenção das
              soluções que desenvolve, nos termos de cada contrato.
            </p>
            <a
              href={LEARN_CODE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy"
            >
              Website da Learn Code
              <ArrowRight className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
          <div className="md:col-span-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">Soluções</h3>
            <ul className="mt-3 border-t border-line divide-y divide-line-soft text-sm sm:text-base text-ink-2 font-light">
              {SOLUTIONS.map((item) => (
                <li key={item} className="py-2.5">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>

    <section className="py-16 sm:py-24 border-t border-line" aria-labelledby="principios-title">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <SectionMarker number="§5" label="Princípios" />
        </div>
        <div className="lg:col-span-9">
          <h2 id="principios-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance max-w-3xl">
            O que rege a relação.
          </h2>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="border-t border-line pt-4">
                <dt className="font-display text-lg font-bold text-ink">{item.title}</dt>
                <dd className="mt-1.5 text-base text-ink-2 font-light leading-relaxed text-pretty">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>

    <CtaBand
      title="Tem um desafio tecnológico?"
      text="Descreva-nos a necessidade. A YELA acompanha a relação e a Learn Code faz a análise técnica e a proposta."
      href="/contacto?assunto=digital"
      action="Pedir análise"
    />
    <NextPage path="/parceria" />
  </Layout>
);
