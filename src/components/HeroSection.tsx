import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SignatureGraphic } from './SignatureGraphic';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Editorial Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold tracking-[-0.03em] leading-[1.05] text-[#0B132B] text-balance">
              Ligamos desafios a oportunidades.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-xl text-balance">
              Comunicação, estratégia e expansão para aproximar organizações das soluções certas.
            </p>

            {/* Primary CTA */}
            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="group px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0B132B] hover:bg-slate-900 transition-all duration-200 inline-flex items-center gap-3 cursor-pointer shadow-sm hover:shadow"
              >
                <span>Fale connosco</span>
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Signature Graphic Element (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md p-6 bg-white/40 border border-[#0B132B]/10">
              <SignatureGraphic className="w-full" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
