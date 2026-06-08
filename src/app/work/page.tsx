// app/work/page.tsx

import Navbar from '@/app/components/home/Navbar';
import WorksGrid from '@/app/components/work/WorksGrid';

import { getDynamicSeo } from '@/lib/seo';
import type { Metadata } from 'next';

const baseMetadata: Metadata = {
  title: 'Portafolio de Proyectos | Intelliqbot',
  description: 'Explora nuestra galería de proyectos en IoT, Inteligencia Artificial, Automatización Industrial y Software en Colombia.',
  keywords: ['portafolio', 'proyectos', 'automatización', 'iot', 'hardware', 'industrial', 'software', 'colombia', 'Bogotá', 'Medellín', 'Cali'],
};

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeo('/work', baseMetadata);
}

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
