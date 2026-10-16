import React from 'react';
import { 
  DollarSign, 
  ShieldAlert, 
  Handshake, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { PartnershipProject } from '../../types';

interface PartnershipDealsModuleProps {
  deals: PartnershipProject[];
}

export const PartnershipDealsModule: React.FC<PartnershipDealsModuleProps> = ({ deals }) => {
  // Aggregate Financials
  const totalReceived = deals.reduce((acc, d) => acc + d.totalReceivedMZN, 0);
  const totalCosts = deals.reduce((acc, d) => acc + d.approvedDirectCostsMZN, 0);
  const totalShareable = deals.reduce((acc, d) => acc + d.netShareableMZN, 0);
  const totalLearnCode = deals.reduce((acc, d) => acc + d.learnCodeShareMZN, 0);
  const totalYela = deals.reduce((acc, d) => acc + d.yelaShareMZN, 0);

  const formatMZN = (val: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val) + ' MZN';
  };

  return (
    <div className="space-y-8">
      
      {/* Strict Internal Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300/80 text-xs text-amber-950 flex items-start gap-3 shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-bold block text-sm">Módulo Interno de Prestação de Contas da Parceria Estratégica</strong>
          <p className="text-slate-700 leading-relaxed">
            Esta secção é de acesso estritamente restrito à gestão da YELA Corporation e Learn Code. Reflete a regra operacional de liquidação acordada: após dedução de <strong>custos directos aprovados</strong>, o <strong>valor líquido partilhável</strong> é distribuído na proporção de <strong>70% Learn Code</strong> (Engenharia & Execução Técnica) e <strong>30% YELA Corporation</strong> (Comunicação, Prospecção & Gestão da Conta).
          </p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Total Faturado / Recebido
          </span>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            {formatMZN(totalReceived)}
          </div>
          <div className="text-[11px] text-slate-500">Base bruta de projetos</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Custos Diretos Aprovados
          </span>
          <div className="text-xl font-extrabold text-slate-700 font-mono">
            {formatMZN(totalCosts)}
          </div>
          <div className="text-[11px] text-slate-500">Servidores, licenças, infra</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Líquido Partilhável
          </span>
          <div className="text-xl font-extrabold text-white font-mono">
            {formatMZN(totalShareable)}
          </div>
          <div className="text-[11px] text-slate-400">Recebido − Custos</div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-between">
            <span>Learn Code (70%)</span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-mono">Tech</span>
          </span>
          <div className="text-xl font-extrabold text-emerald-950 font-mono">
            {formatMZN(totalLearnCode)}
          </div>
          <div className="text-[11px] text-emerald-700">Engenharia e Suporte</div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center justify-between">
            <span>YELA Corp (30%)</span>
            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-mono">Prospecção</span>
          </span>
          <div className="text-xl font-extrabold text-amber-950 font-mono">
            {formatMZN(totalYela)}
          </div>
          <div className="text-[11px] text-amber-700">Origem & Fecho Comercial</div>
        </div>

      </div>

      {/* Detailed Deals Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Registos de Projetos Convertidos & Partilha Financeira
            </h3>
            <p className="text-xs text-slate-500">
              Cálculo auditável por contrato executado entre a YELA Corporation e a Learn Code
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
            {deals.length} Projetos Ativos
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Ref / Cliente</th>
                <th className="py-3.5 px-4">Projeto & Solução</th>
                <th className="py-3.5 px-4">Lead de Origem</th>
                <th className="py-3.5 px-4 text-right">Valor Recebido</th>
                <th className="py-3.5 px-4 text-right">Custos Diretos</th>
                <th className="py-3.5 px-4 text-right">Líquido Partilhável</th>
                <th className="py-3.5 px-4 text-right text-emerald-700">Learn Code (70%)</th>
                <th className="py-3.5 px-4 text-right text-amber-700">YELA (30%)</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Client & ID */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{deal.clientName}</div>
                    <div className="text-[11px] font-mono text-slate-400">{deal.id}</div>
                  </td>

                  {/* Project */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{deal.projectTitle}</div>
                    <div className="text-[11px] text-slate-500">{deal.serviceName}</div>
                  </td>

                  {/* Origin */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {deal.leadId}
                    </span>
                  </td>

                  {/* Valor Recebido */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    {formatMZN(deal.totalReceivedMZN)}
                  </td>

                  {/* Custos */}
                  <td className="py-3.5 px-4 text-right font-mono text-slate-600 whitespace-nowrap">
                    {formatMZN(deal.approvedDirectCostsMZN)}
                  </td>

                  {/* Liquido */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-950 whitespace-nowrap bg-slate-50/60">
                    {formatMZN(deal.netShareableMZN)}
                  </td>

                  {/* 70% Learn Code */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 whitespace-nowrap bg-emerald-50/30">
                    {formatMZN(deal.learnCodeShareMZN)}
                  </td>

                  {/* 30% YELA */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-700 whitespace-nowrap bg-amber-50/30">
                    {formatMZN(deal.yelaShareMZN)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {deal.status === 'Concluído' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                        Concluído
                      </span>
                    ) : deal.status === 'Em Desenvolvimento' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        Em Desenvolvimento
                      </span>
                    ) : deal.status === 'Faturado' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-900 border border-teal-200">
                        Faturado
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        Em Análise Técnica
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
