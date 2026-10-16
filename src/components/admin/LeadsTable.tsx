import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  ArrowUpDown, 
  CheckCircle2, 
  Building, 
  MapPin, 
  X 
} from 'lucide-react';
import { Lead, LeadStatus, SimulatedEmail } from '../../types';
import { MOZAMBIQUE_PROVINCES, LEAD_STATUS_CONFIG } from '../../data/constants';

interface LeadsTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onViewEmails: (emails: SimulatedEmail[]) => void;
  statusFilter?: string;
  onClearStatusFilter?: () => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  onSelectLead,
  onStatusChange,
  onViewEmails,
  statusFilter,
  onClearStatusFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(statusFilter || 'TODOS');
  const [selectedSource, setSelectedSource] = useState('');
  const [sortField, setSortField] = useState<'createdAt' | 'name' | 'company'>('createdAt');
  const [sortAsc, setSortAsc] = useState(false);

  React.useEffect(() => {
    if (statusFilter) {
      setSelectedStatus(statusFilter);
    }
  }, [statusFilter]);

  // Unique services & sources for filter dropdowns
  const uniqueServices = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => set.add(l.serviceName || l.serviceId));
    return Array.from(set);
  }, [leads]);

  const uniqueSources = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => set.add(l.sourceChannel || l.foundUsVia || 'Website Orgânico'));
    return Array.from(set);
  }, [leads]);

  // Filtering
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesId = lead.id.toLowerCase().includes(term);
        const matchesName = lead.fullName.toLowerCase().includes(term);
        const matchesCompany = lead.companyName.toLowerCase().includes(term);
        const matchesEmail = lead.email.toLowerCase().includes(term);
        if (!matchesId && !matchesName && !matchesCompany && !matchesEmail) {
          return false;
        }
      }

      // Status
      if (selectedStatus && selectedStatus !== 'TODOS') {
        if (lead.status !== selectedStatus) return false;
      }

      // Province
      if (selectedProvince && lead.province !== selectedProvince) {
        return false;
      }

      // Service
      if (selectedService && (lead.serviceName || lead.serviceId) !== selectedService) {
        return false;
      }

      // Source
      if (selectedSource && (lead.sourceChannel || lead.foundUsVia || 'Website Orgânico') !== selectedSource) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = '';
      let valB = '';
      if (sortField === 'createdAt') {
        valA = a.createdAt;
        valB = b.createdAt;
      } else if (sortField === 'name') {
        valA = a.fullName;
        valB = b.fullName;
      } else if (sortField === 'company') {
        valA = a.companyName;
        valB = b.companyName;
      }
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [leads, searchTerm, selectedStatus, selectedProvince, selectedService, selectedSource, sortField, sortAsc]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedProvince('');
    setSelectedService('');
    setSelectedStatus('TODOS');
    setSelectedSource('');
    if (onClearStatusFilter) onClearStatusFilter();
  };

  const hasActiveFilters = searchTerm || selectedProvince || selectedService || (selectedStatus && selectedStatus !== 'TODOS') || selectedSource;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
      
      {/* Search & Filters Bar */}
      <div className="p-6 border-b border-slate-200 bg-[#FAF9F6] space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="admin-search-leads"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por ID, nome, empresa ou email..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Resultados: <strong className="text-slate-900">{filteredLeads.length}</strong> de {leads.length} leads</span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="ml-2 px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Status filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Estado
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-white rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-amber-600"
            >
              <option value="TODOS">Todos os Estados</option>
              <option value="Novo">Novo</option>
              <option value="Contactado">Contactado</option>
              <option value="Qualificado">Qualificado</option>
              <option value="Proposta">Proposta</option>
              <option value="Convertido">Convertido</option>
              <option value="Não convertido">Não convertido</option>
            </select>
          </div>

          {/* Province filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Província
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-white rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-amber-600"
            >
              <option value="">Todas as Províncias</option>
              {MOZAMBIQUE_PROVINCES.map((p: string) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Service filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Solução / Serviço
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-white rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-amber-600 truncate"
            >
              <option value="">Todos os Serviços</option>
              {uniqueServices.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Origin filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Origem / Canal
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-white rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:border-amber-600 truncate"
            >
              <option value="">Todas as Origens</option>
              {uniqueSources.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Table Component */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4 cursor-pointer" onClick={() => { setSortField('name'); setSortAsc(!sortAsc); }}>
                <div className="flex items-center gap-1">
                  <span>Contacto</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer" onClick={() => { setSortField('company'); setSortAsc(!sortAsc); }}>
                <div className="flex items-center gap-1">
                  <span>Empresa</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Solução Pretendida</th>
              <th className="py-3.5 px-4">Província</th>
              <th className="py-3.5 px-4">Origem / Canal</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4 cursor-pointer" onClick={() => { setSortField('createdAt'); setSortAsc(!sortAsc); }}>
                <div className="flex items-center gap-1">
                  <span>Data</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  Nenhum lead encontrado com os filtros selecionados.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const statusCfg = LEAD_STATUS_CONFIG[lead.status] || LEAD_STATUS_CONFIG['Novo'];
                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    onClick={() => onSelectLead(lead)}
                  >
                    {/* Lead ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700 whitespace-nowrap">
                      {lead.id}
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500">{lead.email}</div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{lead.companyName}</div>
                      <div className="text-[11px] text-slate-400">{lead.phone}</div>
                    </td>

                    {/* Service */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-700 line-clamp-1 max-w-[180px]" title={lead.serviceName}>
                        {lead.serviceName}
                      </span>
                    </td>

                    {/* Province */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {lead.province}
                    </td>

                    {/* Origin */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {lead.sourceChannel || lead.foundUsVia || 'Orgânico'}
                      </span>
                    </td>

                    {/* Status dropdown click-through */}
                    <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs font-semibold py-1 px-2 rounded-lg border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border} focus:outline-none cursor-pointer`}
                      >
                        <option value="Novo">Novo</option>
                        <option value="Contactado">Contactado</option>
                        <option value="Qualificado">Qualificado</option>
                        <option value="Proposta">Proposta</option>
                        <option value="Convertido">Convertido</option>
                        <option value="Não convertido">Não convertido</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {lead.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onSelectLead(lead)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
