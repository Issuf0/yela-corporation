import type { Plugin } from 'vite';
import { PAGES } from '../src/config/nav';

/**
 * Em desenvolvimento e no `vite preview`, serve "/sobre" como "/sobre.html",
 * imitando o `cleanUrls` da Vercel para que as ligações entre páginas funcionem.
 */
export function cleanUrlsPlugin(): Plugin {
  const rewrite = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    const [pathname, query = ''] = url.split('?');
    const clean = (pathname ?? '').replace(/\/+$/, '') || '/';
    const page = PAGES.find((p) => p.path === clean && p.path !== '/');
    return page ? `/${page.file}${query ? `?${query}` : ''}` : undefined;
  };
  const middleware = (req: { url?: string }, _res: unknown, next: () => void) => {
    const rewritten = rewrite(req.url);
    if (rewritten) req.url = rewritten;
    next();
  };
  return {
    name: 'yela:clean-urls',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
