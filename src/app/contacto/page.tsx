'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/app/components/home/Navbar';
import { supabase } from '@/lib/supabase';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', company: '', challenge: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const { error } = await supabase
      .from('contact_leads')
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          company: formData.company,
          challenge: formData.challenge,
        },
      ]);

    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setIsSuccess(true);
      setFormData({ name: '', phone: '', company: '', challenge: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-hidden font-sans">
      <Navbar />

      {/* Background Matrix/Grid effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,255,255,0.05)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 mt-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 mb-8 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-mono text-sm uppercase tracking-widest">Sistemas Operativos Listos</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 neon-text neon-flicker tracking-tight">
            Inicializando conexión...
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Elige tu ruta de integración. Habla directamente con nuestro núcleo operativo o ejecuta un diagnóstico detallado del sistema.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 w-full max-w-6xl mt-8">
          
          {/* WhatsApp Direct Bypass */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="group block relative w-full h-full p-[1px] rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-transparent opacity-50 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
            
            <div className="relative h-full bg-[#080f0a]/90 backdrop-blur-xl border border-green-500/30 p-8 md:p-12 rounded-[2rem] flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(34,197,94,0.15)] group-hover:shadow-[0_0_60px_rgba(34,197,94,0.3)] transition-all">
              <div className="w-20 h-20 mb-8 rounded-full bg-green-950/50 flex items-center justify-center border border-green-500/50 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                {/* WhatsApp minimalist icon */}
                <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">Ruta de Alta Velocidad</h2>
              <p className="text-gray-400 mb-12 text-lg">Bypass manual. Habla con nosotros en tiempo real a través de nuestro canal seguro.</p>
              
              <a 
                href="https://wa.me/573176285563?text=Hola%20Intelliqbot,%20quiero%20iniciar%20la%20automatizaci%C3%B3n%20de%20mi%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full electric-border text-center py-5 font-bold text-white tracking-widest uppercase bg-green-900/40 hover:bg-green-800/60 transition-colors shadow-lg"
                style={{ '--electric-color': '#22c55e' } as React.CSSProperties}
              >
                [ Iniciar Enlace WhatsApp ]
              </a>
              
              <p className="mt-8 text-sm text-green-400/80 font-mono tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                Latencia de sistema: 0.01ms
              </p>
            </div>
          </motion.div>

          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full relative group"
          >
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-[2rem]" />
            <div className="relative bg-[#09090b] border border-cyan-900/50 p-6 md:p-10 rounded-[2rem] shadow-[0_0_30px_rgba(0,255,255,0.05)] h-full flex flex-col">
              
              <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <p className="text-xs text-gray-500 font-mono tracking-wider">auditoria.exe - intelliqbot@gmail.com</p>
              </div>

              <div className="mb-8 font-mono text-sm text-cyan-400/80 space-y-2">
                <p>root@intelliqbot:~$ ./iniciar_diagnostico</p>
                <p className="text-green-400">[OK] Criptografía activa.</p>
                <p className="text-green-400">[OK] Base de datos enlazada.</p>
                <p className="animate-pulse text-purple-400">Esperando input de usuario...</p>
              </div>

              <form className="flex-1 flex flex-col gap-6 font-mono" onSubmit={handleSubmit}>
                
                {isSuccess && (
                  <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-lg flex items-center gap-3 animate-pulse">
                    <span className="text-xl">✅</span>
                    <p>Protocolo de contacto exitoso. Información almacenada.</p>
                  </div>
                )}

                {errorMsg && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-lg">
                    <p>Error en la conexión: {errorMsg}</p>
                  </div>
                )}
                
                <div className="group/field relative">
                  <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
                    <span className="text-cyan-600 mr-2">&gt;</span> Identidad (Nombre)
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-700 shadow-inner" 
                    placeholder="INGRESAR CREDENCIAL..."
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="group/field relative">
                  <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
                    <span className="text-cyan-600 mr-2">&gt;</span> Canal de Respuesta (Teléfono)
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="CO"
                    value={formData.phone}
                    onChange={(v) => setFormData({...formData, phone: v || ''})}
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-3 text-white focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-all shadow-inner custom-phone-input"
                    placeholder="INGRESAR NÚMERO..."
                  />
                </div>

                <div className="group/field relative">
                  <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
                    <span className="text-cyan-600 mr-2">&gt;</span> Nodo Operativo (Empresa)
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-700 shadow-inner" 
                    placeholder="INGRESAR ENTIDAD..."
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="group/field relative">
                  <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
                    <span className="text-cyan-600 mr-2">&gt;</span> Parámetro Crítico (Reto Principal)
                  </label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-700 resize-none shadow-inner" 
                    placeholder="DESCRIBE LA FALLA DEL SISTEMA ACTUAL..."
                    value={formData.challenge}
                    onChange={e => setFormData({...formData, challenge: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-6 electric-border w-full py-5 text-center font-bold text-white tracking-widest uppercase bg-cyan-950/40 hover:bg-cyan-900/60 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.2)] disabled:opacity-50"
                  style={{ '--electric-color': '#0ff' } as React.CSSProperties}
                >
                  {isSubmitting ? '[ Ejecutando Protocolo... ]' : '[ Ejecutar Diagnóstico ]'}
                </button>
              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
