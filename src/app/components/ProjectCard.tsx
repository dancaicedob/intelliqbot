'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string;      // URL de la imagen previa al play
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
  const [hasPlayed, setHasPlayed] = useState(false);

  // Pause cuando salimos de pantalla
  useEffect(() => {
    if (media.type !== 'video' || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current && !entry.isIntersecting) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [media.type]);

  const handlePlay = () => {
    if (!hasPlayed) {
      setHasPlayed(true);
      videoRef.current?.play();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen w-full flex flex-col justify-between bg-zinc-900 text-white overflow-hidden"
    >
      {/* 1. Título compacto */}
      <header className="px-4 pt-4">
        <h2 className="text-xl font-semibold">{title}</h2>
      </header>

      {/* 2. Multimedia con thumbnail sobre vídeo */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div
          className={`
            relative
            w-11/12 max-w-xs
            sm:w-3/4 sm:max-w-sm
            md:w-1/2 md:max-w-md
            lg:w-2/3 lg:max-w-xl
            aspect-[9/16]
            bg-black rounded-xl
            overflow-hidden
          `}
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
            <>
              {/* Vídeo */}
              <video
                ref={videoRef}
                src={media.src}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Thumbnail overlay */}
              {!hasPlayed && media.poster && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={handlePlay}
                >
                  <Image
                    src={media.poster}
                    alt={`Poster de ${title}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  {/* Icono de Play centrado */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-black/50 rounded-full">
                      ▶️
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 3. Descripción, etiquetas y enlaces */}
      <div className="px-4 pb-6 space-y-3">
        <p className="text-gray-300 text-sm">{description}</p>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-cyan-700 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-sm"
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
