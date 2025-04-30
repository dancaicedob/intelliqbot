'use client'; // Necesario para usar animaciones y hooks

import { useEffect, useRef, useState } from 'react';
import { FaCog } from 'react-icons/fa';

interface RobotBoxProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function RobotBox({ title, subtitle, icon }: RobotBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Animación de entrada
  useEffect(() => {
    const currentBoxRef = boxRef.current;  // Guardamos el valor de boxRef.current en una variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (currentBoxRef) {
      observer.observe(currentBoxRef);
    }

    return () => {
      if (currentBoxRef) {
        observer.unobserve(currentBoxRef);
      }
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="min-h-screen flex items-center justify-center p-8 snap-start"
    >
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl border-2 border-gray-700 overflow-hidden">
        {/* Engranes en las esquinas */}
        <div className="absolute top-4 left-4 text-blue-400 animate-spin-slow">
          <FaCog className="text-4xl" />
        </div>
        <div className="absolute bottom-4 right-4 text-blue-600 animate-spin-slow-reverse">
          <FaCog className="text-4xl" />
        </div>

        {/* Contenido animado */}
        <div className="text-center">
          {/* Icono animado */}
          <div
            className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {icon}
          </div>

          {/* Título animado */}
          <h2
            className={`text-4xl font-bold text-white mt-6 transition-all duration-1000 ease-in-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {title}
          </h2>

          {/* Subtítulo animado */}
          <p
            className={`text-gray-400 mt-4 transition-all duration-1000 ease-in-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
