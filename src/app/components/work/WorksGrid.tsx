'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/app/components/ProjectCard';
import { getWorkPosts, type WorkPost } from '@/actions/workActions';

type Category = 'all' | 'software' | 'iot' | 'industrial';

const TABS: { key: Category; label: string; emoji: string; color: string; active: string }[] = [
  { key: 'all',        label: 'Todo',         emoji: '✦',  color: 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white',        active: 'border-white text-white bg-white/10' },
  { key: 'software',   label: 'IA & Software', emoji: '🤖', color: 'border-cyan-500/30 text-cyan-500/60 hover:border-cyan-400 hover:text-cyan-300',  active: 'border-cyan-400 text-cyan-300 bg-cyan-950/40' },
  { key: 'iot',        label: 'IoT & Hardware', emoji: '📡', color: 'border-emerald-500/30 text-emerald-500/60 hover:border-emerald-400 hover:text-emerald-300', active: 'border-emerald-400 text-emerald-300 bg-emerald-950/40' },
  { key: 'industrial', label: 'Industrial',    emoji: '⚙️', color: 'border-orange-500/30 text-orange-500/60 hover:border-orange-400 hover:text-orange-300',   active: 'border-orange-400 text-orange-300 bg-orange-950/40' },
];

import { projectsData } from '@/data/projects';

export default function WorksGrid() {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Category>('all');

  useEffect(() => {
    getWorkPosts()
      .then((data) => {
        const dbPosts = data || [];
        // Fusionamos los de BD con los de defecto, evitando duplicados por título
        const merged = [...dbPosts];
        
        projectsData.forEach((defProj) => {
          const exists = dbPosts.some(
            (p) => p.title.toLowerCase().trim() === defProj.title.toLowerCase().trim()
          );
          if (!exists) {
            merged.push(defProj);
          }
        });

        // Ordenamos por la posición definida
        merged.sort((a, b) => (a.position ?? 99) - (b.position ?? 99));
        setPosts(merged);
      })
      .catch((err) => {
        console.warn("Error cargando de Supabase, usando locales:", err);
        setPosts(projectsData);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    activeTab === 'all' ? posts : posts.filter((p) => (p.category || 'software') === activeTab),
    [posts, activeTab]
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-mono text-sm tracking-widest">CARGANDO PROYECTOS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">

      {/* ── Tabs de filtro ── */}
      <div className="flex-shrink-0 flex items-center gap-2 pt-24 pb-4 px-2 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tab.key === 'all' ? posts.length : posts.filter((p) => (p.category || 'software') === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-mono font-semibold uppercase tracking-widest transition-all duration-200 ${
                isActive ? tab.active : tab.color
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              {count > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Grid de proyectos ── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <p className="text-gray-500 font-mono text-sm">Próximamente proyectos en esta categoría.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-1 snap-y snap-mandatory overflow-y-scroll scrollbar-none"
          >
            {filtered.map((post, idx) => (
              <ProjectCard
                key={post.id || idx}
                title={post.title}
                description={post.description}
                media={{
                  type: post.media_type,
                  src: post.media_url,
                  poster: post.media_poster || undefined,
                }}
                social_url={post.social_url || undefined}
                technologies={post.technologies}
                links={[
                  { 
                    label: "Ver Detalles del Proyecto", 
                    url: `/proyectos/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`
                  },
                  ...(post.links || [])
                ]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

