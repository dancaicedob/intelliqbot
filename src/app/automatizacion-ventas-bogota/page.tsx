'use client';

import { motion } from 'framer-motion';
import Navbar from '@/app/components/home/Navbar';
import BogotaForm from './components/BogotaForm';

export default function BogotaLandingPage() {
  const whatsappLink = `https://wa.me/573176285563?text=${encodeURIComponent('Hola Intelliqbot, escribo desde Bogotá. Quiero automatizar mis ventas por WhatsApp.')}`;

  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-hidden font-sans">
      <Navbar />

      {/* Cyberpunk Background Grid & Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,128,255,0.05)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-950/30 mb-6 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300 font-mono text-sm uppercase tracking-widest">Servicios Locales: Bogotá</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 neon-text neon-flicker tracking-tight leading-tight">
              Ventas por WhatsApp en <span className="text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">Bogotá</span> con automatización e inteligencia artificial
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 font-light leading-relaxed">
              En Intelliqbot ayudamos a empresas en Bogotá a aumentar sus ventas por WhatsApp mediante automatización inteligente. Implementamos sistemas que permiten responder mensajes automáticamente, gestionar clientes y optimizar la atención sin depender de procesos manuales.
            </p>
            <p className="text-lg md:text-xl text-purple-400 font-medium mb-10">
              Con nuestros chatbots con IA y automatización de mensajes, tu negocio puede atender más rápido, convertir más leads y escalar sin esfuerzo. Si buscas automatizar ventas por WhatsApp en Bogotá, tenemos la solución.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Formulario extraído */}
            <BogotaForm />
          </motion.div>
        </div>

        {/* 3 CUADROS SECTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 relative"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]">Automatización de WhatsApp para vender más en Bogotá</h2>
            <div className="h-1 w-24 bg-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="group relative w-full h-full p-[1px] rounded-[1.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-[1.5rem] flex flex-col items-start hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(0,255,255,0.05)]">
                <div className="text-4xl mb-6 bg-cyan-950/50 p-4 rounded-xl border border-cyan-500/30">💬</div>
                <h3 className="text-2xl font-bold text-white mb-4">Automatización de mensajes WhatsApp Bogotá</h3>
                <p className="text-gray-400">Configura respuestas automáticas para atender clientes al instante, resolver dudas frecuentes y no perder oportunidades de venta.</p>
              </div>
            </div>
            
            {/* Box 2 */}
            <div className="group relative w-full h-full p-[1px] rounded-[1.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-pink-500/20 p-8 rounded-[1.5rem] flex flex-col items-start hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.05)]">
                <div className="text-4xl mb-6 bg-pink-950/50 p-4 rounded-xl border border-pink-500/30">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-4">Chatbot con IA para WhatsApp Bogotá</h3>
                <p className="text-gray-400">Implementamos chatbots que entienden conversaciones, califican leads y ayudan a cerrar ventas de forma automática.</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="group relative w-full h-full p-[1px] rounded-[1.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-indigo-500/20 p-8 rounded-[1.5rem] flex flex-col items-start hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.05)]">
                <div className="text-4xl mb-6 bg-indigo-950/50 p-4 rounded-xl border border-indigo-500/30">📈</div>
                <h3 className="text-2xl font-bold text-white mb-4">Sistema de ventas por WhatsApp Bogotá</h3>
                <p className="text-gray-400">Creamos embudos de ventas en WhatsApp que guían al cliente desde el primer mensaje hasta la compra con total automatización.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SEO MAP / KEYWORDS & BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#08080a] border border-purple-900/40 p-10 rounded-[2rem] shadow-[0_0_30px_rgba(124,58,237,0.05)]"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4">
              <span className="text-3xl">🗺️</span> Soluciones de ventas por WhatsApp en Bogotá
            </h2>
            <ul className="space-y-4">
              {[
                "Ventas por WhatsApp Bogotá",
                "Automatización WhatsApp Bogotá",
                "Automatizar ventas WhatsApp Bogotá",
                "Chatbot WhatsApp Bogotá",
                "Atención al cliente WhatsApp Bogotá",
                "Responder mensajes automático Bogotá",
                "Sistema de ventas WhatsApp Bogotá",
                "Embudos de ventas WhatsApp Bogotá"
              ].map((keyword, i) => (
                <li key={i} className="flex items-center gap-3 bg-[#0c0f12] py-3 px-5 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors group">
                  <span className="text-purple-400 group-hover:animate-ping">📍</span>
                  <span className="text-gray-300 font-mono text-sm tracking-wide">{keyword}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* BENEFICIOS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4 text-white">
              <span className="text-4xl text-green-400">📋</span> Beneficios de automatizar WhatsApp en tu negocio
            </h2>
            <div className="space-y-6">
              {[
                "Responde mensajes automáticamente y sin retrasos",
                "Aumenta tus ventas con atención inmediata",
                "Mejora la experiencia del cliente en WhatsApp",
                "Gestiona múltiples conversaciones sin esfuerzo",
                "Automatiza el seguimiento de clientes potenciales",
                "Convierte más leads en ventas de forma constante"
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,1)]"></div>
                  </div>
                  <p className="text-lg text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] p-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 blur-[2px] animate-shimmer bg-[length:200%_auto]" />
          <div className="relative bg-[#050505] p-12 md:p-16 rounded-[2.4rem] text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 flex items-center justify-center gap-4">
              <span className="text-purple-400">🚀</span> Automatiza tus ventas por WhatsApp en Bogotá hoy
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-6 font-light">
              En una ciudad como Bogotá, donde el volumen de clientes es alto, responder rápido marca la diferencia entre vender o perder oportunidades. Con Intelliqbot puedes implementar un sistema de ventas por WhatsApp automatizado que trabaja por ti 24/7, optimizando la atención al cliente y aumentando tus ingresos.
            </p>
            <p className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] font-bold text-xl mb-12">
              👉 No dejes que tus clientes se enfríen. Automatiza tu negocio y vende más.
            </p>
            
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 electric-border text-center font-bold text-white tracking-widest uppercase bg-purple-900/40 hover:bg-purple-800/60 transition-colors shadow-2xl inline-flex items-center gap-3 text-lg"
              style={{ '--electric-color': '#d946ef' } as React.CSSProperties}
            >
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
