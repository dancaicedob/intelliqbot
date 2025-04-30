// app/work/page.tsx

import Navbar from '@/app/components/home/Navbar';
import WorksGrid from '@/app/components/work/WorksGrid';

export const metadata = {
  title: 'Work | Mis Proyectos',
  description:
    'Explora los proyectos de inteligencia artificial, dashboards y aplicaciones web que he desarrollado.',
};

export default function WorkPage() {
  return (
    <>
      {/* Navbar siempre visible (controla su propio show/hide en scroll) */}
      <Navbar />

      {/* Main sólo envuelve el grid, sin overflow */}
      <main className="bg-zinc-950 text-white px-6 md:px-12">
        <div className="flex justify-center">
          {/* Centrado en desktop, full-width en móvil */}
          <div className="w-full max-w-5xl">
            {/* Aquí WorksGrid ya tiene: h-screen, overflow-y-scroll, snap-y snap-mandatory */}
            <WorksGrid />
          </div>
        </div>
      </main>
    </>
  );
}
