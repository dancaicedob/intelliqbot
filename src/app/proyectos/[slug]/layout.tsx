import { Metadata } from 'next';
import { projectsData } from '@/data/projects';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado | Intelliqbot',
    };
  }

  // Keywords SEO Locales
  const locationKeywords = 'Bogotá, Medellín, Cali, Colombia';
  const baseTitle = `${project.title} | Soluciones IoT & Automatización en Colombia`;
  const baseDescription = `${project.description} Proveedor de soluciones industriales, IoT y domótica en ${locationKeywords}. Contáctanos para cotizar tu proyecto.`;

  return {
    title: baseTitle,
    description: baseDescription,
    keywords: [...project.technologies, 'automatización', 'iot', 'domótica', 'industrial', 'Bogotá', 'Medellín', 'Cali', 'Colombia'],
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url: `https://intelliqbot.co/proyectos/${project.slug}`,
      siteName: 'Intelliqbot',
      images: [
        {
          url: project.media_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'es_CO',
      type: 'article',
    },
    alternates: {
      canonical: `https://intelliqbot.co/proyectos/${project.slug}`,
    },
  };
}

export default async function ProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  // Schema Markup JSON-LD para SEO Local y Servicios
  const jsonLd = project ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: project.title,
    description: project.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Intelliqbot',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CO',
        addressLocality: 'Bogotá'
      }
    },
    areaServed: [
      { '@type': 'City', name: 'Bogotá' },
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'City', name: 'Cali' }
    ],
    image: project.media_url,
    url: `https://intelliqbot.co/proyectos/${project.slug}`
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
