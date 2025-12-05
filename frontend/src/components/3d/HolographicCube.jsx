import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Cpu, Database, Activity } from 'lucide-react';

const HolographicCube = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Pulsing Background Waves */}
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={`wave-${index}`}
          className="absolute rounded-full border-2"
          style={{
            width: `${150 + index * 60}px`,
            height: `${150 + index * 60}px`,
            borderColor: index % 2 === 0 ? 'rgba(34, 211, 238, 0.3)' : 'rgba(168, 85, 247, 0.3)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}

      {/* Central Shield Matrix */}
      <motion.div
        className="relative w-48 h-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Hexagonal Shield */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M100,10 L170,50 L170,130 L100,170 L30,130 L30,50 Z"
            fill="none"
            stroke="url(#shieldGrad)"
            strokeWidth="3"
            filter="url(#glow)"
          />
          
          <path
            d="M100,30 L150,60 L150,120 L100,150 L50,120 L50,60 Z"
            fill="rgba(34, 211, 238, 0.1)"
            stroke="#a855f7"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          <path
            d="M100,50 L130,70 L130,110 L100,130 L70,110 L70,70 Z"
            fill="rgba(168, 85, 247, 0.2)"
            stroke="#22d3ee"
            strokeWidth="2"
            filter="url(#glow)"
          />
        </svg>

        {/* Central Icon Rotator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-20 h-20">
            {[Shield, Lock, Zap, Cpu, Database, Activity].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 1,
                }}
              >
                <Icon className="w-12 h-12 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px currentColor)' }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Orbiting Nodes */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i === 0 ? '#22d3ee' : i === 1 ? '#a855f7' : '#3b82f6'
            }, transparent)`,
            boxShadow: `0 0 20px ${
              i === 0 ? '#22d3ee' : i === 1 ? '#a855f7' : '#3b82f6'
            }`,
          }}
          animate={{
            x: [
              Math.cos((angle * Math.PI) / 180) * 100,
              Math.cos(((angle + 360) * Math.PI) / 180) * 100,
            ],
            y: [
              Math.sin((angle * Math.PI) / 180) * 100,
              Math.sin(((angle + 360) * Math.PI) / 180) * 100,
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line
            key={`line-${i}`}
            x1="50%"
            y1="50%"
            x2={`${50 + Math.cos((angle * Math.PI) / 180) * 40}%`}
            y2={`${50 + Math.sin((angle * Math.PI) / 180) * 40}%`}
            stroke="url(#lineGrad)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGrad">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{ boxShadow: '0 0 4px #22d3ee' }}
          initial={{ x: Math.random() * 300 - 150, y: Math.random() * 300 - 150 }}
          animate={{
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Corner Brackets */}
      {[
        { className: 'top-0 left-0', rotate: 0 },
        { className: 'top-0 right-0', rotate: 90 },
        { className: 'bottom-0 left-0', rotate: -90 },
        { className: 'bottom-0 right-0', rotate: 180 },
      ].map((corner, i) => (
        <motion.div
          key={`bracket-${i}`}
          className={`absolute ${corner.className} w-12 h-12`}
          style={{ transform: `rotate(${corner.rotate}deg)` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        >
          <svg viewBox="0 0 48 48" className="w-full h-full">
            <path d="M0,16 L0,0 L16,0" stroke="#22d3ee" strokeWidth="2" fill="none" />
            <circle cx="4" cy="4" r="2" fill="#a855f7">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default HolographicCube;
