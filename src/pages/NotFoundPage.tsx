import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Container, Layout } from '../components/Layout';
import { SectionMarker } from '../components/SectionMarker';
import { NAV_PAGES } from '../config/nav';

export const NotFoundPage: React.FC = () => (
  <Layout path="/404">
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44" aria-labelledby="page-title">
      <Container>
        <SectionMarker number="404" label="Página não encontrada" className="mb-6 sm:mb-8" />
        <h1 id="page-title" className="font-display text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-ink text-balance max-w-3xl">
          Esta página não existe.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-ink-2 font-light leading-relaxed max-w-2xl text-pretty">
          O endereço pode estar incorrecto ou a página foi movida. Pode continuar por aqui:
        </p>
        <ul className="mt-10 max-w-md border-t border-line divide-y divide-line list-none">
          {[{ path: '/', label: 'Início' }, ...NAV_PAGES].map((page) => (
            <li key={page.path}>
              <a href={page.path} className="group flex items-center justify-between gap-4 py-4 text-ink hover:text-orange-ink transition-colors">
                <span className="font-display text-lg font-semibold">{page.label}</span>
                <ArrowRight className="w-4 h-4 text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  </Layout>
);
