'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string;
  };
  technologies?: string[];
  links?: {
    label: string;
    url: string;
  }[];
}

export default function ProjectCard({
  title,
  description,
  media,
  technologies = [],
  links = [],
}: ProjectCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (media.type !== 'video' || !sectionRef.current) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (videoRef.current && !e.isIntersecting) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [media.type]);

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen w-full flex flex-col bg-zinc-900 text-white overflow-hidden"
    >
      {/* 1. Título pegado arriba */}
      <header className="px-2 pt-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>

      {/* 2. Multimedia ocupa ~70vh y full width */}
      <div className="px-0">
        <div className="relative w-full h-[70vh] bg-black">
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt || title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <video
              ref={videoRef}
              src={media.src}
              poster={media.poster}
              controls
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* 3. Descripción y etiquetas pegadas justo abajo */}
      <div className="px-2 pt-1 pb-2">
        <p className="text-gray-300 text-sm">{description}</p>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {technologies.map(tech => (
              <span
                key={tech}
                className="bg-cyan-700 text-[10px] font-medium px-1 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {links.map(link => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
