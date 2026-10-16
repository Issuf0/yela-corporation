import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { DEMO_INSIGHTS } from '../data/insightsData';
import { InsightArticle } from '../types';

export const InsightsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  return (
    <div className="flex flex-col w-full">
      
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Conhecimento & Mercado
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Insights & Publicações
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Reflexões pragmáticas sobre prospecção, transformação digital, modelos de parceria e dinâmicas empresariais em Moçambique.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstrative Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Conteúdo Demonstrativo:</strong> Artigos demonstrativos preparados para a estrutura de publicação e comunicação institucional da YELA Corporation.
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_INSIGHTS.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{art.date}</span>
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    <span>Ler Artigo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Modal for Reading Article */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                Fechar
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedArticle.title}
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-4">
                <span>{selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
            </div>

            <div className="prose prose-slate text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-medium text-slate-900">
                {selectedArticle.excerpt}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                A YELA Corporation continua a monitorizar de perto a evolução do ambiente de negócios e parcerias em Moçambique, partilhando diretrizes pragmáticas para os nossos clientes e parceiros.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
