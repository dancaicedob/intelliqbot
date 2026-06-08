import { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';

const BASE_URL = 'https://intelliqbot.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: today, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/servicios`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/servicios/automatizacion-ia`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/servicios/automatizacion-fisica`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/servicios/iot-conectividad`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/work`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/automatizacion-ventas-bogota`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/automatizacion-ventas-cali`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/automatizacion-ventas-medellin`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/nosotros`, lastModified: today, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/contacto`, lastModified: today, changeFrequency: 'yearly', priority: 0.8 },
  ];

  // Dynamic project pages
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${BASE_URL}/proyectos/${project.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
