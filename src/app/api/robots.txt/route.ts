import { getSiteSettings } from '@/actions/seoActions';
import { publicRoutes } from '@/config/publicRoutes';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tudominio.com';
  const settings = await getSiteSettings();

  // Rutas excluidas del sitemap
  const excludedRoutes = settings.sitemap_excluded_routes || [];
  const validRoutes = publicRoutes
    .filter(route => !excludedRoutes.includes(route.path))
    .map(route => `${baseUrl}${route.path}`)
    .join('\n');

  // Si hay contenido personalizado, usarlo; si no, usar el default
  const defaultRobots = `# Robots.txt - Agencia IA Automatización de Ventas
# Última actualización: ${new Date().toISOString().split('T')[0]}

# ============================================
# BOTS PERMITIDOS - Búsqueda
# ============================================
User-agent: Googlebot
Disallow: /admin/
Disallow: /api/
Disallow: /*.json
Disallow: /*.xml
Disallow: /*?*sort=
Crawl-delay: 1
Allow: /

User-agent: Bingbot
Disallow: /admin/
Disallow: /api/
Disallow: /*.json
Allow: /

# Google Image Bot
User-agent: Googlebot-Image
Allow: /

# Google Mobile Bot
User-agent: Mobile-Googlebot
Allow: /

# ============================================
# BOTS ESPECIALIZADOS PERMITIDOS
# ============================================
# Bots de redes sociales - Permitir para social sharing
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: LinkedInBot/1.0
Allow: /

# Verificación de sitios
User-agent: Slurp
Allow: /

# ============================================
# BOTS CHATGPT/IA - PERMITIR CON LÍMITES
# ============================================
User-agent: GPTBot
Disallow: /admin/
Disallow: /api/
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# ============================================
# BOTS BLOQUEADOS - NO INDEXAR
# ============================================
# Scrapers y bots maliciosos
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# ============================================
# REGLAS GENERALES
# ============================================
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /admin
Disallow: /*.json
Disallow: /*.xml
Disallow: /*?*sort=
Disallow: /*?*filter=
Disallow: /*?*page=
Disallow: /search
Disallow: /account
Disallow: /cart
Disallow: /checkout
Crawl-delay: 2
Allow: /

# ============================================
# SITEMAPS
# ============================================
Sitemap: ${baseUrl}/api/sitemap.xml

# ============================================
# INFORMACIÓN LEGAL Y UBICACIONES (SEO Local)
# ============================================
# Agencia IA - Automatización de Ventas
# Ubicaciones: Bogotá, Cali, Medellín, Colombia
# Servicios: Automatización IA, Chatbots, Lead Generation, CRM
# 
# Página principal: ${baseUrl}/
# Servicios: ${baseUrl}/servicios
# Portafolio: ${baseUrl}/work
# Nosotros: ${baseUrl}/nosotros
# Contacto: ${baseUrl}/contacto
# 
# Automatización de Ventas por Ubicación:
# - Bogotá: ${baseUrl}/automatizacion-ventas-bogota
# - Cali: ${baseUrl}/automatizacion-ventas-cali
# - Medellín: ${baseUrl}/automatizacion-ventas-medellin
`;

  const robotsContent = settings.robots_custom_content || defaultRobots;

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
