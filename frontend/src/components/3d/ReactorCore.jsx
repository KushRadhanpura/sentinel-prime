import React from 'react';
import { motion } from 'framer-motion';

const ReactorCore = () => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-400 rounded-full"
        animate={{
          boxShadow: [
            '0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.4)',
            '0 0 40px rgba(34,211,238,1), 0 0 80px rgba(34,211,238,0.8), 0 0 120px rgba(34,211,238,0.6)',
            '0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.4)',
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-200 to-cyan-500 animate-spin" style={{ animationDuration: '4s' }} />
      </motion.div>

      {/* Energy Rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400/40 rounded-full"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
          }}
          animate={{
            rotate: 360,
            borderColor: [
              'rgba(34,211,238,0.4)',
              'rgba(34,211,238,0.8)',
              'rgba(34,211,238,0.4)',
            ],
          }}
          transition={{
            rotate: {
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
            },
            borderColor: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}

      {/* Energy Lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
          style={{
            width: '130px',
            transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Particle Effects */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
            y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Outer Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-cyan-400/10 blur-2xl" />
    </div>
  );
};

export default ReactorCore;
