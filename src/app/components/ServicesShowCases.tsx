import { useState } from 'react';
import { motion } from 'framer-motion';
import { BoxIcon, Settings2Icon, SignalIcon } from 'lucide-react';
import CartoonChatbotScene from '@/app/components/home/iconos/CartoonBot';

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
    icon: <CartoonChatbotScene />, // Componente caricaturesco
  },
  {
    id: 'inventario',
    title: 'Inventario Autónomo',
    description: 'Control inteligente de stock y productos.',
    icon: <BoxIcon className="w-8 h-8 text-cyan-400" />,
  },
  {
    id: 'automatizacion',
    title: 'Flujo Empresarial',
    description: 'Automatiza procesos internos y tareas.',
    icon: <Settings2Icon className="w-8 h-8 text-cyan-400" />,
  },
  {
    id: 'marketing',
    title: 'Marketing Autónomo',
    description: 'Funnels y campañas automáticas con IA.',
    icon: <SignalIcon className="w-8 h-8 text-cyan-400" />,
  },
];

export default function ServicesShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-20 px-6 md:px-20 bg-gradient-to-br from-black via-zinc-900 to-gray-950">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-16 text-left border-b-4 border-cyan-500 inline-block pb-2">
        Centro de Automatización Inteligente
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            onMouseEnter={() => setHovered(service.id)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`relative rounded-2xl p-6 bg-zinc-900 hover:bg-zinc-800 transition-colors duration-300 border border-cyan-900 shadow-md hover:shadow-cyan-500/20 group`}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {hovered === service.id ? service.description : ''}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 text-sm md:text-base font-semibold bg-cyan-500 text-black rounded-xl shadow-lg hover:bg-cyan-400 transition-colors"
        >
          Activar Automatización
        </motion.button>
      </div>
    </section>
  );
}
