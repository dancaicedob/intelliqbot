'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RobotBoxProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const chatSequence = [
  { from: 'user', text: 'Hola, tengo un problema.' },
  { from: 'bot', text: 'Hola bro, bienvenido a IntelliqBot, ¿en qué puedo ayudarte?' },
  { from: 'user', text: 'Quiero un chatbot para mi ecommerce que maneje inventario.' },
  { from: 'bot', text: '¡Con gusto! Necesito hacerte algunas preguntas para entender mejor tus necesidades...' },
];

export default function RobotBox({ id, title, subtitle, icon }: RobotBoxProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Observer para animar al entrar
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.6 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Animación de escritura
  useEffect(() => {
    if (!visible || step >= chatSequence.length) return;
    const full = chatSequence[step].text;
    let i = 0;
    setDisplayText('');
    const speed = chatSequence[step].from === 'bot' ? 30 : 12;
    const t = setInterval(() => {
      setDisplayText(full.slice(0, ++i));
      if (i === full.length) {
        clearInterval(t);
        setTimeout(() => setStep(s => s + 1), 800);
      }
    }, speed);
    return () => clearInterval(t);
  }, [visible, step]);

  // Scroll al final
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [step, displayText]);

  return (
    <section
      ref={containerRef}
      id={id}
      className="snap-start flex justify-center items-center py-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={visible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header compacto */}
        <div className="flex items-center px-2 py-2 bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="w-8 h-8 flex-shrink-0">{icon}</div>
          <div className="ml-2">
            <h2 className="text-base font-semibold text-white leading-tight">{title}</h2>
            <p className="text-[10px] text-white/90">{subtitle}</p>
          </div>
        </div>

        {/* Chat Window */}
        <div
          ref={chatRef}
          className="h-80 md:h-96 bg-gray-50 overflow-y-auto"
        >
          {chatSequence.slice(0, step).map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} px-2 py-1`}
            >
              <div
                className={`max-w-[80%] px-2 py-1 rounded-lg 
                  ${m.from === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none shadow'}`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {step < chatSequence.length && (
            <div className={`flex ${chatSequence[step].from === 'user' ? 'justify-end' : 'justify-start'} px-2 py-1`}>
              <div
                className={`max-w-[80%] px-2 py-1 rounded-lg flex items-center
                  ${chatSequence[step].from === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 rounded-tl-none shadow'}`}
              >
                <span className="break-words">{displayText}</span>
                <span className="ml-1 w-2 h-2 bg-current rounded-full animate-blink" />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s linear infinite; }
      `}</style>
    </section>
  );
}
