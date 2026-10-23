import React from 'react';
import { Container, riseStyle } from './Layout';
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
      <div className="rise" style={riseStyle(0)}>
        <SectionMarker number={number} label={label} className="mb-6 sm:mb-8" />
      </div>
      <div className="max-w-4xl">
        <h1
          id="page-title"
          style={riseStyle(1)}
          className="rise font-display text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {title}
        </h1>
        {lede && <p style={riseStyle(2)} className="rise mt-6 text-lg sm:text-xl text-ink-2 font-light leading-relaxed max-w-2xl text-pretty">{lede}</p>}
        {children && (
          <div className="rise" style={riseStyle(3)}>
            {children}
          </div>
        )}
      </div>
    </Container>
  </section>
);
