'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface RobotBoxProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function RobotBox({ id, title, subtitle, icon }: RobotBoxProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className="snap-start min-h-screen flex items-center justify-center p-6 md:p-12 bg-gradient-to-br from-gray-900 to-zinc-800 overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.2),_transparent)]"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 z-10">
        <motion.div
          className="flex-shrink-0 p-6 rounded-xl border-2 border-cyan-500 bg-black/30 backdrop-blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1, rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 1, ease: 'easeInOut', repeat: visible ? Infinity : 0, repeatDelay: 3 }}
          whileHover={{ scale: 1.1, rotate: 0 }}
        >
          {icon}
        </motion.div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <Link href={id} scroll>
            <motion.h2
              className="text-2xl md:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] border-b-4 border-cyan-500 inline-block mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={visible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h2>
          </Link>
          <motion.p
            className="text-gray-300 text-sm md:text-base"
            initial={{ y: 20, opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* Live typing indicator */}
          <AnimatePresence>
            {visible && (
              <motion.div
                className="mt-4 flex items-center justify-center md:justify-start gap-2 text-cyan-400 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="h-2 w-2 bg-cyan-400 rounded-full animate-ping" />
                <span>IntelliqBot está disponible...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}