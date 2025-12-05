import React from 'react';
import { motion } from 'framer-motion';

const HoloImage = ({ src, alt = "Holographic Display" }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated holographic image */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-auto max-h-[600px] object-contain"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 80px rgba(0, 212, 255, 0.4))',
          }}
          animate={{
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Glow rings around image */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Scanline effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 48%, rgba(0, 212, 255, 0.1) 50%, transparent 52%)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default HoloImage;
