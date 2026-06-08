'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/home/Navbar';
import Footer from '@/app/components/home/Footer';

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="8" width="32" height="32" rx="6" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" />
        <rect x="14" y="14" width="20" height="20" rx="3" stroke="rgba(6,182,212,0.5)" strokeWidth="1" fill="rgba(6,182,212,0.08)" />
        <circle cx="24" cy="24" r="4" fill="rgba(6,182,212,0.8)" />
        <line x1="8" y1="24" x2="14" y2="24" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="24" x2="40" y2="24" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="8" x2="24" y2="14" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="34" x2="24" y2="40" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Chatbots con Inteligencia Artificial',
    description: 'Bots conversacionales para WhatsApp, web, Telegram e Instagram que atienden, venden y responden clientes de forma autónoma las 24 horas. Integrados con tus sistemas existentes.',
    keywords: ['chatbot IA Colombia', 'bot WhatsApp Colombia', 'atención automática IA'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="12" cy="24" r="6" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" />
        <circle cx="36" cy="12" r="6" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" />
        <circle cx="36" cy="36" r="6" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" />
        <line x1="18" y1="22" x2="30" y2="14" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="18" y1="26" x2="30" y2="34" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="12" cy="24" r="2.5" fill="rgba(6,182,212,0.9)" />
        <circle cx="36" cy="12" r="2.5" fill="rgba(6,182,212,0.9)" />
        <circle cx="36" cy="36" r="2.5" fill="rgba(6,182,212,0.9)" />
      </svg>
    ),
    title: 'Integraciones API',
    description: 'Conectamos tus aplicaciones, CRMs, ERPs, plataformas de pago y cualquier sistema externo mediante APIs REST o WebHooks para que todo tu stack funcione como uno solo.',
    keywords: ['integración API Colombia', 'conectar sistemas Colombia', 'automatización API'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" fill="rgba(6,182,212,0.04)" />
        <rect x="10" y="14" width="28" height="20" rx="2" stroke="rgba(6,182,212,0.4)" strokeWidth="1" fill="rgba(6,182,212,0.06)" />
        <line x1="14" y1="20" x2="22" y2="20" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="24" x2="34" y2="24" stroke="rgba(6,182,212,0.5)" strokeWidth="1" strokeLinecap="round" />
        <line x1="14" y1="28" x2="28" y2="28" stroke="rgba(6,182,212,0.5)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="32" cy="20" r="3" fill="rgba(6,182,212,0.8)" />
      </svg>
    ),
    title: 'Desarrollo de Aplicaciones Web y Móvil',
    description: 'Construimos apps a medida con las tecnologías más modernas: Next.js, React, Node.js y más. Desde MVPs rápidos hasta plataformas empresariales escalables.',
    keywords: ['desarrollo aplicaciones Colombia', 'app web a medida Colombia', 'Next.js Colombia'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M10 34 L18 20 L26 28 L34 16 L40 22" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="18" cy="20" r="2.5" fill="rgba(6,182,212,0.7)" />
        <circle cx="26" cy="28" r="2.5" fill="rgba(6,182,212,0.7)" />
        <circle cx="34" cy="16" r="2.5" fill="rgba(6,182,212,0.7)" />
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="rgba(6,182,212,0.2)" strokeWidth="1" fill="none" />
        <line x1="6" y1="38" x2="42" y2="38" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
        <line x1="6" y1="6" x2="6" y2="38" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
      </svg>
    ),
    title: 'Automatización de Marketing con IA',
    description: 'Embudos automáticos, campañas de email, segmentación inteligente de audiencias y generación de contenido con IA para escalar tu adquisición de clientes sin esfuerzo manual.',
    keywords: ['marketing automatizado IA', 'funnel automático Colombia', 'email marketing IA'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="8" y="16" width="10" height="10" rx="2" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.06)" />
        <rect x="20" y="8" width="10" height="10" rx="2" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.06)" />
        <rect x="20" y="26" width="10" height="10" rx="2" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.06)" />
        <rect x="32" y="20" width="10" height="10" rx="2" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.06)" />
        <line x1="18" y1="21" x2="20" y2="18" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="23" x2="20" y2="26" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="14" x2="32" y2="22" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="30" y1="30" x2="32" y2="26" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'RPA — Automatización de Procesos con Robots',
    description: 'Automatizamos tareas repetitivas en tus sistemas: facturación, carga de datos, reportes, gestión de inventario y cualquier proceso que hoy hace un humano frente a una pantalla.',
    keywords: ['RPA Colombia', 'robots software Colombia', 'automatización tareas Colombia'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="16" r="8" stroke="rgba(6,182,212,0.7)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" />
        <path d="M24 8 L26 13 L24 12 L22 13 Z" fill="rgba(6,182,212,0.8)" />
        <path d="M14 34 C14 28 34 28 34 34 L36 42 H12 Z" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" strokeLinejoin="round" />
        <circle cx="24" cy="16" r="3" fill="rgba(6,182,212,0.5)" />
      </svg>
    ),
    title: 'IA Personalizada y Agentes Autónomos',
    description: 'Desarrollamos modelos de IA y agentes autónomos entrenados con tus datos: asistentes de ventas, clasificadores de leads, motores de recomendación y sistemas de toma de decisiones.',
    keywords: ['IA personalizada Colombia', 'agentes IA Colombia', 'modelo IA empresas'],
  },
];

const whatsapp = 'https://wa.me/573176285563?text=Hola%20Intelliqbot%2C%20quiero%20automatizar%20mis%20procesos%20digitales%20con%20IA.';

export default function AutomatizacionIAPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(6,182,212,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-10">
          <Link href="/" className="hover:text-gray-400 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-gray-400 transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-cyan-400">IA & Software</span>
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          {/* Icon hero */}
          <div className="w-24 h-24 mb-8 relative">
            <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="48" cy="48" r="44" stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
              <circle cx="48" cy="48" r="32" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeDasharray="5 4" />
              <rect x="30" y="30" width="36" height="36" rx="6" stroke="rgba(6,182,212,0.8)" strokeWidth="2" fill="rgba(6,182,212,0.05)" />
              <rect x="38" y="38" width="20" height="20" rx="3" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" fill="rgba(6,182,212,0.1)" />
              {/* pins */}
              <line x1="24" y1="40" x2="30" y2="40" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="48" x2="30" y2="48" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="56" x2="30" y2="56" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="66" y1="40" x2="72" y2="40" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="66" y1="48" x2="72" y2="48" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="66" y1="56" x2="72" y2="56" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="40" y1="24" x2="40" y2="30" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="24" x2="48" y2="30" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="56" y1="24" x2="56" y2="30" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="40" y1="66" x2="40" y2="72" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="66" x2="48" y2="72" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <line x1="56" y1="66" x2="56" y2="72" stroke="rgba(6,182,212,0.8)" strokeWidth="2" strokeLinecap="round" />
              <text x="48" y="52" textAnchor="middle" fill="rgba(6,182,212,1)" fontSize="10" fontFamily="monospace" fontWeight="bold">AI</text>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-6 text-xs font-mono text-cyan-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            IA & Software
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl">
            Automatización con{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Inteligencia Artificial
            </span>{' '}
            y Software
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-10">
            Desarrollamos chatbots, integraciones, aplicaciones y sistemas autónomos que eliminan
            el trabajo manual y escalan tu operación digital sin límites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              Pedir cotización
            </a>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 font-semibold rounded-2xl transition-all"
            >
              ← Ver todos los servicios
            </Link>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-[#0a0a0a] border border-cyan-500/20 hover:border-cyan-500/60 rounded-2xl p-7 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            >
              <div className="mb-5 p-3 bg-cyan-950/40 rounded-xl w-fit">{s.icon}</div>
              <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.keywords.map((k) => (
                  <span key={k} className="text-xs px-2 py-0.5 bg-cyan-950/40 border border-cyan-900/60 rounded-full text-cyan-400/80 font-mono">
                    {k}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA + cross links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-[1px] overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-40" />
          <div className="relative bg-[#050505] p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-black mb-4">¿Listo para automatizar tu negocio?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Cuéntanos qué proceso quieres automatizar y te diseñamos una solución a medida.
            </p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Cross links */}
        <div className="border-t border-white/5 pt-12">
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-6 text-center">Otros servicios que ofrecemos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/servicios/iot-conectividad" className="flex items-center gap-3 px-6 py-4 bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 rounded-2xl text-sm font-semibold text-emerald-300 transition-all">
              🔌 IoT, Arduino y ESP32
            </Link>
            <Link href="/servicios/automatizacion-fisica" className="flex items-center gap-3 px-6 py-4 bg-orange-950/30 border border-orange-500/30 hover:border-orange-500 rounded-2xl text-sm font-semibold text-orange-300 transition-all">
              ⚙️ Automatización Industrial
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
