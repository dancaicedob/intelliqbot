'use client';

import { useState } from 'react';
import { getLeads } from '@/actions/getLeads';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await getLeads(password);
      setLeads(data);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="bg-[#050505] text-white min-h-screen flex items-center justify-center font-mono relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.05)_0%,_transparent_60%)] pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0a0a0a] border border-cyan-900/50 p-10 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.05)] w-full max-w-md relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-400">Terminal Core</h1>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <p className="text-gray-500 mb-2 text-sm">&gt; AUTORIZACIÓN REQUERIDA:</p>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-cyan-900/50 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 font-mono tracking-widest"
                placeholder="********"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">Error: {error}</p>}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg text-cyan-300 font-bold tracking-widest transition-colors disabled:opacity-50"
            >
              {isLoading ? '[ VALIDANDO... ]' : '[ INGRESAR AL SISTEMA ]'}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#050505] text-white min-h-screen p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col h-full">
        
        <header className="flex justify-between items-end mb-12 border-b border-gray-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-green-500/30 bg-green-950/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 font-mono text-xs uppercase tracking-widest">Enlace en Vivo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Panel Administrativo
            </h1>
          </div>
          
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-400 hover:text-white underline font-mono text-sm"
          >
            [ CERRAR SESIÓN ]
          </button>
        </header>

        <div className="flex-1 bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-6 shadow-2xl overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 font-mono text-sm uppercase tracking-wider">
                <th className="pb-4 pt-2 font-medium w-1/5">Identidad</th>
                <th className="pb-4 pt-2 font-medium w-1/5">Teléfono</th>
                <th className="pb-4 pt-2 font-medium w-1/5">Empresa</th>
                <th className="pb-4 pt-2 font-medium w-2/5">Reto Principal</th>
                <th className="pb-4 pt-2 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500 font-mono">
                    No hay datos registrados en el sistema.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-900/50 hover:bg-white/5 transition-colors group">
                    <td className="py-6 pr-4 font-bold text-cyan-50">{lead.name}</td>
                    <td className="py-6 pr-4 font-mono text-cyan-400">{lead.phone || 'N/A'}</td>
                    <td className="py-6 pr-4 text-purple-300 font-medium">{lead.company}</td>
                    <td className="py-6 pr-4 text-gray-400 group-hover:text-gray-200 transition-colors">{lead.challenge}</td>
                    <td className="py-6 font-mono text-xs text-gray-500 whitespace-nowrap truncate">
                      {new Date(lead.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}
