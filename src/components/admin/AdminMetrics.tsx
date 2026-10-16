import React from 'react';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Layers, 
  MapPin, 
  Share2, 
  BarChart3 
} from 'lucide-react';
import { Lead, Campaign } from '../../types';

interface AdminMetricsProps {
  leads: Lead[];
  campaigns: Campaign[];
  onSelectStatusFilter?: (status: string) => void;
}

export const AdminMetrics: React.FC<AdminMetricsProps> = ({
  leads,
  campaigns,
  onSelectStatusFilter,
}) => {
  // Aggregate Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'Novo').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contactado').length;
  const qualifiedLeads = leads.filter((l) => l.status === 'Qualificado').length;
  const proposalLeads = leads.filter((l) => l.status === 'Proposta').length;
  const convertedLeads = leads.filter((l) => l.status === 'Convertido').length;
  const lostLeads = leads.filter((l) => l.status === 'Não convertido').length;

  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';
  const qualificationRate = totalLeads > 0 ? (((qualifiedLeads + proposalLeads + convertedLeads) / totalLeads) * 100).toFixed(1) : '0.0';

  // Distribution by Month
  const monthsOrder = ['2026-01', '2026-02', '2026-03'];
  const monthLabels: Record<string, string> = {
    '2026-01': 'Jan 2026',
    '2026-02': 'Fev 2026',
    '2026-03': 'Mar 2026',
  };
  const leadsByMonth = monthsOrder.map((m) => {
    const count = leads.filter((l) => l.createdAt.startsWith(m)).length;
    const conv = leads.filter((l) => l.createdAt.startsWith(m) && l.status === 'Convertido').length;
    return { month: m, label: monthLabels[m], count, converted: conv };
  });

  const maxMonthCount = Math.max(...leadsByMonth.map((m) => m.count), 1);

  // Distribution by Origin / Channel
  const originMap: Record<string, { count: number; converted: number }> = {};
  leads.forEach((l) => {
    const key = l.sourceChannel || l.foundUsVia || 'Website Orgânico';
    if (!originMap[key]) originMap[key] = { count: 0, converted: 0 };
    originMap[key].count += 1;
    if (l.status === 'Convertido') originMap[key].converted += 1;
  });
  const originData = Object.entries(originMap).sort((a, b) => b[1].count - a[1].count);

  // Distribution by Service
  const serviceMap: Record<string, number> = {};
  leads.forEach((l) => {
    const key = l.serviceName || l.serviceId || 'Outro';
    serviceMap[key] = (serviceMap[key] || 0) + 1;
  });
  const serviceData = Object.entries(serviceMap).sort((a, b) => b[1] - a[1]);

  // Distribution by Province
  const provinceMap: Record<string, number> = {};
  leads.forEach((l) => {
    const p = l.province || 'Outra';
    provinceMap[p] = (provinceMap[p] || 0) + 1;
  });
  const provinceData = Object.entries(provinceMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Leads */}
        <div 
          onClick={() => onSelectStatusFilter && onSelectStatusFilter('TODOS')}
          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total de Leads</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalLeads}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Rastreados no sistema</span>
          </div>
        </div>

        {/* Novos */}
        <div 
          onClick={() => onSelectStatusFilter && onSelectStatusFilter('Novo')}
          className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm cursor-pointer hover:border-amber-300 transition-all"
        >
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Novos</span>
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold text-amber-950">{newLeads}</div>
          <div className="text-[11px] text-amber-700 mt-1">
            A aguardar triagem inicial
          </div>
        </div>

        {/* Qualificados */}
        <div 
          onClick={() => onSelectStatusFilter && onSelectStatusFilter('Qualificado')}
          className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm cursor-pointer hover:border-emerald-300 transition-all"
        >
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Qualificados</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-950">{qualifiedLeads}</div>
          <div className="text-[11px] text-emerald-700 mt-1">
            Requisitos validados YELA
          </div>
        </div>

        {/* Em Proposta */}
        <div 
          onClick={() => onSelectStatusFilter && onSelectStatusFilter('Proposta')}
          className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-sm cursor-pointer hover:border-purple-300 transition-all"
        >
          <div className="flex items-center justify-between text-purple-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Em Proposta</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-950">{proposalLeads}</div>
          <div className="text-[11px] text-purple-700 mt-1">
            Orçamento Learn Code enviado
          </div>
        </div>

        {/* Convertidos */}
        <div 
          onClick={() => onSelectStatusFilter && onSelectStatusFilter('Convertido')}
          className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 shadow-sm cursor-pointer hover:border-teal-300 transition-all"
        >
          <div className="flex items-center justify-between text-teal-800 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Convertidos</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-teal-950">{convertedLeads}</div>
          <div className="text-[11px] text-teal-800 mt-1">
            Taxa: <strong>{conversionRate}%</strong>
          </div>
        </div>

        {/* Campanhas Ativas */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Campanhas</span>
            <Share2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{campaigns.length}</div>
          <div className="text-[11px] text-slate-300 mt-1">
            Canais rastreados
          </div>
        </div>

      </div>

      {/* 2. CHARTS GRID: Monthly Trend + Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span>Evolução de Leads por Mês (2026)</span>
              </h3>
              <p className="text-xs text-slate-500">Volume de novos pedidos captados vs. projectos convertidos</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span className="text-slate-600">Total Leads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-teal-600" />
                <span className="text-slate-600">Convertidos</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-2">
            {leadsByMonth.map((item) => {
              const totalPct = (item.count / maxMonthCount) * 100;
              const convPct = (item.converted / maxMonthCount) * 100;
              return (
                <div key={item.month} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.label}</span>
                    <span className="text-slate-500 font-mono">
                      <strong>{item.count}</strong> leads • <strong className="text-teal-700">{item.converted}</strong> fechados
                    </span>
                  </div>
                  <div className="h-6 bg-slate-100 rounded-lg overflow-hidden flex relative">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-500 flex items-center justify-end px-2 text-[10px] font-bold text-slate-950"
                      style={{ width: `${Math.max(totalPct, 12)}%` }}
                    >
                      {item.count}
                    </div>
                    {item.converted > 0 && (
                      <div 
                        className="h-full bg-teal-600 transition-all duration-500 flex items-center justify-end px-2 text-[10px] font-bold text-white absolute left-0 top-0 opacity-90"
                        style={{ width: `${Math.max(convPct, 8)}%` }}
                        title={`${item.converted} convertidos`}
                      >
                        {item.converted}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Taxa média de qualificação comercial: <strong>{qualificationRate}%</strong></span>
            <span className="text-teal-800 font-semibold">Parceria Learn Code ativa</span>
          </div>
        </div>

        {/* Funnel Stages */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Funil de Conversão Comercial</span>
              </h3>
              <p className="text-xs text-slate-500">Passagem de etapas da prospecção até ao fecho técnico</p>
            </div>

            <div className="space-y-3">
              {/* Stage 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">1</span>
                  <span className="font-semibold text-slate-800">Leads Captados (Geral)</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{totalLeads} (100%)</span>
              </div>

              {/* Stage 2 */}
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 font-bold flex items-center justify-center text-[10px]">2</span>
                  <span className="font-semibold text-blue-900">Contacto & Triagem</span>
                </div>
                <span className="font-mono font-bold text-blue-950">
                  {totalLeads - newLeads} ({totalLeads > 0 ? (((totalLeads - newLeads) / totalLeads) * 100).toFixed(0) : 0}%)
                </span>
              </div>

              {/* Stage 3 */}
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center text-[10px]">3</span>
                  <span className="font-semibold text-emerald-900">Qualificação & Requisitos</span>
                </div>
                <span className="font-mono font-bold text-emerald-950">
                  {qualifiedLeads + proposalLeads + convertedLeads} ({qualificationRate}%)
                </span>
              </div>

              {/* Stage 4 */}
              <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center text-[10px]">4</span>
                  <span className="font-semibold text-purple-900">Proposta Técnica Learn Code</span>
                </div>
                <span className="font-mono font-bold text-purple-950">
                  {proposalLeads + convertedLeads} ({totalLeads > 0 ? (((proposalLeads + convertedLeads) / totalLeads) * 100).toFixed(0) : 0}%)
                </span>
              </div>

              {/* Stage 5 */}
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-[10px]">5</span>
                  <span className="font-bold text-teal-950">Projectos Adjudicados / Convertidos</span>
                </div>
                <span className="font-mono font-bold text-teal-800">
                  {convertedLeads} ({conversionRate}%)
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-white text-[11px] flex items-center justify-between">
            <span className="text-slate-300">Tempo médio de acolhimento:</span>
            <strong className="text-amber-400 font-mono">&lt; 4 horas</strong>
          </div>
        </div>

      </div>

      {/* 3. LOWER GRIDS: Distribution by Service, Province, and Origin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Leads by Service */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Leads por Solução Pretendida</span>
            </h4>
          </div>
          <div className="space-y-3">
            {serviceData.map(([name, count]) => {
              const pct = ((count / totalLeads) * 100).toFixed(0);
              return (
                <div key={name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium truncate max-w-[190px]" title={name}>{name}</span>
                    <span className="text-slate-900 font-bold font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leads by Province */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Distribuição por Província (Moçambique)</span>
            </h4>
          </div>
          <div className="space-y-3">
            {provinceData.map(([prov, count]) => {
              const pct = ((count / totalLeads) * 100).toFixed(0);
              return (
                <div key={prov} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">{prov}</span>
                    <span className="text-slate-900 font-bold font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-800 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leads by Origin / Channel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-600" />
              <span>Origem & Canais de Atração</span>
            </h4>
          </div>
          <div className="space-y-3">
            {originData.map(([origin, data]) => {
              const pct = ((data.count / totalLeads) * 100).toFixed(0);
              return (
                <div key={origin} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium truncate max-w-[190px]" title={origin}>{origin}</span>
                    <span className="text-slate-900 font-bold font-mono">
                      {data.count} <span className="text-[10px] text-teal-700 font-normal">({data.converted} conv.)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
