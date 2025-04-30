'use client';

import ProjectCard from '@/app/components/ProjectCard';

export default function WorksGrid() {
  const projects = [
    {
      title: 'App de Análisis Financiero',
      description: 'Dashboard en tiempo real con indicadores financieros clave.',
      media: {
        type: 'video',
        src: '/projects/comercial1.mp4',
      } as const,
      technologies: ['Next.js', 'Tailwind', 'Chart.js'],
      links: [
        { label: 'Demo', url: 'https://miapp.com/demo1' },
      ],
    },
    {
      title: 'Detector de emociones con IA',
      description: 'Clasificación de emociones a través de cámara en vivo.',
      media: {
        type: 'image',
        src: '/projects/imagen-prueba.png',
      } as const,
      technologies: ['TensorFlow', 'React', 'Python'],
      links: [
        { label: 'GitHub', url: 'https://github.com/miusuario/proyecto1' },
      ],
    },
    {
      title: 'Reproductor de música moderno',
      description: 'Aplicación responsive con cola dinámica de canciones.',
      media: {
        type: 'video',
        src: '/projects/comercial1.mp4',
      } as const,
      technologies: ['React', 'Redux', 'TailwindCSS'],
      links: [
        { label: 'Live App', url: 'https://music.miapp.com' },
      ],
    },
    {
      title: 'Panel de métricas UX',
      description: 'Visualización de datos UX con foco en accesibilidad.',
      media: {
        type: 'image',
        src: '/projects/imagen-prueba.png',
      } as const,
      technologies: ['Next.js', 'D3.js', 'Accessibility'],
      links: [
        { label: 'Detalles', url: 'https://ux.miapp.com' },
      ],
    },
    {
      title: 'Editor de video automático',
      description: 'Corta y edita automáticamente clips para redes sociales.',
      media: {
        type: 'video',
        src: '/projects/comercial1.mp4',
      } as const,
      technologies: ['FFmpeg', 'Node.js', 'AI'],
      links: [
        { label: 'Más Info', url: 'https://videoai.miapp.com' },
      ],
    },
  ];

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-none">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </div>
  );
}
