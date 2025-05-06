'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, ResponsiveContainer, LabelList
} from 'recharts';
import { Users, BarChart2, TrendingUp, Cpu } from 'lucide-react';

const pieData = [
  { name: 'Social Ads', value: 400 },
  { name: 'Email', value: 300 },
  { name: 'SEO', value: 300 },
  { name: 'Display', value: 200 }
];
const funnelData = [
  { stage: 'Vistos', users: 2400 },
  { stage: 'Clics', users: 1200 },
  { stage: 'Leads', users: 800 },
  { stage: 'Compras', users: 300 }
];
const budgetData = [
  { day: 'Lun', budget: 400 },
  { day: 'Mar', budget: 500 },
  { day: 'Mié', budget: 450 },
  { day: 'Jue', budget: 600 },
  { day: 'Vie', budget: 550 }
];

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042'];

const pages = [
    {
        title: 'Segmentación IA',
        icon: <Users className="text-cyan-400" size={20} />,
        content: (
          <div className="flex items-center justify-center h-full px-2">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent! * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      },
      {
        title: 'Funnel de Conversión',
        icon: <BarChart2 className="text-yellow-400" size={20} />,
        content: (
          <div className="flex items-center justify-center h-full px-2">
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={funnelData} margin={{ top: 10, bottom: 10 }}>
                <XAxis dataKey="stage" stroke="#ccc" tick={{ fontSize: 12 }} />
                <YAxis stroke="#ccc" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="users" fill="#00C49F" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="users" position="top" fill="#fff" fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      },
      {
        title: 'Presupuesto Diario',
        icon: <TrendingUp className="text-green-400" size={20} />,
        content: (
          <div className="flex items-center justify-center h-full px-2">
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={budgetData} margin={{ top: 10, bottom: 10 }}>
                <XAxis dataKey="day" stroke="#ccc" tick={{ fontSize: 12 }} />
                <YAxis stroke="#ccc" tick={{ fontSize: 12 }} />
                <Tooltip formatter={(val) => `$${val}`} />
                <Line type="monotone" dataKey="budget" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      },
  {
    title: 'Recomendaciones IA',
    icon: <Cpu className="text-purple-400" size={20} />,
    content: (
      <div className="space-y-4">
        {[
          { text: '🔧 Apagar anuncio Social Ads (CTR bajo)', action: 'Apagado' },
          { text: '⚡ Aumentar presupuesto Email +20%', action: 'Presupuesto aumentado' },
          { text: '🧪 Lanzar prueba A/B nuevos banners', action: 'Prueba A/B iniciada' }
        ].map((rec, idx) => (
          <Recommendation key={idx} text={rec.text} action={rec.action} />
        ))}
      </div>
    )
  }
];

function Recommendation({ text, action }: { text: string; action: string }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#222] p-3 rounded-lg flex justify-between items-center"
    >
      <span className="text-sm text-gray-200">{text}</span>
      <button
        onClick={() => setDone(true)}
        disabled={done}
        className={`px-3 py-1 text-xs rounded-full font-medium transition ${
          done
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-cyan-500 hover:bg-cyan-600 text-white'
        }`}
      >
        {done ? action : 'Aplicar'}
      </button>
    </motion.div>
  );
}

export default function MarketingFlow() {
  const [page, setPage] = useState(0);

  return (
    <div className="w-full max-w-md h-[510px] bg-[#111] rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center px-5 py-3 bg-gradient-to-r from-cyan-600 to-green-600">
        {pages[page].icon}
        <h3 className="ml-2 text-white font-semibold text-base">Marketing Autónomo</h3>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#111] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="h-full p-4"
          >
            {pages[page].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 bg-[#111] py-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-2 w-8 rounded-full transition ${
              page === i ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
