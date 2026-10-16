import type { HtmlTagDescriptor, Plugin } from 'vite';

export interface SeoPage {
  /** HTML entry file relative to the project root. */
  file: string;
  /** Public path once deployed with cleanUrls (e.g. "/privacidade"). */
  path: string;
}

export interface SeoPluginOptions {
  /** Absolute production origin without trailing slash, or "" when not yet known. */
  siteUrl: string;
  pages: SeoPage[];
}

/**
 * Injects canonical/og:url/og:image tags and emits robots.txt + sitemap.xml.
 * Everything that needs an absolute URL is skipped while SITE_URL is unset,
 * so no domain is ever invented.
 */
export function seoPlugin({ siteUrl, pages }: SeoPluginOptions): Plugin {
  const absolute = (path: string) => (path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`);

  return {
    name: 'yela:seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!siteUrl) return html;
        const page = pages.find((p) => ctx.filename.endsWith(p.file) || ctx.path.endsWith(p.file));
        if (!page) return html;
        const url = absolute(page.path);
        const image = `${siteUrl}/og-image.png`;
        const tags: HtmlTagDescriptor[] = [
          { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: url }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
        ];
        return { html, tags };
      },
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ''];
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`, '');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') });

      if (!siteUrl) return;
      const today = new Date().toISOString().slice(0, 10);
      const urls = pages
        .map((p) => `  <url>\n    <loc>${absolute(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
        .join('\n');
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
  };
}
