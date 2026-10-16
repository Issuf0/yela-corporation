import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Linkedin, 
  Facebook, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Canais Institucionais
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Contacte a YELA Corporation
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Estamos disponíveis para dialogar sobre parcerias, prospecção comercial, necessidades corporativas e expansão territorial em Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Card */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Presença & Atendimento
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
                  Canais de Comunicação Direta
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Utilize os canais formais da organização para agendar reuniões executivas ou apresentar a sua organização.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Localização Institucional</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Av. Julius Nyerere, Polana Cimento, Maputo — República de Moçambique
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium mt-1">
                      Cobertura operacional nas zonas Sul, Centro e Norte
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Correio Eletrónico</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Geral: <a href="mailto:contacto@yela.co.mz" className="text-amber-700 font-semibold">contacto@yela.co.mz</a>
                    </p>
                    <p className="text-xs text-slate-600">
                      Parcerias: <a href="mailto:parcerias@yela.co.mz" className="text-amber-700 font-semibold">parcerias@yela.co.mz</a>
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Contactos Telefónicos</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Linha Fixa: +258 21 000 000
                    </p>
                    <p className="text-xs text-slate-600">
                      Móvel Corporativo: +258 84 000 0000
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Horário de Atendimento</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Segunda a Sexta-feira: 08h00 — 17h00 (Hora de Maputo)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels placeholders */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Presença Institucional Online:
                </h4>
                <div className="flex items-center gap-3 text-xs">
                  <span className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5 font-medium shadow-sm">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn YELA
                  </span>
                  <span className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5 font-medium shadow-sm">
                    <Facebook className="w-4 h-4 text-blue-700" />
                    Facebook
                  </span>
                  <span className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5 font-medium shadow-sm">
                    <Globe className="w-4 h-4 text-amber-600" />
                    yela.co.mz
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 italic">
                  * Não disponibilizamos atendimento via WhatsApp nesta versão.
                </p>
              </div>

            </div>

            {/* General Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Enviar Mensagem Institucional
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Preencha o formulário para questões gerais, propostas de cooperação ou marcação de reunião.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-bold text-emerald-950">
                      Mensagem Enviada com Sucesso
                    </h4>
                    <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                      Agradecemos o seu contacto. A nossa equipa de comunicação institucional responderá com brevidade.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Ex: Manuel Langa"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Organização *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.organization}
                          onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                          placeholder="Ex: Empresa ou Instituição"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="nome@dominio.co.mz"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="+258 ..."
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Ex: Proposta de Colaboração Institucional"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Mensagem *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Descreva o motivo do seu contacto..."
                        className="w-full p-3.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensagem</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
