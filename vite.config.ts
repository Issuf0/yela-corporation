import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { seoPlugin, type SeoPage } from './build/seoPlugin';

/** Páginas públicas do site: usadas no canonical, og:url e sitemap. */
const PAGES: SeoPage[] = [
  { file: 'index.html', path: '/' },
  { file: 'privacidade.html', path: '/privacidade' },
];

export default defineConfig(({ mode }) => {
  // SITE_URL é lida em tempo de build; nada daqui chega ao browser.
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL ?? '').trim().replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), seoPlugin({ siteUrl, pages: PAGES })],
    build: {
      rolldownOptions: {
        input: {
          index: 'index.html',
          privacidade: 'privacidade.html',
        },
      },
    },
  };
});
