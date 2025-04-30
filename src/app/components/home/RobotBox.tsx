'use client';

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

  useEffect(() => {
    const currentBoxRef = boxRef.current;

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
      className="h-screen w-screen flex items-center justify-center p-4 snap-start bg-gray-900 relative overflow-hidden"
    >
      {/* Engranes */}
      <div className="absolute top-4 left-4 text-blue-400 animate-spin-slow">
        <FaCog className="text-4xl" />
      </div>
      <div className="absolute bottom-4 right-4 text-blue-600 animate-spin-slow-reverse">
        <FaCog className="text-4xl" />
      </div>

      {/* Contenido */}
      <div className="text-center max-w-md px-4">
        <div
          className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {icon}
        </div>
        <h2
          className={`text-4xl font-bold text-white mt-6 transition-all duration-1000 ease-in-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {title}
        </h2>
        <p
          className={`text-gray-400 mt-4 transition-all duration-1000 ease-in-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
