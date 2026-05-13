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
  social_url?: string;     // TikTok or Instagram post URL
  technologies?: string[];
  links?: {
    label: string;
    url: string;
  }[];
}

// ── Detect social platform ─────────────────────────────────────────────────────
function detectPlatform(url?: string): 'tiktok' | 'instagram' | null {
  if (!url) return null;
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram';
  return null;
}

// ── Extract TikTok video ID ────────────────────────────────────────────────────
function getTikTokId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

// ── Extract Instagram shortcode ────────────────────────────────────────────────
function getInstagramShortcode(url: string): string | null {
  // Matches: /p/, /reel/, /tv/ shortcodes
  const match = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[2] : null;
}

// ── Social Embed Component ─────────────────────────────────────────────────────
function SocialEmbed({ url }: { url: string }) {
  const platform = detectPlatform(url);

  if (platform === 'tiktok') {
    const videoId = getTikTokId(url);
    if (!videoId) return <FallbackLink url={url} label="Ver en TikTok" />;

    return (
      <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}?lang=es`}
          className="w-full h-full"
          style={{ maxWidth: '340px', minHeight: '560px', border: 'none' }}
          allow="encrypted-media"
          allowFullScreen
          loading="lazy"
          title="TikTok video"
        />
      </div>
    );
  }

  if (platform === 'instagram') {
    const shortcode = getInstagramShortcode(url);
    if (!shortcode) return <FallbackLink url={url} label="Ver en Instagram" />;

    // Instagram embed: requires the /embed/ path and their script
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/?cr=1&v=14`;

    return (
      <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          style={{ maxWidth: '400px', minHeight: '560px', border: 'none' }}
          allow="encrypted-media"
          allowFullScreen
          scrolling="no"
          loading="lazy"
          title="Instagram post"
        />
      </div>
    );
  }

  return <FallbackLink url={url} label="Ver publicación" />;
}

function FallbackLink({ url, label }: { url: string; label: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-sm">
        {label} ↗
      </a>
    </div>
  );
}

// ── Main Card ─────────────────────────────────────────────────────────────────
export default function ProjectCard({
  title,
  description,
  media,
  social_url,
  technologies = [],
  links = [],
}: ProjectCardProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const platform = detectPlatform(social_url);
  const hasSocialEmbed = !!platform && !!social_url;

  useEffect(() => {
    // Only auto-play/pause native videos (not social embeds)
    if (hasSocialEmbed || media.type !== 'video' || !sectionRef.current || !videoRef.current)
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
  }, [hasSocialEmbed, media.type, muted]);

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
      {/* ── Media Area ─────────────────────────────────── */}
      <div className="w-full h-[70vh] mt-2 md:mt-0 md:w-2/3 md:h-full relative bg-black">
        {hasSocialEmbed ? (
          /* Social embed takes full priority */
          <SocialEmbed url={social_url!} />
        ) : media.type === 'image' ? (
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

        {/* Social platform badge */}
        {platform === 'tiktok' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="text-xs">🎵</span>
            <span className="text-[10px] text-white font-mono font-bold uppercase tracking-widest">TikTok</span>
          </div>
        )}
        {platform === 'instagram' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-gradient-to-r from-purple-700/80 to-pink-700/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="text-xs">📸</span>
            <span className="text-[10px] text-white font-mono font-bold uppercase tracking-widest">Instagram</span>
          </div>
        )}
      </div>

      {/* ── Info Panel ─────────────────────────────────── */}
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

        {/* Social media link */}
        {social_url && (
          <a
            href={social_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg transition-colors w-fit ${
              platform === 'tiktok'
                ? 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700'
                : 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-900/70 hover:to-pink-900/70 text-pink-300 border border-pink-800/40'
            }`}
          >
            {platform === 'tiktok' ? '🎵 Ver en TikTok' : '📸 Ver en Instagram'}
            <span className="text-gray-500">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
