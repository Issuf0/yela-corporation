import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  Share2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { YELA_CORE_SERVICES } from '../data/solutionsData';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Competências Corporativas YELA
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Os Nossos Serviços
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Atuamos na prospecção comercial, comunicação estratégica e desenvolvimento de oportunidades de mercado em Moçambique, sem atribuir responsabilidades técnicas de software que pertencem à nossa parceira Learn Code.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {YELA_CORE_SERVICES.map((srv, idx) => (
              <div 
                key={srv.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                      {srv.icon === 'Megaphone' && <Sparkles className="w-6 h-6" />}
                      {srv.icon === 'Target' && <Target className="w-6 h-6" />}
                      {srv.icon === 'Briefcase' && <Briefcase className="w-6 h-6" />}
                      {srv.icon === 'Sparkles' && <TrendingUp className="w-6 h-6" />}
                      {srv.icon === 'MapPin' && <MapPin className="w-6 h-6" />}
                      {srv.icon === 'Repeat' && <Share2 className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                      Área 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">Como aportamos valor:</strong>
                  {srv.details}
                </div>
              </div>
            ))}
          </div>

          {/* Sinergia com Soluções Técnicas */}
          <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-lg font-bold text-slate-900">
                Procura uma Solução Tecnológica Específica?
              </h4>
              <p className="text-sm text-slate-600 max-w-lg">
                Consulte o nosso catálogo de websites, aplicações web, mobile e sistemas personalizados prontos para encaminhamento técnico.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/solucoes')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <span>Ver Catálogo de Soluções</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
