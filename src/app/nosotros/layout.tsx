import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros | Intelliqbot - Potenciamos empresas con IA',
  description: 'Conoce Intelliqbot. Nacimos de la frustración para convertirnos en pioneros de la automatización inteligente. Sistemas de ventas, procesos y más.',
  openGraph: {
    title: 'Nosotros | Intelliqbot',
    description: 'Transformamos la forma en que trabajan las empresas mediante sistemas inteligentes, integración de herramientas y flujos automatizados.',
    url: 'https://tu-dominio.com/nosotros',
    type: 'website',
    images: ['/images/logo-intelliqbot.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros | Intelliqbot',
    description: 'La automatización no es el futuro, es el presente. Descubre cómo potenciamos empresas con inteligencia artificial.',
  }
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Intelliqbot",
            "url": "https://tu-dominio.com",
            "logo": "https://tu-dominio.com/images/logo-intelliqbot.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+57-317-628-5563",
              "contactType": "Customer Service",
              "areaServed": "CO",
              "availableLanguage": ["Spanish"]
            },
            "sameAs": [],
            "description": "Agencia de Inteligencia Artificial que transforma la operación de miles de negocios. Automatización de procesos, sistemas de ventas y herramientas SEO.",
            "knowsAbout": [
              "Automatización de procesos",
              "Sistemas de ventas automatizados por chat",
              "Auditoría SEO técnica y semántica",
              "Inteligencia Artificial"
            ]
          })
        }}
      />
      {children}
    </>
  );
}
