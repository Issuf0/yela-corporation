import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { cleanUrlsPlugin } from './build/cleanUrlsPlugin';
import { seoPlugin } from './build/seoPlugin';
import { PAGES } from './src/config/nav';

export default defineConfig(({ mode }) => {
  // SITE_URL é lida em tempo de build; nada daqui chega ao browser.
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL ?? '').trim().replace(/\/+$/, '');

  return {
    plugins: [react(), tailwindcss(), cleanUrlsPlugin(), seoPlugin({ siteUrl, pages: PAGES })],
    build: {
      rolldownOptions: {
        input: {
          ...Object.fromEntries(PAGES.map((p) => [p.file.replace(/\.html$/, ''), p.file])),
          notFound: '404.html',
        },
      },
    },
  };
});
