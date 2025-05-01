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

// Secuencia de chat
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Observador de visibilidad para animaciones
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Mecanografía y avance de mensajes
  useEffect(() => {
    if (!visible || step >= chatSequence.length) return;
    const { text } = chatSequence[step];
    let idx = 0;
    setDisplayText('');
    const speed = chatSequence[step].from === 'bot' ? 30 : 10;
    const typer = setInterval(() => {
      setDisplayText(text.slice(0, ++idx));
      if (idx === text.length) {
        clearInterval(typer);
        setTimeout(() => setStep(s => s + 1), 800);
      }
    }, speed);
    return () => clearInterval(typer);
  }, [visible, step]);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [step, displayText]);

  return (
    <section
      id={id}
      ref={ref}
      className="snap-start min-h-screen flex flex-col items-center justify-center p-4 md:p-12 bg-gradient-to-br from-gray-900 to-zinc-800 overflow-hidden"
    >
      <div className="relative w-full max-w-md flex flex-col items-center gap-6 z-10">
        {/* Icono animado */}
        <motion.div
          className="p-4 md:p-6 rounded-xl border-2 border-cyan-500 bg-black/40 backdrop-blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
        >
          {icon}
        </motion.div>

        {/* Título y subtítulo */}
        <motion.h2
          className="text-xl md:text-3xl font-bold text-white drop-shadow-lg text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={visible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-300 text-center text-sm md:text-base"
          initial={{ y: 20, opacity: 0 }}
          animate={visible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        {/* Chat en vivo */}
        <div
          ref={chatContainerRef}
          className="w-full h-60 md:h-72 bg-black/70 p-4 rounded-lg flex flex-col overflow-y-auto space-y-2"
        >
          {chatSequence.slice(0, step).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <span className={
                `inline-block px-3 py-1 rounded-lg max-w-3/4 break-words text-sm md:text-base ` +
                (msg.from === 'user' ? 'bg-green-800 text-green-200' : 'bg-cyan-900 text-cyan-200')
              }>
                {msg.text}
              </span>
            </div>
          ))}
          {step < chatSequence.length && (
            <div className={`flex ${chatSequence[step].from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <span className={`inline-block px-3 py-1 rounded-lg max-w-3/4 break-words text-sm md:text-base ` +
                (chatSequence[step].from === 'user' ? 'bg-green-800 text-green-200' : 'bg-cyan-900 text-cyan-200')
              }>
                {displayText}
                <span className="ml-1 inline-block w-2 h-2 bg-current animate-blink" />
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.8s infinite; }
      `}</style>
    </section>
  );
}
