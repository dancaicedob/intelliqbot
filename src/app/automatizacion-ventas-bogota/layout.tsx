import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'Ventas por WhatsApp en Bogotá con Inteligencia Artificial | Intelliqbot',
  description: 'Aumenta tus ventas por WhatsApp en Bogotá con automatización inteligente. Chatbots con IA que responden y venden por ti 24/7 de forma automática.',
  keywords: [
    'Ventas por WhatsApp Bogotá', 
    'Automatización WhatsApp Bogotá', 
    'Automatizar ventas WhatsApp Bogotá', 
    'Chatbot WhatsApp Bogotá', 
    'Atención al cliente WhatsApp Bogotá',
    'Responder mensajes automático Bogotá',
    'Sistema de ventas WhatsApp Bogotá',
    'Embudos de ventas WhatsApp Bogotá'
  ],
  alternates: {
    canonical: 'https://www.intelliqbot.com/automatizacion-ventas-bogota',
  },
  openGraph: {
    title: 'Ventas y Automatización por WhatsApp en Bogotá con IA',
    description: 'Aumenta tus ventas por WhatsApp en Bogotá mediante automatización inteligente y chatbots que responden 24/7 sin depender de procesos manuales.',
    url: 'https://www.intelliqbot.com/automatizacion-ventas-bogota',
    siteName: 'Intelliqbot',
    images: [
      {
        url: 'https://www.intelliqbot.com/images/logo-intelliqbot.png',
        width: 384,
        height: 384,
        alt: 'Intelliqbot - Agencia de Inteligencia Artificial en Bogotá',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/automatizacion-ventas-bogota', baseMetadata);
}

export default function BogotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    "name": "Intelliqbot",
    "url": "https://www.intelliqbot.com/automatizacion-ventas-bogota",
    "logo": "https://www.intelliqbot.com/images/logo-intelliqbot.png",
    "image": "https://www.intelliqbot.com/images/logo-intelliqbot.png",
    "description": "En Intelliqbot ayudamos a empresas en Bogotá a aumentar sus ventas por WhatsApp mediante automatización inteligente, optimizando la atención al cliente con chatbots con IA.",
    "email": "intelliqbot@gmail.com",
    "telephone": "+573176285563",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Bogotá"
      },
      {
        "@type": "State",
        "name": "Cundinamarca"
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
            "name": "Automatización de mensajes WhatsApp"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chatbot con IA para WhatsApp"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sistema de embudos de ventas por WhatsApp"
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
