'use client';

import React from 'react';
import { motion } from "framer-motion";

const AIChip = () => {
  // Configuración de diseño estructurado
  const generateHexGrid = () => {
    const grid = [];
    const size = 30;
    const rows = 5;
    const cols = 5;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = 50 + (j * size * 1.75);
        const y = 50 + (i * size * 1.5) + (j % 2) * size * 0.75;
        grid.push({ x, y, id: `${i}-${j}` });
      }
    }
    return grid;
  };

  const hexGrid = generateHexGrid();

  // Generar conexiones inteligentes
  const generateConnections = () => {
    const connections = [];
    
    hexGrid.forEach((point, index) => {
      // Conexión derecha
      if (index % hexGrid.length !== cols - 1) {
        const rightPoint = hexGrid[index + 1];
        if (rightPoint) {
          connections.push({
            x1: point.x,
            y1: point.y,
            x2: rightPoint.x,
            y2: rightPoint.y,
            id: `right-${point.id}`
          });
        }
      }
      
      // Conexión abajo-derecha
      if (index + cols < hexGrid.length && index % cols !== cols - 1) {
        const bottomRightPoint = hexGrid[index + cols];
        if (bottomRightPoint) {
          connections.push({
            x1: point.x,
            y1: point.y,
            x2: bottomRightPoint.x,
            y2: bottomRightPoint.y,
            id: `bottom-right-${point.id}`
          });
        }
      }
    });
    
    return connections;
  };

  const connections = generateConnections();

  // Variantes de animación
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay) => ({
      scale: 1,
      opacity: 0.8,
      transition: {
        delay: delay * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  };

  const connectionVariants = {
    hidden: { opacity: 0 },
    visible: (delay) => ({
      opacity: 0.6,
      transition: {
        delay: delay * 0.02,
        duration: 0.5
      }
    })
  };

  const flowVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <motion.svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="ai-chip-logo"
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
          
          <filter id="glow-effect" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Chip base */}
        <motion.rect
          x="30"
          y="30"
          width="240"
          height="240"
          rx="20"
          ry="20"
          fill="none"
          stroke="url(#gradient-primary)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Conexiones */}
        {connections.map((conn, index) => (
          <motion.line
            key={conn.id}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#gradient-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
            variants={connectionVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          />
        ))}

        {/* Nodos */}
        {hexGrid.map((node, index) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="3.5"
            fill="url(#gradient-secondary)"
            filter="url(#glow-effect)"
            variants={nodeVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          />
        ))}

        {/* Flujo de datos animado */}
        <motion.path
          d="M50 150 Q150 50 250 150 Q150 250 50 150"
          fill="none"
          stroke="url(#gradient-primary)"
          strokeWidth="1.5"
          variants={flowVariants}
          initial="hidden"
          animate="visible"
          style={{ filter: 'url(#glow-effect)' }}
        />

        {/* Texto central */}
        <motion.text
          x="150"
          y="160"
          textAnchor="middle"
          fontSize="32"
          fill="url(#gradient-primary)"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          AI
        </motion.text>
      </motion.svg>
    </div>
  );
};

export default AIChip;