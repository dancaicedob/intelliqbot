'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/app/components/ProjectCard';
import { getWorkPosts } from '@/actions/workActions';

interface WorkPost {
  id?: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  media_poster?: string;
  technologies: string[];
  links: { label: string; url: string }[];
  position: number;
  is_active: boolean;
}

export default function WorksGrid() {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

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

  if (posts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-gray-400 font-mono text-sm">Proyectos próximamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-none">
      {posts.map((post, idx) => (
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
          links={post.links}
        />
      ))}
    </div>
  );
}
