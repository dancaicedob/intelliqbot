
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BotIcon } from 'lucide-react';
import CartoonChatbotScene from '@/app/components/home/iconos/CartoonBot';
import InventoryDashboard from './home/iconos/InventoryDashboardIcon';
import BusinessFlow from './home/iconos/BusinessFlow';
import MarketingFlow from './home/iconos/MarketingFlow';

interface ServiceModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceModule[] = [
  {
    id: 'chatbots',
    title: 'Comunicador Autónomo',
    description: 'Chatbots para WhatsApp, web y más con IA.',
    icon: (
      <CartoonChatbotScene
        id="chatbots"
        title="Comunicador Autónomo"
        subtitle="Chatbots para WhatsApp, web y más con IA."
        icon={<BotIcon className="w-8 h-8 text-white" />}
      />
    ),
  },
  {
    id: 'inventario',
    title: 'Inventario Autónomo',
    description: 'Control inteligente de stock y productos.',
    icon: <InventoryDashboard />,  
  },
  {
    id: 'automatizacion',
    title: 'Flujo Empresarial',
    description: 'Automatiza procesos internos y tareas.',
    icon: <BusinessFlow />,  
  },
  {
    id: 'marketing',
    title: 'Marketing Autónomo',
    description: 'Funnels y campañas automáticas con IA.',
    icon: <MarketingFlow />,  
  },
];

export default function ServicesShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-br from-black via-zinc-900 to-gray-950">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-12 border-b-4 border-cyan-500 inline-block">
        Centro de Automatización Inteligente
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-16"
      >
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={service.id}
              variants={item}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              className="bg-zinc-900 hover:bg-zinc-800 transition-colors duration-300 border border-cyan-800 rounded-2xl shadow-md p-6 flex flex-col"
            >
              <h3 className="text-white text-2xl font-semibold mb-6 text-center">
                {service.title}
              </h3>

              <div className={`flex flex-col items-center gap-6 lg:gap-12 lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <div className="flex-shrink-0 flex justify-center w-full lg:w-1/2">
                  <div className="max-w-xs w-full">{service.icon}</div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed w-full lg:w-1/2">
                  {service.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="text-center mt-16">
        <p className="text-gray-300 mb-4 max-w-xl mx-auto">
          Herramientas a tu medida, pensadas para tus necesidades y con la máxima seguridad.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 text-base font-semibold bg-cyan-500 text-black rounded-xl shadow-lg hover:bg-cyan-400 transition-colors"
        >
          Cotizar
        </motion.button>
      </div>
    </section>
  );
}
