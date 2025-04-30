'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ServicesIcon = () => {
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
        className="services-icon"
      >
        <defs>
          <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>
          <linearGradient id="gradient-secondary" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF00FF" />
            <stop offset="100%" stopColor="#00FFFF" />
          </linearGradient>
          <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base */}
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

        {/* Centro */}
        <circle cx="150" cy="150" r="10" fill="url(#gradient-secondary)" filter="url(#glow-effect)" />

        {/* Nodos externos */}
        {[
          [150, 60],
          [240, 150],
          [150, 240],
          [60, 150],
          [90, 90],
          [210, 90],
          [90, 210],
          [210, 210]
        ].map(([x, y], i) => (
          <React.Fragment key={i}>
            <circle cx={x} cy={y} r="5" fill="url(#gradient-secondary)" filter="url(#glow-effect)" />
            <line
              x1="150"
              y1="150"
              x2={x}
              y2={y}
              stroke="url(#gradient-primary)"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
          </React.Fragment>
        ))}

        {/* Texto central */}
        <text
          x="150"
          y="160"
          textAnchor="middle"
          fontSize="28"
          fill="url(#gradient-primary)"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="bold"
        >
          IA
        </text>

        {/* Brillo móvil */}
        {isMobile && (
          <motion.rect
            x="-300"
            y="30"
            width="60"
            height="240"
            fill="white"
            opacity="0.1"
            filter="url(#glow-effect)"
            variants={glowVariants}
            initial="hidden"
            animate={controls}
          />
        )}
      </svg>
    </div>
  );
};

export default ServicesIcon;
