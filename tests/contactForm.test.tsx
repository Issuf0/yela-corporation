// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '../src/components/ContactForm';
import * as openLink from '../src/lib/openLink';

const open = vi.spyOn(openLink, 'openChannel');

beforeEach(() => {
  open.mockReset();
  open.mockImplementation(() => {});
});
afterEach(cleanup);

function fill(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillValid() {
  fill(/nome completo/i, '  Maria   Silva ');
  fill(/^email/i, 'Maria@Example.com');
  fill(/telefone/i, '+258 84 000 0000');
  fireEvent.change(screen.getByLabelText(/assunto/i), { target: { value: 'digital' } });
  fill(/mensagem/i, 'Precisamos de um sistema de gestão para a nossa clínica.');
}

describe('ContactForm — visitor journey', () => {
  it('shows Portuguese errors, focuses the first invalid field and opens nothing', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    expect(screen.getByText('Indique o seu nome completo.')).toBeTruthy();
    expect(screen.getByText('Indique o seu endereço de email.')).toBeTruthy();
    expect(screen.getByText('Seleccione o assunto do seu contacto.')).toBeTruthy();
    expect(screen.getByText('Escreva a sua mensagem.')).toBeTruthy();

    const name = screen.getByLabelText(/nome completo/i);
    expect(name.getAttribute('aria-invalid')).toBe('true');
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute('aria-describedby')).toBe(screen.getByText('Indique o seu nome completo.').id);
    expect(open).not.toHaveBeenCalled();
  });

  it('clears a field error as soon as the visitor edits that field and counts message characters', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /enviar por email/i }));
    fill(/nome completo/i, 'Maria Silva');
    expect(screen.queryByText('Indique o seu nome completo.')).toBeNull();
    expect(screen.getByText('Indique o seu endereço de email.')).toBeTruthy();
    fill(/mensagem/i, 'Olá');
    expect(screen.getByText('3 / 3000')).toBeTruthy();
  });

  it('opens WhatsApp with the normalised message and shows the confirmation with the email alternative', () => {
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    expect(open).toHaveBeenCalledTimes(1);
    const [href, channel] = open.mock.calls[0]!;
    expect(channel).toBe('whatsapp');
    expect(href.startsWith('https://wa.me/258845306215?text=')).toBe(true);
    const text = decodeURIComponent(href.split('text=')[1] ?? '');
    expect(text).toContain('*Nome:* Maria Silva');
    expect(text).toContain('*Email:* maria@example.com');
    expect(text).toContain('*Assunto:* Soluções Digitais (com a Learn Code)');
    expect(text).toContain('Precisamos de um sistema de gestão');

    expect(screen.getByRole('heading', { name: /mensagem aberta no whatsapp/i })).toBeTruthy();
    const alt = screen.getByRole('link', { name: /enviar por email/i });
    expect(alt.getAttribute('href')?.startsWith('mailto:yelacorp.info@gmail.com?')).toBe(true);
    expect(decodeURIComponent(alt.getAttribute('href') ?? '')).not.toContain('*Nome:*');
  });

  it('opens the email client with subject and body', () => {
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /enviar por email/i }));

    const [href, channel] = open.mock.calls[0]!;
    expect(channel).toBe('email');
    expect(decodeURIComponent(href)).toContain('subject=Contacto via website — Soluções Digitais');
    expect(decodeURIComponent(href)).toContain('Nome: Maria Silva');
    expect(screen.getByRole('heading', { name: /mensagem aberta no seu email/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /enviar pelo whatsapp/i }).getAttribute('target')).toBe('_blank');
  });

  it('keeps the data when going back and clears it on "Nova mensagem"', () => {
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));

    fireEvent.click(screen.getByRole('button', { name: /voltar ao formulário/i }));
    expect((screen.getByLabelText(/nome completo/i) as HTMLInputElement).value).toBe('  Maria   Silva ');
    expect((screen.getByLabelText(/mensagem/i) as HTMLTextAreaElement).value).toContain('clínica');

    fireEvent.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }));
    fireEvent.click(screen.getByRole('button', { name: /nova mensagem/i }));
    expect((screen.getByLabelText(/nome completo/i) as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/assunto/i) as HTMLSelectElement).value).toBe('');
  });

  it('honours the preselected subject, including legacy values', () => {
    render(<ContactForm initialSubject="arquitectura" />);
    expect((screen.getByLabelText(/assunto/i) as HTMLSelectElement).value).toBe('arquitectura');
    cleanup();
    render(<ContactForm initialSubject="tecnologia" />);
    expect((screen.getByLabelText(/assunto/i) as HTMLSelectElement).value).toBe('digital');
  });
});
