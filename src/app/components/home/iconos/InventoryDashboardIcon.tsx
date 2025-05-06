'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  min: number;
  max: number;
}

const inventoryData: InventoryItem[] = [
  { id: '1', name: 'Café Espresso', stock: 120, min: 50, max: 150 },
  { id: '2', name: 'Té Verde', stock: 30, min: 20, max: 100 },
  { id: '3', name: 'Galletas Chips', stock: 8, min: 20, max: 200 },
  { id: '4', name: 'Chocolate Amargo', stock: 75, min: 40, max: 100 },
];

export default function InventoryDashboard() {
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      setRevealed(r => Math.min(r + 1, inventoryData.length));
      i++;
      if (i >= inventoryData.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [visible]);

  const percent = (stock: number, max: number) =>
    Math.round((stock / max) * 100);

  const chartData = inventoryData.map(item => ({
    name: item.name,
    stock: item.stock,
  }));

  const generateAnalysis = (item: InventoryItem) => {
    if (item.stock < item.min) {
      return `⚠️ Recomiendo reabastecer "${item.name}" pronto.`;
    } else {
      return `✅ "${item.name}" tiene buen nivel de stock.`;
    }
  };

  return (
    <section
      ref={containerRef}
      className="snap-start flex justify-center items-start py-8 px-4 md:px-0"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-400">
          <h2 className="text-lg font-semibold text-white">Inventario Autónomo</h2>
        </div>

        {/* Lista o gráfico */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {!showAnalysis ? (
            inventoryData.map((item, idx) => {
              const isVisible = idx < revealed;
              const pct = percent(item.stock, item.max);
              const statusColor =
                item.stock < item.min
                  ? 'bg-red-400'
                  : item.stock < item.min * 1.5
                  ? 'bg-yellow-400'
                  : 'bg-green-400';

              return (
                <AnimatePresence key={item.id}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex flex-col px-6 py-3 border-b border-gray-200"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-800 text-sm font-medium">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.stock}/{item.max}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 + 0.2 }}
                          className={`${statusColor} h-full`}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })
          ) : (
            <div className="px-4 py-2">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <ul className="mt-2 space-y-1 text-sm">
                {inventoryData.map(item => (
                  <li
                    key={item.id}
                    className={
                      item.stock < item.min ? 'text-red-500' : 'text-green-600'
                    }
                  >
                    {generateAnalysis(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botón */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-center">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 transition text-white text-sm font-medium rounded-md"
          >
            {showAnalysis ? 'Ocultar análisis' : 'Ver análisis IA'}
          </button>
        </div>
      </div>
    </section>
  );
}
