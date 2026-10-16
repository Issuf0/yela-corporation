export const MOZAMBIQUE_PROVINCES = [
  'Maputo Cidade',
  'Maputo Província',
  'Gaza',
  'Inhambane',
  'Sofala',
  'Manica',
  'Tete',
  'Zambézia',
  'Nampula',
  'Cabo Delgado',
  'Niassa',
] as const;

export const BUDGET_RANGES = [
  'Até 100.000 MT',
  '100.000 MT — 250.000 MT',
  '250.000 MT — 500.000 MT',
  '500.000 MT — 1.000.000 MT',
  'Mais de 1.000.000 MT',
  'Sob avaliação técnica conjunta',
] as const;

export const TIMELINE_OPTIONS = [
  'Urgente (menos de 1 mês)',
  '1 a 2 meses',
  '3 a 6 meses',
  'Planeamento estratégico (> 6 meses)',
  'Flexível',
] as const;

export const HOW_FOUND_OPTIONS = [
  'Redes Sociais (LinkedIn, Facebook, Instagram)',
  'Recomendação ou Contacto Direto',
  'Evento / Conferência Empresarial',
  'Prospecção Comercial YELA',
  'Parceiro Learn Code',
  'Pesquisa Online / Google',
  'Outro',
] as const;

export const LEAD_STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  Novo: {
    label: 'Novo',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    desc: 'Lead acabado de submeter, a aguardar primeiro contacto comercial da YELA.',
  },
  Contactado: {
    label: 'Contactado',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    desc: 'Equipa YELA realizou a primeira chamada de validação com o cliente.',
  },
  Qualificado: {
    label: 'Qualificado',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    desc: 'Requisitos validados e encaminhados para a Learn Code para análise técnica.',
  },
  Proposta: {
    label: 'Proposta',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    desc: 'Learn Code elaborou a proposta técnica e orçamental enviada ao cliente.',
  },
  Convertido: {
    label: 'Convertido',
    bg: 'bg-teal-50',
    text: 'text-teal-800',
    border: 'border-teal-300',
    desc: 'Contrato assinado. Projecto em execução pela Learn Code com acompanhamento YELA.',
  },
  'Não convertido': {
    label: 'Não convertido',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    desc: 'Lead arquivado (desistência do cliente ou requisitos fora de âmbito).',
  },
};
