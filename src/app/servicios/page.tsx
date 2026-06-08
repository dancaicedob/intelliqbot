'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/home/Navbar';
import Footer from '@/app/components/home/Footer';

const silos = [
  {
    href: '/servicios/automatizacion-ia',
    label: 'IA & Software',
    title: 'Automatización con IA y Software',
    description:
      'Chatbots inteligentes, integraciones API, desarrollo de aplicaciones y automatización de flujos de trabajo con inteligencia artificial.',
    accent: 'cyan',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    border: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.08)] hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]',
    badgeBg: 'bg-cyan-950/60',
    badgeText: 'text-cyan-300',
    tags: ['Chatbots IA', 'Integraciones API', 'Apps a medida', 'RPA', 'Marketing IA'],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Brain circuit icon */}
        <circle cx="40" cy="40" r="30" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
        <circle cx="40" cy="40" r="20" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="4 3" />
        {/* CPU chip */}
        <rect x="26" y="26" width="28" height="28" rx="4" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" fill="rgba(6,182,212,0.05)" />
        <rect x="31" y="31" width="18" height="18" rx="2" stroke="rgba(6,182,212,0.5)" strokeWidth="1" fill="rgba(6,182,212,0.08)" />
        {/* Pins left */}
        <line x1="22" y1="33" x2="26" y2="33" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="38" x2="26" y2="38" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="43" x2="26" y2="43" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Pins right */}
        <line x1="54" y1="33" x2="58" y2="33" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="38" x2="58" y2="38" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="43" x2="58" y2="43" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Pins top */}
        <line x1="33" y1="22" x2="33" y2="26" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="22" x2="40" y2="26" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="47" y1="22" x2="47" y2="26" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Pins bottom */}
        <line x1="33" y1="54" x2="33" y2="58" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="54" x2="40" y2="58" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="47" y1="54" x2="47" y2="58" stroke="rgba(6,182,212,0.8)" strokeWidth="1.5" strokeLinecap="round" />
        {/* AI text in chip */}
        <text x="40" y="42" textAnchor="middle" fill="rgba(6,182,212,1)" fontSize="8" fontFamily="monospace" fontWeight="bold">AI</text>
        {/* Floating dots */}
        <circle cx="15" cy="20" r="2" fill="rgba(6,182,212,0.6)" />
        <circle cx="65" cy="60" r="2" fill="rgba(6,182,212,0.6)" />
        <circle cx="65" cy="20" r="1.5" fill="rgba(6,182,212,0.4)" />
        <circle cx="15" cy="60" r="1.5" fill="rgba(6,182,212,0.4)" />
      </svg>
    ),
  },
  {
    href: '/servicios/iot-conectividad',
    label: 'IoT & Hardware',
    title: 'IoT, Arduino, ESP32 y Conectividad',
    description:
      'Dispositivos conectados, sensores, actuadores, domótica, monitoreo remoto, telemetría y prototipado electrónico con Arduino y ESP32.',
    accent: 'emerald',
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    border: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.08)] hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]',
    badgeBg: 'bg-emerald-950/60',
    badgeText: 'text-emerald-300',
    tags: ['Arduino', 'ESP32', 'Domótica', 'Sensores', 'Monitoreo Remoto'],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* WiFi signals */}
        <path d="M40 55 C40 55 40 55 40 55" stroke="rgba(16,185,129,0.9)" strokeWidth="3" strokeLinecap="round" />
        <path d="M33 48 Q40 42 47 48" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M27 42 Q40 31 53 42" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M21 36 Q40 20 59 36" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Center device */}
        <rect x="30" y="54" width="20" height="14" rx="3" stroke="rgba(16,185,129,0.8)" strokeWidth="1.5" fill="rgba(16,185,129,0.06)" />
        <rect x="34" y="58" width="12" height="6" rx="1" stroke="rgba(16,185,129,0.4)" strokeWidth="1" fill="rgba(16,185,129,0.1)" />
        {/* Connection nodes */}
        <circle cx="15" cy="50" r="5" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5" fill="rgba(16,185,129,0.1)" />
        <line x1="20" y1="50" x2="30" y2="58" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="65" cy="50" r="5" stroke="rgba(16,185,129,0.7)" strokeWidth="1.5" fill="rgba(16,185,129,0.1)" />
        <line x1="60" y1="50" x2="50" y2="58" stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        {/* Cloud */}
        <ellipse cx="40" cy="18" rx="12" ry="8" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" fill="rgba(16,185,129,0.06)" />
        <ellipse cx="32" cy="20" rx="7" ry="5" stroke="rgba(16,185,129,0.4)" strokeWidth="1" fill="rgba(16,185,129,0.04)" />
        <ellipse cx="48" cy="20" rx="7" ry="5" stroke="rgba(16,185,129,0.4)" strokeWidth="1" fill="rgba(16,185,129,0.04)" />
        {/* Pulse dot */}
        <circle cx="40" cy="55" r="2.5" fill="rgba(16,185,129,1)" />
      </svg>
    ),
  },
  {
    href: '/servicios/automatizacion-fisica',
    label: 'Industrial & Físico',
    title: 'Automatización Física e Industrial',
    description:
      'Control de accesos, robótica básica, sistemas embebidos, automatización industrial ligera, monitoreo de plantas y telemetría de campo.',
    accent: 'orange',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    border: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-500',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.08)] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]',
    badgeBg: 'bg-orange-950/60',
    badgeText: 'text-orange-300',
    tags: ['Control de Accesos', 'Robótica', 'Sistemas Embebidos', 'Industrial', 'Telemetría'],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Robotic arm */}
        <rect x="35" y="60" width="10" height="8" rx="2" stroke="rgba(249,115,22,0.8)" strokeWidth="1.5" fill="rgba(249,115,22,0.06)" />
        {/* Base joint */}
        <circle cx="40" cy="60" r="4" stroke="rgba(249,115,22,0.8)" strokeWidth="1.5" fill="rgba(249,115,22,0.1)" />
        {/* Arm segment 1 */}
        <line x1="40" y1="60" x2="28" y2="44" stroke="rgba(249,115,22,0.8)" strokeWidth="3" strokeLinecap="round" />
        {/* Mid joint */}
        <circle cx="28" cy="44" r="4" stroke="rgba(249,115,22,0.8)" strokeWidth="1.5" fill="rgba(249,115,22,0.1)" />
        {/* Arm segment 2 */}
        <line x1="28" y1="44" x2="38" y2="28" stroke="rgba(249,115,22,0.8)" strokeWidth="3" strokeLinecap="round" />
        {/* End joint */}
        <circle cx="38" cy="28" r="4" stroke="rgba(249,115,22,0.8)" strokeWidth="1.5" fill="rgba(249,115,22,0.1)" />
        {/* Arm segment 3 */}
        <line x1="38" y1="28" x2="52" y2="20" stroke="rgba(249,115,22,0.8)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Gripper */}
        <path d="M52 20 L58 16 M52 20 L58 24" stroke="rgba(249,115,22,0.8)" strokeWidth="2" strokeLinecap="round" />
        {/* Gear icon top right */}
        <circle cx="64" cy="16" r="7" stroke="rgba(249,115,22,0.4)" strokeWidth="1" fill="none" />
        <circle cx="64" cy="16" r="3" stroke="rgba(249,115,22,0.6)" strokeWidth="1" fill="rgba(249,115,22,0.1)" />
        {/* Gear teeth */}
        <line x1="64" y1="8" x2="64" y2="6" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="64" y1="24" x2="64" y2="26" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="56" y1="16" x2="54" y2="16" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="72" y1="16" x2="74" y2="16" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Data lines */}
        <line x1="10" y1="30" x2="20" y2="30" stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="10" y1="35" x2="18" y2="35" stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="10" y1="40" x2="16" y2="40" stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeDasharray="3 2" />
        {/* Panel */}
        <rect x="6" y="24" width="10" height="22" rx="2" stroke="rgba(249,115,22,0.4)" strokeWidth="1" fill="rgba(249,115,22,0.04)" />
      </svg>
    ),
  },
];

const stats = [
  { value: '16+', label: 'Tipos de proyectos' },
  { value: '3', label: 'Verticales de servicio' },
  { value: '24/7', label: 'Operación autónoma' },
  { value: '100%', label: 'A medida' },
];

export default function ServiciosHubPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden font-sans">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 text-xs font-mono uppercase tracking-widest text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Ingeniería de Automatización y Sistemas Inteligentes
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            Todo lo que tu empresa<br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-orange-400 bg-clip-text text-transparent">
              necesita automatizar
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones de <strong className="text-white">automatización, IoT y software</strong> a medida.
            Desde aplicaciones e inteligencia artificial hasta dispositivos electrónicos, sensores,
            sistemas de control y proyectos con Arduino, ESP32 y tecnologías conectadas.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* 3 Silos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {silos.map((silo, i) => (
            <motion.div
              key={silo.href}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 * i }}
            >
              <Link
                href={silo.href}
                className={`group relative flex flex-col h-full bg-[#0a0a0a] border ${silo.border} ${silo.hoverBorder} ${silo.glow} rounded-3xl p-8 transition-all duration-400 overflow-hidden block`}
              >
                {/* Gradient top border */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${silo.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className="w-20 h-20 mb-7 mx-auto lg:mx-0">
                  {silo.icon}
                </div>

                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${silo.badgeBg} border border-white/10 mb-4 w-fit`}>
                  <span className={`text-xs font-mono font-semibold uppercase tracking-widest ${silo.badgeText}`}>{silo.label}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 leading-snug">{silo.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{silo.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {silo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${silo.gradient} bg-clip-text text-transparent group-hover:gap-4 transition-all`}>
                  Ver servicios
                  <svg className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" style={{ color: 'currentColor' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] p-[1px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-500 opacity-40 blur-[1px]" />
          <div className="relative bg-[#050505] p-12 md:p-16 rounded-[2.4rem] text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              ¿No sabes cuál es tu solución?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
              Cuéntanos tu problema. Nuestro equipo te asesora y diseña una solución a medida sin costo.
            </p>
            <a
              href="https://wa.me/573176285563?text=Hola%20Intelliqbot%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-2xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Hablar con un experto
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
