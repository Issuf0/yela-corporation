import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Layers, 
  Link2,
  Eye
} from 'lucide-react';
import { Campaign, Lead } from '../../types';

interface CampaignsModuleProps {
  campaigns: Campaign[];
  leads: Lead[];
  onOpenLeadModal: (serviceId?: string) => void;
  onFilterLeadsBySource: (source: string) => void;
}

export const CampaignsModule: React.FC<CampaignsModuleProps> = ({
  campaigns,
  leads,
  onOpenLeadModal,
  onFilterLeadsBySource,
}) => {
  const [selectedService, setSelectedService] = useState('aplicacao-web');
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]?.sourceCode || 'linkedin-q1');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yela.co.mz';
  const generatedUrl = `${baseUrl}/solicitar-solucao?source=${selectedCampaign}&service=${selectedService}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. CAMPAIGN URL GENERATOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Rastreabilidade & Atribuição
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Gerador de Links de Prospecção com Parâmetros de Origem
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Gere links personalizados para partilhar no LinkedIn, campanhas de email ou eventos. Quando o lead submete o formulário através deste link, a campanha e o canal são registados automaticamente no dossiê.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Selecione a Campanha / Canal
            </label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full text-xs py-2.5 px-3 bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600 font-medium"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.sourceCode}>
                  {c.name} ({c.channel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Solução em Destaque
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full text-xs py-2.5 px-3 bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600 font-medium"
            >
              <option value="website-institucional">Website Institucional</option>
              <option value="aplicacao-web">Aplicação Web de Gestão</option>
              <option value="aplicacao-mobile">Aplicação Mobile</option>
              <option value="sistema-personalizado">Sistema Integrado Custom</option>
              <option value="digitalizacao-processos">Digitalização de Processos</option>
              <option value="consultoria-tecnologica">Consultoria Tecnológica</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <span className="text-[11px] text-slate-400 mb-1">Atribuição Automática</span>
            <div className="text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700">
              utm_source={selectedCampaign}
            </div>
          </div>
        </div>

        {/* Generated URL Box */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full text-xs font-mono text-amber-300">
            <Link2 className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">{generatedUrl}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copiado!' : 'Copiar Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CAMPAIGNS PERFORMANCE TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Desempenho por Campanha de Prospecção
            </h3>
            <p className="text-xs text-slate-500">
              Métricas consolidadas de captação de oportunidades comerciais pela YELA Corporation
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
            {campaigns.length} Campanhas Registadas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Campanha</th>
                <th className="py-3.5 px-4">Canal</th>
                <th className="py-3.5 px-4">Período</th>
                <th className="py-3.5 px-4 text-center">Leads Totais</th>
                <th className="py-3.5 px-4 text-center">Qualificados</th>
                <th className="py-3.5 px-4 text-center">Conversões</th>
                <th className="py-3.5 px-4 text-center">Taxa Conv.</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((camp) => {
                const matchingLeads = leads.filter(
                  (l) => l.campaignId === camp.id || l.campaignId === camp.sourceCode || l.sourceChannel?.includes(camp.channel)
                );
                const countLeads = matchingLeads.length || camp.leadsGenerated;
                const qualLeads = matchingLeads.filter(
                  (l) => l.status === 'Qualificado' || l.status === 'Proposta' || l.status === 'Convertido'
                ).length || camp.leadsQualified;
                const convLeads = matchingLeads.filter((l) => l.status === 'Convertido').length || camp.conversions;
                const rate = countLeads > 0 ? ((convLeads / countLeads) * 100).toFixed(1) : '0.0';

                return (
                  <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700 whitespace-nowrap">
                      {camp.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {camp.name}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {camp.channel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {camp.period}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900 font-mono">
                      {countLeads}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold text-amber-900 font-mono">
                      {qualLeads}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-700 font-mono">
                      {convLeads}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold font-mono">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {rate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onFilterLeadsBySource(camp.sourceCode)}
                        className="text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Leads</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
