import React from 'react';
import { Container } from './Layout';
import { SectionMarker } from './SectionMarker';

interface PageHeroProps {
  number: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}

/** Cabeçalho editorial de cada página interior: marcador, título, frase de apoio. */
export const PageHero: React.FC<PageHeroProps> = ({ number, label, title, lede, children }) => (
  <section className="pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24" aria-labelledby="page-title">
    <Container>
      <SectionMarker number={number} label={label} className="mb-6 sm:mb-8" />
      <div className="max-w-4xl">
        <h1
          id="page-title"
          className="font-display text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {title}
        </h1>
        {lede && <p className="mt-6 text-lg sm:text-xl text-ink-2 font-light leading-relaxed max-w-2xl text-pretty">{lede}</p>}
        {children}
      </div>
    </Container>
  </section>
);
