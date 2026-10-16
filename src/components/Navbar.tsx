import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceId?: string) => void;
  pendingLeadsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenLeadModal,
  pendingLeadsCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Soluções', path: '/solucoes' },
    { label: 'Projectos', path: '/projectos' },
    { label: 'Parceiros', path: '/parceiros' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contactos', path: '/contactos' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = currentPath.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      {/* Top micro-bar showing partnership & corporate positioning */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-1.5 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              YELA Corporation
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Parceria Estratégica com a <strong className="text-white font-semibold">Learn Code</strong> — Prospecção, Engenharia & Expansão Territorial
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Maputo, Moçambique</span>
            <span className="text-slate-600">•</span>
            <button
              id="topbar-admin-link"
              onClick={() => handleNav('/admin')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Área Administrativa / Dashboard
              {pendingLeadsCount > 0 && (
                <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 text-[10px] rounded-full">
                  {pendingLeadsCount} novos
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-600 flex items-center justify-center shadow-md shadow-slate-900/10 text-white font-extrabold text-xl tracking-wider group-hover:scale-105 transition-transform">
                Y
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                  YELA <span className="text-amber-600 font-semibold text-xs tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200">Corporation</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-tight">
                  Desafios • Soluções • Oportunidades
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  id={`nav-link-${link.path.replace('/', '') || 'home'}`}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-amber-600 bg-amber-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-admin-btn"
              onClick={() => handleNav('/admin')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
                isAdmin
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              title="Aceder à área administrativa interna"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
              <span>Painel Admin</span>
              {pendingLeadsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              )}
            </button>

            <button
              id="header-cta-solicitar"
              onClick={() => handleNav('/solicitar-solucao')}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
            >
              <span>Solicitar uma Solução</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-admin-quick-btn"
              onClick={() => handleNav('/admin')}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative"
              title="Admin"
            >
              <LayoutDashboard className="w-5 h-5 text-amber-600" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-amber-50 text-amber-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleNav('/admin')}
                className="w-full py-3 px-4 rounded-lg bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>Área Administrativa (Gestão de Leads)</span>
              </button>
              
              <button
                onClick={() => handleNav('/solicitar-solucao')}
                className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Solicitar uma Solução</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
