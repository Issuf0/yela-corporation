// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ContactForm } from '../src/components/ContactForm';

afterEach(cleanup);

function fill(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

describe('ContactForm — visitor journey', () => {
  it('shows Portuguese errors, focuses the first invalid field and sends nothing', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /preparar mensagem/i }));

    expect(screen.getByText('Indique o seu nome completo.')).toBeTruthy();
    expect(screen.getByText('Indique o seu endereço de email.')).toBeTruthy();
    expect(screen.getByText('Seleccione o assunto do seu contacto.')).toBeTruthy();
    expect(screen.getByText('Escreva a sua mensagem.')).toBeTruthy();

    const name = screen.getByLabelText(/nome completo/i);
    expect(name.getAttribute('aria-invalid')).toBe('true');
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute('aria-describedby')).toBe(screen.getByText('Indique o seu nome completo.').id);
    expect(screen.queryByRole('link', { name: /whatsapp/i })).toBeNull();
  });

  it('clears a field error as soon as the visitor edits that field', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /preparar mensagem/i }));
    fill(/nome completo/i, 'Maria Silva');
    expect(screen.queryByText('Indique o seu nome completo.')).toBeNull();
    expect(screen.getByText('Indique o seu endereço de email.')).toBeTruthy();
  });

  it('prepares WhatsApp and email links with the normalised message and keeps the data when editing', () => {
    render(<ContactForm />);
    fill(/nome completo/i, '  Maria   Silva ');
    fill(/^email/i, 'Maria@Example.com');
    fill(/telefone/i, '+258 84 000 0000');
    fireEvent.change(screen.getByLabelText(/assunto/i), { target: { value: 'tecnologia' } });
    fill(/mensagem/i, 'Precisamos de um sistema de gestão para a nossa clínica.');
    fireEvent.click(screen.getByRole('button', { name: /preparar mensagem/i }));

    expect(screen.getByRole('heading', { name: /escolha como enviar/i })).toBeTruthy();
    expect(screen.getByText('Maria Silva')).toBeTruthy();

    const whatsapp = screen.getByRole('link', { name: /enviar pelo whatsapp/i });
    const href = whatsapp.getAttribute('href') ?? '';
    expect(href.startsWith('https://wa.me/258845306215?text=')).toBe(true);
    const text = decodeURIComponent(href.split('text=')[1] ?? '');
    expect(text).toContain('*Nome:* Maria Silva');
    expect(text).toContain('*Email:* maria@example.com');
    expect(text).toContain('*Assunto:* Soluções tecnológicas (parceria Learn Code)');
    expect(text).toContain('Precisamos de um sistema de gestão');
    expect(whatsapp.getAttribute('target')).toBe('_blank');
    expect(whatsapp.getAttribute('rel')).toContain('noopener');

    const email = screen.getByRole('link', { name: /enviar por email/i });
    const mailto = email.getAttribute('href') ?? '';
    expect(mailto.startsWith('mailto:yelacorp.info@gmail.com?')).toBe(true);
    expect(decodeURIComponent(mailto)).toContain('subject=Contacto via website — Soluções tecnológicas');
    expect(decodeURIComponent(mailto)).not.toContain('*Nome:*');

    fireEvent.click(screen.getByRole('button', { name: /editar mensagem/i }));
    expect((screen.getByLabelText(/nome completo/i) as HTMLInputElement).value).toBe('  Maria   Silva ');
    expect((screen.getByLabelText(/mensagem/i) as HTMLTextAreaElement).value).toContain('clínica');
  });

  it('confirms the chosen channel and offers the alternative, then resets', () => {
    render(<ContactForm />);
    fill(/nome completo/i, 'Maria Silva');
    fill(/^email/i, 'maria@example.com');
    fireEvent.change(screen.getByLabelText(/assunto/i), { target: { value: 'arquitectura' } });
    fill(/mensagem/i, 'Queremos renovar a fachada do nosso edifício.');
    fireEvent.click(screen.getByRole('button', { name: /preparar mensagem/i }));

    const whatsapp = screen.getByRole('link', { name: /enviar pelo whatsapp/i });
    whatsapp.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(whatsapp);

    expect(screen.getByRole('heading', { name: /mensagem preparada/i })).toBeTruthy();
    expect(screen.getByText(/abriu no whatsapp da yela corporation/i)).toBeTruthy();
    expect(screen.getByRole('link', { name: /enviar por email/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /nova mensagem/i }));
    expect((screen.getByLabelText(/nome completo/i) as HTMLInputElement).value).toBe('');
  });
});
