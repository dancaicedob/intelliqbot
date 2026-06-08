'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/home/Navbar';
import Footer from '@/app/components/home/Footer';

const services = [
  {
    emoji: '📡',
    title: 'IoT — Internet de las Cosas',
    description: 'Conectamos sensores, dispositivos y máquinas a internet para que puedas monitorear y controlar tu entorno en tiempo real desde cualquier lugar del mundo.',
    tags: ['IoT Colombia', 'dispositivos conectados', 'internet de las cosas Colombia'],
  },
  {
    emoji: '🔧',
    title: 'Proyectos con Arduino',
    description: 'Diseñamos y desarrollamos prototipos y productos finales con Arduino. Desde sistemas de alarma hasta controladores de maquinaria, con soporte en hardware y firmware.',
    tags: ['Arduino Colombia', 'prototipo Arduino', 'firmware Arduino'],
  },
  {
    emoji: '📶',
    title: 'Proyectos con ESP32 y ESP8266',
    description: 'Creamos soluciones con microcontroladores ESP32 para conectividad WiFi y Bluetooth, ideales para IoT, wearables, dispositivos industriales y telemetría inalámbrica.',
    tags: ['ESP32 Colombia', 'ESP8266 Colombia', 'microcontrolador WiFi'],
  },
  {
    emoji: '🏠',
    title: 'Domótica — Casas Inteligentes',
    description: 'Automatizamos tu hogar: iluminación, seguridad, climatización, persianas y electrodomésticos controlados desde tu celular o mediante voz y rutinas automáticas.',
    tags: ['domótica Colombia', 'casas inteligentes Colombia', 'hogar automatizado'],
  },
  {
    emoji: '🏢',
    title: 'Inmótica — Edificios Inteligentes',
    description: 'Implementamos sistemas de automatización para edificios comerciales: control de acceso, climatización centralizada, iluminación y monitoreo energético integral.',
    tags: ['inmótica Colombia', 'edificios inteligentes Colombia', 'automatización edificios'],
  },
  {
    emoji: '📊',
    title: 'Monitoreo Remoto y Telemetría',
    description: 'Instalamos sistemas de monitoreo con dashboards en tiempo real para leer variables físicas: temperatura, humedad, presión, caudal, vibración y estado de equipos.',
    tags: ['monitoreo remoto Colombia', 'telemetría Colombia', 'dashboard sensores'],
  },
  {
    emoji: '🔬',
    title: 'Prototipado Electrónico',
    description: 'Damos vida a tu idea desde el esquemático hasta el prototipo funcional. Diseño de PCB, selección de componentes, ensamble y pruebas para proyectos de cualquier escala.',
    tags: ['prototipado electrónico Colombia', 'diseño PCB Colombia', 'electrónica a medida'],
  },
  {
    emoji: '💡',
    title: 'Sensores y Actuadores a Medida',
    description: 'Seleccionamos e integramos el sensor o actuador exacto que necesita tu proyecto: temperatura, nivel, movimiento, presión, motores, relés, válvulas y más.',
    tags: ['sensores Colombia', 'actuadores Colombia', 'integración sensores'],
  },
];

const whatsapp = 'https://wa.me/573176285563?text=Hola%20Intelliqbot%2C%20quiero%20un%20proyecto%20de%20IoT%20con%20Arduino%20o%20ESP32.';

export default function IoTPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden">
      <Navbar />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(16,185,129,0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-800/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-10">
          <Link href="/" className="hover:text-gray-400 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/servicios" className="hover:text-gray-400 transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-emerald-400">IoT & Hardware</span>
        </nav>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">

          {/* Hero SVG Icon */}
          <div className="w-28 h-28 mb-8">
            <svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="56" cy="56" r="52" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />
              <circle cx="56" cy="56" r="38" stroke="rgba(16,185,129,0.12)" strokeWidth="1" strokeDasharray="5 4" />
              {/* WiFi arcs */}
              <path d="M56 72 C56 72 56 72 56 72" stroke="rgba(16,185,129,0.9)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M46 63 Q56 55 66 63" stroke="rgba(16,185,129,0.7)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M38 55 Q56 41 74 55" stroke="rgba(16,185,129,0.5)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M30 47 Q56 27 82 47" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Device */}
              <rect x="42" y="70" width="28" height="18" rx="4" stroke="rgba(16,185,129,0.8)" strokeWidth="2" fill="rgba(16,185,129,0.06)" />
              <rect x="47" y="74" width="18" height="10" rx="2" stroke="rgba(16,185,129,0.4)" strokeWidth="1" fill="rgba(16,185,129,0.1)" />
              {/* Node left */}
              <circle cx="20" cy="70" r="7" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5" fill="rgba(16,185,129,0.08)" />
              <circle cx="20" cy="70" r="3" fill="rgba(16,185,129,0.5)" />
              <line x1="27" y1="70" x2="42" y2="76" stroke="rgba(16,185,129,0.35)" strokeWidth="1" strokeDasharray="3 2" />
              {/* Node right */}
              <circle cx="92" cy="70" r="7" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5" fill="rgba(16,185,129,0.08)" />
              <circle cx="92" cy="70" r="3" fill="rgba(16,185,129,0.5)" />
              <line x1="85" y1="70" x2="70" y2="76" stroke="rgba(16,185,129,0.35)" strokeWidth="1" strokeDasharray="3 2" />
              {/* Cloud */}
              <ellipse cx="56" cy="24" rx="16" ry="10" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" fill="rgba(16,185,129,0.05)" />
              <ellipse cx="45" cy="27" rx="9" ry="6" stroke="rgba(16,185,129,0.3)" strokeWidth="1" fill="rgba(16,185,129,0.03)" />
              <ellipse cx="67" cy="27" rx="9" ry="6" stroke="rgba(16,185,129,0.3)" strokeWidth="1" fill="rgba(16,185,129,0.03)" />
              {/* Dot center */}
              <circle cx="56" cy="72" r="3" fill="rgba(16,185,129,1)" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 mb-6 text-xs font-mono text-emerald-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            IoT & Hardware
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl">
            IoT, Arduino, ESP32 y{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Domótica en Colombia
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-10">
            Conectamos el mundo físico al digital. Desarrollamos proyectos de IoT, domótica,
            sensores y sistemas embebidos con Arduino y ESP32. Desde el prototipo hasta el
            producto final listo para desplegar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
              Cotizar proyecto IoT
            </a>
            <Link href="/servicios" className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 font-semibold rounded-2xl transition-all">
              ← Ver todos los servicios
            </Link>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-[#0a0a0a] border border-emerald-500/20 hover:border-emerald-500/60 rounded-2xl p-6 transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]">
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h2 className="text-base font-bold text-white mb-2 leading-snug">{s.title}</h2>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-1">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-emerald-950/40 border border-emerald-900/50 rounded-full text-emerald-400/70 font-mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 p-6 bg-emerald-950/20 border border-emerald-500/20 rounded-3xl">
          {[
            { icon: '🌐', title: 'Conectividad total', desc: 'WiFi, Bluetooth, LoRa, 4G/LTE, Zigbee y más protocolos' },
            { icon: '🔋', title: 'Bajo consumo', desc: 'Soluciones optimizadas para dispositivos con batería' },
            { icon: '🛡️', title: 'Datos seguros', desc: 'Cifrado end-to-end y comunicaciones seguras' },
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
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-40" />
          <div className="relative bg-[#050505] p-12 rounded-3xl text-center">
            <h2 className="text-3xl font-black mb-4">¿Tienes un proyecto de IoT en mente?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Desde domótica residencial hasta telemetría industrial. Cuéntanos tu idea y la hacemos realidad.</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all hover:scale-105">
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
