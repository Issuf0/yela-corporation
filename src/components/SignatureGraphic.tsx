import React from 'react';

interface SignatureGraphicProps {
  className?: string;
}

export const SignatureGraphic: React.FC<SignatureGraphicProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full aspect-square max-w-[440px] mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="yelaTrajectory1" x1="40" y1="80" x2="420" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B132B" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#0B132B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="yelaTrajectory2" x1="460" y1="120" x2="90" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B132B" stopOpacity="0.12" />
            <stop offset="65%" stopColor="#0B132B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="amberGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient reference lines (subtle, architectural) */}
        <line x1="80" y1="275" x2="420" y2="275" stroke="#0B132B" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="310" y1="80" x2="310" y2="420" stroke="#0B132B" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4 8" />
        
        {/* Geometric reference circle */}
        <circle cx="310" cy="275" r="140" stroke="#0B132B" strokeOpacity="0.04" strokeWidth="1" />

        {/* Convergence point ambient glow */}
        <circle cx="310" cy="275" r="36" fill="url(#amberGlow)" />

        {/* Primary Trajectory 1 */}
        <path
          d="M 60 140 C 140 130, 200 230, 310 275"
          stroke="url(#yelaTrajectory1)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Primary Trajectory 2 */}
        <path
          d="M 440 90 C 390 170, 360 220, 310 275"
          stroke="url(#yelaTrajectory2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Extended path toward realization */}
        <path
          d="M 310 275 C 275 320, 220 370, 110 410"
          stroke="#0B132B"
          strokeOpacity="0.35"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />

        {/* Secondary trajectory */}
        <path
          d="M 120 70 C 220 110, 270 200, 310 275"
          stroke="#0B132B"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Meeting Point: Delicate Amber Node */}
        <circle cx="310" cy="275" r="9" stroke="#D97706" strokeWidth="1.2" fill="none" opacity="0.5" />
        <circle cx="310" cy="275" r="3.5" fill="#D97706" />

        {/* Origin Nodes */}
        <circle cx="60" cy="140" r="2.5" fill="#0B132B" fillOpacity="0.4" />
        <circle cx="440" cy="90" r="2.5" fill="#0B132B" fillOpacity="0.3" />
        <circle cx="110" cy="410" r="2" fill="#0B132B" fillOpacity="0.25" />
      </svg>
    </div>
  );
};
