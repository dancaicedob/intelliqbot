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

  const pulseVariant = {
    hidden: { opacity: 0.2 },
    visible: {
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="block"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Nodo central (IA) */}
        <circle cx="150" cy="150" r="18" fill="url(#gradient)" filter="url(#glow)" />

        {/* Líneas a nodos periféricos */}
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
          <line
            key={i}
            x1="150"
            y1="150"
            x2={x}
            y2={y}
            stroke="url(#gradient)"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        ))}

        {/* Punticos periféricos animados (automatización) */}
        {[
          [150, 60],
          [240, 150],
          [150, 240],
          [60, 150],
          [90, 90],
          [210, 90],
          [90, 210],
          [210, 210],
          [180, 120],
          [120, 180],
          [180, 180],
          [120, 120]
        ].map(([x, y], i) => (
          <motion.circle
            key={`glow-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill="white"
            filter="url(#glow)"
            variants={pulseVariant}
            initial="hidden"
            animate={controls}
          />
        ))}
      </svg>
    </div>
  );
};

export default ServicesIcon;
