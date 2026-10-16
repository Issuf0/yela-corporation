import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Compass, 
  Globe, 
  Cpu, 
  Smartphone, 
  Database, 
  Building, 
  MapPin, 
  Target, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Briefcase,
  Share2
} from 'lucide-react';
import { YELA_CORE_SERVICES, DIGITAL_SOLUTIONS } from '../data/solutionsData';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-[#121b2d] text-white pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Ambient warm glow for Mozambican identity */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            
            {/* Strategic Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>YELA Corporation em parceria estratégica com a Learn Code</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Transformamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">desafios</span> em oportunidades e soluções.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              A YELA Corporation ajuda organizações moçambicanas a identificar necessidades operacionais, desenhar oportunidades estratégicas e encontrar as soluções tecnológicas certas para crescer.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                id="hero-cta-solicitar"
                onClick={() => onNavigate('/solicitar-solucao')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-base shadow-lg shadow-amber-900/20 hover:shadow-amber-900/30 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Solicitar uma Solução</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-conhecer"
                onClick={() => onNavigate('/sobre')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                <span>Conhecer a YELA</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Micro Pillars */}
            <div className="pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Prospecção Ativa</div>
                <div className="text-xs text-slate-400">Identificação de necessidades reais</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Comunicação Clara</div>
                <div className="text-xs text-slate-400">Alinhamento de valor de negócio</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Learn Code Tech</div>
                <div className="text-xs text-slate-400">Engenharia e execução técnica</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Expansão Territorial</div>
                <div className="text-xs text-slate-400">Presença nas províncias</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. O QUE FAZEMOS (AREAS PRINCIPAIS DA YELA) */}
      <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
              Posicionamento YELA Corporation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              O que fazemos
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Atuamos na linha de frente do relacionamento corporativo, comunicação e expansão comercial, criando a ligação estruturada entre organizações e soluções inovadoras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {YELA_CORE_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:border-amber-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 mb-6 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    {srv.icon === 'Megaphone' && <Sparkles className="w-6 h-6" />}
                    {srv.icon === 'Target' && <Target className="w-6 h-6" />}
                    {srv.icon === 'Briefcase' && <Briefcase className="w-6 h-6" />}
                    {srv.icon === 'Sparkles' && <TrendingUp className="w-6 h-6" />}
                    {srv.icon === 'MapPin' && <MapPin className="w-6 h-6" />}
                    {srv.icon === 'Repeat' && <Share2 className="w-6 h-6" />}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  {srv.details}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. COMO TRABALHAMOS: PROCESSO EM 4 ETAPAS */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Fluxo Metodológico
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              Como trabalhamos
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Transformamos necessidades difusas em planos de ação claros e encaminhamentos técnicos estruturados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-base">
                01
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Identificamos
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mapeamos o contexto da sua organização, processos manuais, dificuldades de comunicação ou gargalos de atendimento no mercado moçambicano.
              </p>
              <div className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded inline-block">
                Prospecção YELA
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-base">
                02
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Compreendemos
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Aprofundamos o objetivo do negócio, o perfil dos seus clientes, a viabilidade operacional e o horizonte temporal pretendido.
              </p>
              <div className="text-xs font-semibold text-slate-700 bg-slate-200/60 px-2.5 py-1 rounded inline-block">
                Diagnóstico & Escopo
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-amber-50/50 border border-amber-200/90 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-extrabold flex items-center justify-center text-base">
                03
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Conectamos
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Encaminhamos os requisitos validados para a <strong>Learn Code</strong> para análise de engenharia, arquitetura de dados e orçamento técnico.
              </p>
              <div className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded inline-block">
                Ponte YELA × Learn Code
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-base">
                04
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Acompanhamos
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mantemos o acompanhamento do relacionamento e alinhamento estratégico enquanto a Learn Code desenvolve e implementa a solução.
              </p>
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                Sustentação Contínua
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SOLUÇÕES DIGITAIS QUE PODEM SER ENCAMINHADAS */}
      <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
              Catálogo de Soluções
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              Soluções que pode solicitar
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Apresentamos soluções digitais que a YELA prospecta e encaminha para análise técnica rigorosa, orçamentação e execução pela Learn Code.
            </p>
          </div>

          {/* Transparency Disclaimer Notice */}
          <div className="max-w-3xl mx-auto mb-14 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Nota de Transparência Institucional:</strong>
              A YELA Corporation é responsável pela identificação, qualificação e gestão do relacionamento inicial. O desenvolvimento, orçamentação técnica, código-fonte e suporte são assegurados pela parceira de engenharia de software <strong>Learn Code</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIGITAL_SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      {sol.category}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                      {sol.iconName === 'Globe' && <Globe className="w-5 h-5" />}
                      {sol.iconName === 'LayoutGrid' && <Layers className="w-5 h-5" />}
                      {sol.iconName === 'Smartphone' && <Smartphone className="w-5 h-5" />}
                      {sol.iconName === 'Database' && <Database className="w-5 h-5" />}
                      {sol.iconName === 'Cpu' && <Cpu className="w-5 h-5" />}
                      {sol.iconName === 'Compass' && <Compass className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {sol.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {sol.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {sol.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenLeadModal(sol.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer group"
                  >
                    <span>Solicitar esta solução</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('/solucoes')}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 hover:underline"
            >
              <span>Consultar detalhes de todas as soluções e público-alvo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. PARCERIA ESTRATÉGICA: YELA × LEARN CODE */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              Sinergia Estratégica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4 tracking-tight">
              YELA Corporation × Learn Code
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Uma aliança onde cada entidade foca naquilo em que tem excelência comprovada para entregar soluções digitais robustas em Moçambique.
            </p>
          </div>

          {/* Sinergy Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* YELA Role */}
            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-extrabold text-lg">
                    Y
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">YELA Corporation</h3>
                    <p className="text-xs text-amber-400 font-medium">Comunicação, Negócio & Expansão</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded font-semibold border border-amber-500/20">
                  Frente Comercial
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Assume a responsabilidade de conectar o ecossistema moçambicano à inovação através de competências estratégicas focadas em pessoas e mercado:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>Comunicação institucional</strong> e reputação corporativa
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>Marketing estratégico</strong> e posicionamento B2B
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>Prospecção comercial ativa</strong> e qualificação de oportunidades
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>Geração contínua de leads</strong> e mapeamento de dores
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <strong>Expansão territorial</strong> em todas as províncias do país
                </li>
              </ul>
            </div>

            {/* Learn Code Role */}
            <div className="p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold text-lg">
                    LC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Learn Code</h3>
                    <p className="text-xs text-emerald-400 font-medium">Engenharia, Software & Suporte</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-300 px-2.5 py-1 rounded font-semibold border border-emerald-500/20">
                  Frente Técnica
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Assume a responsabilidade integral pelo desenho técnico, execução de software e sustentabilidade tecnológica das soluções:
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong>Análise técnica de requisitos</strong> e desenho de arquitetura
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong>Orçamentação técnica rigorosa</strong> e planeamento de entregas
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong>Desenvolvimento de software</strong> (Web, Mobile, Sistemas)
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong>Implementação e deploy</strong> com segurança e escalabilidade
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <strong>Suporte técnico contínuo</strong> e manutenção evolutiva
                </li>
              </ul>
            </div>

          </div>

          {/* Workflow Representation: YELA → Lead → Learn Code → Solução → Cliente */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
              Fluxo Operacional Integrado da Parceria
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center text-center">
              
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">01. YELA</div>
                <div className="text-sm font-semibold text-white">Prospecção & Mercado</div>
              </div>

              <div className="text-amber-500 font-bold hidden sm:block">→</div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">02. Lead</div>
                <div className="text-sm font-semibold text-white">Qualificação & Dossiê</div>
              </div>

              <div className="text-emerald-400 font-bold hidden sm:block">→</div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">03. Learn Code</div>
                <div className="text-sm font-semibold text-white">Engenharia & Solução</div>
              </div>

            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400 text-center">
              <span>Resultado: Solução tecnológica entregue com rigor e proximidade permanente ao</span>
              <strong className="text-white">Cliente Final</strong>.
            </div>
          </div>

        </div>
      </section>

      {/* 6. IMPACTO E EXPANSÃO TERRITORIAL EM MOÇAMBIQUE */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Capilaridade Nacional
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Expansão territorial e presença em Moçambique
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Acreditamos que a transformação digital não deve estar confinada a Maputo. A estratégia da YELA Corporation prevê uma rede articulada de prospecção e relacionamento que alcança os principais centros económicos do Sul, Centro e Norte do país.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-500 uppercase">Zona Sul</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Maputo & Gaza</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Sede & Hub Metropolitano</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-500 uppercase">Zona Centro</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Sofala & Tete</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Corredores Logísticos</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-500 uppercase">Zona Norte</div>
                  <div className="text-sm font-bold text-slate-900 mt-1">Nampula & Cabo Delgado</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Agronegócio & Energia</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 italic">
                * Indicadores demonstrativos para planeamento de capilaridade comercial da organização.
              </div>
            </div>

            {/* Visual Mozambique Territorial Map Card */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h4 className="font-bold text-white text-base">Rede de Oportunidades Moçambique</h4>
                  <p className="text-xs text-slate-400">11 Províncias no âmbito de prospecção</p>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded font-mono">
                  MZ-EXP-2026
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-medium">Maputo Cidade & Província</span>
                  </div>
                  <span className="text-slate-400">Ativa • Sede Central</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-medium">Sofala (Beira) & Manica</span>
                  </div>
                  <span className="text-slate-400">Ativa • Corredor da Beira</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-medium">Nampula & Nacala</span>
                  </div>
                  <span className="text-slate-400">Ativa • Corredor Norte</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    <span className="font-medium">Tete, Zambézia, Cabo Delgado, Niassa</span>
                  </div>
                  <span className="text-slate-400">Em expansão comercial</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Ponte directa para análise técnica</span>
                <strong className="text-emerald-400 font-semibold">Learn Code Engine</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/30 text-amber-100 text-xs font-bold uppercase tracking-wider">
            Inicie a sua Transformação
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Tem um desafio? Vamos encontrar a solução certa.
          </h2>
          <p className="text-base sm:text-lg text-amber-100 max-w-2xl mx-auto font-normal">
            Preencha os dados da sua organização. A YELA qualifica a sua necessidade e a Learn Code prepara o desenho da solução técnica.
          </p>
          <div className="pt-4">
            <button
              id="bottom-cta-solicitar"
              onClick={() => onNavigate('/solicitar-solucao')}
              className="px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-base shadow-xl transition-all inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Solicitar uma Solução</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
