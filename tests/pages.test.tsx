// @vitest-environment jsdom
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { NAV_PAGES, PAGES, nextPage, normalisePath } from '../src/config/nav';
import { PARTNERS } from '../src/config/site';
import { ActuacaoPage } from '../src/pages/ActuacaoPage';
import { ContactoPage } from '../src/pages/ContactoPage';
import { HomePage } from '../src/pages/HomePage';
import { ParceriaPage } from '../src/pages/ParceriaPage';
import { ParceriasPage } from '../src/pages/ParceriasPage';
import { PrivacidadePage } from '../src/pages/PrivacidadePage';
import { SobrePage } from '../src/pages/SobrePage';

afterEach(cleanup);

const ALL_PAGES = [
  { path: '/', element: <HomePage /> },
  { path: '/sobre', element: <SobrePage /> },
  { path: '/actuacao', element: <ActuacaoPage /> },
  { path: '/parceria', element: <ParceriaPage /> },
  { path: '/parcerias', element: <ParceriasPage /> },
  { path: '/contacto', element: <ContactoPage /> },
  { path: '/privacidade', element: <PrivacidadePage /> },
];

function headingLevels(container: HTMLElement): number[] {
  return Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((h) => Number(h.tagName[1]));
}

const KNOWN_PATHS = new Set(PAGES.map((p) => p.path));

describe.each(ALL_PAGES)('page $path', ({ path, element }) => {
  it('has exactly one h1, no skipped heading levels, landmarks and a skip link', () => {
    const { container } = render(element);
    const levels = headingLevels(container);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
    expect(container.querySelector('main#conteudo')).toBeTruthy();
    expect(container.querySelector('header')).toBeTruthy();
    expect(container.querySelector('footer')).toBeTruthy();
    expect(container.querySelector('a[href="#conteudo"]')?.textContent).toMatch(/saltar para o conteúdo/i);
  });

  it('marks the current page in the navigation and links only to existing pages/anchors', () => {
    const { container } = render(element);
    const current = Array.from(container.querySelectorAll('header a[aria-current="page"]'));
    if (NAV_PAGES.some((p) => p.path === path) || path === '/') expect(current.length).toBeGreaterThan(0);
    for (const a of current) expect(a.getAttribute('href')).toBe(path);

    for (const a of Array.from(container.querySelectorAll('a[href]'))) {
      const href = a.getAttribute('href')!;
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const [pathPart, hash] = href.split('#');
      const target = pathPart?.split('?')[0] || '';
      if (target) expect(KNOWN_PATHS.has(target), `unknown page ${href}`).toBe(true);
      if (hash && !target) expect(container.querySelector(`#${CSS.escape(hash)}`), `missing #${hash}`).toBeTruthy();
    }
  });

  it('labels every form control and marks every svg as decorative or labelled', () => {
    const { container } = render(element);
    for (const control of Array.from(container.querySelectorAll('input, select, textarea'))) {
      const id = control.getAttribute('id');
      expect(id).toBeTruthy();
      expect(container.querySelector(`label[for="${id}"]`), `no label for #${id}`).toBeTruthy();
    }
    for (const svg of Array.from(container.querySelectorAll('svg'))) {
      const decorative = svg.getAttribute('aria-hidden') === 'true';
      const labelled = svg.getAttribute('role') === 'img' && svg.querySelector('title');
      expect(decorative || Boolean(labelled)).toBe(true);
    }
  });
});

describe('navigation config', () => {
  it('orders the editorial "next" links and normalises paths', () => {
    expect(nextPage('/')?.path).toBe('/sobre');
    expect(nextPage('/sobre')?.path).toBe('/actuacao');
    expect(nextPage('/parceria')?.path).toBe('/parcerias');
    expect(nextPage('/parcerias')?.path).toBe('/contacto');
    expect(nextPage('/contacto')).toBeUndefined();
    expect(normalisePath('/sobre.html')).toBe('/sobre');
    expect(normalisePath('/index.html')).toBe('/');
    expect(normalisePath('/parceria/')).toBe('/parceria');
  });

  it('mobile menu button exposes expanded state, opens the drawer and closes on Escape', () => {
    const { container } = render(<HomePage />);
    const button = within(container.querySelector('header')!).getByRole('button', { name: /abrir menu/i });
    expect(button.getAttribute('aria-expanded')).toBe('false');
    const drawer = container.querySelector(`[id="${button.getAttribute('aria-controls')}"]`)!;
    expect(drawer.hasAttribute('hidden')).toBe(true);
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(drawer.hasAttribute('hidden')).toBe(false);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(drawer.hasAttribute('hidden')).toBe(true);
  });

  it('contact page preselects the subject from ?assunto=', () => {
    window.history.replaceState({}, '', '/contacto?assunto=digital');
    const { container } = render(<ContactoPage />);
    expect((container.querySelector('select[name="subject"]') as HTMLSelectElement).value).toBe('digital');
    window.history.replaceState({}, '', '/contacto?assunto=invalido');
    cleanup();
    const second = render(<ContactoPage />);
    expect((second.container.querySelector('select[name="subject"]') as HTMLSelectElement).value).toBe('');
    window.history.replaceState({}, '', '/');
  });

  it('partners page lists every configured partner with an external link', () => {
    const { container } = render(<ParceriasPage />);
    for (const partner of PARTNERS) {
      expect(container.textContent).toContain(partner.name);
      const link = container.querySelector(`a[href="${partner.url}"]`);
      expect(link, `missing link for ${partner.name}`).toBeTruthy();
      expect(link!.getAttribute('rel')).toContain('noopener');
    }
    expect(container.querySelector('a[href="https://www.facebook.com/oholopodcast"]')).toBeTruthy();
    expect(container.querySelector('a[href="https://learn-code-ruddy.vercel.app/"]')).toBeTruthy();
  });

  it('header, contact page and footer link to Instagram and Facebook with an icon', () => {
    const { container } = render(<ContactoPage />);
    for (const url of ['https://www.instagram.com/yela_corporation', 'https://www.facebook.com/yelacorporation']) {
      const links = Array.from(container.querySelectorAll(`a[href="${url}"]`));
      expect(links.length, `missing link ${url}`).toBe(3); // cabeçalho, página de contacto e rodapé
      for (const link of links) {
        expect(link.querySelector('svg[aria-hidden="true"]')).toBeTruthy();
        expect(link.getAttribute('rel')).toContain('noopener');
      }
    }
    expect(container.querySelector('footer a[aria-label="Instagram da YELA Corporation"]')).toBeTruthy();
  });

  it('privacy page mentions the real channels and never a mail provider', () => {
    const { container } = render(<PrivacidadePage />);
    expect(container.textContent).toContain('yelacorp.info@gmail.com');
    expect(container.textContent).toContain('+258 84 530 6215');
    expect(container.textContent).not.toMatch(/resend/i);
  });
});

describe('header behaviour', () => {
  it('shows Contacto as the call to action on desktop (not twice) and marks it current on /contacto', () => {
    const { container } = render(<ContactoPage />);
    const desktopNav = container.querySelector('nav[aria-label="Navegação principal"]')!;
    expect(desktopNav.querySelector('a[href="/contacto"]')).toBeNull();
    const cta = Array.from(container.querySelectorAll('header a[href="/contacto"]')).find((a) => a.textContent?.includes('Fale connosco'))!;
    expect(cta.getAttribute('aria-current')).toBe('page');
  });

  it('locks page scroll while the mobile menu is open and returns focus to the button on Escape', () => {
    const { container } = render(<HomePage />);
    const button = within(container.querySelector('header')!).getByRole('button', { name: /abrir menu/i });
    fireEvent.click(button);
    expect(document.documentElement.style.overflow).toBe('hidden');
    const drawer = container.querySelector(`[id="${button.getAttribute('aria-controls')}"]`)!;
    expect(drawer.querySelector('a[href^="https://wa.me/"]')).toBeTruthy();
    expect(drawer.querySelector('a[href^="mailto:"]')).toBeTruthy();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(document.documentElement.style.overflow).toBe('');
    expect(document.activeElement).toBe(button);
  });
});
