export type LeadStatus =
  | 'Novo'
  | 'Contactado'
  | 'Qualificado'
  | 'Proposta'
  | 'Convertido'
  | 'Não convertido';

export interface LeadNote {
  id: string;
  createdAt: string;
  author: string;
  text: string;
}

export interface StatusHistoryEntry {
  fromStatus: LeadStatus;
  toStatus: LeadStatus;
  changedAt: string;
  changedBy: string;
  note?: string;
}

export interface Lead {
  id: string; // e.g. YELA-2026-0012
  createdAt: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  province: string;
  serviceId: string;
  serviceName: string;
  challengeDescription: string;
  estimatedBudget?: string;
  intendedTimeline?: string;
  foundUsVia: string;
  consentEmail: boolean;
  status: LeadStatus;
  sourcePage: string;
  campaignId?: string;
  sourceChannel: string;
  notes: LeadNote[];
  history: StatusHistoryEntry[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  problemSolved: string;
  targetAudience: string;
  badge: string;
  iconName: string;
  highlights: string[];
}

export interface ProjectCase {
  id: string;
  title: string;
  clientSector: string;
  location: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  isDemo: boolean;
  imageUrl?: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
  isDemo: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  period: string;
  sourceCode: string;
  leadsGenerated: number;
  leadsQualified: number;
  conversions: number;
  active: boolean;
}

export interface PartnershipProject {
  id: string;
  leadId: string;
  clientName: string;
  projectTitle: string;
  serviceName: string;
  totalReceivedMZN: number;
  approvedDirectCostsMZN: number;
  netShareableMZN: number;
  learnCodeShareMZN: number; // 70%
  yelaShareMZN: number; // 30%
  status: 'Em Análise Técnica' | 'Em Desenvolvimento' | 'Concluído' | 'Faturado';
  dateInitiated: string;
}

export interface SimulatedEmail {
  id: string;
  leadId: string;
  to: string;
  recipientRole: 'Learn Code (Técnica)' | 'YELA Corporation (Interno)' | 'Potencial Cliente';
  subject: string;
  htmlContent: string;
  sentAt: string;
  simulatedProvider: 'Resend (Sandbox Ready)';
}
