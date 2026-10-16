import React from 'react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#0B132B]/10 py-10 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Wordmark and minimal copyright */}
        <div className="space-y-1">
          <span className="text-slate-900 tracking-[0.2em] uppercase font-bold text-xs block">
            YELA CORPORATION
          </span>
          <p className="text-slate-400 font-light text-[11px]">
            © {new Date().getFullYear()} YELA Corporation. Parceria estratégica com a Learn Code.
          </p>
        </div>

        {/* Essential Navigation Links */}
        <nav className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <button
            onClick={() => scrollTo('apresentacao')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            A YELA
          </button>
          <button
            onClick={() => scrollTo('actuacao')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Actuação
          </button>
          <button
            onClick={() => scrollTo('parceria')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Parceria
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </nav>

      </div>
    </footer>
  );
};
