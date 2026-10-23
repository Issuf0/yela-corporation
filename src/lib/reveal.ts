/**
 * Revelação discreta ao fazer scroll.
 *
 * Marca automaticamente, dentro de <main>, as colunas de cada secção (excepto a
 * primeira, que tem a sua própria animação de entrada) e os itens de listas com
 * três ou mais elementos, com um pequeno escalonamento. Nada é escondido quando:
 * - o visitante pede «reduzir movimento» no sistema;
 * - o browser não suporta IntersectionObserver (e nos testes em jsdom).
 */

const MAX_STAGGER = 6;

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function collectTargets(main: HTMLElement): HTMLElement[] {
  const targets: HTMLElement[] = [];
  const sections = Array.from(main.querySelectorAll<HTMLElement>(':scope > section, :scope > nav')).slice(1);

  for (const section of sections) {
    // Colunas do contentor principal da secção.
    const container = section.firstElementChild as HTMLElement | null;
    const columns = container ? (Array.from(container.children) as HTMLElement[]) : [];
    columns.forEach((column, index) => targets.push(withStagger(column, index)));

    // Itens de listas editoriais.
    for (const list of Array.from(section.querySelectorAll<HTMLElement>('ol, ul'))) {
      const items = Array.from(list.children).filter((child): child is HTMLElement => child.tagName === 'LI');
      if (items.length < 3) continue;
      items.forEach((item, index) => targets.push(withStagger(item, index)));
    }
  }
  return targets;
}

function withStagger(element: HTMLElement, index: number): HTMLElement {
  element.style.setProperty('--reveal-i', String(Math.min(index, MAX_STAGGER)));
  return element;
}

/** Activa a revelação nos elementos de <main>. Devolve uma função de limpeza. */
export function initReveal(main: HTMLElement | null): () => void {
  if (!main || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  const targets = collectTargets(main);
  for (const target of targets) {
    target.classList.add('reveal');
    observer.observe(target);
  }

  return () => {
    observer.disconnect();
    for (const target of targets) target.classList.remove('reveal', 'is-visible');
  };
}
