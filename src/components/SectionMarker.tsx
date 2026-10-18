import React from 'react';

interface SectionMarkerProps {
  number: string;
  label: string;
  className?: string;
}

/** Numbered editorial marker that opens every section. */
export const SectionMarker: React.FC<SectionMarkerProps> = ({ number, label, className = '' }) => (
  <p className={`font-mono text-xs uppercase tracking-[0.2em] text-ink-3 ${className}`}>
    <span className="text-orange-ink">{number}</span>
    <span aria-hidden="true"> — </span>
    <span className="sr-only">, </span>
    {label}
  </p>
);
