import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getDynamicSeo } from '@/lib/seo';

const baseMetadata: Metadata = {
  title: "Intelliqbot - Agencia de Inteligencia Artificial",
  description: "Transformamos la operación de miles de negocios con plataformas y automatización avanzada con IA.",
  keywords: ["IA", "Agencia IA", "Automatización", "Intelliqbot"],
};

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicSeo('/', baseMetadata);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
