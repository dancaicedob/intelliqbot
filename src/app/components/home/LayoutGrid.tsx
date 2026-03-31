'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

// Lazy load RobotBox - Expensive component with Framer Motion
const RobotBox = dynamic(() => import('./RobotBox'), {
  loading: () => <div className="h-[100dvh] w-full bg-gradient-to-br from-gray-900 to-zinc-800" />,
  ssr: false,
});

// Lazy load icons
const AIChip = dynamic(() => import('./iconos/AIChip'), {
  loading: () => <div className="w-[300px] h-[300px]" />,
  ssr: false,
});

export default function LayoutGrid() {
  return (
    <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory overscroll-y-none no-scrollbar relative">
      
      {/* Work */}
      <RobotBox
        id="work"
        title="Work"
        subtitle="Descubre nuestros proyectos destacados."
        icon={<AIChip />}
      />

      {/* Servicios */}
      <RobotBox
        id="servicios"
        title="Servicios"
        subtitle="Explora nuestros servicios de IA."
        icon={
          <Image
            src="/icons/icono-servicios.png"
            alt="Servicios Icon"
            width={300}
            height={300}
            loading="lazy"
            quality={80}
            className="mx-auto"
          />
        }
      />

      {/* Nosotros */}
      <RobotBox
        id="nosotros"
        title="Nosotros"
        subtitle="Conoce más sobre nuestra agencia."
        icon={
          <Image
            src="/icons/icono-nosotros.png"
            alt="Nosotros Icon"
            width={300}
            height={300}
            loading="lazy"
            quality={80}
            className="mx-auto"
          />
        }
      />

      {/* Contacto */}
      <RobotBox
        id="contacto"
        title="Contacto"
        subtitle="Ponte en contacto con nosotros."
        icon={
          <Image
            src="/icons/icono-contacto.png"
            alt="Contacto Icon"
            width={300}
            height={300}
            loading="lazy"
            quality={80}
            className="mx-auto"
          />
        }
      />
    </div>
  );
}
