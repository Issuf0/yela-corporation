import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { Lead, SimulatedEmail } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  onSuccess?: (lead: Lead, sentEmails: SimulatedEmail[]) => void;
  onViewEmails?: (emails: SimulatedEmail[]) => void;
  onNavigateAdmin?: (leadId: string) => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  onSuccess,
  onViewEmails,
  onNavigateAdmin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                YELA Corporation
              </span>
              <span className="text-xs text-slate-500">× Learn Code</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Solicitar Solução Tecnológica
            </h3>
          </div>

          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <LeadForm
            initialServiceId={serviceId}
            onSuccess={onSuccess}
            onViewEmails={onViewEmails}
            onNavigateAdmin={(id) => {
              onClose();
              if (onNavigateAdmin) onNavigateAdmin(id);
            }}
          />
        </div>
      </div>
    </div>
  );
};
