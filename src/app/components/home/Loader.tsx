'use client';

import Image from 'next/image';

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0c29] bg-gradient-to-br from-purple-700 via-blue-500 to-transparent relative overflow-hidden text-white">
      {/* Contenedor del logo con efecto de brillo */}
      <div className="relative overflow-hidden px-8 py-4">
        <Image
          src="/images/logo-intelliqbot.png"
          alt="Intelliqbot Loading"
          width={400}
          height={150}
          className="object-contain drop-shadow-2xl"
          priority
        />
        {/* Efecto de brillo que pasa sobre el logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
      </div>

      {/* Difuminado final */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-transparent blur-3xl opacity-40 animate-pulse"></div>
    </div>
  );
}
