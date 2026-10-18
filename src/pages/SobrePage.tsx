import React from 'react';
import { CtaBand } from '../components/CtaBand';
import { Container, Layout } from '../components/Layout';
import { NextPage } from '../components/NextPage';
import { PageHero } from '../components/PageHero';
import { SectionMarker } from '../components/SectionMarker';
import { CONTACT, LEGAL_NAME } from '../config/site';
import { MISSION, PILLARS, TEAM, VALUES, VISION } from '../data/services';

const Block: React.FC<{ number: string; label: string; title: string; titleId: string; children: React.ReactNode }> = ({
  number,
  label,
  title,
  titleId,
  children,
}) => (
  <section className="py-16 sm:py-24 border-t border-line" aria-labelledby={titleId}>
    <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-3">
        <SectionMarker number={number} label={label} />
      </div>
      <div className="lg:col-span-9">
        <h2 id={titleId} className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-[1.3] text-balance max-w-3xl">
          {title}
        </h2>
        {children}
      </div>
    </Container>
  </section>
);

export const SobrePage: React.FC = () => (
  <Layout path="/sobre">
    <PageHero
      number="02"
      label="A YELA"
      title="Nova era. Nova identidade. Mesma visão."
      lede={`${LEGAL_NAME} é uma empresa moçambicana, sediada em ${CONTACT.city}, dedicada a transformar ideias em projectos, marcas e resultados reais.`}
    />

    <Block number="§1" label="Quem somos" title="Uma empresa integrada e criativa." titleId="quem-somos">
      <div className="mt-5 max-w-3xl space-y-5 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
        <p>
          Actuamos de forma multidisciplinar através da arquitectura, da construção e do estúdio criativo, oferecendo
          soluções modernas, estratégicas e inovadoras para empresas, instituições, empreendedores e organizações.
        </p>
        <p>
          Apoiamos em especial pequenas e médias empresas, startups e organizações sociais: na gestão, na
          competitividade, no fortalecimento das marcas e na promoção do empreendedorismo, com uma abordagem centrada na
          inovação, na criatividade, na sustentabilidade e no impacto.
        </p>
        <dl className="pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Sede</dt>
            <dd className="mt-1 text-ink">{CONTACT.city}, {CONTACT.country}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Designação</dt>
            <dd className="mt-1 text-ink">{LEGAL_NAME}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">Liderança</dt>
            <dd className="mt-1 text-ink">{TEAM.lead.name}, {TEAM.lead.role}</dd>
          </div>
        </dl>
      </div>
    </Block>

    <Block number="§2" label="Missão e visão" title="Para onde vamos, e porquê." titleId="missao-visao">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-orange-ink">Missão</h3>
          <p className="mt-3 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">{MISSION}</p>
        </div>
        <div className="md:border-l md:border-line md:pl-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-3">Visão</h3>
          <p className="mt-3 text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">{VISION}</p>
        </div>
      </div>
    </Block>

    <Block number="§3" label="Pilares" title="Três pilares, uma só empresa." titleId="pilares">
      <ol className="mt-8 border-t border-line divide-y divide-line list-none">
        {PILLARS.map((pillar, index) => (
          <li key={pillar.title} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
            <span className="md:col-span-1 font-mono text-xs text-orange-ink tracking-wider" aria-hidden="true">0{index + 1}</span>
            <h3 className="md:col-span-4 font-display text-lg sm:text-xl font-bold text-ink tracking-tight">{pillar.title}</h3>
            <p className="md:col-span-7 text-base text-ink-2 font-light leading-relaxed text-pretty">{pillar.text}</p>
          </li>
        ))}
      </ol>
    </Block>

    <Block number="§4" label="Valores" title="O que nos guia." titleId="valores">
      <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3 list-none">
        {VALUES.map((value) => (
          <li key={value} className="px-4 py-2 border border-line text-sm sm:text-base text-ink font-medium">
            {value}
          </li>
        ))}
      </ul>
    </Block>

    <Block number="§5" label="Equipa" title="Quem faz a YELA." titleId="equipa">
      <div className="mt-8 border-t border-line">
        <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-line">
          <p className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-orange-ink pt-1">Direcção</p>
          <p className="md:col-span-8 text-base text-ink">
            <span className="font-semibold">{TEAM.lead.name}</span>
            <span className="text-ink-2"> · {TEAM.lead.role}</span>
          </p>
        </div>
        {TEAM.departments.map((dept) => (
          <div key={dept.name} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-line">
            <p className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 pt-1">{dept.name}</p>
            <ul className="md:col-span-8 space-y-1.5 list-none">
              {dept.members.map((member) => (
                <li key={member.name} className="text-base text-ink">
                  <span className="font-semibold">{member.name}</span>
                  <span className="text-ink-2"> · {member.role}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Block>

    <Block number="§6" label="Parceiros" title="Learn Code, parceira tecnológica." titleId="parceiros">
      <div className="mt-5 max-w-3xl space-y-5">
        <p className="text-base sm:text-lg text-ink-2 font-light leading-relaxed text-pretty">
          Startup tecnológica moçambicana, de Marracuene, que desenvolve websites, aplicações móveis, sistemas, APIs e
          soluções com inteligência artificial. Em parceria desde Setembro de 2026, a Learn Code concebe e executa as
          soluções digitais que a YELA leva aos seus clientes.
        </p>
        <a href="/parceria" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-orange-ink hover:text-navy underline underline-offset-4">
          Ver a parceria em detalhe
        </a>
      </div>
    </Block>

    <CtaBand title="Vamos conversar sobre o seu projecto?" text="Conte-nos o que precisa: um edifício, uma marca, uma campanha, um vídeo, um website ou uma formação." />
    <NextPage path="/sobre" />
  </Layout>
);
