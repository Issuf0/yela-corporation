import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle, MapPin, Tag } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/projectsData';

interface ProjectsPageProps {
  onOpenLeadModal: (serviceId?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenLeadModal }) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Casos de Estudo
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Projectos & Desafios Solucionados
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Exemplos representativos de intervenções onde a prospecção da YELA Corporation e a engenharia de software da Learn Code transformaram operações em Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstrative Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Conteúdo Demonstrativo:</strong> Os casos apresentados nesta secção utilizam cenários operacionais simulados (placeholders) para ilustrar o formato de entrega conjunta YELA × Learn Code. Não representam clientes comerciais reais.
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {DEMO_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image & Sector Col */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-900 overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex flex-col justify-between">
                  <span className="self-start text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-500/90 text-slate-950">
                    Caso Demonstrativo
                  </span>

                  <div className="space-y-1 text-white">
                    <div className="text-xs font-semibold text-amber-300">
                      {proj.clientSector}
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {proj.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Col */}
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {proj.title}
                  </h3>

                  <div className="space-y-4 pt-2 text-xs sm:text-sm">
                    {/* Problema */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <strong className="text-slate-900 font-bold uppercase tracking-wider text-[11px] block">
                        Desafio Inicial / Problema:
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        {proj.problem}
                      </p>
                    </div>

                    {/* Solução */}
                    <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1">
                      <strong className="text-amber-900 font-bold uppercase tracking-wider text-[11px] block">
                        Solução Implementada (YELA × Learn Code):
                      </strong>
                      <p className="text-slate-700 leading-relaxed">
                        {proj.solution}
                      </p>
                    </div>

                    {/* Resultado */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                      <strong className="text-emerald-900 font-bold uppercase tracking-wider text-[11px] block flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Resultado Alcançado:
                      </strong>
                      <p className="text-slate-700 leading-relaxed">
                        {proj.result}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    Referência: {proj.id}
                  </span>
                  <button
                    onClick={() => onOpenLeadModal()}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                  >
                    <span>Solicitar Solução Semelhante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
};
