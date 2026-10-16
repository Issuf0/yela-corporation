import React from 'react';
import { 
  ArrowRight, 
  Handshake, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Layers, 
  CheckCircle2, 
  Terminal, 
  Megaphone,
  Briefcase
} from 'lucide-react';

interface PartnersPageProps {
  onOpenLeadModal: (serviceId?: string) => void;
  onNavigate: (path: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({
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
              Ecossistema Estratégico
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Parceiros & Alianças
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Conheça o modelo de colaboração que une competências comerciais, marketing de expansão e excelência em engenharia de software em Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Main Strategic Partner Spotlight: Learn Code */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#18233c] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-2xl">
                  LC
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">
                    Parceiro Estratégico Tecnológico
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Learn Code
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Engenharia de Software, Arquitetura de Dados & Suporte Técnico
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  Aliança Institucional Ativa
                </span>
              </div>
            </div>

            {/* Division of Responsibilities Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* YELA responsibilities */}
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                  <Megaphone className="w-4 h-4" />
                  <span>YELA Corporation assume:</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Comunicação Institucional:</strong> Posicionamento de marca, autoridade e relacionamento com stakeholders.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Marketing Estratégico:</strong> Campanhas orientadas para a atração de decisores B2B em Moçambique.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Prospecção Comercial:</strong> Identificação proativa de necessidades e primeiro contacto de validação.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Geração & Qualificação de Leads:</strong> Criação de dossiês de requisitos para passagem técnica.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Expansão Territorial:</strong> Presença e capilaridade nas diferentes províncias de Moçambique.</span>
                  </li>
                </ul>
              </div>

              {/* Learn Code responsibilities */}
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>Learn Code assume:</span>
                </div>
                
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Análise Técnica de Requisitos:</strong> Definição de cadernos de encargos e arquitetura de software.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Orçamentação Técnica:</strong> Estimativa precisa de esforço, horas de engenharia e prazos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Desenvolvimento & Programação:</strong> Construção de código-fonte de websites, apps e sistemas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Implementação & Testes:</strong> Deploy seguro em cloud com controlo de qualidade e segurança de dados.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Suporte Técnico Contínuo:</strong> SLA, manutenção evolutiva e resolução de incidentes tecnológicos.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Partnership Value Statement */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed text-center max-w-3xl mx-auto">
              <strong className="text-white block mb-1 text-sm">A Força da Complementaridade:</strong>
              O cliente beneficia do melhor de dois mundos: o atendimento próximo, institucional e comercial da YELA Corporation, combinado com a disciplina de engenharia de software e capacidade de entrega da Learn Code.
            </div>

          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#FAF9F6] border-b border-slate-200 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">
            Deseja submeter um projeto através desta parceria?
          </h3>
          <p className="text-sm text-slate-600">
            A YELA fará o acolhimento da sua necessidade e conectará a sua instituição à equipa de engenharia da Learn Code.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal()}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              Iniciar Conversa Institucional
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
