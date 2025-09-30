
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const BASE_URL = 'https://squeegee-samurai.com'; // no trailing slash

// Add all your SPA routes here:
const routes = [
  '/', '/services', '/pricing', '/quote', '/contact'
];

const now = new Date().toISOString();
const urls = routes.map(r => `  <url>
    <loc>${BASE_URL}${r}</loc>
    <lastmod>${now}</lastmod>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve('dist', 'sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, sitemap, 'utf8');

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
writeFileSync(resolve('dist', 'robots.txt'), robots, 'utf8');

console.log('✅ Sitemap and robots.txt generated in dist/');
