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
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (media.type !== 'video' || !sectionRef.current || !videoRef.current)
      return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = videoRef.current!;
          if (entry.isIntersecting) {
            vid.muted = muted;
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [media.type, muted]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section
      ref={sectionRef}
      className="snap-start h-screen w-full flex flex-col bg-zinc-900 text-white overflow-hidden md:flex-row md:items-center"
    >
      <div className="w-full h-[70vh] mt-2 md:mt-0 md:w-2/3 md:h-full relative bg-black">
        {media.type === 'image' ? (
          <Image
            src={media.src}
            alt={media.alt || title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={media.src}
              poster={media.poster}
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-3 right-3 bg-black/50 p-2 rounded-full"
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </>
        )}
      </div>
      <div className="px-4 py-4 flex flex-col justify-start md:w-1/3 md:px-8 md:py-0">
        <h2 className="text-lg md:text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-300 text-xs md:text-sm mb-4">{description}</p>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="bg-cyan-700 text-[10px] md:text-xs font-medium px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-xs md:text-sm"
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
