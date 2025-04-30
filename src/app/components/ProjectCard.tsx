'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
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
  return (
    <section className="snap-start h-screen w-full flex flex-col justify-between bg-zinc-900 text-white overflow-hidden">
      
      {/* Título */}
      <header className="p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </header>

      {/* Multimedia */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xs aspect-[9/16] relative bg-black rounded-md overflow-hidden">
          {media.type === 'image' ? (
            <Image
              src={media.src}
              alt={media.alt || title}
              fill
              className="object-contain"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <video
              src={media.src}
              controls
              preload="metadata"
              className="w-full h-full object-contain"
              poster={media.alt}
              playsInline
            />
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="px-4 py-4 space-y-3">
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
          <div className="flex gap-3 flex-wrap mt-2">
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
