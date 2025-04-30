import RobotBox from './RobotBox';
import AIChip from './iconos/AIChip';
import Image from 'next/image';

export default function LayoutGrid() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Work */}
      <RobotBox
        title="Work"
        subtitle="Descubre nuestros proyectos destacados."
        icon={<AIChip />}
      />

      {/* Servicios */}
      <RobotBox
        title="Servicios"
        subtitle="Explora nuestros servicios de IA."
        icon={
          <Image
            src="/icons/icono-servicios.png"
            alt="Servicios Icon"
            width={300}
            height={300}
            className="mx-auto"
          />
        }
      />

      {/* Nosotros */}
      <RobotBox
        title="Nosotros"
        subtitle="Conoce más sobre nuestra agencia."
        icon={
          <Image
            src="/icons/icono-nosotros.png"
            alt="Nosotros Icon"
            width={300}
            height={300}
            className="mx-auto"
          />
        }
      />

      {/* Contacto */}
      <RobotBox
        title="Contacto"
        subtitle="Ponte en contacto con nosotros."
        icon={
          <Image
            src="/icons/icono-contacto.png"
            alt="Contacto Icon"
            width={300}
            height={300}
            className="mx-auto"
          />
        }
      />
    </div>
  );
}
