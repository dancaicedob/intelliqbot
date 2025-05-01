'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
      className="
        snap-start min-h-screen flex items-center justify-center
        p-6 md:p-12
        bg-gradient-to-br from-gray-900 to-zinc-800
        md:flex-row flex-col
        transition-all duration-700
        overflow-hidden
      "
    >
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        <div
          className={`
            flex-shrink-0 p-6 rounded-xl
            border-2 border-cyan-500
            bg-black/30 backdrop-blur-sm
            ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}
            transition-transform duration-700
          `}
        >
          <div className="text-cyan-400 drop-shadow-lg">{icon}</div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <Link href={id} scroll>
          <h2
                className={`
                  text-left                      // Alinea el texto a la izquierda
                  text-2xl md:text-4xl          // Tamaño más controlado
                  font-bold
                  text-white
                  drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]
                  border-b-4 border-cyan-500
                  inline-block
                  transition-all duration-700
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} delay-200
                  mb-6                         // Espacio hacia abajo (puedes usar mb-8 o mb-10 si quieres más)
                `}
              >
              {title}
            </h2>
          </Link>
          <p
            className={`
              text-gray-300 text-sm md:text-base
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              transition-all duration-700 delay-400
            `}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
