import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'Automatización Industrial y Física en Colombia | Robótica y Control | Intelliqbot',
  description:
    'Soluciones de automatización industrial ligera, control de accesos, robótica básica, sistemas embebidos y telemetría de planta en Colombia. Proyectos de ingeniería física a medida.',
  keywords: [
    'automatización industrial Colombia',
    'control de acceso Colombia',
    'robótica Colombia',
    'sistemas embebidos Colombia',
    'automatización industrial ligera',
    'telemetría de planta Colombia',
    'monitoreo industrial Colombia',
    'prototipo industrial Colombia',
    'ingeniería automatización Colombia',
    'control procesos industriales',
  ],
  alternates: {
    canonical: 'https://intelliqbot.co/servicios/automatizacion-fisica',
  },
  openGraph: {
    title: 'Automatización Industrial y Física en Colombia | Intelliqbot',
    description:
      'Control de accesos, robótica, sistemas embebidos y automatización industrial ligera. Soluciones de ingeniería física a medida en Colombia.',
    url: 'https://intelliqbot.co/servicios/automatizacion-fisica',
    siteName: 'Intelliqbot',
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/servicios/automatizacion-fisica', baseMetadata);
}

export default function AutomatizacionFisicaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automatización Física e Industrial',
    url: 'https://intelliqbot.co/servicios/automatizacion-fisica',
    description:
      'Control de accesos, robótica básica, automatización industrial ligera y telemetría de planta en Colombia.',
    provider: {
      '@type': 'Organization',
      name: 'Intelliqbot',
      url: 'https://intelliqbot.co',
    },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    serviceType: 'Automatización Industrial y Sistemas Físicos',
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
