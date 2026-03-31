'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/app/components/home/Navbar';
import LayoutGrid from '@/app/components/home/LayoutGrid';
import Loader from '@/app/components/home/Loader';

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
    <main className="relative bg-[#050505] min-h-screen">
      
      {/* Capa del Loader: Se esfuma suavemente cuando showHome pasa a true */}
      <AnimatePresence>
        {!showHome && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: 'blur(10px)', 
              scale: 1.05 
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#0f0c29]"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capa Principal: Precargada en el DOM, se revela suavemente con escala */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: showHome ? 1 : 0, 
          scale: showHome ? 1 : 0.95 
        }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        className="w-full h-full"
      >
        {/* Renderizamos el contenido real solo para que el DOM esté listo o se monte limpio */}
        <Navbar />
        <LayoutGrid />
      </motion.div>

    </main>
  );
}
