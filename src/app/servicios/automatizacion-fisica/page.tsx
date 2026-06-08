'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/home/Navbar';
import Footer from '@/app/components/home/Footer';

const services = [
  {
    emoji: '🔐',
    title: 'Control de Accesos',
    description: 'Instalamos sistemas de control de acceso electrónico: tarjetas RFID, biometría, códigos y control remoto por app para empresas, edificios y zonas restringidas.',
    tags: ['control de acceso Colombia', 'RFID Colombia', 'acceso biométrico'],
  },
  {
    emoji: '🦾',
    title: 'Robótica Básica e Industrial',
    description: 'Diseñamos robots y brazos automatizados para tareas repetitivas en líneas de producción, empaque, clasificación y manipulación de materiales ligeros.',
    tags: ['robótica Colombia', 'automatización producción', 'robot industrial básico'],
  },
  {
    emoji: '⚙️',
    title: 'Automatización Industrial Ligera',
    description: 'Automatizamos procesos industriales de pequeña y mediana escala: control de motores, cintas transportadoras, sistemas neumáticos e hidráulicos y PLCs.',
    tags: ['automatización industrial Colombia', 'PLC Colombia', 'control industrial'],
  },
  {
    emoji: '📟',
    title: 'Sistemas Embebidos',
    description: 'Desarrollamos firmware y hardware embebido para productos electrónicos: desde wearables y dispositivos médicos hasta controladores de maquinaria industrial.',
    tags: ['sistemas embebidos Colombia', 'firmware Colombia', 'hardware embebido'],
  },
  {
    emoji: '📈',
    title: 'Telemetría de Planta',
    description: 'Implementamos sistemas de telemetría para monitorear en tiempo real el estado de equipos, consumo energético, temperatura y variables de proceso en planta.',
    tags: ['telemetría planta Colombia', 'monitoreo industrial Colombia', 'SCADA Colombia'],
  },
  {
    emoji: '🏭',
    title: 'Monitoreo de Maquinaria',
    description: 'Sensorizamos tu maquinaria existente para detectar fallos antes de que ocurran, optimizar el mantenimiento preventivo y reducir tiempos de parada no planificados.',
    tags: ['monitoreo maquinaria Colombia', 'mantenimiento predictivo', 'sensores industriales'],
  },
];

const whatsapp = 'https://wa.me/573176285563?text=Hola%20Intelliqbot%2C%20quiero%20automatizar%20un%20proceso%20f%C3%ADsico%20o%20industrial.';

export default function AutomatizacionFisicaPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden">
      <Navbar />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(249,115,22,0.05)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-10">
          <Link href="/" className="hover:text-gray-400 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-gray-400 transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-orange-400">Industrial & Físico</span>
        </nav>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">

          {/* Hero SVG */}
          <div className="w-28 h-28 mb-8">
            <svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="56" cy="56" r="52" stroke="rgba(249,115,22,0.08)" strokeWidth="1" />
              {/* Robotic arm */}
              <rect x="44" y="82" width="24" height="14" rx="4" stroke="rgba(249,115,22,0.7)" strokeWidth="2" fill="rgba(249,115,22,0.06)" />
              <circle cx="56" cy="82" r="6" stroke="rgba(249,115,22,0.8)" strokeWidth="2" fill="rgba(249,115,22,0.1)" />
              {/* Arm seg 1 */}
              <line x1="56" y1="82" x2="38" y2="60" stroke="rgba(249,115,22,0.8)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="38" cy="60" r="6" stroke="rgba(249,115,22,0.8)" strokeWidth="2" fill="rgba(249,115,22,0.1)" />
              {/* Arm seg 2 */}
              <line x1="38" y1="60" x2="52" y2="38" stroke="rgba(249,115,22,0.8)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="52" cy="38" r="6" stroke="rgba(249,115,22,0.8)" strokeWidth="2" fill="rgba(249,115,22,0.1)" />
              {/* Arm seg 3 */}
              <line x1="52" y1="38" x2="72" y2="28" stroke="rgba(249,115,22,0.8)" strokeWidth="3" strokeLinecap="round" />
              {/* Gripper */}
              <path d="M72 28 L80 22 M72 28 L80 34" stroke="rgba(249,115,22,0.9)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Gear */}
              <circle cx="88" cy="22" r="10" stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" fill="none" />
              <circle cx="88" cy="22" r="5" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" fill="rgba(249,115,22,0.1)" />
              <line x1="88" y1="11" x2="88" y2="8" stroke="rgba(249,115,22,0.5)" strokeWidth="2" strokeLinecap="round" />
              <line x1="88" y1="33" x2="88" y2="36" stroke="rgba(249,115,22,0.5)" strokeWidth="2" strokeLinecap="round" />
              <line x1="77" y1="22" x2="74" y2="22" stroke="rgba(249,115,22,0.5)" strokeWidth="2" strokeLinecap="round" />
              <line x1="99" y1="22" x2="102" y2="22" stroke="rgba(249,115,22,0.5)" strokeWidth="2" strokeLinecap="round" />
              {/* Panel */}
              <rect x="10" y="44" width="14" height="30" rx="3" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" fill="rgba(249,115,22,0.04)" />
              <line x1="13" y1="50" x2="21" y2="50" stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeLinecap="round" />
              <line x1="13" y1="56" x2="21" y2="56" stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeLinecap="round" />
              <line x1="13" y1="62" x2="18" y2="62" stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-950/50 border border-orange-500/30 mb-6 text-xs font-mono text-orange-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Industrial & Físico
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl">
            Automatización{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Industrial y Física
            </span>{' '}
            en Colombia
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-10">
            Llevamos la automatización al mundo físico. Control de accesos, robótica,
            sistemas embebidos y automatización de procesos industriales para empresas
            que buscan operar con mayor eficiencia y menor error humano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
              Cotizar proyecto
            </a>
            <Link href="/servicios" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 font-semibold rounded-2xl transition-all">
              ← Ver todos los servicios
            </Link>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-[#0a0a0a] border border-orange-500/20 hover:border-orange-500/60 rounded-2xl p-7 transition-all hover:shadow-[0_0_25px_rgba(249,115,22,0.1)]">
              <div className="text-4xl mb-5">{s.emoji}</div>
              <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-orange-950/40 border border-orange-900/50 rounded-full text-orange-400/70 font-mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why us bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 p-6 bg-orange-950/20 border border-orange-500/20 rounded-3xl">
          {[
            { icon: '🔩', title: 'Hardware + Software', desc: 'Integramos el dispositivo físico con la plataforma digital en un solo proyecto' },
            { icon: '📐', title: 'Diseño a medida', desc: 'Sin soluciones genéricas. Cada proyecto se diseña desde cero para tu caso' },
            { icon: '🚀', title: 'Prototipo rápido', desc: 'Validamos tu idea con un prototipo funcional antes de la producción final' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="font-bold text-white text-sm mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl p-[1px] overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-40" />
          <div className="relative bg-[#050505] p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-black mb-4">¿Tienes un proceso que quieres automatizar?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Desde una pequeña mejora en tu línea de producción hasta un sistema completo de control industrial.
            </p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl transition-all hover:scale-105">
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
            <Link href="/servicios/automatizacion-ia" className="flex items-center gap-3 px-6 py-4 bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-500 rounded-2xl text-sm font-semibold text-cyan-300 transition-all">
              🤖 IA & Software
            </Link>
            <Link href="/servicios/iot-conectividad" className="flex items-center gap-3 px-6 py-4 bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 rounded-2xl text-sm font-semibold text-emerald-300 transition-all">
              🔌 IoT, Arduino y ESP32
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
