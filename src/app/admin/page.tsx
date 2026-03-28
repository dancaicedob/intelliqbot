'use client';

import { useState } from 'react';
import { getLeads } from '@/actions/getLeads';
import { getSeoConfigs, saveSeoConfig, deleteSeoConfig, getGlobalScripts, saveGlobalScripts } from '@/actions/seoActions';
import { getAppointments, createAppointment, deleteAppointment } from '@/actions/appointmentActions';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'mensajes'|'seo'|'integraciones'|'citas'>('mensajes');
  
  const [leads, setLeads] = useState<any[]>([]);
  const [seoList, setSeoList] = useState<any[]>([]);
  const [globalScripts, setGlobalScripts] = useState({ gtm_id: '', gsc_id: '', pixel_id: '' });
  const [appointments, setAppointments] = useState<any[]>([]);
  
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
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
      
      const seoData = await getSeoConfigs() || [];
      
      const defaultRoutes = ['/', '/nosotros', '/contacto'];
      const mergedList = defaultRoutes.map(route => {
        const found = seoData.find((r: any) => r.route === route);
        return found || { route, title: 'Sin configurar', description: '', robots: 'index, follow', canonical: '', keywords: '' };
      });
      
      seoData.forEach((r: any) => {
        if (!defaultRoutes.includes(r.route)) mergedList.push(r);
      });

      setSeoList(mergedList);

      const scriptsData = await getGlobalScripts();
      if (scriptsData) setGlobalScripts(scriptsData);
      
      const appts = await getAppointments();
      if (appts) setAppointments(appts);

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

  // APPOINTMENTS GENERATOR
  const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
  const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  const allSlots = [...morningSlots, ...afternoonSlots];
  
  const selectedDateAppointments = appointments.filter(a => a.date === selectedDate);

  const handleSlotAction = async (slot: string, existingAppt?: any) => {
    if (existingAppt) {
      const isBlocked = existingAppt.status === 'blocked';
      const msg = isBlocked ? '¿Desbloquear este horario para que vuelva a estar disponible?' : `¿Cancelar esta cita de ${existingAppt.client_name}? Se liberará el espacio.`;
      if (confirm(msg)) {
        try {
          await deleteAppointment(existingAppt.id);
          setAppointments(prev => prev.filter(a => a.id !== existingAppt.id));
        } catch (err:any) {
          alert('Error cancelando cita: ' + err.message);
        }
      }
    } else {
      const action = prompt('Escribe "BLOQUEAR" para cerrar este horario, o escribe el NOMBRE del cliente para agendar una cita manual.').trim();
      if (!action) return;
      const status = action.toUpperCase() === 'BLOQUEAR' ? 'blocked' : 'booked';
      const name = status === 'blocked' ? 'Bloqueo Admin' : action;
      
      try {
        await createAppointment({
          date: selectedDate,
          time_slot: slot,
          client_name: name,
          status
        });
        const appts = await getAppointments(); // Refresh to get proper ID and sorting
        setAppointments(appts || []);
      } catch(err:any) {
        alert(err.message);
      }
    }
  };

  const changeDateByDay = (days: number) => {
    const d = new Date(selectedDate);
    d.setUTCDate(d.getUTCDate() + days); // use UTC to avoid timezone shift on purely date strings
    setSelectedDate(d.toISOString().split('T')[0]);
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
          
          <div className="flex bg-black/50 border border-gray-800 rounded-lg overflow-hidden flex-wrap">
            <button 
              onClick={() => setActiveTab('mensajes')}
              className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wide transition-colors ${activeTab === 'mensajes' ? 'bg-cyan-950/60 text-cyan-300 border-b-2 border-cyan-400' : 'text-gray-500 hover:bg-white/5'}`}
            >
              Leads
            </button>
            <button 
              onClick={() => setActiveTab('citas')}
              className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wide transition-colors ${activeTab === 'citas' ? 'bg-blue-950/60 text-blue-300 border-b-2 border-blue-400' : 'text-gray-500 hover:bg-white/5'}`}
            >
              Citas
            </button>
            <button 
              onClick={() => setActiveTab('seo')}
              className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wide transition-colors ${activeTab === 'seo' ? 'bg-purple-950/60 text-purple-300 border-b-2 border-purple-400' : 'text-gray-500 hover:bg-white/5'}`}
            >
              SEO / Meta
            </button>
            <button 
              onClick={() => setActiveTab('integraciones')}
              className={`px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wide transition-colors ${activeTab === 'integraciones' ? 'bg-orange-950/60 text-orange-300 border-b-2 border-orange-400' : 'text-gray-500 hover:bg-white/5'}`}
            >
              Marketing
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

            {activeTab === 'citas' && (
              <motion.div 
                key="citas"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-6 overflow-auto custom-scrollbar flex flex-col"
              >
                <div className="flex flex-col md:flex-row gap-8 h-full">
                  
                  {/* Left Calendar Picker */}
                  <div className="w-full md:w-1/3 flex flex-col gap-6">
                    <div className="bg-black border border-gray-800 rounded-2xl p-6">
                      <h3 className="font-bold text-lg text-blue-400 mb-6 font-mono tracking-widest uppercase">Seleccionar Fecha</h3>
                      
                      <div className="flex justify-between items-center bg-[#050505] border border-gray-800 p-2 rounded-xl">
                        <button onClick={() => changeDateByDay(-1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">&lt;</button>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="bg-transparent text-lg font-bold text-center outline-none text-white appearance-none"
                          style={{ colorScheme: 'dark' }}
                        />
                        <button onClick={() => changeDateByDay(1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">&gt;</button>
                      </div>
                      
                      <button onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])} className="w-full mt-4 py-3 bg-blue-900/20 text-blue-400 border border-blue-500/30 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-blue-900/40 transition-colors">
                        Volver a Hoy
                      </button>

                      <div className="mt-8 pt-6 border-t border-gray-800">
                        <p className="text-xs text-gray-500 font-mono mb-3 uppercase tracking-widest">Leyenda Global</p>
                        <div className="flex flex-col gap-2 font-mono text-xs">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500/20 border border-green-500/50 rounded-sm"></div> <span className="text-gray-400">Disponible</span></div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500/20 border border-purple-500/50 rounded-sm"></div> <span className="text-gray-400">Cita Agendada</span></div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-800 border border-gray-700 rounded-sm"></div> <span className="text-gray-400">Bloqueado (No disponible)</span></div>
                        </div>
                        <p className="mt-4 text-xs text-blue-400/80 font-mono">Los intervalos están basados en Hora estándar de Colombia (UTC-5).</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Slots Grid */}
                  <div className="w-full md:w-2/3 bg-black border border-gray-800 rounded-2xl p-6 overflow-auto custom-scrollbar">
                    <h3 className="font-bold text-xl text-white mb-6">Bloques Operativos para <span className="text-blue-400">{selectedDate}</span></h3>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {allSlots.map((slot) => {
                        const appt = selectedDateAppointments.find(a => a.time_slot === slot);
                        
                        if (!appt) {
                          // Available slot
                          return (
                            <div 
                              key={slot} 
                              onClick={() => handleSlotAction(slot)}
                              className="group cursor-pointer bg-green-950/10 border border-green-500/30 hover:border-green-400 hover:bg-green-900/30 rounded-xl p-4 transition-all flex flex-col items-center justify-center text-center h-28 shadow-inner relative overflow-hidden"
                            >
                              <div className="text-2xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">{slot}</div>
                              <div className="text-xs font-mono text-green-500/70 uppercase mt-2 group-hover:hidden tracking-widest">Disponible</div>
                              <div className="text-xs font-mono text-green-300 uppercase mt-2 hidden group-hover:block tracking-widest">Agendar/Bloquear</div>
                            </div>
                          );
                        }
                        
                        if (appt.status === 'blocked') {
                          // Blocked slot
                          return (
                            <div 
                              key={slot} 
                              onClick={() => handleSlotAction(slot, appt)}
                              className="group cursor-pointer bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800 rounded-xl p-4 transition-all flex flex-col items-center justify-center text-center h-28 shadow-inner"
                            >
                              <div className="text-xl font-bold text-gray-500 line-through decoration-gray-600">{slot}</div>
                              <div className="text-xs font-mono text-gray-600 uppercase mt-2 tracking-widest">Bloqueado</div>
                            </div>
                          );
                        }

                        // Booked slot
                        return (
                          <div 
                            key={slot} 
                            onClick={() => handleSlotAction(slot, appt)}
                            className="group cursor-pointer bg-purple-900/20 border border-purple-500/50 hover:bg-purple-900/40 rounded-xl p-4 transition-all flex flex-col items-center justify-center text-center h-28 shadow-[0_0_15px_rgba(168,85,247,0.15)] relative overflow-hidden"
                          >
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                            <div className="text-xl font-black text-purple-300">{slot}</div>
                            <div className="text-xs font-mono text-purple-400 uppercase mt-1 tracking-wider truncate w-full px-2">{appt.client_name}</div>
                            {appt.client_phone && <div className="text-[10px] font-mono text-gray-400 mt-1">{appt.client_phone}</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
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

            {activeTab === 'integraciones' && (
              <motion.div 
                key="integraciones"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full bg-[#0a0a0a] border border-gray-800/50 rounded-2xl p-8 max-w-4xl mx-auto overflow-auto custom-scrollbar"
              >
                <div className="mb-8 border-b border-gray-800 pb-6">
                  <h3 className="font-bold text-2xl text-orange-400">Marketing & Analytics</h3>
                  <p className="text-gray-400 mt-2">Configura de manera segura el SEO avanzado y los píxeles de rastreo sin tocar código. El ID de Google Search ignora el sufijo HTML automáticamente usando Metadata avanzada de Next.js.</p>
                </div>

                <form className="flex flex-col gap-8" onSubmit={async (e) => { e.preventDefault(); try { await saveGlobalScripts(globalScripts); alert('Integraciones actualizadas con éxito. Vercel purgando caché...'); } catch(err:any) { alert(err.message); } }}>
                  <div className="flex flex-col gap-3 group">
                    <label className="text-sm font-bold text-gray-300 group-focus-within:text-orange-400 transition-colors uppercase tracking-widest">
                      Google Tag Manager (GTM)
                    </label>
                    <p className="text-xs text-gray-500 font-mono">Ejemplo: GTM-ABCDEFGH</p>
                    <input 
                      type="text" 
                      value={globalScripts.gtm_id || ''} 
                      onChange={e => setGlobalScripts({...globalScripts, gtm_id: e.target.value})} 
                      className="bg-black border border-gray-800 rounded p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-mono tracking-widest transition-all" 
                      placeholder="GTM-XXXXXXX" 
                    />
                  </div>

                  <div className="flex flex-col gap-3 group">
                    <label className="text-sm font-bold text-gray-300 group-focus-within:text-orange-400 transition-colors uppercase tracking-widest">
                      Google Search Console (GSC)
                    </label>
                    <p className="text-xs text-gray-500 font-mono">Ingresa SOLO el código de verificación (content="..."). Ejemplo: 1a2b3c4d5e...</p>
                    <input 
                      type="text" 
                      value={globalScripts.gsc_id || ''} 
                      onChange={e => setGlobalScripts({...globalScripts, gsc_id: e.target.value})} 
                      className="bg-black border border-gray-800 rounded p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-mono tracking-widest transition-all" 
                      placeholder="Código de verificación GSC" 
                    />
                  </div>

                  <div className="flex flex-col gap-3 group">
                    <label className="text-sm font-bold text-gray-300 group-focus-within:text-orange-400 transition-colors uppercase tracking-widest">
                      Meta Pixel (Facebook)
                    </label>
                    <p className="text-xs text-gray-500 font-mono">Ingresa el ID numérico base del pixel (15 a 16 dígitos).</p>
                    <input 
                      type="text" 
                      value={globalScripts.pixel_id || ''} 
                      onChange={e => setGlobalScripts({...globalScripts, pixel_id: e.target.value})} 
                      className="bg-black border border-gray-800 rounded p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-mono tracking-widest transition-all" 
                      placeholder="123456789012345" 
                    />
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <button type="submit" className="w-full electric-border py-4 font-bold text-white tracking-widest uppercase bg-orange-900/20 hover:bg-orange-800/40 transition-colors shadow-lg" style={{ '--electric-color': '#f97316' } as React.CSSProperties}>
                      [ Inyectar Fragmentos Globales ]
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
