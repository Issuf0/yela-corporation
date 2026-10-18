import React from 'react';

interface SignatureGraphicProps {
  className?: string;
}

/**
 * Signature composition: trajectories converging on a single point and
 * continuing as one line — the same gesture as the brand's "Y" monogram
 * (two arms meeting in one stem), drawn as fine editorial strokes.
 */
export const SignatureGraphic: React.FC<SignatureGraphicProps> = ({ className = '' }) => (
  <div className={`relative w-full aspect-square max-w-[440px] mx-auto select-none ${className}`}>
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="yelaArmLeft" x1="70" y1="90" x2="250" y2="270" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f2439" stopOpacity="0.08" />
          <stop offset="70%" stopColor="#0f2439" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0f2439" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="yelaArmRight" x1="430" y1="90" x2="250" y2="270" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e78a22" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#e78a22" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#e78a22" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="yelaStem" x1="250" y1="270" x2="250" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f2439" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0f2439" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="yelaGlow">
          <stop offset="0%" stopColor="#e78a22" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e78a22" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Architectural reference lines */}
      <line x1="60" y1="270" x2="440" y2="270" stroke="#0f2439" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 9" />
      <line x1="250" y1="60" x2="250" y2="440" stroke="#0f2439" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 9" />
      <circle cx="250" cy="270" r="150" stroke="#0f2439" strokeOpacity="0.05" strokeWidth="1" />
      <circle cx="250" cy="270" r="60" fill="url(#yelaGlow)" />

      {/* Secondary trajectories (context, quiet) */}
      <path d="M 40 170 C 130 180, 190 230, 250 270" stroke="#0f2439" strokeOpacity="0.16" strokeWidth="1" strokeLinecap="round" />
      <path d="M 460 200 C 380 220, 300 250, 250 270" stroke="#0f2439" strokeOpacity="0.12" strokeWidth="1" strokeLinecap="round" />

      {/* Primary arms converging — the Y gesture */}
      <path d="M 70 90 C 140 110, 200 200, 250 270" stroke="url(#yelaArmLeft)" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M 430 90 C 360 110, 300 200, 250 270" stroke="url(#yelaArmRight)" strokeWidth="1.5" strokeLinecap="round" />

      {/* One continuing line: the opportunity realised */}
      <path d="M 250 270 C 252 330, 250 390, 250 440" stroke="url(#yelaStem)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 7" />

      {/* Point of convergence */}
      <circle cx="250" cy="270" r="10" stroke="#e78a22" strokeWidth="1.2" fill="none" opacity="0.55" />
      <circle cx="250" cy="270" r="3.5" fill="#e78a22" />

      {/* Origins */}
      <circle cx="70" cy="90" r="2.5" fill="#0f2439" fillOpacity="0.45" />
      <circle cx="430" cy="90" r="2.5" fill="#e78a22" fillOpacity="0.6" />
      <circle cx="40" cy="170" r="2" fill="#0f2439" fillOpacity="0.25" />
      <circle cx="460" cy="200" r="2" fill="#0f2439" fillOpacity="0.2" />
      <circle cx="250" cy="440" r="2" fill="#0f2439" fillOpacity="0.25" />
    </svg>
  </div>
);
