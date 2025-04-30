'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ContactIcon = () => {
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
        className="contact-icon"
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

        {/* Sobre de mensaje */}
        <rect
          x="90"
          y="110"
          width="120"
          height="70"
          rx="10"
          ry="10"
          fill="none"
          stroke="url(#gradient-primary)"
          strokeWidth="2"
        />
        <polyline
          points="90,110 150,150 210,110"
          fill="none"
          stroke="url(#gradient-primary)"
          strokeWidth="2"
        />

        {/* Círculo con ondas */}
        <circle cx="150" cy="95" r="5" fill="url(#gradient-primary)" />
        <circle cx="150" cy="95" r="10" stroke="url(#gradient-primary)" strokeWidth="1" fill="none" />
        <circle cx="150" cy="95" r="18" stroke="url(#gradient-primary)" strokeWidth="1" fill="none" opacity="0.5" />

        {/* Texto */}
        <text
          x="150"
          y="220"
          textAnchor="middle"
          fontSize="20"
          fill="url(#gradient-primary)"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="bold"
        >
          CONTACTO
        </text>


      </svg>
    </div>
  );
};

export default ContactIcon;
