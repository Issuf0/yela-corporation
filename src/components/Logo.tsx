import React from 'react';
import monogramUrl from '../assets/brand/yela-monogram.png';

/** Proporção do monograma oficial (largura / altura), para reservar espaço e evitar saltos. */
const MONOGRAM_RATIO = 226 / 192;

interface MonogramProps {
  className?: string;
  /** Altura em píxeis CSS; a largura segue a proporção oficial. */
  size?: number;
  /** Texto alternativo; vazio quando o monograma é decorativo (acompanhado do nome). */
  alt?: string;
}

/** Monograma «Y» oficial da YELA Corporation (assets/Logo … Prancheta 1.png). */
export const Monogram: React.FC<MonogramProps> = ({ className = '', size = 28, alt = '' }) => (
  <img
    src={monogramUrl}
    alt={alt}
    width={Math.round(size * MONOGRAM_RATIO)}
    height={size}
    decoding="async"
    draggable={false}
    className={`select-none ${className}`}
  />
);

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md';
}

/** Monograma oficial + nome, usado no cabeçalho. */
export const Wordmark: React.FC<WordmarkProps> = ({ className = '', size = 'sm' }) => {
  const markSize = size === 'md' ? 36 : 30;
  const textClass = size === 'md' ? 'text-sm' : 'text-xs';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram size={markSize} className="shrink-0" />
      <span className={`${textClass} font-bold uppercase tracking-[0.22em] text-ink whitespace-nowrap`}>
        YELA Corporation
      </span>
    </span>
  );
};
