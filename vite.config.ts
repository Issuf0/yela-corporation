import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { devApiPlugin } from './build/devApiPlugin';
import { seoPlugin, type SeoPage } from './build/seoPlugin';

/** Public pages of the site. Used for canonical URLs and the sitemap. */
const PAGES: SeoPage[] = [
  { file: 'index.html', path: '/' },
  { file: 'privacidade.html', path: '/privacidade' },
];

export default defineConfig(({ mode }) => {
  // Loads .env / .env.local without exposing anything to the client bundle.
  // Only variables prefixed with VITE_ are ever available in browser code.
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL ?? '').trim().replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), seoPlugin({ siteUrl, pages: PAGES }), devApiPlugin(env)],
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
