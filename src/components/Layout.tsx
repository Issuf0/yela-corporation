import React, { useEffect, useRef } from 'react';
import { initReveal } from '../lib/reveal';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  /** Caminho da página actual (ex.: "/sobre"), para realçar a navegação. */
  path: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ path, children }) => {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => initReveal(mainRef.current), []);

  return (
    <div className="min-h-dvh flex flex-col bg-paper text-ink">
      <Header currentPath={path} />
      <main ref={mainRef} id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

/** Estilo de escalonamento para a animação de entrada (`.rise`). */
export const riseStyle = (index: number): React.CSSProperties => ({ ['--rise-i' as string]: index });

/** Contentor horizontal padrão. */
export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);
