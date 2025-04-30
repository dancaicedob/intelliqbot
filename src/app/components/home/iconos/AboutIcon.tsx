'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AboutIcon = () => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      controls.start('visible');
    }
  }, [isMobile, controls]);

  const glowVariants = {
    hidden: { opacity: 0, x: -300 },
    visible: {
      opacity: 1,
      x: 300,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="about-icon"
      >
        <defs>
          <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>
          <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Marco */}
        <rect
          x="30"
          y="30"
          width="240"
          height="240"
          rx="20"
          ry="20"
          fill="none"
          stroke="url(#gradient-primary)"
          strokeWidth="2"
        />

        {/* Núcleo central */}
        <circle cx="150" cy="150" r="10" fill="url(#gradient-primary)" filter="url(#glow-effect)" />

        {/* Cabezas estilizadas */}
        <path d="M95 120 Q90 100 105 95 Q120 90 125 105 Q130 120 115 125 Q100 130 95 120 Z" fill="url(#gradient-primary)" opacity="0.6" />
        <path d="M150 90 Q145 70 160 65 Q175 60 180 75 Q185 90 170 95 Q155 100 150 90 Z" fill="url(#gradient-primary)" opacity="0.6" />
        <path d="M205 120 Q200 100 215 95 Q230 90 235 105 Q240 120 225 125 Q210 130 205 120 Z" fill="url(#gradient-primary)" opacity="0.6" />

        {/* Conexiones */}
        <line x1="150" y1="150" x2="110" y2="110" stroke="url(#gradient-primary)" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="150" y1="150" x2="150" y2="95" stroke="url(#gradient-primary)" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="150" y1="150" x2="190" y2="110" stroke="url(#gradient-primary)" strokeWidth="1" strokeOpacity="0.6" />

        {/* Texto central */}
        <text
          x="150"
          y="220"
          textAnchor="middle"
          fontSize="20"
          fill="url(#gradient-primary)"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="bold"
        >
          NOSOTROS
        </text>


      </svg>
    </div>
  );
};

export default AboutIcon;
