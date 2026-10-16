import React, { useState } from 'react';
import { X, Mail, ShieldCheck, Copy, Check, Code2, Layers, ExternalLink } from 'lucide-react';
import { SimulatedEmail } from '../types';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  emails: SimulatedEmail[];
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  emails,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || emails.length === 0) return null;

  const currentEmail = emails[activeTab] || emails[0];

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(currentEmail.htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Simulador de Notificações
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  Resend Architecture Ready
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Registo de Notificações Transacionais do Lead
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: One for each email recipient */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {emails.map((email, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={email.id || idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <span>{email.recipientRole}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{showCode ? 'Ver Visual' : 'Ver Resend Code'}</span>
            </button>
            <button
              onClick={handleCopyHtml}
              className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar HTML'}</span>
            </button>
          </div>
        </div>

        {/* Email Header Details */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 text-xs text-slate-600 space-y-1 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 w-16 uppercase">Para:</span>
            <span className="font-semibold text-slate-900">{currentEmail.to}</span>
            <span className="text-slate-400">({currentEmail.recipientRole})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 w-16 uppercase">Assunto:</span>
            <span className="font-semibold text-slate-800">{currentEmail.subject}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="font-bold text-slate-400 w-16 uppercase">Data:</span>
            <span>{currentEmail.sentAt}</span>
            <span className="text-slate-300">•</span>
            <span>Provedor: {currentEmail.simulatedProvider}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAF9F6]">
          {showCode ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
                <div className="text-slate-400 mb-2">// Código de integração Resend (Backend / FastAPI / Express):</div>
                <pre>{`import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'YELA Corporation <notificacoes@yela.co.mz>',
  to: '${currentEmail.to}',
  subject: '${currentEmail.subject}',
  html: \`...HTML Template...\`,
});`}</pre>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  HTML Bruto Gerado:
                </h5>
                <pre className="text-[11px] text-slate-600 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto bg-slate-50 p-3 rounded border">
                  {currentEmail.htmlContent.trim()}
                </pre>
              </div>
            </div>
          ) : (
            <div 
              className="max-w-2xl mx-auto shadow-sm rounded-xl overflow-hidden border border-slate-200 bg-white"
              dangerouslySetInnerHTML={{ __html: currentEmail.htmlContent }}
            />
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Estrutura pronta para conexão direta com chaves de API do Resend no backend de produção.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
