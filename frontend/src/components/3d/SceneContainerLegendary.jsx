import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import LightningBoltHero from './LightningBoltHero';

const SceneContainerLegendary = ({ enableControls = true, cameraPosition = [0, 0, 6] }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
        
        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
        
        {/* Dramatic Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffff00" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
        <pointLight position={[0, 10, 0]} intensity={1.2} color="#00ffff" />
        
        {/* Lightning Bolt Hero */}
        <Suspense fallback={null}>
          <LightningBoltHero />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneContainerLegendary;
