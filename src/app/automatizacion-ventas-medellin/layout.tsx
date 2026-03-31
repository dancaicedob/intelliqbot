import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'Automatización de Ventas y Chatbots con IA en Medellín | Intelliqbot',
  description: 'Agencia de Inteligencia Artificial en Medellín y Antioquia. Aumenta tus ventas con chatbots para WhatsApp, automatización de procesos y respuestas inmediatas 24/7 sin sumar personal.',
  keywords: [
    'Automatización de ventas Medellín', 
    'Ventas por WhatsApp Medellín', 
    'Chatbots con IA Medellín', 
    'Automatizar negocio Medellín', 
    'Agencia IA Antioquia',
    'Inteligencia artificial empresas Medellín',
    'Automatización de procesos empresariales Colombia'
  ],
  alternates: {
    canonical: 'https://www.intelliqbot.com/automatizacion-ventas-medellin',
  },
  openGraph: {
    title: 'Automatización de Ventas y Chatbots con IA en Medellín',
    description: 'Aumenta tus ventas con chatbots para WhatsApp y automatización de procesos en Medellín. Optimiza tu negocio 24/7.',
    url: 'https://www.intelliqbot.com/automatizacion-ventas-medellin',
    siteName: 'Intelliqbot',
    images: [
      {
        url: 'https://www.intelliqbot.com/images/logo-intelliqbot.png',
        width: 384,
        height: 384,
        alt: 'Intelliqbot - Agencia de Inteligencia Artificial en Medellín',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/automatizacion-ventas-medellin', baseMetadata);
}

export default function MedellinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    "name": "Intelliqbot",
    "url": "https://www.intelliqbot.com/automatizacion-ventas-medellin",
    "logo": "https://www.intelliqbot.com/images/logo-intelliqbot.png",
    "image": "https://www.intelliqbot.com/images/logo-intelliqbot.png",
    "description": "Agencia de automatización en Medellín de primer nivel. Implementamos ventas automatizadas por WhatsApp, asistentes virtuales con IA y optimización de tareas en línea para escalar tu negocio en Antioquia y Colombia.",
    "email": "intelliqbot@gmail.com",
    "telephone": "+573176285563",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Medellín"
      },
      {
        "@type": "State",
        "name": "Antioquia"
      },
      {
        "@type": "Country",
        "name": "Colombia"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Automatización",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automatización de ventas por WhatsApp"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chatbots con inteligencia artificial"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automatización de procesos empresariales"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
