import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import { getDynamicSeo } from '@/lib/seo';
import { getGlobalScripts } from '@/actions/seoActions';
import ChatbotWidget from '@/app/components/ChatbotWidget';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseMetadata: Metadata = {
  title: "Intelliqbot - Agencia de Inteligencia Artificial",
  description: "Transformamos la operación de miles de negocios con plataformas y automatización avanzada con IA.",
  keywords: ["IA", "Agencia IA", "Automatización", "Intelliqbot"],
};

export async function generateMetadata(): Promise<Metadata> {
  const dynamicSeo = await getDynamicSeo('/', baseMetadata);
  const scripts = await getGlobalScripts();
  
  if (scripts.gsc_id) {
    dynamicSeo.verification = {
      google: scripts.gsc_id,
    };
  }
  return dynamicSeo;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scripts = await getGlobalScripts();
  
  return (
    <html lang="es">
      <head>
        {/* Preconnect to critical resources - only if used */}
        {scripts.gtm_id && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        
        {/* GTM Script en head */}
        {scripts.gtm_id && (
          <Script
            id="gtm-head"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${scripts.gtm_id}');`
            }}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM NoScript - DEBE ser lo primero en body */}
        {scripts.gtm_id && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${scripts.gtm_id}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}
        
        {children}
        
        {scripts.gtm_id && <GoogleTagManager gtmId={scripts.gtm_id} />}
        
        {scripts.pixel_id && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${scripts.pixel_id}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        
        <ChatbotWidget />
      </body>
    </html>
  );
}
