import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  Compass, 
  Eye, 
  CheckCircle2, 
  Handshake, 
  Users, 
  MapPin, 
  Award,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Institucional
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Sobre a YELA Corporation
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Uma organização moçambicana orientada a identificar desafios, desenhar oportunidades e estabelecer as pontes estratégicas para o desenvolvimento empresarial e tecnológico do país.
            </p>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                A Nossa Identidade
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Quem Somos
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                A YELA Corporation nasce da convicção de que o crescimento de uma instituição depende da sua capacidade de articular desafios com clareza e de aceder a competências técnicas qualificadas.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Operamos como catalisadores no mercado moçambicano: lideramos a comunicação corporativa, o marketing de valor, a prospecção ativa de necessidades e a expansão territorial, mantendo uma presença próxima e humanizada junto de decisores em todo o país.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Sede Central: Maputo, Moçambique
                </div>
                <p className="text-slate-500">
                  Com capacidade de articulação comercial nos centros urbanos e corredores produtivos do Sul, Centro e Norte.
                </p>
              </div>
            </div>

            {/* Visual Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-8 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Compromisso Corporativo</span>
                <h3 className="text-2xl font-bold text-white">Transparência & Rigor Operacional</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Não prometemos o que não controlamos. Assumimos a nossa vocação de prospecção e relacionamento com ética, confiando a engenharia de software a especialistas dedicados.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/80">
                  <div className="text-amber-400 font-bold mb-1">Relação Humana</div>
                  <div className="text-slate-400">Escuta ativa antes de qualquer proposta comercial.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/80">
                  <div className="text-amber-400 font-bold mb-1">Ponte Técnica</div>
                  <div className="text-slate-400">Parceria formal com a Learn Code para desenvolvimento.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Pilares Institucionais
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              Missão, Visão e Valores
            </h2>
            <p className="text-base text-slate-600">
              Princípios que regem a nossa atuação e relacionamento no mercado nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Missão */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Missão</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Identificar e estruturar necessidades de organizações em Moçambique, ligando-as com eficácia a soluções e parceiros técnicos que potenciem a sua produtividade e sustentabilidade.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Visão</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ser uma organização moçambicana de referência na dinamização de parcerias estratégicas, prospecção e desenvolvimento de oportunidades de modernização institucional em todo o território nacional.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Valores</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <strong>Profissionalismo:</strong> Rigor em cada compromisso assumido.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <strong>Transparência:</strong> Clareza absoluta sobre papéis e limites técnicos.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <strong>Proximidade:</strong> Relações de confiança construídas com escuta ativa.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <strong>Capacidade de Execução:</strong> Acompanhamento do início ao fim.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Forma de Actuação */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Operação Estruturada
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
                A Nossa Forma de Actuação
              </h2>
            </div>

            <div className="prose prose-slate text-sm sm:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                A actuação da YELA Corporation assenta na diferenciação entre a <strong>compreensão da oportunidade de negócio</strong> e a <strong>engenharia de software</strong>.
              </p>
              <p>
                Muitas empresas hesitam em adoptar soluções tecnológicas porque o diálogo inicial é frequentemente excessivamente técnico ou distante da sua realidade operacional diária. A equipa da YELA atua exatamente nessa lacuna:
              </p>
              
              <div className="bg-slate-50 border-l-4 border-amber-600 p-4 rounded-r-lg text-slate-800 text-sm font-medium">
                «Compreendemos a linguagem do empresário, o fluxo de caixa, os constrangimentos geográficos e operacionais, e convertemos esse diagnóstico num dossiê estruturado de requisitos.»
              </div>

              <p>
                Esse dossiê é então encaminhado para a <strong>Learn Code</strong>, que prepara a orçamentação técnica, concebe a arquitetura de base de dados e assegura a programação e suporte contínuo da solução.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parceria Estratégica em Destaque */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Handshake className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            A Parceria Estratégica com a Learn Code
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Consulte em detalhe a matriz de responsabilidades, o fluxo de encaminhamento e a complementaridade entre a YELA Corporation e a Learn Code.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/parceiros')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors"
            >
              <span>Ver Página de Parceiros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
