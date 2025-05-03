import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { BrainCircuit, LineChart, Users, Map } from 'lucide-react';

const pieData = [
  { name: 'Redes Sociales', value: 400 },
  { name: 'Email Marketing', value: 300 },
  { name: 'Búsquedas Orgánicas', value: 300 },
  { name: 'Publicidad Pagada', value: 200 }
];

const funnelData = [
  { name: 'Vistos', usuarios: 2400 },
  { name: 'Clics', usuarios: 1200 },
  { name: 'Leads', usuarios: 800 },
  { name: 'Compras', usuarios: 300 }
];

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

const pages = [
  {
    title: 'Segmentación de Audiencia',
    content: (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    ),
    icon: <Users className="text-cyan-500" size={24} />
  },
  {
    title: 'Funnel de Conversión',
    content: (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={funnelData}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="usuarios" fill="#00C49F" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
    icon: <LineChart className="text-yellow-500" size={24} />
  },
  {
    title: 'Análisis Geográfico',
    content: (
      <div className="flex items-center justify-center h-40 text-center text-sm text-gray-400">
        <Map className="text-green-500 mr-2" />
        Pronto disponible: Mapa interactivo de campañas globales 🌍
      </div>
    ),
    icon: <Map className="text-green-500" size={24} />
  },
  {
    title: 'Análisis Inteligente',
    content: (
      <div className="text-sm text-gray-200 px-4 py-2 text-left">
        <p className="mb-2">📊 La IA detectó que los clics en redes sociales están bajando. Se recomienda aumentar la frecuencia en horarios pico.</p>
        <p>💡 Próximo paso: lanzar campaña A/B para validar mensajes alternativos.</p>
      </div>
    ),
    icon: <BrainCircuit className="text-purple-500" size={24} />
  }
];

export default function MarketingFlow() {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className="w-full max-w-md h-[510px] bg-[#1A1A1A] text-white rounded-2xl shadow-lg overflow-hidden relative flex flex-col">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 font-semibold text-lg text-white flex items-center gap-2">
        <BrainCircuit size={20} /> Marketing Autónomo
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2 mb-2">
              {pages[pageIndex].icon}
              <h2 className="text-md font-semibold text-white">{pages[pageIndex].title}</h2>
            </div>
            <div className="flex-1">{pages[pageIndex].content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between px-4 py-2 border-t border-neutral-800">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPageIndex(i)}
            className={`h-2 w-6 rounded-full transition-all duration-300 ${
              pageIndex === i ? 'bg-cyan-400' : 'bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
