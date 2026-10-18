import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  /** Caminho da página actual (ex.: "/sobre"), para realçar a navegação. */
  path: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ path, children }) => (
  <div className="min-h-dvh flex flex-col bg-paper text-ink">
    <Header currentPath={path} />
    <main id="conteudo" className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

/** Contentor horizontal padrão. */
export const Container: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);
