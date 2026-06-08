import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'Servicios de Automatización, IoT y Software | Intelliqbot',
  description:
    'Desarrollamos soluciones de automatización, IoT y software a medida. Desde aplicaciones e inteligencia artificial hasta dispositivos electrónicos, sensores, sistemas de control y proyectos con Arduino y ESP32.',
  keywords: [
    'automatización Colombia',
    'IoT Colombia',
    'Arduino Colombia',
    'ESP32 Colombia',
    'inteligencia artificial Colombia',
    'domótica Colombia',
    'automatización industrial Colombia',
    'software a medida Colombia',
    'sensores actuadores Colombia',
    'sistemas embebidos Colombia',
  ],
  alternates: {
    canonical: 'https://intelliqbot.co/servicios',
  },
  openGraph: {
    title: 'Servicios de Automatización, IoT y Software | Intelliqbot',
    description:
      'Desde IA y chatbots hasta Arduino, ESP32, domótica y automatización industrial. Soluciones integrales de ingeniería para tu empresa.',
    url: 'https://intelliqbot.co/servicios',
    siteName: 'Intelliqbot',
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/servicios', baseMetadata);
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Servicios de Automatización, IoT y Software',
    url: 'https://intelliqbot.co/servicios',
    description:
      'Desarrollamos soluciones de automatización, IoT y software a medida en Colombia.',
    provider: {
      '@type': 'Organization',
      name: 'Intelliqbot',
      url: 'https://intelliqbot.co',
    },
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
