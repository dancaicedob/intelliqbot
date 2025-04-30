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
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = boxRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      id={id}
      ref={boxRef}
      className="min-h-screen flex items-center justify-center p-8 snap-start scroll-mt-16"
    >
      <div className="flex flex-col items-start text-left">
        {/* Icono */}
        <div
          className={`transition-all duration-1000 ease-in-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {icon}
        </div>

        {/* Título con enlace */}
        <Link href={`#${id}`} scroll={true}>
          <h2
            className={`cursor-pointer text-2xl font-semibold text-white mt-4 border-b-2 border-cyan-400 pb-1 drop-shadow transition-all duration-1000 ease-in-out delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {title}
          </h2>
        </Link>

        {/* Subtítulo */}
        <p
          className={`text-sm text-gray-400 font-light mt-2 max-w-xs transition-all duration-1000 ease-in-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
