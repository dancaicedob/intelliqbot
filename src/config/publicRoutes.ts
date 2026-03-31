/**
 * Rutas públicas que deben aparecer en el sitemap.xml
 * Excluye rutas como /admin que no son públicas
 * 
 * Actualiza este archivo cada vez que agregues nuevas páginas públicas
 */

export interface PublicRoute {
  path: string;
  priority?: number; // 0.0 - 1.0, por defecto 0.8
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const publicRoutes: PublicRoute[] = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/servicios',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/work',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/automatizacion-ventas-bogota',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/automatizacion-ventas-cali',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/automatizacion-ventas-medellin',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/nosotros',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    path: '/contacto',
    priority: 0.8,
    changefreq: 'yearly',
  },
];
