// components/home/FancyHeading.tsx
'use client';

import { motion } from 'framer-motion';

export default function FancyHeading() {
  return (
    <motion.h1
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text mt-8 ml-6"
    >
      Potencia tu visibilidad con SEO inteligente
    </motion.h1>
  );
}
