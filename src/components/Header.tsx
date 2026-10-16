import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#0B132B]/10 py-4 shadow-[0_2px_12px_rgba(11,19,43,0.02)]'
          : 'bg-transparent py-6 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
        
        {/* Zone 1: Wordmark YELA Corporation */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-slate-900 tracking-[0.2em] uppercase font-bold text-sm whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors"
        >
          YELA CORPORATION
        </a>

        {/* Zone 2: Reduced Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-medium tracking-wide text-slate-600">
          <button
            onClick={() => handleNavClick('apresentacao')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            A YELA
          </button>
          <button
            onClick={() => handleNavClick('actuacao')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Áreas de actuação
          </button>
          <button
            onClick={() => handleNavClick('parceria')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Parceria estratégica
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Contacto
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={onContactClick}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0B132B] hover:bg-slate-900 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            Fale connosco
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="p-2 text-slate-900 hover:text-amber-800 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#0B132B]/10 px-6 py-6 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('apresentacao')}
              className="text-left py-2 border-b border-slate-200/50"
            >
              A YELA
            </button>
            <button
              onClick={() => handleNavClick('actuacao')}
              className="text-left py-2 border-b border-slate-200/50"
            >
              Áreas de actuação
            </button>
            <button
              onClick={() => handleNavClick('parceria')}
              className="text-left py-2 border-b border-slate-200/50"
            >
              Parceria estratégica
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className="text-left py-2 border-b border-slate-200/50"
            >
              Contacto
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0B132B] hover:bg-slate-900 text-center transition-colors"
              >
                Fale connosco
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
