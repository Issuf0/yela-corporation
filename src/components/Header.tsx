import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { NAV_PAGES } from '../config/nav';
import { CONTACT, whatsappHref } from '../config/site';
import { Wordmark } from './Logo';

interface HeaderProps {
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Estado ao fazer scroll: sombra, altura compacta e barra de progresso. O cabeçalho fica sempre fixo.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty('--progress', String(max > 0 ? Math.min(1, y / max) : 0));
      setIsScrolled(y > 20);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Menu móvel: Escape fecha e devolve o foco, bloqueia o scroll da página, fecha no desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const media = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 1024px)') : null;
    const onResize = () => {
      if (media?.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    media?.addEventListener('change', onResize);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      media?.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const isCurrent = (path: string) => path === currentPath;
  const solid = isScrolled || menuOpen;
  // No desktop, «Contacto» é o botão de acção; não se repete como ligação.
  const desktopLinks = NAV_PAGES.filter((page) => page.path !== '/contacto');
  const ctaClass =
    'group inline-flex items-center justify-center gap-2.5 min-h-11 px-5 text-xs font-semibold tracking-[0.14em] uppercase text-white bg-navy hover:bg-navy-soft transition-colors whitespace-nowrap press';
  const ctaDesktopClass =
    'group inline-flex items-center gap-2.5 min-h-10 px-4 text-[11px] font-semibold tracking-[0.18em] uppercase text-ink border border-ink/70 hover:bg-navy hover:border-navy hover:text-white transition-colors whitespace-nowrap press';

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Saltar para o conteúdo
      </a>

      <header
        ref={headerRef}
        className={`site-header fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow] duration-300 ease-out border-b ${
          solid ? 'bg-paper/92 backdrop-blur-md border-line shadow-[0_6px_24px_-18px_rgba(15,36,57,0.35)]' : 'bg-paper border-line'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-6 transition-[padding] duration-300 ${
            isScrolled ? 'py-3' : 'py-4 md:py-5'
          }`}
        >
          <a
            href="/"
            className="shrink-0 rounded-sm transition-opacity hover:opacity-80"
            aria-label="YELA Corporation — página inicial"
            aria-current={isCurrent('/') ? 'page' : undefined}
          >
            <Wordmark />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-4 xl:gap-7 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.1em] xl:tracking-[0.16em] text-ink-2"
          >
            {desktopLinks.map((page, index) => (
              <React.Fragment key={page.path}>
                {index > 0 && (
                  <span className="hidden xl:inline text-ink-3/50" aria-hidden="true">
                    ·
                  </span>
                )}
                <a
                  href={page.path}
                  aria-current={isCurrent(page.path) ? 'page' : undefined}
                  className={`link-underline py-2 -my-2 rounded-sm whitespace-nowrap transition-colors hover:text-ink ${
                    isCurrent(page.path) ? 'text-ink' : ''
                  }`}
                >
                  {page.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <div className="hidden lg:flex items-center shrink-0">
            <a href="/contacto" aria-current={isCurrent('/contacto') ? 'page' : undefined} className={ctaDesktopClass}>
              Fale connosco
              <ArrowRight
                className="w-3.5 h-3.5 text-orange-ink group-hover:text-orange motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="menu-toggle lg:hidden relative inline-flex items-center justify-center h-11 w-11 -mr-2 text-ink hover:text-orange-ink rounded-sm"
            data-open={menuOpen ? 'true' : undefined}
          >
            <span aria-hidden="true" className="menu-toggle__line" />
            <span aria-hidden="true" className="menu-toggle__line" />
          </button>
        </div>

        {/* Barra de progresso de leitura. */}
        <span aria-hidden="true" className={`header-progress ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div
          id={drawerId}
          hidden={!menuOpen}
          className="lg:hidden animate-drawer bg-paper border-t border-line-soft max-h-[calc(100dvh-4.25rem)] overflow-y-auto"
        >
          <nav aria-label="Navegação principal (móvel)" className="px-5 pt-4 pb-8">
            <ol className="list-none">
              {[{ path: '/', label: 'Início' }, ...NAV_PAGES].map((page, index) => (
                <li key={page.path} className="drawer-item" style={{ ['--drawer-i' as string]: index }}>
                  <a
                    href={page.path}
                    aria-current={isCurrent(page.path) ? 'page' : undefined}
                    className={`group flex items-baseline gap-4 py-4 border-b border-line-soft transition-colors ${
                      isCurrent(page.path) ? 'text-orange-ink' : 'text-ink hover:text-orange-ink'
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-wider text-orange-ink w-5" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-tight">{page.label}</span>
                    <ArrowRight
                      className="ml-auto self-center w-4 h-4 text-orange opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>

            <a href="/contacto" className={`${ctaClass} mt-6 w-full min-h-12`}>
              Fale connosco
              <ArrowRight className="w-3.5 h-3.5 text-orange" aria-hidden="true" />
            </a>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 min-h-11 border border-line text-ink hover:border-ink transition-colors press"
              >
                <MessageCircle className="w-4 h-4 text-orange-ink" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center justify-center gap-2 min-h-11 border border-line text-ink hover:border-ink transition-colors press"
              >
                <Mail className="w-4 h-4 text-orange-ink" aria-hidden="true" />
                Email
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
