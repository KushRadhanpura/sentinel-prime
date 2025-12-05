import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import QuantumMatrix from './QuantumMatrix';

const SceneContainer = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
        
        {/* Dramatic Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#ffff00" />
        
        {/* Quantum Matrix */}
        <QuantumMatrix />
      </Canvas>
    </div>
  );
};

export default SceneContainer;
