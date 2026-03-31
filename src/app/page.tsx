'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/app/components/home/Navbar';
import Loader from '@/app/components/home/Loader';

// Lazy load LayoutGrid - Heavy component with Framer Motion
const LayoutGrid = dynamic(() => import('@/app/components/home/LayoutGrid'), {
  loading: () => <div className="h-[100dvh] w-full bg-[#050505]" />,
  ssr: false,
});

export default function HomePage() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const fromExternal = performance?.navigation?.type === 0 || document.referrer === '';
    if (fromExternal) {
      const timeout = setTimeout(() => {
        setShowHome(true);
      }, 2000); // 2 segundos de splash screen
      return () => clearTimeout(timeout);
    } else {
      setShowHome(true);
    }
  }, []);

  return (
    <main className="relative bg-[#050505] h-[100dvh] w-full overflow-hidden">
      
      {/* Capa del Loader: Se esfuma suavemente cuando showHome pasa a true */}
      <AnimatePresence>
        {!showHome && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: 'blur(10px)'
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#0f0c29]"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capa Principal: Precargada en el DOM, se revela solo con opacidad para evitar overflow X */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHome ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        className="w-full h-full"
      >
        {/* Renderizamos el contenido real solo para que el DOM esté listo o se monte limpio */}
        <Navbar />
        {showHome && <LayoutGrid />}
      </motion.div>

    </main>
  );
}
