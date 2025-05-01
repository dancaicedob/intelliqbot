'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface RobotBoxProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

// Mensajes del chat
const chatSequence = [
  { from: 'user', text: 'Hola, tengo un problema.' },
  { from: 'bot', text: 'Hola bro, bienvenido a IntelliqBot, cuéntame cómo te puedo ayudar.' },
  { from: 'user', text: 'Quiero un chatbot para mi ecommerce que maneje inventario.' },
  { from: 'bot', text: '¡Con gusto! Necesito preguntarte algunas cosas para entender mejor lo que quieres...' },
];

export default function RobotBox({ id, title, subtitle, icon }: RobotBoxProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Observador de visibilidad
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Secuencia de mecanografía
  useEffect(() => {
    if (!visible || step >= chatSequence.length) return;
    const fullText = chatSequence[step].text;
    let charIndex = 0;
    setDisplayText('');
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, charIndex + 1));
      charIndex++;
      if (charIndex === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setStep(prev => prev + 1), 1000);
      }
    }, chatSequence[step].from === 'bot' ? 40 : 1);
    return () => clearInterval(interval);
  }, [visible, step]);

  return (
    <section
      id={id}
      ref={ref}
      className="snap-start min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-gray-900 to-zinc-800 overflow-hidden"
    >
      <div className="relative w-full max-w-lg flex flex-col items-center gap-6 z-10">
        {/* Icono animado */}
        <motion.div
          className="p-6 rounded-xl border-2 border-cyan-500 bg-black/30 backdrop-blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {icon}
        </motion.div>

        {/* Título y subtítulo */}
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]"
          initial={{ y: -20, opacity: 0 }}
          animate={visible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-300 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={visible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        {/* Chat simulado */}
        <div className="w-full bg-black/80 p-4 rounded-xl space-y-3 shadow-lg">
          {chatSequence.slice(0, step).map((msg, i) => (
            <div
              key={i}
              className={
                msg.from === 'user'
                  ? 'text-green-300 text-right'
                  : 'text-cyan-300 text-left'
              }
            >
              <span className="inline-block bg-gray-900 px-3 py-1 rounded-md">{msg.text}</span>
            </div>
          ))}
          {step < chatSequence.length && (
            <div className={
                chatSequence[step].from === 'user'
                  ? 'text-green-300 text-right'
                  : 'text-cyan-300 text-left'
              }>
              <span className="inline-block bg-gray-900 px-3 py-1 rounded-md">
                {displayText}
                <span className="ml-1 inline-block w-2 h-2 bg-current animate-blink" />
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s infinite; }
      `}</style>
    </section>
  );
}