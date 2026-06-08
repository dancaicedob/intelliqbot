import { Metadata } from 'next';
import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: 'IoT, Arduino y ESP32 en Colombia | Domótica y Sensores | Intelliqbot',
  description:
    'Desarrollamos proyectos de IoT, domótica, inmótica y sistemas con Arduino y ESP32 en Colombia. Conectamos sensores, actuadores y dispositivos para monitoreo remoto y telemetría industrial.',
  keywords: [
    'IoT Colombia',
    'Arduino Colombia',
    'ESP32 Colombia',
    'domótica Colombia',
    'inmótica Colombia',
    'sensores actuadores Colombia',
    'monitoreo remoto Colombia',
    'telemetría industrial Colombia',
    'prototipado electrónico Colombia',
    'sistemas embebidos Colombia',
    'internet de las cosas Colombia',
    'casas inteligentes Colombia',
  ],
  alternates: {
    canonical: 'https://intelliqbot.co/servicios/iot-conectividad',
  },
  openGraph: {
    title: 'IoT, Arduino, ESP32 y Domótica en Colombia | Intelliqbot',
    description:
      'Conectamos el mundo físico al digital. Proyectos con Arduino, ESP32, sensores, actuadores y sistemas de monitoreo remoto en Colombia.',
    url: 'https://intelliqbot.co/servicios/iot-conectividad',
    siteName: 'Intelliqbot',
    locale: 'es_CO',
    type: 'website',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/servicios/iot-conectividad', baseMetadata);
}

export default function IoTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IoT, Arduino, ESP32 y Conectividad',
    url: 'https://intelliqbot.co/servicios/iot-conectividad',
    description:
      'Proyectos de IoT, domótica, sensores, monitoreo remoto y prototipado electrónico con Arduino y ESP32 en Colombia.',
    provider: {
      '@type': 'Organization',
      name: 'Intelliqbot',
      url: 'https://intelliqbot.co',
    },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    serviceType: 'Internet of Things y Sistemas Embebidos',
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
