import { Menu, X } from 'lucide-react';
import React, { useEffect, useId, useState } from 'react';
import { NAV_PAGES } from '../config/nav';
import { Wordmark } from './Logo';

interface HeaderProps {
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    // Close the drawer when the viewport grows to the desktop layout.
    const media = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 768px)') : null;
    const onResize = () => {
      if (media?.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    media?.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      media?.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const isCurrent = (path: string) => path === currentPath;
  const ctaClass =
    'inline-flex items-center justify-center min-h-11 px-5 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors whitespace-nowrap';

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Saltar para o conteúdo
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,padding,box-shadow] duration-300 ${
          isScrolled || menuOpen
            ? 'bg-paper/92 backdrop-blur-md border-b border-line py-3 shadow-[0_2px_12px_rgba(15,36,57,0.03)]'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
          <a href="/" className="shrink-0 rounded-sm" aria-label="YELA Corporation — página inicial" aria-current={isCurrent('/') ? 'page' : undefined}>
            <Wordmark />
          </a>

          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-ink-2">
            {NAV_PAGES.map((page) => (
              <a
                key={page.path}
                href={page.path}
                aria-current={isCurrent(page.path) ? 'page' : undefined}
                className={`relative py-2 -my-2 rounded-sm whitespace-nowrap transition-colors hover:text-ink ${
                  isCurrent(page.path)
                    ? 'text-ink after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-orange'
                    : ''
                }`}
              >
                {page.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center shrink-0">
            <a href="/contacto" className={ctaClass}>
              Fale connosco
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-ink hover:text-orange-ink rounded-sm"
          >
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>

        <div id={drawerId} hidden={!menuOpen} className="md:hidden bg-paper border-t border-line-soft px-5 pt-2 pb-6">
          <nav aria-label="Navegação principal (móvel)" className="flex flex-col text-base font-medium text-ink">
            <a href="/" aria-current={isCurrent('/') ? 'page' : undefined} className="py-3.5 border-b border-line-soft hover:text-orange-ink">
              Início
            </a>
            {NAV_PAGES.map((page) => (
              <a
                key={page.path}
                href={page.path}
                aria-current={isCurrent(page.path) ? 'page' : undefined}
                className={`py-3.5 border-b border-line-soft hover:text-orange-ink ${isCurrent(page.path) ? 'text-orange-ink' : ''}`}
              >
                {page.label}
              </a>
            ))}
            <a href="/contacto" className={`${ctaClass} mt-5 w-full`}>
              Fale connosco
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};
