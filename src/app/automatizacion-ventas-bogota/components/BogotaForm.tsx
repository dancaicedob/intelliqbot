'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function BogotaForm() {
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
          origen: 'Landing Bogotá SEO' // Origen Bogotá
        },
      ]);

    setIsSubmitting(false);

    if (error) {
      if (error.code === 'PGRST204') {
        setErrorMsg('Error: Debes agregar la columna "origen" (texto) a tu tabla contact_leads en Supabase antes de enviar.');
      } else {
        setErrorMsg(error.message);
      }
    } else {
      setIsSuccess(true);
      setFormData({ name: '', phone: '', company: '', challenge: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <div className="w-full relative group h-full">
      <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-[2rem]" />
      <div className="relative bg-[#09090b] border border-cyan-900/50 p-6 md:p-10 rounded-[2rem] shadow-[0_0_30px_rgba(124,58,237,0.05)] h-full flex flex-col">
        
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
          </div>
          <p className="text-xs text-gray-500 font-mono tracking-wider">bogota_ws_leads.exe</p>
        </div>

        <div className="mb-8 font-mono text-sm text-cyan-400/80 space-y-2">
          <p>root@intelliqbot:~$ ./conectar_bogota</p>
          <p className="text-green-400">[OK] Nodo Bogotá Central Enlazado.</p>
          <p className="animate-pulse text-purple-400">Esperando parámetros comerciales...</p>
        </div>

        <form className="flex-1 flex flex-col gap-6 font-mono" onSubmit={handleSubmit}>
          
          {isSuccess && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-lg flex items-center gap-3 animate-pulse">
              <span className="text-xl">✅</span>
              <p>Datos encriptados. Iniciaremos el proceso de automatización pronto.</p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-lg">
              <p>{errorMsg}</p>
            </div>
          )}
          
          <div className="group/field relative">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
              <span className="text-cyan-600 mr-2">&gt;</span> Nombre
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-700 shadow-inner" 
              placeholder="INGRESAR IDENTIDAD..."
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="group/field relative">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
              <span className="text-cyan-600 mr-2">&gt;</span> Empresa
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-700 shadow-inner" 
              placeholder="NODO CORPORATIVO..."
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="group/field relative">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wider group-focus-within/field:text-cyan-400 transition-colors">
              <span className="text-cyan-600 mr-2">&gt;</span> WhatsApp
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
              <span className="text-cyan-600 mr-2">&gt;</span> ¿Qué quieres automatizar?
            </label>
            <textarea 
              rows={3}
              required
              className="w-full bg-[#050505] border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-700 resize-none shadow-inner" 
              placeholder="VENTAS, AGENDAMIENTO, ATENCIÓN..."
              value={formData.challenge}
              onChange={e => setFormData({...formData, challenge: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="mt-6 electric-border w-full py-5 text-center font-bold text-white tracking-widest uppercase bg-cyan-950/40 hover:bg-cyan-900/60 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.2)] disabled:opacity-50"
            style={{ '--electric-color': '#7c3aed' } as React.CSSProperties}
          >
            {isSubmitting ? '[ Ejecutando Protocolo... ]' : '[ Quiero automatizar mis ventas ]'}
          </button>
        </form>

      </div>
    </div>
  );
}
