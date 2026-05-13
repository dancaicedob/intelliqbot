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

// ── Components ─────────────────────────────────────────────────────────────────
function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 120;
  
  return (
    <div className="mb-6">
      <p className={`text-gray-300 text-sm md:text-base leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
        {text}
      </p>
      {isLong && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-cyan-400 font-bold mt-2 text-xs uppercase tracking-wider hover:text-cyan-300 transition-colors"
        >
          {expanded ? 'Ver menos' : 'Ver más...'}
        </button>
      )}
    </div>
  );
}

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
      className="snap-start h-[100dvh] w-full flex flex-col md:flex-row bg-[#050505] text-white overflow-hidden"
    >
      {/* ── Media Area ─────────────────────────────────── */}
      <div className="flex-1 w-full md:h-[100dvh] md:w-3/5 lg:w-2/3 relative bg-black flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-gray-900">
        {hasSocialEmbed ? (
          <SocialEmbed url={social_url!} />
        ) : media.type === 'image' ? (
          <Image
            src={media.src}
            alt={media.alt || title}
            fill
            className="object-contain md:object-cover"
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
              loop
              className="w-full h-full object-contain md:object-cover"
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </>
        )}

        {/* Social platform badge */}
        {platform === 'tiktok' && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
            <span className="text-sm">🎵</span>
            <span className="text-xs text-white font-mono font-bold uppercase tracking-widest">TikTok</span>
          </div>
        )}
        {platform === 'instagram' && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-purple-700/80 to-pink-700/80 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
            <span className="text-sm">📸</span>
            <span className="text-xs text-white font-mono font-bold uppercase tracking-widest">Instagram</span>
          </div>
        )}
      </div>

      {/* ── Info Panel ─────────────────────────────────── */}
      <div className="w-full max-h-[45dvh] shrink-0 md:max-h-none md:h-[100dvh] md:w-2/5 lg:w-1/3 px-6 py-6 md:px-10 md:py-12 flex flex-col justify-center overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            {title}
          </h2>
          
          <ExpandableDescription text={description} />

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-[10px] md:text-xs font-mono px-3 py-1.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {links.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6">
              {links.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 font-bold text-xs md:text-sm flex items-center gap-1 transition-colors"
                >
                  {link.label} <span className="text-cyan-500">↗</span>
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
              className={`inline-flex items-center gap-2 text-xs md:text-sm font-bold font-mono px-4 py-3 rounded-xl transition-all shadow-lg w-fit ${
                platform === 'tiktok'
                  ? 'bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20 text-white border border-[#00f2fe]/40 hover:border-[#00f2fe] hover:shadow-[#00f2fe]/20'
                  : 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-900/60 hover:to-pink-900/60 text-pink-100 border border-pink-500/40 hover:border-pink-400 hover:shadow-pink-500/20'
              }`}
            >
              {platform === 'tiktok' ? '🎵 Ver post en TikTok' : '📸 Ver post en Instagram'}
              <span className="opacity-70">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
