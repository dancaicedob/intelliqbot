import RobotBox from './RobotBox';
import AIChip from './AIChip';
import { FaTools, FaUsers, FaEnvelope } from 'react-icons/fa';

export default function LayoutGrid() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Work */}
      <RobotBox
        title="Work"
        subtitle="Descubre nuestros proyectos destacados."
        icon={<AIChip />} // Usa AIChip aquí
      />

      {/* Servicios */}
      <RobotBox
        title="Servicios"
        subtitle="Explora nuestros servicios de IA."
        icon={<FaTools className="text-6xl text-blue-400 mx-auto" />}
      />

      {/* Nosotros */}
      <RobotBox
        title="Nosotros"
        subtitle="Conoce más sobre nuestra agencia."
        icon={<FaUsers className="text-6xl text-blue-400 mx-auto" />}
      />

      {/* Contacto */}
      <RobotBox
        title="Contacto"
        subtitle="Ponte en contacto con nosotros."
        icon={<FaEnvelope className="text-6xl text-blue-400 mx-auto" />}
      />
    </div>
  );
}