import WorksGrid from '@/app/components/work/WorksGrid';
import Navbar from '../components/home/Navbar';

export const metadata = {
  title: 'Work | Mis Proyectos',
  description: 'Explora los proyectos de inteligencia artificial, dashboards y aplicaciones web que he desarrollado.',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white py-16 px-6 md:px-12">
        <Navbar/>
        {/* Galería de proyectos */}
      <div className="max-w-5xl mx-auto">
        <WorksGrid />
      </div>
    </main>
  );
}
