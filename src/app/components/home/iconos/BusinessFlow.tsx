'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PackageIcon,
  FileTextIcon,
  CalendarIcon,
  CheckCircle2Icon
} from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
  info: string;
}

const steps: Step[] = [
  {
    id: 1,
    label: 'Pedido recibido',
    icon: <PackageIcon className="w-8 h-8" />,
    info: 'Orden #12345 en sistema'
  },
  {
    id: 2,
    label: 'Factura generada',
    icon: <FileTextIcon className="w-8 h-8" />,
    info: 'Factura F-67890 emitida'
  },
  {
    id: 3,
    label: 'Envío programado',
    icon: <CalendarIcon className="w-8 h-8" />,
    info: 'Salida: 03 May 2025, 10:00 AM'
  },
  {
    id: 4,
    label: 'Confirmación enviada',
    icon: <CheckCircle2Icon className="w-8 h-8" />,
    info: 'Email enviado al cliente'
  }
];

export default function BusinessFlowEnhanced() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running && activeStep < steps.length) {
      timer = setTimeout(() => {
        setActiveStep((s) => s + 1);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [running, activeStep]);

  const start = () => {
    setActiveStep(0);
    setRunning(true);
  };

  return (
    <section className="flex justify-center items-center p-4">
      <div className="w-full max-w-md h-[510px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h2 className="text-xl font-semibold text-white">Flujo Empresarial</h2>
          <p className="text-xs text-white/90">
            Automatiza procesos internos y tareas — usa IA en cada paso
          </p>
        </div>

        {/* Steps & Info */}
        <div className="flex-1 relative grid place-items-center bg-gray-50 overflow-hidden">
          <AnimatePresence>
            {running && activeStep > 0 && activeStep <= steps.length && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="w-4/5 bg-white shadow-md rounded-xl p-4 text-center"
              >
                <div className="flex justify-center mb-2">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-indigo-500"
                  >
                    {steps[activeStep - 1].icon}
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {steps[activeStep - 1].label}
                </h3>
                <p className="text-sm text-gray-600">{steps[activeStep - 1].info}</p>
              </motion.div>
            )}

            {running && activeStep > steps.length && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-4/5 bg-green-500 rounded-xl p-6 text-center text-white"
              >
                <CheckCircle2Icon className="mx-auto mb-2 w-12 h-12 animate-pulse" />
                <h3 className="text-xl font-semibold">¡Pedido exitoso!</h3>
                <p className="text-sm mt-1">
                  El flujo de automatización finalizó correctamente.
                </p>
              </motion.div>
            )}

            {!running && activeStep === 0 && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center text-gray-500 px-4"
              >
                Pulsa “Iniciar Flujo IA” para ver el proceso automatizado.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Button */}
        <div className="px-6 py-4 bg-white border-t border-gray-200">
          <button
            onClick={start}
            disabled={running}
            className={`w-full py-2 rounded-full text-sm font-semibold transition ${
              running
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            {running
              ? activeStep <= steps.length
                ? 'Procesando…'
                : 'Completado'
              : 'Iniciar Flujo IA'}
          </button>
        </div>
      </div>
    </section>
  );
}
