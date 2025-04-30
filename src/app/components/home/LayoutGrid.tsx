import RobotBox from './RobotBox';
import AIChip from './iconos/AIChip';
import AboutIcon from './iconos/AboutIcon';
import ContactIcon from './iconos/ContactIcon';
import ServicesIcon from './iconos/ServicesIcon';

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
        icon={<ServicesIcon />}
      />

      {/* Nosotros */}
      <RobotBox
        title="Nosotros"
        subtitle="Conoce más sobre nuestra agencia."
        icon={<AboutIcon/>}
      />

      {/* Contacto */}
      <RobotBox
        title="Contacto"
        subtitle="Ponte en contacto con nosotros."
        icon={<ContactIcon />}
      />
    </div>
  );
}