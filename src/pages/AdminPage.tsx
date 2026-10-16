import React, { useState, useEffect } from 'react';
import { 
  AdminHeader 
} from '../components/admin/AdminHeader';
import { 
  AdminMetrics 
} from '../components/admin/AdminMetrics';
import { 
  LeadsTable 
} from '../components/admin/LeadsTable';
import { 
  LeadDetailDrawer 
} from '../components/admin/LeadDetailDrawer';
import { 
  CampaignsModule 
} from '../components/admin/CampaignsModule';
import { 
  PartnershipDealsModule 
} from '../components/admin/PartnershipDealsModule';
import { 
  EmailLogsModule 
} from '../components/admin/EmailLogsModule';
import { 
  EmailPreviewModal 
} from '../components/EmailPreviewModal';
import { 
  LeadModal 
} from '../components/LeadModal';
import { 
  leadStorage 
} from '../services/leadStorage';
import { 
  Lead, 
  LeadStatus, 
  Campaign, 
  PartnershipProject, 
  SimulatedEmail 
} from '../types';

interface AdminPageProps {
  initialLeadId?: string | null;
  onNavigateHome?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  initialLeadId,
  onNavigateHome,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [deals, setDeals] = useState<PartnershipProject[]>([]);
  const [emails, setEmails] = useState<SimulatedEmail[]>([]);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'campanhas' | 'parceria' | 'emails'>('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Status Filter for leads table
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');

  // Email Preview Modal
  const [previewEmails, setPreviewEmails] = useState<SimulatedEmail[]>([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Quick New Lead Modal
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // Load data from leadStorage
  const refreshData = () => {
    const loadedLeads = leadStorage.getLeads();
    setLeads(loadedLeads);
    setCampaigns(leadStorage.getCampaigns());
    setDeals(leadStorage.getPartnershipProjects());
    setEmails(leadStorage.getEmails());

    // If a lead was currently selected, refresh its reference
    if (selectedLead) {
      const refreshed = loadedLeads.find((l) => l.id === selectedLead.id);
      if (refreshed) setSelectedLead(refreshed);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handle initialLeadId from navigation
  useEffect(() => {
    if (initialLeadId && leads.length > 0) {
      const target = leads.find((l) => l.id === initialLeadId);
      if (target) {
        setSelectedLead(target);
        setIsDrawerOpen(true);
        setActiveTab('leads');
      }
    }
  }, [initialLeadId, leads]);

  // Lead status change handler
  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    leadStorage.updateLeadStatus(leadId, newStatus, 'Operador YELA Admin');
    refreshData();
  };

  // Add note handler
  const handleAddNote = (leadId: string, text: string, author: string) => {
    leadStorage.addLeadNote(leadId, text, author);
    refreshData();
  };

  // Reset Demo Data
  const handleResetData = () => {
    leadStorage.resetToDemo();
    refreshData();
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Empresa', 'Provincia', 'Servico', 'Status', 'Origem', 'DataCriacao'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      l.phone,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.province,
      `"${l.serviceName.replace(/"/g, '""')}"`,
      l.status,
      l.sourceChannel || l.foundUsVia,
      l.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_yela_corporation_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const newLeadsCount = leads.filter((l) => l.status === 'Novo').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <AdminHeader
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        onResetData={handleResetData}
        onQuickNewLead={() => setIsNewLeadModalOpen(true)}
        onExportCsv={handleExportCsv}
        totalLeadsCount={leads.length}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Tab View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: VISÃO GERAL / DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <AdminMetrics
              leads={leads}
              campaigns={campaigns}
              onSelectStatusFilter={(status) => {
                setStatusFilter(status);
                setActiveTab('leads');
              }}
            />

            {/* Quick Leads Snapshot */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Leads Mais Recentes a Requerer Atenção
                </h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                >
                  Ver Todos os Leads →
                </button>
              </div>

              <LeadsTable
                leads={leads.slice(0, 6)}
                onSelectLead={(lead) => {
                  setSelectedLead(lead);
                  setIsDrawerOpen(true);
                }}
                onStatusChange={handleStatusChange}
                onViewEmails={(em) => {
                  setPreviewEmails(em);
                  setIsEmailModalOpen(true);
                }}
                statusFilter={statusFilter}
                onClearStatusFilter={() => setStatusFilter('TODOS')}
              />
            </div>
          </div>
        )}

        {/* TAB 2: GESTÃO DE LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Gestão Centralizada de Oportunidades & Leads
                </h2>
                <p className="text-xs text-slate-500">
                  Triagem, qualificação e encaminhamento de dossiers para a equipa técnica da Learn Code
                </p>
              </div>
            </div>

            <LeadsTable
              leads={leads}
              onSelectLead={(lead) => {
                setSelectedLead(lead);
                setIsDrawerOpen(true);
              }}
              onStatusChange={handleStatusChange}
              onViewEmails={(em) => {
                setPreviewEmails(em);
                setIsEmailModalOpen(true);
              }}
              statusFilter={statusFilter}
              onClearStatusFilter={() => setStatusFilter('TODOS')}
            />
          </div>
        )}

        {/* TAB 3: CAMPANHAS & ORIGENS */}
        {activeTab === 'campanhas' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Gestão de Campanhas & Rastreamento de Canais
              </h2>
              <p className="text-xs text-slate-500">
                Acompanhe o retorno de prospecção por canal e gere links rastreáveis para campanhas
              </p>
            </div>

            <CampaignsModule
              campaigns={campaigns}
              leads={leads}
              onOpenLeadModal={() => setIsNewLeadModalOpen(true)}
              onFilterLeadsBySource={(src) => {
                setActiveTab('leads');
              }}
            />
          </div>
        )}

        {/* TAB 4: MODELO DA PARCERIA (70/30) */}
        {activeTab === 'parceria' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Modelo Financeiro da Parceria YELA Corporation × Learn Code
              </h2>
              <p className="text-xs text-slate-500">
                Divisão acordada de valores líquidos partilháveis (70% Engenharia / 30% Prospecção)
              </p>
            </div>

            <PartnershipDealsModule deals={deals} />
          </div>
        )}

        {/* TAB 5: NOTIFICAÇÕES (RESEND READY) */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Notificações Transacionais & Integração Resend
              </h2>
              <p className="text-xs text-slate-500">
                Inspeção de templates, destinatários e simulação de disparos transacionais
              </p>
            </div>

            <EmailLogsModule
              emails={emails}
              leads={leads}
              onViewSingleEmail={(em) => {
                setPreviewEmails([em]);
                setIsEmailModalOpen(true);
              }}
              onRefreshLogs={refreshData}
            />
          </div>
        )}

      </main>

      {/* DRAWERS & MODALS */}
      <LeadDetailDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusChange={handleStatusChange}
        onAddNote={handleAddNote}
        onViewEmails={(em) => {
          setPreviewEmails(em);
          setIsEmailModalOpen(true);
        }}
      />

      <EmailPreviewModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        emails={previewEmails}
      />

      <LeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        onSuccess={(lead) => {
          refreshData();
          setIsNewLeadModalOpen(false);
          setSelectedLead(lead);
          setIsDrawerOpen(true);
        }}
      />

    </div>
  );
};
