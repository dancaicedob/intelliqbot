import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import Navbar from '@/app/components/home/Navbar';
import Footer from '@/app/components/home/Footer';
import { projectsData } from '@/data/projects';

// Generate static params for all 21 projects at build time
export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Define Category Styles
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'software': return 'text-cyan-400 border-cyan-400/30 bg-cyan-950/30';
      case 'industrial': return 'text-orange-400 border-orange-400/30 bg-orange-950/30';
      default: return 'text-emerald-400 border-emerald-400/30 bg-emerald-950/30';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'software': return 'IA & Software';
      case 'industrial': return 'Industrial';
      default: return 'IoT & Hardware';
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb & Back Button */}
        <div className="mb-8 flex items-center text-sm font-mono text-gray-400">
          <Link href="/work" className="hover:text-cyan-400 flex items-center transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Proyectos
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
          <span className="truncate">{project.title}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Image / Media */}
          <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10" />
            <Image
              src={project.media_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className={`inline-flex px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest border rounded-full mb-4 ${getCategoryStyles(project.category)}`}>
                {getCategoryName(project.category)}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-10">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Tecnologías Implementadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Local SEO Block (Invisible to average user reading quickly, but good for local context) */}
            <div className="mb-10 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h4 className="text-cyan-400 font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> 
                Cobertura en Colombia
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Implementamos este tipo de soluciones tecnológicas en <strong>Bogotá, Medellín, Cali</strong> y a nivel nacional. Optimizamos los procesos operativos y garantizamos soporte técnico local.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Cotizar este Proyecto
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
