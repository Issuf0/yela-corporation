import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  User, 
  History, 
  MessageSquare, 
  Send,
  Layers,
  Sparkles,
  DollarSign,
  Clock
} from 'lucide-react';
import { Lead, LeadStatus, SimulatedEmail } from '../../types';
import { LEAD_STATUS_CONFIG } from '../../data/constants';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onAddNote: (leadId: string, noteText: string, author: string) => void;
  onViewEmails: (emails: SimulatedEmail[]) => void;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onAddNote,
  onViewEmails,
}) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [authorName, setAuthorName] = useState('Equipa YELA Prospecção');

  if (!isOpen || !lead) return null;

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(lead.id, newNoteText.trim(), authorName);
    setNewNoteText('');
  };

  const stages: { key: LeadStatus; label: string; desc: string }[] = [
    { key: 'Novo', label: 'Lead Criado', desc: 'Registo inicial no sistema' },
    { key: 'Contactado', label: 'Contactado', desc: 'Primeira chamada de acolhimento' },
    { key: 'Qualificado', label: 'Qualificado', desc: 'Dossiê validado para a Learn Code' },
    { key: 'Proposta', label: 'Proposta', desc: 'Orçamento técnico emitido' },
    { key: 'Convertido', label: 'Convertido', desc: 'Adjudicação e início de projecto' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === lead.status);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
              ID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  {lead.id}
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {lead.province}
                </span>
              </div>
              <h2 className="text-base font-bold text-white leading-tight mt-0.5">
                {lead.companyName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar gaveta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FAF9F6]">
          
          {/* 1. INTERACTIVE TIMELINE / STATUS PROGRESSION */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Estado do Lead no Pipeline
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Alterar para:</span>
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
                  className="text-xs font-bold py-1 px-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:border-amber-600"
                >
                  <option value="Novo">Novo</option>
                  <option value="Contactado">Contactado</option>
                  <option value="Qualificado">Qualificado</option>
                  <option value="Proposta">Proposta</option>
                  <option value="Convertido">Convertido</option>
                  <option value="Não convertido">Não convertido</option>
                </select>
              </div>
            </div>

            {/* Stage Progression Bar */}
            {lead.status === 'Não convertido' ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
                <span className="font-semibold">Oportunidade Arquivada como Não Convertida</span>
                <span className="text-[11px] text-rose-600">Pode reativar alterando o estado acima</span>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-2 pt-2">
                {stages.map((stg, idx) => {
                  const isPast = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;
                  return (
                    <div
                      key={stg.key}
                      onClick={() => onStatusChange(lead.id, stg.key)}
                      className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-sm'
                          : isPast
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-[11px] font-mono mb-0.5">0{idx + 1}</div>
                      <div className="text-xs font-semibold leading-tight">{stg.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. CONTACT PERSON & ORGANIZATION INFORMATION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Contact Person */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                Pessoa de Contacto
              </span>
              <div>
                <div className="text-base font-bold text-slate-900">{lead.fullName}</div>
                <div className="text-xs text-slate-500">{lead.companyName}</div>
              </div>
              <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${lead.email}`} className="text-amber-700 hover:underline">
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lead.phone}</span>
                </div>
              </div>
            </div>

            {/* Organization */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-600" />
                Dados da Organização
              </span>
              <div>
                <div className="text-base font-bold text-slate-900">{lead.companyName}</div>
                <div className="text-xs text-slate-500">{lead.province}</div>
              </div>
              <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Província de {lead.province}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>Origem:</span>
                  <strong className="text-slate-700">{lead.sourceChannel || lead.foundUsVia || 'Website Orgânico'}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* 3. REQUESTED SOLUTION & BUDGET / TIMELINE */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                Especificação da Solicitação
              </span>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {lead.serviceName}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Descrição do Desafio / Necessidade:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {lead.challengeDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Expectativa Orçamental</span>
                <span className="text-slate-800 font-semibold">{lead.estimatedBudget || 'Sob avaliação conjunta'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Horizonte Temporal</span>
                <span className="text-slate-800 font-semibold">{lead.intendedTimeline || 'Flexível'}</span>
              </div>
            </div>

            {lead.campaignId && (
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between font-mono">
                <span>Campanha Associada: <strong>{lead.campaignId}</strong></span>
                <span>Canal: <strong>{lead.sourceChannel}</strong></span>
              </div>
            )}
          </div>

          {/* 4. HISTÓRICO DE AUDITORIA / TRANSITIONS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-400" />
              Histórico de Alterações de Estado
            </span>

            <div className="space-y-3">
              {lead.history.map((hist, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs border-l-2 border-slate-200 pl-3 py-1">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-800">
                        {hist.fromStatus} → {hist.toStatus}
                      </strong>
                      <span className="text-[11px] text-slate-400 font-mono">{hist.changedAt}</span>
                    </div>
                    {hist.note && (
                      <p className="text-slate-600 mt-0.5">{hist.note}</p>
                    )}
                    <span className="text-[10px] text-slate-400">Por: {hist.changedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. INTERNAL NOTES (ADICIONAR NOTA) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              Notas Internas de Acompanhamento ({lead.notes.length})
            </span>

            {/* Notes List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {lead.notes.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Sem notas internas registadas ainda.</p>
              ) : (
                lead.notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <strong className="text-slate-700">{note.author}</strong>
                      <span className="font-mono">{note.createdAt}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{note.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleCreateNote} className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Escrever nota de acompanhamento (ex: reunimos com o diretor comercial...)"
                  className="flex-1 text-xs py-2 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-600 bg-white"
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Registo criado em {lead.createdAt}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
