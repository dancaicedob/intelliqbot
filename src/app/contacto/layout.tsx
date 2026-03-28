import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Intelliqbot - Inicia tu transformación',
  description: 'Conéctate con Intelliqbot. Agenda una auditoría de sistema, escríbenos a intelliqbot@gmail.com o contáctanos por WhatsApp al +57 3176285563.',
  openGraph: {
    title: 'Contacto | Intelliqbot',
    description: 'Inicia el protocolo de automatización. Agenda una sesión o escríbenos directamente a través de nuestro canal seguro.',
    url: 'https://tu-dominio.com/contacto',
    type: 'website',
    images: ['/images/logo-intelliqbot.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Intelliqbot',
    description: 'Inicia el protocolo de automatización. Conecta con nuestro núcleo operativo hoy mismo.',
  }
};

export default function ContactoLayout({
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
            "@type": "ContactPage",
            "name": "Contacto Intelliqbot",
            "url": "https://tu-dominio.com/contacto",
            "mainEntity": {
              "@type": "Organization",
              "name": "Intelliqbot",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+57-317-628-5563",
                  "contactType": "Customer Service",
                  "email": "intelliqbot@gmail.com",
                  "areaServed": "CO",
                  "availableLanguage": ["Spanish"]
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
