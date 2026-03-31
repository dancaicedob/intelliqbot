'use client';

import Image from 'next/image';

export default function Loader() {
  return (
    <div 
      className="flex items-center justify-center h-screen bg-[#0f0c29] bg-gradient-to-br from-purple-700 via-blue-500 to-transparent relative overflow-hidden text-white"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, rgba(126, 34, 206, 1), rgba(59, 130, 246, 1), transparent)'
      }}
    >
      {/* Contenedor del logo con efecto de brillo */}
      <div className="relative overflow-hidden px-8 py-4">
        <Image
          src="/images/logo-intelliqbot.png"
          alt="Intelliqbot Loading"
          width={328}
          height={123}
          sizes="(max-width: 480px) 300px, (max-width: 768px) 300px, 300px"
          priority
          fetchPriority="high"
          decoding="async"
          className="object-contain drop-shadow-2xl w-full"
          quality={60}
          style={{ maxWidth: '311px', height: 'auto' }}
        />
        {/* Efecto de brillo que pasa sobre el logo */}
        <div 
          className="absolute inset-0 opacity-50 animate-shimmer" 
          style={{
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)'
          }}
        />
      </div>

      {/* Difuminado final */}
      <div 
        className="absolute inset-0 blur-3xl opacity-40 animate-pulse pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), transparent)'
        }}
      ></div>
    </div>
  );
}
