'use client';

import { useEffect, useRef, useState } from 'react';


interface RobotBoxProps {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

// Secuencia de chat
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Observador de visibilidad para activar animaciones
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
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
    const speed = chatSequence[step].from === 'bot' ? 30 : 15;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, ++idx));
      if (idx === text.length) {
        clearInterval(timer);
        setTimeout(() => setStep(s => s + 1), 1000);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [visible, step]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [step, displayText]);

  return (
    <section
      id={id}
      ref={ref}
      className="snap-start min-h-screen flex items-center justify-center p-6 md:p-12 bg-gray-100"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        {/* Encabezado */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500 rounded-xl shadow-md">{icon}</div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>
        </div>

        {/* Contenedor de chat */}
        <div
          ref={chatContainerRef}
          className="h-64 bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-y-auto space-y-3"
        >
          {chatSequence.slice(0, step).map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg whitespace-pre-wrap text-sm ` +
                (msg.from === 'user'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800')
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          {step < chatSequence.length && (
            <div className={`flex ${chatSequence[step].from === 'user' ? 'justify-end' : 'justify-start'}`}>  
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg whitespace-pre-wrap text-sm flex items-center ` +
                (chatSequence[step].from === 'user'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800')
                }
              >
                <span>{displayText}</span>
                <span className="ml-2 inline-block w-2 h-2 bg-current rounded-full animate-blink" />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s linear infinite; }
      `}</style>
    </section>
  );
}
