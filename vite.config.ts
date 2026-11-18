import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/config/site.ts';

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Endereço público do site (sem barra no final):
 * 1) VITE_SITE_URL, se definido; 2) detectado no Netlify (URL); 3) detectado no Vercel.
 */
function resolveSiteUrl(env: Record<string, string>): string {
  const netlify = env.NETLIFY === 'true' ? env.URL : '';
  const vercel = env.VERCEL === '1' && env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '';
  return (env.VITE_SITE_URL || netlify || vercel || '').replace(/\/+$/, '');
}

/** Dados estruturados (Schema.org) gerados a partir de src/config/site.ts */
function jsonLd(url: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description:
      'Higienização profissional de estofados: sofás, colchões, poltronas, cadeiras, bancos automotivos e tapetes, com atendimento no endereço do cliente.',
    telephone: `+${site.whatsappNumber}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: site.city },
      { '@type': 'AdministrativeArea', name: 'Vale do Jequitinhonha' },
    ],
    sameAs: [site.instagramUrl],
    ...(url ? { url: `${url}/`, image: `${url}/og-image.png` } : {}),
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function seoPlugin(url: string): Plugin {
  return {
    name: 'simoes-seo',
    transformIndexHtml(html, ctx) {
      if (!ctx.filename.endsWith('index.html')) return html;
      let out = html.replace(
        '</head>',
        `  <script type="application/ld+json">${jsonLd(url)}</script>\n  </head>`,
      );
      out = out.replace(
        '<div id="root"></div>',
        `<div id="root"></div>\n    <noscript><p style="font-family:sans-serif;padding:24px;color:#0A1F44">${site.name}: higienização de estofados em ${site.city}-${site.state}. Ative o JavaScript para ver o site ou fale pelo WhatsApp: <a href="https://wa.me/${site.whatsappNumber}">${site.whatsappDisplay}</a>.</p></noscript>`,
      );
      if (url) {
        out = out
          .replace('content="/og-image.png"', `content="${url}/og-image.png"`)
          .replace('</head>', `  <link rel="canonical" href="${url}/" />\n    <meta property="og:url" content="${url}/" />\n  </head>`);
      }
      return out;
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`,
      });
      if (!url) return;
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), seoPlugin(resolveSiteUrl(env))],
    build: {
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
          notFound: resolve(root, '404.html'),
        },
      },
    },
  };
});
