import React from 'react';
import { 
  ArrowRight, 
  Globe, 
  LayoutGrid, 
  Smartphone, 
  Database, 
  Cpu, 
  Compass, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { DIGITAL_SOLUTIONS } from '../data/solutionsData';

interface SolutionsPageProps {
  onOpenLeadModal: (serviceId?: string) => void;
  onNavigate: (path: string) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onOpenLeadModal,
  onNavigate,
}) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Catálogo Comercial
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Soluções Digitais para a sua Organização
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Explore as soluções que a YELA Corporation identifica, qualifica e encaminha para análise técnica rigorosa, orçamentação e execução pela Learn Code.
            </p>
          </div>
        </div>
      </section>

      {/* Notice of Transparency */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs text-amber-950">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Garantia de Competência:</strong> A YELA gere a ponte comercial e a compreensão do negócio; o desenvolvimento técnico e suporte são executados pela equipa especializada da <strong>Learn Code</strong>.
          </span>
        </div>
      </div>

      {/* Solutions Detailed Catalog */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {DIGITAL_SOLUTIONS.map((sol, index) => (
            <div
              key={sol.id}
              id={`solution-card-${sol.id}`}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-8"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                    {sol.iconName === 'Globe' && <Globe className="w-6 h-6" />}
                    {sol.iconName === 'LayoutGrid' && <LayoutGrid className="w-6 h-6" />}
                    {sol.iconName === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                    {sol.iconName === 'Database' && <Database className="w-6 h-6" />}
                    {sol.iconName === 'Cpu' && <Cpu className="w-6 h-6" />}
                    {sol.iconName === 'Compass' && <Compass className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded">
                        {sol.category}
                      </span>
                      <span className="text-xs text-slate-400">• Solução 0{index + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {sol.name}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  id={`btn-solicitar-${sol.id}`}
                  onClick={() => onOpenLeadModal(sol.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 group cursor-pointer"
                >
                  <span>Solicitar esta solução</span>
                  <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {sol.fullDesc}
              </p>

              {/* Problem Solved & Target Audience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Problema que resolve */}
                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Problema que Resolve</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {sol.problemSolved}
                  </p>
                </div>

                {/* Público-alvo */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span>Público-Alvo Recomendado</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {sol.targetAudience}
                  </p>
                </div>

              </div>

              {/* Key Deliverables */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Principais Atributos da Solução:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {sol.highlights.map((h, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-bold">
            Não tem a certeza de qual solução escolher?
          </h3>
          <p className="text-sm text-slate-300">
            Apresente o seu desafio à equipa da YELA Corporation. Faremos um diagnóstico prévio para recomendar a abordagem tecnológica ideal.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal('consultoria-tecnologica')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
            >
              Solicitar Diagnóstico Estratégico
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
