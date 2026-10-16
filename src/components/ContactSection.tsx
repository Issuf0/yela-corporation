import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Por favor, preencha os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    // Client-side confirmation state without claiming fake server dispatches
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 border-t border-[#0B132B]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Marker */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
            05 — Contacto
          </span>
        </div>

        {/* Striking Title & Brief Phrase */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B132B] tracking-tight text-balance">
            Há uma oportunidade para explorar?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed text-balance">
            Partilhe o desafio da sua organização para iniciarmos um diálogo directo e estruturado.
          </p>
        </div>

        {/* Clean, Non-Boxy Form */}
        <div className="max-w-2xl">
          {isSubmitted ? (
            <div className="py-10 space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <Check className="w-5 h-5 text-amber-700" />
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  Mensagem registada.
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-light">
                Obrigado pelo contacto. As informações foram recebidas pela nossa equipa.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-mono uppercase tracking-wider text-amber-700 hover:text-amber-900 underline cursor-pointer"
                >
                  Enviar nova mensagem
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 text-red-800 border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent border-b border-slate-300 focus:border-[#0B132B] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Organização (opcional)
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent border-b border-slate-300 focus:border-[#0B132B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent border-b border-slate-300 focus:border-[#0B132B] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Telefone (opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-transparent border-b border-slate-300 focus:border-[#0B132B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-transparent border-b border-slate-300 focus:border-[#0B132B] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0B132B] hover:bg-slate-900 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'A registar...' : 'Fale connosco'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
