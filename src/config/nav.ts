/** Páginas públicas. Fonte única para navegação, build multi-página, SEO e ligações «seguinte». */
export interface SitePage {
  /** Caminho público (cleanUrls na Vercel). */
  path: string;
  /** Ficheiro HTML de entrada na raiz do projecto. */
  file: string;
  /** Rótulo na navegação. */
  label: string;
  /** Aparece no menu principal? */
  inNav: boolean;
}

export const PAGES: readonly SitePage[] = [
  { path: '/', file: 'index.html', label: 'Início', inNav: false },
  { path: '/sobre', file: 'sobre.html', label: 'A YELA', inNav: true },
  { path: '/actuacao', file: 'actuacao.html', label: 'Áreas de actuação', inNav: true },
  { path: '/parceria', file: 'parceria.html', label: 'Parceria estratégica', inNav: true },
  { path: '/contacto', file: 'contacto.html', label: 'Contacto', inNav: true },
  { path: '/privacidade', file: 'privacidade.html', label: 'Privacidade', inNav: false },
];

export const NAV_PAGES = PAGES.filter((p) => p.inNav);

export function pageByPath(path: string): SitePage | undefined {
  return PAGES.find((p) => p.path === path);
}

/** Normaliza o pathname actual: "/sobre.html" e "/sobre/" → "/sobre"; "/index.html" → "/". */
export function normalisePath(pathname: string): string {
  let path = pathname.replace(/\.html$/, '').replace(/\/+$/, '');
  if (path === '' || path === '/index') path = '/';
  return path;
}

/** Página seguinte na ordem editorial (Início → A YELA → Áreas → Parceria → Contacto). */
export function nextPage(path: string): SitePage | undefined {
  const order = PAGES.filter((p) => p.path !== '/privacidade');
  const index = order.findIndex((p) => p.path === path);
  return index >= 0 ? order[index + 1] : undefined;
}
