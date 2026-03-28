'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAvailableSlots, createAppointment } from '@/actions/appointmentActions';

type Step = 'init' | 'ask_name' | 'ask_email' | 'ask_phone' | 'ask_company' | 'ask_date' | 'ask_time' | 'saving' | 'success';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  type?: 'text' | 'date' | 'time';
  options?: any[];
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>('init');
  const [inputValue, setInputValue] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: '',
    time: ''
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('¡Hola! Soy Nova, asistente virtual de Intelliqbot. 🤖 ¿Listo para llevar tu operación al siguiente nivel con IA? ¿Cómo te llamas?');
      setStep('ask_name');
    }
  }, [isOpen]);

  const addBotMessage = (text: string, type: 'text' | 'date' | 'time' = 'text') => {
    setMessages(prev => [...prev, { id: Math.random().toString(), sender: 'bot', text, type }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Math.random().toString(), sender: 'user', text }]);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() && step !== 'ask_date' && step !== 'ask_time') return;

    const val = inputValue.trim();
    setInputValue('');

    if (step === 'ask_name') {
      addUserMessage(val);
      setFormData(prev => ({ ...prev, name: val }));
      setTimeout(() => {
        addBotMessage(`¡Un placer ${val}! ¿A qué correo electrónico podemos enviarte la invitación para tu calendario (Meet)? 📧`);
        setStep('ask_email');
      }, 500);
    } 
    else if (step === 'ask_email') {
      addUserMessage(val);
      setFormData(prev => ({ ...prev, email: val }));
      setTimeout(() => {
        addBotMessage('¡Anotado! Ahora, ¿A qué número de teléfono (WhatsApp) nos podemos comunicar contigo? 📱');
        setStep('ask_phone');
      }, 500);
    }
    else if (step === 'ask_phone') {
      addUserMessage(val);
      setFormData(prev => ({ ...prev, phone: val }));
      setTimeout(() => {
        addBotMessage('Perfecto. ¿De qué empresa nos escribes y qué reto buscas solucionar? 🏢');
        setStep('ask_company');
      }, 500);
    }
    else if (step === 'ask_company') {
      addUserMessage(val);
      setFormData(prev => ({ ...prev, company: val }));
      setTimeout(() => {
        addBotMessage('¡Excelente! Vamos a agendar una sesión de 30 minutos con un consultor experto. Por favor selecciona qué día te viene mejor:', 'date');
        setStep('ask_date');
      }, 500);
    }
  };

  const handleDateSelection = async (dateStr: string) => {
    addUserMessage(`Elegí el ${dateStr}`);
    setFormData(prev => ({ ...prev, date: dateStr }));
    setStep('ask_time');
    
    // Fetch slots
    addBotMessage('Buscando horarios disponibles... ⏳');
    try {
      const slots = await getAvailableSlots(dateStr);
      setAvailableTimeSlots(slots);
      
      // Remove loading message and show slots
      setMessages(prev => {
        const newMsg = [...prev];
        newMsg.pop();
        return newMsg;
      });

      if (slots.length > 0) {
        addBotMessage('Estos son los horarios disponibles (Hora Colombia). Toca el que prefieras:', 'time');
      } else {
        addBotMessage('Uy... Parece que este día ya está totalmente lleno. ¿Podrías indicarme otra fecha por favor?', 'date');
        setStep('ask_date');
      }
    } catch (err) {
      addBotMessage('Ocurrió un error conectando con el calendario. Por favor intenta de nuevo.');
      setStep('ask_date');
    }
  };

  const handleTimeSelection = async (timeStr: string) => {
    addUserMessage(timeStr);
    setFormData(prev => ({ ...prev, time: timeStr }));
    setStep('saving');
    
    addBotMessage('Agendando tu cita en el sistema central... 🚀');
    
    try {
      await createAppointment({
        date: formData.date,
        time_slot: timeStr,
        client_name: formData.name,
        client_phone: formData.phone,
        client_email: formData.email,
        company: formData.company,
        status: 'booked'
      });
      
      setStep('success');
      setTimeout(() => {
        addBotMessage('¡Listo! 🎉 Hemos agendado exitosamente tu sesión estratégica por Meet. Nos pondremos en contacto contigo a tu WhatsApp muy pronto. ¡Que tengas un día increíble!');
      }, 1000);

    } catch (err:any) {
      addBotMessage(`Rayos, alguien acaba de reservar esa misma hora justo ahora. (${err.message}) Por favor escoge otro horario.`, 'time');
      setStep('ask_time');
    }
  };

  const generateNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) { // Skip Sundays
        days.push(d);
      }
    }
    return days;
  };

  const formatIsoLocal = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const dStr = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${dStr}`;
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <AnimatePresence>
          {!isOpen && (
            <motion.div className="relative flex items-center justify-end"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute right-[80px] bg-cyan-950 border border-cyan-500/50 text-cyan-50 px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap hidden sm:flex items-center pointer-events-none"
              >
                ¿Agendamos una Cita? ✨
                <div className="absolute top-1/2 -right-1.5 transform -translate-y-1/2 w-3 h-3 bg-cyan-950 border-t border-r border-cyan-500/50 rotate-45"></div>
              </motion.div>
              
              <button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full electric-border flex items-center justify-center bg-[#0a0a0a] hover:bg-black group shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] transition-all cursor-pointer"
                style={{ '--electric-color': '#06b6d4' } as React.CSSProperties}
              >
                <div className="w-8 h-8 rounded-full border border-cyan-400 p-1 flex items-center justify-center group-hover:bg-cyan-900/40 relative">
                  <span className="w-2 h-2 rounded-full border border-cyan-200 animate-ping absolute" />
                  <span className="w-1 h-1 rounded-full bg-cyan-300" />
                </div>
              </button>
            </motion.div>
          )}

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="absolute bottom-0 right-0 w-[360px] max-w-[90vw] h-[600px] max-h-[85vh] bg-[#050505] border-t border-r border-l border-cyan-900/50 rounded-t-2xl shadow-2xl flex flex-col font-mono overflow-hidden"
              style={{
                boxShadow: '0 -10px 40px rgba(0,255,255,0.1), inset 0 20px 40px rgba(6,182,212,0.05)'
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 bg-black border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-950 flex items-center justify-center border border-cyan-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-widest leading-none">Nova_AI</h4>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">Sistemas Estratégicos</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar bg-gradient-to-b from-[#0a0a0a] to-[#000000]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div 
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                        ? 'bg-cyan-900/30 border border-cyan-500/30 text-cyan-50 rounded-br-none' 
                        : 'bg-gray-900/60 border border-gray-800 text-gray-300 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    
                    {/* Render Date Picker */}
                    {msg.sender === 'bot' && msg.type === 'date' && step === 'ask_date' && i === messages.length - 1 && (
                      <motion.div initial={{ opacity:0, y:10 }} animate={{opacity:1, y:0}} className="mt-3 flex overflow-x-auto gap-2 pb-2 custom-scrollbar w-full">
                        {generateNextDays().map(d => {
                          const dateStr = formatIsoLocal(d);
                          const displayStr = d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });
                          return (
                            <button 
                              key={dateStr}
                              onClick={() => handleDateSelection(dateStr)}
                              className="min-w-[100px] flex-shrink-0 bg-black border border-cyan-900/50 hover:bg-cyan-900/40 hover:border-cyan-400 text-cyan-300 text-xs py-3 px-2 rounded-xl transition-all capitalize whitespace-nowrap"
                            >
                              {displayStr}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* Render Time Slots */}
                    {msg.sender === 'bot' && msg.type === 'time' && step === 'ask_time' && i === messages.length - 1 && (
                      <motion.div initial={{ opacity:0 }} animate={{opacity:1}} className="mt-3 grid grid-cols-2 gap-2 w-full">
                        {availableTimeSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => handleTimeSelection(slot)}
                            className="bg-black border border-cyan-900/50 hover:bg-cyan-900/40 hover:border-cyan-400 text-cyan-300 text-xs py-2 px-1 rounded-lg transition-all"
                          >
                            {slot}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
                
                {step === 'saving' && (
                  <div className="self-start items-start flex max-w-[85%]">
                     <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-2xl rounded-bl-none">
                       <span className="flex gap-1">
                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-75"></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-150"></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-300"></span>
                       </span>
                     </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {step !== 'ask_date' && step !== 'ask_time' && step !== 'saving' && step !== 'success' && (
                <div className="p-4 bg-black border-t border-gray-800">
                  <form onSubmit={handleSend} className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="flex-1 bg-[#0a0a0a] border border-gray-800 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white outline-none font-sans"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="w-12 h-12 bg-cyan-900/50 hover:bg-cyan-800/80 border border-cyan-500/50 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 text-cyan-300"
                    >
                      ▶
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.5); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5); 
        }
      `}</style>
    </>
  );
}
