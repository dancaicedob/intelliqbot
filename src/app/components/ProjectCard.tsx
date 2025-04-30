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
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (videoRef.current && !entry.isIntersecting) {
            videoRef.current.pause();
          }
        });
      },
      { root: null, threshold: 0.5 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [media.type]);

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen w-full flex flex-col justify-between bg-zinc-900 text-white overflow-hidden"
    >
      {/* 1. Título compacto */}
      <header className="px-3 pt-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>

      {/* 2. Multimedia */}
      <div className="flex-1 flex items-center justify-center px-2">
        <div
          className="
            relative
            w-11/12 max-w-xs
            sm:w-3/4 sm:max-w-sm
            md:w-1/2 md:max-w-md
            lg:w-2/3 lg:max-w-xl
            aspect-[9/16]
            bg-black rounded-lg
            overflow-hidden
          "
        >
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt || title}
              fill
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <video
              ref={videoRef}
              src={media.src}
              controls
              poster={media.poster}
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* 3. Descripción, etiquetas y enlaces */}
      <div className="px-3 pb-4 space-y-2">
        <p className="text-gray-300 text-xs">{description}</p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies.map(tech => (
              <span
                key={tech}
                className="bg-cyan-700 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <div className="flex gap-2 flex-wrap">
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
