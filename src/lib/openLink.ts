/** Abre a ligação do canal escolhido. Isolado para ser substituível em testes. */
export function openChannel(href: string, channel: 'whatsapp' | 'email'): void {
  if (channel === 'whatsapp') {
    window.open(href, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = href;
  }
}
