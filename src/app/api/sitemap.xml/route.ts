import { publicRoutes } from '@/config/publicRoutes';

export async function GET() {
  // Obtener la URL base del sitio
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tudominio.com';

  // Generar el XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .map((route) => {
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.priority || 0.8}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
