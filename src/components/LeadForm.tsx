import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Layers, 
  FileText, 
  Calendar, 
  DollarSign, 
  ArrowRight,
  Eye,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { 
  MOZAMBIQUE_PROVINCES, 
  BUDGET_RANGES, 
  TIMELINE_OPTIONS, 
  HOW_FOUND_OPTIONS 
} from '../data/constants';
import { DIGITAL_SOLUTIONS } from '../data/solutionsData';
import { leadStorage } from '../services/leadStorage';
import { Lead, SimulatedEmail } from '../types';

interface LeadFormProps {
  initialServiceId?: string;
  sourcePage?: string;
  campaignId?: string;
  onSuccess?: (lead: Lead, sentEmails: SimulatedEmail[]) => void;
  onViewEmails?: (emails: SimulatedEmail[]) => void;
  onNavigateAdmin?: (leadId: string) => void;
  isEmbedded?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialServiceId,
  sourcePage = window.location.pathname,
  campaignId,
  onSuccess,
  onViewEmails,
  onNavigateAdmin,
  isEmbedded = false,
}) => {
  const [formData, setFormData] = useState<{
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    province: string;
    serviceId: string;
    challengeDescription: string;
    estimatedBudget: string;
    intendedTimeline: string;
    foundUsVia: string;
    consentEmail: boolean;
  }>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    province: 'Maputo Cidade',
    serviceId: initialServiceId || DIGITAL_SOLUTIONS[0].id,
    challengeDescription: '',
    estimatedBudget: '',
    intendedTimeline: '',
    foundUsVia: HOW_FOUND_OPTIONS[0],
    consentEmail: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [generatedEmails, setGeneratedEmails] = useState<SimulatedEmail[]>([]);

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Por favor indique o seu nome completo.';
    if (!formData.companyName.trim()) errs.companyName = 'Por favor indique a empresa ou organização.';
    
    if (!formData.email.trim()) {
      errs.email = 'O endereço de email é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Por favor insira um endereço de email válido.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Por favor indique um contacto telefónico.';
    }

    if (!formData.province) {
      errs.province = 'Seleccione a província de referência.';
    }

    if (!formData.challengeDescription.trim() || formData.challengeDescription.length < 15) {
      errs.challengeDescription = 'Descreva o seu desafio com pelo menos 15 caracteres para permitir uma análise contextualizada.';
    }

    if (!formData.consentEmail) {
      errs.consentEmail = 'É necessário autorizar o contacto institucional por email para prosseguir.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate slight network processing latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      const selectedService = DIGITAL_SOLUTIONS.find((s) => s.id === formData.serviceId);
      const serviceName = selectedService ? selectedService.name : 'Solução Digital Corporativa';

      // Detect campaign from URL query if available
      const urlParams = new URLSearchParams(window.location.search);
      const activeCampaign = campaignId || urlParams.get('utm_campaign') || urlParams.get('campaign_id') || 'CMP-2026-ORGANIC';
      const activeSource = urlParams.get('utm_source') || 'Formulário Plataforma';

      const result = await leadStorage.createLead({
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        province: formData.province,
        serviceId: formData.serviceId,
        serviceName,
        challengeDescription: formData.challengeDescription.trim(),
        estimatedBudget: formData.estimatedBudget || undefined,
        intendedTimeline: formData.intendedTimeline || undefined,
        foundUsVia: formData.foundUsVia,
        consentEmail: formData.consentEmail,
        sourcePage: sourcePage || window.location.pathname,
        campaignId: activeCampaign,
        sourceChannel: activeSource,
      });

      setSubmittedLead(result.lead);
      setGeneratedEmails(result.sentEmails);

      if (onSuccess) {
        onSuccess(result.lead, result.sentEmails);
      }
    } catch (err) {
      console.error(err);
      setErrors({ global: 'Ocorreu um erro ao processar o seu pedido. Por favor tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setGeneratedEmails([]);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      province: 'Maputo Cidade',
      serviceId: DIGITAL_SOLUTIONS[0].id,
      challengeDescription: '',
      estimatedBudget: '',
      intendedTimeline: '',
      foundUsVia: HOW_FOUND_OPTIONS[0],
      consentEmail: false,
    });
    setErrors({});
  };

  // SUCCESS CONFIRMATION VIEW
  if (submittedLead) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200/80 shadow-sm text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Pedido Registado com Sucesso
        </span>

        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
          Obrigado, {submittedLead.fullName}!
        </h3>

        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          O seu desafio empresarial foi submetido. A equipa da <strong>YELA Corporation</strong> está a analisar a sua solicitação para qualificação e encaminhamento técnico à <strong>Learn Code</strong>.
        </p>

        {/* Lead Reference Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-lg mx-auto text-left mb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Identificador Único (Lead ID)
            </span>
            <span className="font-mono font-bold text-amber-600 text-base bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              {submittedLead.id}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Organização:</span>
              <span className="font-medium text-slate-900">{submittedLead.companyName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Província:</span>
              <span className="font-medium text-slate-900">{submittedLead.province}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 block">Solução Seleccionada:</span>
              <span className="font-semibold text-slate-900">{submittedLead.serviceName}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Estado inicial: <strong>Novo</strong>. 3 notificações automáticas disparadas (Learn Code, YELA e Cliente).</span>
          </div>
        </div>

        {/* Email Simulation Showcase */}
        {generatedEmails.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 max-w-lg mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                Simulador de Notificações (Resend Ready)
              </span>
              <span className="text-[10px] bg-amber-200/70 text-amber-800 font-semibold px-2 py-0.5 rounded">
                3 Emails Gerados
              </span>
            </div>
            <p className="text-xs text-amber-800/90 mb-3">
              No protótipo funcional, pode inspecionar exatamente os emails formatados enviados para a <strong>Learn Code</strong> (análise técnica), para a <strong>YELA</strong> e para o <strong>Cliente</strong>.
            </p>
            {onViewEmails && (
              <button
                type="button"
                id="btn-inspect-emails-success"
                onClick={() => onViewEmails(generatedEmails)}
                className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualizar Notificações de Email Geradas</span>
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onNavigateAdmin && (
            <button
              type="button"
              id="btn-view-in-admin"
              onClick={() => onNavigateAdmin(submittedLead.id)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Acompanhar Lead no Admin</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          )}

          <button
            type="button"
            id="btn-new-lead-form"
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
          >
            Submeter Outro Pedido
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE FORM VIEW
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.global && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.global}</span>
        </div>
      )}

      {/* Grid 1: Informações do Contacto e Entidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lead-fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Nome Completo <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              id="lead-fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Ex: Isaura Machava"
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-amber-600'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="lead-companyName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Empresa ou Organização <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              id="lead-companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Ex: Rovuma Distribuição, SA"
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                errors.companyName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-amber-600'
              }`}
            />
          </div>
          {errors.companyName && <p className="text-xs text-rose-600 mt-1">{errors.companyName}</p>}
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Endereço de Email <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              id="lead-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="nome@organizacao.co.mz"
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-amber-600'
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Contacto Telefónico <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              id="lead-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+258 84 / 82 / 86 / 87 ..."
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-amber-600'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Grid 2: Província e Solução */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lead-province" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Província de Atuação <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              id="lead-province"
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-600 text-slate-800"
            >
              {MOZAMBIQUE_PROVINCES.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lead-serviceId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Serviço / Solução Pretendida <span className="text-amber-600">*</span>
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              id="lead-serviceId"
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-600 text-slate-800 font-medium"
            >
              {DIGITAL_SOLUTIONS.map((sol) => (
                <option key={sol.id} value={sol.id}>
                  {sol.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Descrição do Desafio */}
      <div>
        <label htmlFor="lead-challengeDescription" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Descrição do Desafio ou Necessidade <span className="text-amber-600">*</span>
        </label>
        <textarea
          id="lead-challengeDescription"
          rows={4}
          value={formData.challengeDescription}
          onChange={(e) => setFormData({ ...formData, challengeDescription: e.target.value })}
          placeholder="Descreva brevemente o problema atual da sua organização, processos que pretende melhorar ou objetivos que quer alcançar com esta solução..."
          className={`w-full p-3.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
            errors.challengeDescription ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-amber-600'
          }`}
        />
        {errors.challengeDescription ? (
          <p className="text-xs text-rose-600 mt-1">{errors.challengeDescription}</p>
        ) : (
          <p className="text-[11px] text-slate-500 mt-1">
            A YELA fará o diagnóstico preliminar e a ponte estruturada com os engenheiros da Learn Code.
          </p>
        )}
      </div>

      {/* Orçamento e Prazo (Opcionais) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <div>
          <label htmlFor="lead-budget" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Orçamento Estimado (Opcional)
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              id="lead-budget"
              value={formData.estimatedBudget}
              onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-600 text-slate-700"
            >
              <option value="">Seleccionar intervalo estimado (MZN)...</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lead-timeline" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Prazo Pretendido (Opcional)
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              id="lead-timeline"
              value={formData.intendedTimeline}
              onChange={(e) => setFormData({ ...formData, intendedTimeline: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-600 text-slate-700"
            >
              <option value="">Seleccionar urgência de implementação...</option>
              {TIMELINE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Como conheceu a YELA */}
      <div>
        <label htmlFor="lead-howFound" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
          Como tomou conhecimento da YELA Corporation?
        </label>
        <select
          id="lead-howFound"
          value={formData.foundUsVia}
          onChange={(e) => setFormData({ ...formData, foundUsVia: e.target.value })}
          className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-600 text-slate-700"
        >
          {HOW_FOUND_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Consentimento para contacto */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id="lead-consent"
            checked={formData.consentEmail}
            onChange={(e) => setFormData({ ...formData, consentEmail: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-900">
            Autorizo a YELA Corporation a utilizar os dados indicados para contacto institucional e posterior encaminhamento à parceira técnica Learn Code para efeitos de proposta e viabilidade técnica. <span className="text-amber-600 font-bold">*</span>
          </span>
        </label>
        {errors.consentEmail && <p className="text-xs text-rose-600 mt-1">{errors.consentEmail}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          id="lead-submit-btn"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg disabled:opacity-60 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>A registar solicitação e a gerar notificações...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submeter Solicitação de Solução</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-500 mt-2.5">
          Comunicação estritamente institucional. Sem spam. Não utilizamos WhatsApp nesta versão.
        </p>
      </div>
    </form>
  );
};
