import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SentinelDrone from './SentinelDrone';

const SentinelDroneScene = ({ enableControls = false, cameraPosition = [0, 0, 5] }) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4A90E2" />
          
          {/* No stars - cleaner cybernetic look */}
          
          {/* The Sentinel Drone */}
          <SentinelDrone />
          
          {/* Optional Controls */}
          {enableControls && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              autoRotate={false}
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Scan-line overlay effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-gold/5 to-transparent animate-scan"></div>
      </div>
    </div>
  );
};

export default SentinelDroneScene;
