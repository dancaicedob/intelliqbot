'use client';

import { motion } from 'framer-motion';
import Navbar from '@/app/components/home/Navbar';

export default function NosotrosPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-hidden font-sans">
      <Navbar />

      {/* Grid background for technical/futuristic feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient glowing orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-32 flex flex-col items-center">
        
        {/* H1: Neon Electric Sign */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="electric-border w-full text-center px-4 py-16 md:px-12 md:py-24 shadow-[0_0_50px_rgba(0,255,255,0.1)] mb-32"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight neon-text neon-flicker"
          >
            Transformamos la forma en que<br className="hidden md:block" /> trabajan las empresas
          </motion.h1>
          
          <div className="absolute top-0 left-0 w-full h-full bg-cyan-900/10 mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* H2 section: The story */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative"
        >
          {/* Decorative side lines */}
          <div className="absolute -left-4 md:-left-12 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-50 hidden sm:block" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10">
            Todo comenzó con un problema real
          </h2>

          <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed font-light border-l-2 border-cyan-800/30 pl-6 md:pl-8">
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              En <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">Intelliqbot</span> no nacimos desde la teoría, nacimos desde la frustración.
            </motion.p>
            
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Entendimos de primera mano lo que significa tener un negocio y perder oportunidades por tareas que consumen tiempo: responder mensajes constantemente, publicar contenido, gestionar ventas manualmente y tratar de mantener todo en orden sin un sistema claro.
            </motion.p>

            <motion.p
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Vimos cómo el crecimiento se detenía no por falta de potencial, sino por depender de procesos manuales.
            </motion.p>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 p-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
              <p className="text-white italic text-xl md:text-2xl font-medium">
                Y ahí fue donde todo hizo sentido:
              </p>
              <p className="text-cyan-300 font-bold text-2xl md:text-3xl mt-4 drop-shadow-md">
                no era falta de esfuerzo, era falta de automatización inteligente.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* H2 section 2: The unseen problem */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-32 md:mt-48"
        >
          <div className="absolute right-0 top-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 text-right">
            El problema que las empresas<br className="hidden md:block" /> aún no están viendo
          </h2>

          <div className="space-y-12 text-lg md:text-xl text-gray-300 leading-relaxed font-light flex flex-col md:items-end md:text-right">
            
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              Hoy en día, muchas empresas siguen operando con <span className="text-red-400 font-semibold blur-[0.5px]">desorden</span>.
            </motion.p>

            {/* List of problems as glowing exotic cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-8 pt-6">
              {[
                { title: "Desconexiones", desc: "Cada proceso funciona por separado." },
                { title: "Cuellos de Botella", desc: "Cada tarea depende de una persona." },
                { title: "Pérdidas Ocultas", desc: "Y cada retraso cuesta dinero." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * i, duration: 0.5 }}
                  className="bg-black/50 border border-gray-800 p-6 md:p-8 rounded-xl relative group overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-12 h-1 mb-6 bg-gradient-to-r from-red-500 to-transparent" />
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-base md:text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Focus area: El error comun */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full mt-16 p-[1px] relative"
            >
              {/* Animated glowing wrapper */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-3xl animate-pulse-slow blur-sm opacity-60" />
              <div className="relative bg-[#09090b] p-8 md:p-16 rounded-3xl flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,0,128,0.1)]">
                <p className="text-pink-400 font-medium mb-4 uppercase tracking-widest text-xs md:text-sm">Además, existe un error común:</p>
                <p className="text-2xl md:text-4xl font-bold text-white mb-8 leading-snug">
                  Intentar automatizar todo como si los negocios fueran máquinas.
                </p>
                <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />
                <p className="text-gray-400 max-w-2xl mx-auto italic text-lg md:text-2xl">
                  Pero las empresas no funcionan así.<br/>
                  <br className="md:hidden" />
                  La creatividad, la estrategia y la toma de decisiones humanas <span className="text-white font-semibold">siguen siendo esenciales</span>.
                </p>
              </div>
            </motion.div>

            {/* The Climax transition statement */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-full text-center mt-24 mb-10"
            >
              <p className="text-2xl md:text-5xl font-bold flex flex-col gap-4">
                <span className="text-gray-600 line-through decoration-red-500/50 decoration-2">El problema no es la falta de tecnología.</span>
                <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] neon-flicker">Es usarla mal.</span>
              </p>
            </motion.div>

          </div>
        </motion.section>

        {/* H2 section 3: Our mindset */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-32 md:mt-48 text-center"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-16 pt-16">
            Nuestra forma de pensar <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]">es diferente</span>
          </h2>

          <div className="space-y-10 text-lg md:text-xl text-gray-300 font-light flex flex-col items-center">
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl text-2xl md:text-3xl font-medium leading-relaxed"
            >
              En Intelliqbot <span className="line-through decoration-cyan-500/50">no buscamos reemplazar a las personas</span>.
              <br/><br/>
              Buscamos <span className="text-white font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">potenciar lo que realmente importa</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12"
            >
              {[
                "Automatizamos procesos repetitivos y operativos",
                "Liberamos tiempo para tareas estratégicas",
                "Creamos sistemas que trabajan 24/7 sin fricción"
              ].map((text, i) => (
                <div key={i} className="bg-gradient-to-b from-zinc-900 to-black p-[2px] rounded-2xl relative group">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-black p-8 rounded-2xl h-full flex items-center justify-center text-center relative z-10 border border-zinc-800 group-hover:border-cyan-500/50 transition-colors">
                    <p className="text-gray-300 font-medium">{text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-20 w-full"
            >
              <p className="text-xl md:text-2xl text-purple-300 italic mb-8">Pero hay algo que nos define:</p>
              <p className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider mb-8 px-4 py-8 border-y border-purple-500/30 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                No construimos automatizaciones básicas.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center w-full mt-8"
            >
              <p className="text-2xl font-bold mb-8">Creamos sistemas capaces de:</p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {["Adaptarse", "Analizar", "Tomar decisiones dentro de su función"].map((word, i) => (
                  <span key={i} className="px-6 py-3 bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 rounded-full font-bold shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                    {word}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="max-w-3xl mt-16 text-xl text-gray-400"
            >
              No trabajamos con soluciones rígidas basadas únicamente en reglas.<br/><br/>
              <span className="text-2xl md:text-4xl text-white font-semibold neon-text">
                Trabajamos con sistemas inteligentes diseñados para escalar.
              </span>
            </motion.p>

          </div>
        </motion.section>

        {/* H2 section 4: Do's and Don'ts */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-32 md:mt-48 mb-32"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-16 text-center">
            Lo que hacemos <span className="text-gray-600 font-light text-2xl md:text-4xl"><br className="md:hidden"/>(y lo que no hacemos)</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
            
            {/* What we do */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/30 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-3xl rounded-full group-hover:bg-green-500/10 transition-colors duration-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-green-400 mb-8 flex items-center gap-4">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">✔️</span> Lo que hacemos:
              </h3>
              <ul className="space-y-6 text-gray-300 text-lg">
                {[
                  "Sistemas de ventas automatizados por chat",
                  "Automatización de procesos empresariales",
                  "Integración de herramientas y flujos de trabajo",
                  "Soluciones personalizadas según cada negocio"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="min-w-[8px] h-2 rounded-full bg-green-500 mt-2.5 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What we don't do */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-3xl rounded-full group-hover:bg-red-500/10 transition-colors duration-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-8 flex items-center gap-4">
                <span className="text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">❌</span> Lo que no hacemos:
              </h3>
              <ul className="space-y-6 text-gray-400 text-lg">
                {[
                  "No vendemos bots genéricos",
                  "No automatizamos procesos que requieren creatividad humana",
                  "No prometemos resultados irreales",
                  "No construimos sistemas limitados que no puedan escalar"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="min-w-[8px] h-2 rounded-full bg-red-500 mt-2.5 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </motion.section>

        {/* H2 section 5: Experiencia basada en creacion real */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-32 md:mt-48 text-left"
        >
          <div className="absolute left-0 top-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-10">
            Experiencia basada en creación real
          </h2>

          <div className="space-y-12 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              Antes de ser un servicio, <span className="text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">Intelliqbot ha sido un laboratorio</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full"
            >
              <p className="mb-8 font-medium">Hemos desarrollado soluciones como:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {[
                  "Sistemas que permiten responder en tiempo real en otros idiomas",
                  "Herramientas de auditoría SEO técnica y semántica",
                  "Plataformas web optimizadas para rendimiento",
                  "Sistemas de ventas automatizados"
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-950 border border-cyan-900/50 p-6 rounded-2xl flex items-center gap-4 hover:border-cyan-400/50 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.05)]">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                    </div>
                    <p className="text-gray-300 text-base md:text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full mt-16 p-[1px] relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-30 animate-pulse-slow blur-[2px]" />
              <div className="relative bg-[#050505] p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between border border-cyan-500/20">
                <p className="text-xl md:text-2xl text-gray-300 italic">Todo esto nos ha permitido entender algo clave:</p>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-bold text-white leading-snug">
                    <span className="text-cyan-400">👉</span> la automatización no es el futuro,<br className="hidden md:block" /> es el <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] electric-border inline-block px-4 py-1 mt-4 md:mt-2">presente mal aprovechado.</span>
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* H2 section 6: Hacia donde vamos */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-32 md:mt-48 text-center flex flex-col items-center"
        >
          <div className="absolute top-0 w-px h-24 bg-gradient-to-b from-transparent to-purple-500 mb-8" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-16 pt-32">
            Hacia dónde vamos
          </h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <p className="text-purple-400 font-medium tracking-widest uppercase text-sm">Nuestro objetivo es claro:</p>
            <p className="text-2xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight">
              Convertirnos en una empresa capaz de transformar la operación de <span className="text-pink-400 drop-shadow-[0_0_15px_rgba(255,0,128,0.5)]">miles de negocios</span>.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-24 w-full"
          >
            <p className="text-xl md:text-2xl text-gray-400 mb-12">Queremos llevar la automatización a un nivel donde:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                "Las empresas operen con eficiencia real",
                "Los equipos trabajen mejor, no más",
                "Y la tecnología deje de ser una barrera y se convierta en una ventaja"
              ].map((text, i) => (
                <div key={i} className="flex flex-col items-center p-8 bg-gradient-to-b from-purple-900/10 to-transparent border-t border-purple-500/30 rounded-t-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 group-hover:border-purple-400 group-hover:bg-purple-500/20 transition-all">
                    <span className="text-2xl text-purple-400 font-bold">{i+1}</span>
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl font-medium">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.section>

        {/* Ending section: Intelliqbot Vision */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full relative mt-32 md:mt-48"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.05)_0%,_transparent_60%)] pointer-events-none" />
          
          <div className="bg-black/80 border border-cyan-800/50 backdrop-blur-xl p-12 md:p-24 rounded-[3rem] text-center shadow-[0_0_100px_rgba(0,255,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
            
            <h2 className="text-4xl md:text-7xl font-black text-white mb-16 tracking-tighter mix-blend-screen drop-shadow-2xl">
              Intelliqbot
            </h2>
            
            <p className="text-xl md:text-3xl text-gray-400 font-light mb-16">Creemos en un futuro donde:</p>

            <div className="flex flex-col gap-6 text-left max-w-2xl mx-auto">
              {[
                "Los procesos funcionan solos",
                "Las empresas escalan sin fricción",
                "Y la tecnología trabaja para las personas, no al revés"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * i }}
                  className="flex items-center gap-6 p-4 rounded-xl hover:bg-cyan-900/10 transition-colors"
                >
                  <span className="text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">👉</span>
                  <p className="text-xl md:text-2xl text-gray-200 font-medium">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA FINAL */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full relative mt-32 md:mt-48 mb-32 z-20 text-center flex flex-col items-center"
        >
          <div className="p-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse-slow">
            <div className="px-6 py-2 bg-black rounded-full font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-widest text-sm md:text-base uppercase">
              El siguiente paso
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mt-12 mb-8 leading-tight max-w-4xl mx-auto drop-shadow-lg flex flex-col gap-4">
            Empieza a automatizar tu negocio hoy
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Descubre cómo podemos ayudarte a optimizar tus procesos, reducir costos y mejorar tu eficiencia.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/contacto" 
              className="group relative inline-flex items-center justify-center px-8 py-5 md:px-12 md:py-6 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-4 text-lg md:text-xl">
                👉 Contáctanos y lleva tu empresa al siguiente nivel
              </span>
            </a>
          </motion.div>
        </motion.section>

      </div>
    </main>
  );
}
