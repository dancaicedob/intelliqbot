'use client';

import { motion } from 'framer-motion';
import Navbar from '@/app/components/home/Navbar';
import Footer from '@/app/components/home/Footer';
import CaliForm from './components/CaliForm';

export default function CaliLandingPage() {
  const whatsappLink = `https://wa.me/573176285563?text=${encodeURIComponent('Hola Intelliqbot, escribo desde Cali. Quiero implementar chatbots con IA en mi negocio.')}`;

  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-hidden font-sans">
      <Navbar />

      {/* Cyberpunk Background Grid & Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-green-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-green-500/30 bg-green-950/30 mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 font-mono text-sm uppercase tracking-widest">Servicios Locales: Cali</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 neon-text neon-flicker tracking-tight leading-tight">
              Chatbots con IA en <span className="text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">Cali</span> para automatizar ventas
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 font-light leading-relaxed">
              En Intelliqbot ayudamos a empresas en Cali a mejorar sus ventas y atención al cliente mediante chatbots con inteligencia artificial. Creamos sistemas que automatizan conversaciones, responden clientes en tiempo real y optimizan procesos sin intervención manual.
            </p>
            <p className="text-lg md:text-xl text-emerald-400 font-medium mb-10">
              Con nuestras soluciones de automatización, puedes atender más rápido, mejorar la experiencia del cliente y aumentar tus ingresos. Si buscas implementar chatbots con IA en Cali, tenemos la solución.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Formulario extraído */}
            <CaliForm />
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">Automatización inteligente para negocios en Cali</h2>
            <div className="h-1 w-24 bg-green-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="group relative w-full h-full p-[1px] rounded-[1.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-green-500/20 p-8 rounded-[1.5rem] flex flex-col items-start hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                <div className="text-4xl mb-6 bg-green-950/50 p-4 rounded-xl border border-green-500/30">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-4">Chatbot con IA para empresas en Cali</h3>
                <p className="text-gray-400">Desarrollamos chatbots que entienden, responden y toman decisiones, mejorando la atención al cliente y aumentando las conversiones exponencialmente.</p>
              </div>
            </div>
            
            {/* Box 2 */}
            <div className="group relative w-full h-full p-[1px] rounded-[1.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-teal-500/20 p-8 rounded-[1.5rem] flex flex-col items-start hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(20,184,166,0.05)]">
                <div className="text-4xl mb-6 bg-teal-950/50 p-4 rounded-xl border border-teal-500/30">💬</div>
                <h3 className="text-2xl font-bold text-white mb-4">Automatización de atención al cliente Cali</h3>
                <p className="text-gray-400">Automatiza respuestas, preguntas frecuentes y seguimiento de clientes para ofrecer una atención hiper-rápida y eficiente 24/7 ininterrumpida.</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="group relative w-full h-full p-[1px] rounded-[1.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500 via-green-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-lime-500/20 p-8 rounded-[1.5rem] flex flex-col items-start hover:-translate-y-2 transition-transform shadow-[0_0_20px_rgba(132,204,22,0.05)]">
                <div className="text-4xl mb-6 bg-lime-950/50 p-4 rounded-xl border border-lime-500/30">📈</div>
                <h3 className="text-2xl font-bold text-white mb-4">Chatbot para ventas en Cali</h3>
                <p className="text-gray-400">Creamos sistemas que convierten conversaciones en ventas monetizadas, guiando al cliente minuciosamente desde el primer contacto hasta la compra.</p>
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
            className="bg-[#08080a] border border-green-900/40 p-10 rounded-[2rem] shadow-[0_0_30px_rgba(34,197,94,0.05)]"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4">
              <span className="text-3xl">🗺️</span> Soluciones de chatbots en Cali
            </h2>
            <ul className="space-y-4">
              {[
                "Chatbot con IA Cali",
                "Chatbots para empresas Cali",
                "Automatización inteligencia artificial Cali",
                "Chatbot WhatsApp Cali",
                "Automatización atención al cliente Cali",
                "Bot para responder clientes Cali",
                "Sistema automatizado de ventas Cali",
                "IA para negocios Cali"
              ].map((keyword, i) => (
                <li key={i} className="flex items-center gap-3 bg-[#0c0f12] py-3 px-5 rounded-xl border border-gray-800 hover:border-green-500/50 transition-colors group">
                  <span className="text-green-400 group-hover:animate-ping">📍</span>
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
              <span className="text-4xl text-cyan-400">📋</span> Beneficios de chatbots con IA
            </h2>
            <div className="space-y-6">
              {[
                "Atención automática e inmediata a tus clientes",
                "Mejora la experiencia del usuario en cada interacción",
                "Aumenta las ventas con respuestas inteligentes",
                "Reduce la carga operativa en tu equipo",
                "Automatiza procesos repetitivos sin perder calidad",
                "Escala tu negocio de forma inteligente"
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,1)]"></div>
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
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-green-500 opacity-50 blur-[2px] animate-shimmer bg-[length:200%_auto]" />
          <div className="relative bg-[#050505] p-12 md:p-16 rounded-[2.4rem] text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 flex items-center justify-center gap-4">
              <span className="text-green-400">🚀</span> Implementa chatbots con IA en Cali hoy
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-6 font-light">
              La inteligencia artificial está transformando la forma en que las empresas venden y atienden clientes. En Intelliqbot Cali te ayudamos a implementar soluciones reales que automatizan procesos, mejoran la atención y aumentan tus ventas sin perder jamás el toque humano o la empatía.
            </p>
            <p className="text-white drop-shadow-[0_0_8px_rgba(34,197,94,0.4)] font-bold text-xl mb-12">
              👉 Da el paso hacia la automatización inteligente y lleva tu negocio al siguiente nivel.
            </p>
            
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 electric-border text-center font-bold text-white tracking-widest uppercase bg-green-900/40 hover:bg-green-800/60 transition-colors shadow-2xl inline-flex items-center gap-3 text-lg"
              style={{ '--electric-color': '#22c55e' } as React.CSSProperties}
            >
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Hablar por WhatsApp
            </a>

            {/* Interlinking Links */}
            <div className="mt-16 pt-8 border-t border-gray-800/80 w-full max-w-2xl flex flex-col items-center">
              <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">📍 Otras ciudades con servicio activo</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <a href="/automatizacion-ventas-medellin" className="text-gray-400 hover:text-cyan-400 transition-colors bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800 hover:border-cyan-500/50">
                  Automatización en Medellín
                </a>
                <a href="/automatizacion-ventas-bogota" className="text-gray-400 hover:text-purple-400 transition-colors bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800 hover:border-purple-500/50">
                  Automatización en Bogotá
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
      <Footer />
    </main>
  );
}
