import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  RotateCcw, 
  Plus, 
  ExternalLink, 
  ShieldAlert, 
  Clock, 
  Download,
  Check
} from 'lucide-react';
import { Lead } from '../../types';

interface AdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onResetData: () => void;
  onQuickNewLead: () => void;
  onExportCsv: () => void;
  totalLeadsCount: number;
  newLeadsCount: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onTabChange,
  onResetData,
  onQuickNewLead,
  onExportCsv,
  totalLeadsCount,
  newLeadsCount,
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-PT', {
          timeZone: 'Africa/Maputo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Visão Geral' },
    { id: 'leads', label: 'Gestão de Leads', badge: newLeadsCount > 0 ? `${newLeadsCount} novos` : undefined },
    { id: 'campanhas', label: 'Campanhas & Origens' },
    { id: 'parceria', label: 'Modelo da Parceria (70/30)' },
    { id: 'emails', label: 'Notificações (Resend Ready)' },
  ];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800">
      {/* Top bar with system status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Área Administrativa YELA
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                Ambiente de Gestão Interna
              </span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Dashboard de Leads & Parceria Learn Code
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Maputo: {time || '08:00'} (CAT)</span>
          </div>

          <button
            type="button"
            id="admin-btn-export-csv"
            onClick={onExportCsv}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Exportar base de leads para formato CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Exportar CSV</span>
          </button>

          <button
            type="button"
            id="admin-btn-reset-demo"
            onClick={() => {
              if (window.confirm('Deseja restaurar os dados demonstrativos iniciais?')) {
                onResetData();
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Restaurar os 16 leads e campanhas de teste"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Demo</span>
          </button>

          <button
            type="button"
            id="admin-btn-quick-new"
            onClick={onQuickNewLead}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Pedido</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 overflow-x-auto py-2.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
