'use client';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/home/Navbar';
import EditingCode from "@/app/components/home/iconos/EditingCode";


// Carga dinámica del showcase para mejor rendimiento
const ServicesShowcase = dynamic(() => import('@/app/components/ServicesShowCases'), { ssr: false });

export default function ServicesPage() {
  return (
        
    <main className="bg-black text-white min-h-screen">
      <Navbar/>  
      <Head>
        <title>Servicios Automatizados con IA | Intelliqbot</title>
        <meta name="description" content="Explora nuestros servicios de automatización con inteligencia artificial: chatbots, inventarios inteligentes, automatización empresarial y marketing autónomo." />
      </Head>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-20 py-10 bg-gradient-to-r from-cyan-900 via-black to-black shadow-md"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-md">
          Servicios Inteligentes
        </h1>
        <p className="text-gray-400 mt-2 text-base md:text-lg max-w-2xl">
          Transforma tu empresa con automatizaciones que trabajan 24/7 por ti.
        </p>
        

      </motion.header>
      <EditingCode />
      <ServicesShowcase />

      <footer className="mt-20 text-center text-gray-500 py-10 text-sm">
        © {new Date().getFullYear()} Intelliqbot. Todos los derechos reservados.
      </footer>
    </main>
  );
}
