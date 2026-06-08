import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'Automatización con IA y Software | Chatbots, APIs y Apps | Intelliqbot',
  description:
    'Desarrollamos chatbots con inteligencia artificial, integraciones API, aplicaciones web y automatización de procesos con software. Soluciones digitales a medida para empresas en Colombia.',
  keywords: [
    'automatización con IA Colombia',
    'chatbot inteligencia artificial Colombia',
    'integraciones API Colombia',
    'desarrollo aplicaciones Colombia',
    'automatización procesos software',
    'RPA Colombia',
    'chatbot WhatsApp Colombia',
    'marketing automatizado IA',
    'automatización flujos trabajo',
    'software a medida Colombia',
  ],
  alternates: {
    canonical: 'https://intelliqbot.co/servicios/automatizacion-ia',
  },
  openGraph: {
    title: 'Automatización con IA y Software | Intelliqbot',
    description:
      'Chatbots, integraciones API, desarrollo de apps y RPA. Automatizamos los procesos digitales de tu empresa con inteligencia artificial.',
    url: 'https://intelliqbot.co/servicios/automatizacion-ia',
    siteName: 'Intelliqbot',
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/servicios/automatizacion-ia', baseMetadata);
}

export default function AutomatizacionIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automatización con IA y Software',
    url: 'https://intelliqbot.co/servicios/automatizacion-ia',
    description:
      'Chatbots con IA, integraciones API, desarrollo de aplicaciones y automatización de procesos con software.',
    provider: {
      '@type': 'Organization',
      name: 'Intelliqbot',
      url: 'https://intelliqbot.co',
    },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    serviceType: 'Automatización de Software con Inteligencia Artificial',
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
