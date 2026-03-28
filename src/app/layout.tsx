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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
