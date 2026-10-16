import React, { useState } from 'react';
import { 
  Mail, 
  Code2, 
  Eye, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { SimulatedEmail, Lead } from '../../types';
import { emailService } from '../../services/emailService';
import { leadStorage } from '../../services/leadStorage';

interface EmailLogsModuleProps {
  emails: SimulatedEmail[];
  leads: Lead[];
  onViewSingleEmail: (email: SimulatedEmail) => void;
  onRefreshLogs: () => void;
}

export const EmailLogsModule: React.FC<EmailLogsModuleProps> = ({
  emails,
  leads,
  onViewSingleEmail,
  onRefreshLogs,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [testLeadIndex, setTestLeadIndex] = useState(0);
  const [dispatchedTest, setDispatchedTest] = useState(false);

  const handleSimulateDispatch = async () => {
    if (leads.length === 0) return;
    const lead = leads[testLeadIndex % leads.length];
    setTestLeadIndex((prev) => prev + 1);
    
    // Process simulated emails
    const generated = await emailService.processLeadEmails(lead);
    leadStorage.saveEmails(generated);
    setDispatchedTest(true);
    onRefreshLogs();
    setTimeout(() => setDispatchedTest(false), 3000);
  };

  const copyResendSnippet = () => {
    const code = `// Integração Backend de Produção com Resend (Node.js/Express)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotifications(leadData) {
  // 1. Notificação Técnica para a Learn Code
  await resend.emails.send({
    from: 'YELA Corporation <leads@yela.co.mz>',
    to: 'tecnica@learncode.co.mz',
    subject: \`Novo Lead YELA — [\${leadData.serviceName}] — [\${leadData.id}]\`,
    html: generateLearnCodeTemplate(leadData),
  });

  // 2. Confirmação ao Cliente
  await resend.emails.send({
    from: 'YELA Corporation <apoio@yela.co.mz>',
    to: leadData.email,
    subject: 'Recebemos o seu pedido de solução - YELA Corporation',
    html: generateClientConfirmationTemplate(leadData),
  });
}`;
    navigator.clipboard.writeText(code);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. ARCHITECTURAL OVERVIEW FOR RESEND */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Arquitetura Transacional
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                  Resend Ready
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Motor de Notificações Transacionais Automáticas
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyResendSnippet}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? 'Código Copiado!' : 'Copiar SDK Backend'}</span>
            </button>
            <button
              onClick={handleSimulateDispatch}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{dispatchedTest ? 'Emails Disparados!' : 'Simular Disparo'}</span>
            </button>
          </div>
        </div>

        {/* 3 Pipeline Recipients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>01. Learn Code (Engenharia)</span>
              <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Técnico</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Recebe dossiê completo de especificações: escopo, orçamento pretendido, tecnologias sugeridas e dados de contacto para orçamentação técnica.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Destinatário: <strong>tecnica@learncode.co.mz</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>02. YELA (Comercial Interno)</span>
              <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded border border-amber-800">Gestão</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Notificação imediata para a equipa comercial iniciar a triagem de acolhimento e agendamento de reunião institucional em Maputo.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Destinatário: <strong>comercial@yela.co.mz</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-blue-400 font-bold">
              <span>03. Cliente (Confirmação)</span>
              <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded border border-blue-800">Boas-Vindas</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Email com ID de rastreio exclusivo, garantias de confidencialidade e etapas transparentes dos próximos passos na parceria YELA × Learn Code.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Destinatário: <strong>email_do_proponente@dominio</strong>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Estrutura pronta para produção: as chaves de API reais do Resend serão injetadas via variáveis seguras de ambiente no servidor Express.
          </span>
          <span className="font-mono text-slate-500">API Status: Mocked & Validated</span>
        </div>
      </div>

      {/* 2. LOGS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Registo Histórico de Notificações Enviadas ({emails.length})
            </h3>
            <p className="text-xs text-slate-500">
              Registo de eventos transacionais gerados pelo envio de formulários e simulação
            </p>
          </div>
          <button
            onClick={onRefreshLogs}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            title="Atualizar lista"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Atualizar</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Destinatário</th>
                <th className="py-3.5 px-4">Papel / Função</th>
                <th className="py-3.5 px-4">Assunto do Email</th>
                <th className="py-3.5 px-4">Lead ID</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-center">Provedor</th>
                <th className="py-3.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {emails.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    Ainda não foram geradas notificações. Submeta um lead ou clique em "Simular Disparo".
                  </td>
                </tr>
              ) : (
                emails.slice().reverse().map((em) => (
                  <tr key={em.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {em.to}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        em.recipientRole.includes('Learn Code')
                          ? 'bg-emerald-100 text-emerald-900'
                          : em.recipientRole.includes('YELA')
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {em.recipientRole}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">
                      <div className="truncate max-w-[280px]" title={em.subject}>
                        {em.subject}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700 whitespace-nowrap">
                      {em.leadId}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {em.sentAt}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border">
                        {em.simulatedProvider}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onViewSingleEmail(em)}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver HTML</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
