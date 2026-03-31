import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'Chatbots con IA y Ventas por WhatsApp en Cali | Intelliqbot',
  description: 'Mejora tus ventas y atención al cliente en Cali mediante chatbots con Inteligencia Artificial. Automatizamos conversaciones y optimizamos procesos empresariales 24/7.',
  keywords: [
    'Chatbot con IA Cali', 
    'Chatbots para empresas Cali', 
    'Automatización con inteligencia artificial Cali', 
    'Chatbot WhatsApp Cali', 
    'Automatización de atención al cliente Cali',
    'Bot para responder clientes Cali',
    'Sistema automatizado de ventas Cali',
    'IA para negocios Cali'
  ],
  alternates: {
    canonical: 'https://www.intelliqbot.com/automatizacion-ventas-cali',
  },
  openGraph: {
    title: 'Chatbots con IA en Cali para automatizar ventas y atención',
    description: 'Ayudamos a empresas en Cali a mejorar sus ventas y atención al cliente mediante chatbots con inteligencia artificial y automatización avanzada por WhatsApp.',
    url: 'https://www.intelliqbot.com/automatizacion-ventas-cali',
    siteName: 'Intelliqbot',
    images: [
      {
        url: 'https://www.intelliqbot.com/images/logo-intelliqbot.png',
        width: 384,
        height: 384,
        alt: 'Intelliqbot - Agencia de Inteligencia Artificial en Cali',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/automatizacion-ventas-cali', baseMetadata);
}

export default function CaliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    "name": "Intelliqbot",
    "url": "https://www.intelliqbot.com/automatizacion-ventas-cali",
    "logo": "https://www.intelliqbot.com/images/logo-intelliqbot.png",
    "image": "https://www.intelliqbot.com/images/logo-intelliqbot.png",
    "description": "En Intelliqbot ayudamos a empresas en Cali a mejorar sus ventas y atención al cliente mediante chatbots con inteligencia artificial, automatizando conversaciones y WhatsApp en tiempo real.",
    "email": "intelliqbot@gmail.com",
    "telephone": "+573176285563",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Cali"
      },
      {
        "@type": "State",
        "name": "Valle del Cauca"
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
            "name": "Chatbot con IA para empresas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automatización de atención al cliente"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chatbot para ventas por WhatsApp"
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
