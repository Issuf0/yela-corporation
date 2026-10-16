import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';
import { LeadForm } from '../components/LeadForm';
import { Lead, SimulatedEmail } from '../types';

interface RequestSolutionPageProps {
  initialServiceId?: string;
  onViewEmails?: (emails: SimulatedEmail[]) => void;
  onNavigateAdmin?: (leadId: string) => void;
}

export const RequestSolutionPage: React.FC<RequestSolutionPageProps> = ({
  initialServiceId,
  onViewEmails,
  onNavigateAdmin,
}) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Formulário de Soluções
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight">
              Solicitar uma Solução
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Descreva a necessidade da sua organização. A YELA Corporation conduz a qualificação preliminar e articula a elaboração da proposta técnica com os especialistas da Learn Code.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Layout */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Explicação do Fluxo e Garantias */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block">
                  O que acontece após o envio?
                </span>
                
                <h3 className="text-lg font-bold text-slate-900">
                  Fluxo de Tratamento do seu Pedido
                </h3>

                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      1
                    </div>
                    <div>
                      <strong className="text-slate-900 block">Registo Imediato</strong>
                      É gerado um identificador único (Lead ID) e disparada notificação automática às equipas da YELA e Learn Code.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      2
                    </div>
                    <div>
                      <strong className="text-slate-900 block">Contacto Comercial YELA</strong>
                      A nossa equipa realiza uma chamada de acolhimento para validar objetivos de negócio e horizonte de implementação.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      3
                    </div>
                    <div>
                      <strong className="text-slate-900 block">Análise Técnica Learn Code</strong>
                      A Learn Code estuda a viabilidade, define a tecnologia apropriada e calcula a orçamentação técnica e prazos.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      4
                    </div>
                    <div>
                      <strong className="text-slate-900 block">Apresentação Conjunta</strong>
                      Apresentamos uma proposta clara e transparente, ajustada à sua escala e localização em Moçambique.
                    </div>
                  </div>
                </div>
              </div>

              {/* Box de Confiança */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidencialidade & Rigor</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  As informações submetidas destinam-se exclusivamente à avaliação técnica e comercial da YELA Corporation e Learn Code.
                </p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  Sem intermediários desnecessários. Sem spam.
                </div>
              </div>

            </div>

            {/* Right Col: O Formulário */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                <div className="mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Dados da Solicitação
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Preencha os campos abaixo com o máximo de precisão possível.
                  </p>
                </div>

                <LeadForm
                  initialServiceId={initialServiceId}
                  sourcePage="/solicitar-solucao"
                  onViewEmails={onViewEmails}
                  onNavigateAdmin={onNavigateAdmin}
                  isEmbedded={true}
                />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
