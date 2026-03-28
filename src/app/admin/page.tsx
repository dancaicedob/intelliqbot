'use client';

import { useState } from 'react';
import { getLeads } from '@/actions/getLeads';
import { getSeoConfigs, saveSeoConfig, deleteSeoConfig } from '@/actions/seoActions';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'mensajes'|'seo'>('mensajes');
  
  const [leads, setLeads] = useState<any[]>([]);
  const [seoList, setSeoList] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // SEO Form
  const emptySeo = { route: '/', title: '', description: '', robots: 'index, follow', canonical: '', keywords: '' };
  const [editingSeo, setEditingSeo] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await getLeads(password);
      setLeads(data);
      const seoData = await getSeoConfigs();
      setSeoList(seoData || []);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const saved = await saveSeoConfig(editingSeo);
      setSeoList(prev => {
        const idx = prev.findIndex(item => item.id === saved.id);
        if (idx >= 0) {
          const newList = [...prev];
          newList[idx] = saved;
          return newList;
        }
        return [...prev, saved];
      });
      setEditingSeo(null);
    } catch (err: any) {
      alert('Error guardando SEO: ' + err.message);
    }
  };

  const handleDeleteSeo = async (id: string) => {
    if (!confirm('¿Eliminar esta configuración SEO permanentemente?')) return;
    try {
      await deleteSeoConfig(id);
      setSeoList(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert('Error eliminando: ' + err.message);
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
    <main className="bg-[#050505] text-white min-h-screen p-6 md:p-12 font-sans relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full flex-1">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-800 pb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-green-500/30 bg-green-950/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 font-mono text-xs uppercase tracking-widest">Enlace en Vivo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Panel Administrativo
            </h1>
          </div>
          
          <div className="flex bg-black/50 border border-gray-800 rounded-lg overflow-hidden">
            <button 
              onClick={() => setActiveTab('mensajes')}
              className={`px-6 py-3 font-mono text-sm uppercase tracking-wide transition-colors ${activeTab === 'mensajes' ? 'bg-cyan-950/60 text-cyan-300 border-b-2 border-cyan-400' : 'text-gray-500 hover:bg-white/5'}`}
            >
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-3 font-mono text-sm uppercase tracking-wide transition-colors ${activeTab === 'seo' ? 'bg-purple-950/60 text-purple-300 border-b-2 border-purple-400' : 'text-gray-500 hover:bg-white/5'}`}
            >
              SEO / Metadata
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            
            {activeTab === 'mensajes' && (
              <motion.div 
                key="mensajes"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-6 overflow-auto custom-scrollbar"
              >
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
                        <td colSpan={5} className="py-12 text-center text-gray-500 font-mono">
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
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div 
                key="seo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full flex flex-col md:flex-row gap-6"
              >
                {/* SEO List */}
                <div className="w-full md:w-1/3 bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-6 overflow-auto custom-scrollbar">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-purple-400">Rutas Configuradas</h3>
                    <button 
                      onClick={() => setEditingSeo(emptySeo)}
                      className="text-white bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded text-sm font-bold transition-colors"
                    >
                      + Noche Ruta
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {seoList.length === 0 && <p className="text-gray-500 text-sm">No hay configuraciones SEO. ¡Crea una!</p>}
                    {seoList.map(seo => (
                      <div 
                        key={seo.id} 
                        onClick={() => setEditingSeo(seo)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border ${editingSeo?.id === seo.id ? 'bg-purple-900/20 border-purple-500/50' : 'bg-black border-gray-800 hover:border-gray-600'}`}
                      >
                        <p className="font-mono text-cyan-300">{seo.route}</p>
                        <p className="text-sm text-gray-400 truncate mt-1">{seo.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Editor */}
                <div className="flex-1 bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-6 overflow-auto custom-scrollbar">
                  {editingSeo ? (
                    <form onSubmit={handleSaveSeo} className="flex flex-col gap-6">
                      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                        <h3 className="font-bold text-xl text-white">Editar Etiqueta: <span className="text-cyan-400 font-mono">{editingSeo.route}</span></h3>
                        {editingSeo.id && (
                          <button type="button" onClick={() => handleDeleteSeo(editingSeo.id)} className="text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1 rounded text-sm transition-colors">Eliminar</button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-gray-400 uppercase tracking-widest font-mono">Ruta (Ej: /nosotros)</label>
                          <input required type="text" value={editingSeo.route} onChange={e => setEditingSeo({...editingSeo, route: e.target.value})} className="bg-black border border-gray-800 rounded p-3 text-white focus:border-purple-500 outline-none font-mono" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-gray-400 uppercase tracking-widest font-mono">Meta Title</label>
                          <input required type="text" value={editingSeo.title} onChange={e => setEditingSeo({...editingSeo, title: e.target.value})} className="bg-black border border-gray-800 rounded p-3 text-white focus:border-purple-500 outline-none" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="text-xs text-gray-400 uppercase tracking-widest font-mono">Meta Description</label>
                          <textarea rows={3} required value={editingSeo.description} onChange={e => setEditingSeo({...editingSeo, description: e.target.value})} className="bg-black border border-gray-800 rounded p-3 text-white focus:border-purple-500 outline-none resize-none" />
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="text-xs text-gray-400 uppercase tracking-widest font-mono">Meta Keywords (separadas por coma)</label>
                          <input type="text" value={editingSeo.keywords} onChange={e => setEditingSeo({...editingSeo, keywords: e.target.value})} className="bg-black border border-gray-800 rounded p-3 text-white focus:border-purple-500 outline-none" placeholder="IA, automatización, bots..." />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-gray-400 uppercase tracking-widest font-mono">Robots (por defecto: index, follow)</label>
                          <input type="text" value={editingSeo.robots} onChange={e => setEditingSeo({...editingSeo, robots: e.target.value})} className="bg-black border border-gray-800 rounded p-3 text-white focus:border-purple-500 outline-none font-mono" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-gray-400 uppercase tracking-widest font-mono">Canonical URL personalizada</label>
                          <input type="text" value={editingSeo.canonical} onChange={e => setEditingSeo({...editingSeo, canonical: e.target.value})} className="bg-black border border-gray-800 rounded p-3 text-white focus:border-purple-500 outline-none" placeholder="https://tu-dominio.com/ruta" />
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-4">
                        <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">Guardar Configuración</button>
                        <button type="button" onClick={() => setEditingSeo(null)} className="bg-transparent border border-gray-700 text-gray-400 hover:text-white hover:bg-white/5 py-3 px-8 rounded-lg transition-all">Cancelar</button>
                      </div>
                    </form>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600">
                      <p className="font-mono text-center">Selecciona una ruta en el panel izquierdo para configurarla<br/>o utiliza "+ Noche Ruta" para indexar un nuevo Endpoint.</p>
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
