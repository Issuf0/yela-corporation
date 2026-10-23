// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { initReveal } from '../src/lib/reveal';

function buildMain(): HTMLElement {
  document.body.innerHTML = `
    <main>
      <section><div><h1>Hero</h1></div></section>
      <section><div><div id="a">A</div><div id="b">B</div></div></section>
      <section><div><ol id="list"><li>1</li><li>2</li><li>3</li></ol><ul id="short"><li>x</li><li>y</li></ul></div></section>
    </main>`;
  return document.querySelector('main')!;
}

type Callback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('initReveal', () => {
  it('does nothing without IntersectionObserver', () => {
    const main = buildMain();
    initReveal(main);
    expect(main.querySelectorAll('.reveal')).toHaveLength(0);
  });

  it('does nothing when the visitor prefers reduced motion', () => {
    vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} });
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce') }));
    window.matchMedia = ((q: string) => ({ matches: q.includes('reduce') })) as typeof window.matchMedia;
    const main = buildMain();
    initReveal(main);
    expect(main.querySelectorAll('.reveal')).toHaveLength(0);
  });

  it('marks columns and long-list items (not the first section), staggers them and reveals on intersection', () => {
    window.matchMedia = (() => ({ matches: false })) as unknown as typeof window.matchMedia;
    let callback: Callback = () => {};
    const observed: Element[] = [];
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: Callback) {
          callback = cb;
        }
        observe(el: Element) {
          observed.push(el);
        }
        unobserve() {}
        disconnect() {}
      },
    );
    const main = buildMain();
    const cleanup = initReveal(main);

    expect(main.querySelector('h1')!.closest('.reveal')).toBeNull();
    expect(document.getElementById('a')!.classList.contains('reveal')).toBe(true);
    expect((document.getElementById('b') as HTMLElement).style.getPropertyValue('--reveal-i')).toBe('1');
    expect(document.querySelectorAll('#list > li.reveal')).toHaveLength(3);
    expect(document.querySelectorAll('#short > li.reveal')).toHaveLength(0);

    const a = document.getElementById('a')!;
    callback([{ isIntersecting: true, target: a }]);
    expect(a.classList.contains('is-visible')).toBe(true);

    cleanup();
    expect(main.querySelectorAll('.reveal')).toHaveLength(0);
  });
});
