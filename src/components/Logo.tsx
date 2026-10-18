import React from 'react';

interface MonogramProps {
  className?: string;
  title?: string;
}

/**
 * Geometric SVG redraw of the YELA "Y" monogram: navy chevron + stem, orange
 * right arm and soft-orange lower panel. Colours sampled from the official
 * logo. Pending formal approval by YELA Corporation.
 */
export const Monogram: React.FC<MonogramProps> = ({ className = '', title }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    focusable="false"
  >
    {title ? <title>{title}</title> : null}
    <polygon points="16,10 34,10 64,40 64,84 50,96 50,44" fill="var(--color-navy, #0f2439)" />
    <polygon points="68,10 86,10 61.5,34.5 52.5,25.5" fill="var(--color-orange, #e78a22)" />
    <polygon points="34,31 48,45 48,84 34,70" fill="var(--color-orange-soft, #e6a34c)" />
  </svg>
);

interface WordmarkProps {
  className?: string;
  /** Size of the wordmark text; the monogram scales with it. */
  size?: 'sm' | 'md';
}

/** Monogram + tracked wordmark, used in the header and footer. */
export const Wordmark: React.FC<WordmarkProps> = ({ className = '', size = 'sm' }) => {
  const markClass = size === 'md' ? 'h-9 w-9' : 'h-7 w-7';
  const textClass = size === 'md' ? 'text-sm' : 'text-xs';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram className={`${markClass} shrink-0`} />
      <span className={`${textClass} font-bold uppercase tracking-[0.22em] text-ink whitespace-nowrap`}>
        YELA Corporation
      </span>
    </span>
  );
};
