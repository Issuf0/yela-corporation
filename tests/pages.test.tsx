// @vitest-environment jsdom
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../src/App';
import { PrivacyPage } from '../src/components/PrivacyPage';

afterEach(cleanup);

function headingLevels(container: HTMLElement): number[] {
  return Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((h) => Number(h.tagName[1]));
}

describe('page structure and accessibility basics', () => {
  it('homepage has one h1, a sane heading sequence, landmarks and a skip link', () => {
    const { container } = render(<App />);
    const levels = headingLevels(container);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1); // no skipped levels going down
    }
    expect(container.querySelector('main#conteudo')).toBeTruthy();
    expect(container.querySelector('header')).toBeTruthy();
    expect(container.querySelector('footer')).toBeTruthy();
    const skip = container.querySelector('a[href="#conteudo"]');
    expect(skip?.textContent).toMatch(/saltar para o conteúdo/i);
  });

  it('every navigation anchor on the homepage points to an existing section', () => {
    const { container } = render(<App />);
    const targets = Array.from(container.querySelectorAll('a[href^="#"]')).map((a) => a.getAttribute('href')!.slice(1));
    expect(targets.length).toBeGreaterThan(5);
    for (const id of new Set(targets)) {
      expect(container.querySelector(`#${CSS.escape(id)}`), `missing #${id}`).toBeTruthy();
    }
  });

  it('every form control has an associated label and every image/svg is labelled or decorative', () => {
    const { container } = render(<App />);
    for (const control of Array.from(container.querySelectorAll('input, select, textarea'))) {
      const id = control.getAttribute('id');
      expect(id, 'control without id').toBeTruthy();
      expect(container.querySelector(`label[for="${id}"]`), `no label for #${id}`).toBeTruthy();
    }
    for (const svg of Array.from(container.querySelectorAll('svg'))) {
      const decorative = svg.getAttribute('aria-hidden') === 'true';
      const labelled = svg.getAttribute('role') === 'img' && svg.querySelector('title');
      expect(decorative || Boolean(labelled)).toBe(true);
    }
  });

  it('mobile menu button exposes expanded state and controls the drawer', () => {
    const { container } = render(<App />);
    const button = within(container.querySelector('header')!).getByRole('button', { name: /abrir menu/i });
    expect(button.getAttribute('aria-expanded')).toBe('false');
    const drawerId = button.getAttribute('aria-controls')!;
    const drawer = container.querySelector(`[id="${drawerId}"]`)!;
    expect(drawer.hasAttribute('hidden')).toBe(true);
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.getAttribute('aria-label')).toMatch(/fechar menu/i);
    expect(drawer.hasAttribute('hidden')).toBe(false);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(drawer.hasAttribute('hidden')).toBe(true);
  });

  it('privacy page has its own h1 and links back to the homepage sections', () => {
    const { container } = render(<PrivacyPage />);
    expect(headingLevels(container)[0]).toBe(1);
    expect(container.querySelector('h1')?.textContent).toMatch(/política de privacidade/i);
    expect(container.querySelector('a[href="/#contacto"]')).toBeTruthy();
    expect(container.textContent).toContain('yelacorp.info@gmail.com');
    expect(container.textContent).not.toMatch(/resend/i);
  });
});
