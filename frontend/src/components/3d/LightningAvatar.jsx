import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LightningAvatar = () => {
  const groupRef = useRef();
  const boltsRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotate entire avatar
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
    }

    // Pulse the core
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.2;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Animate lightning bolts
    if (boltsRef.current) {
      boltsRef.current.children.forEach((bolt, i) => {
        const offset = i * 0.5;
        const intensity = Math.abs(Math.sin(time * 2 + offset));
        bolt.material.opacity = 0.4 + intensity * 0.6;
        bolt.material.emissiveIntensity = 1 + intensity * 2;
      });
    }
  });

  // Create lightning bolt paths
  const createLightningBolt = (startPos, endPos, segments = 8) => {
    const points = [];
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);
    
    points.push(start.clone());
    
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const midPoint = start.clone().lerp(end, t);
      
      // Add random jagged offset
      midPoint.x += (Math.random() - 0.5) * 0.3;
      midPoint.y += (Math.random() - 0.5) * 0.3;
      midPoint.z += (Math.random() - 0.5) * 0.3;
      
      points.push(midPoint);
    }
    
    points.push(end.clone());
    return points;
  };

  const lightningColor = '#ffff00'; // Electric yellow
  const glowColor = '#ff00ff'; // Magenta accent

  return (
    <group ref={groupRef}>
      {/* Central Energy Core */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={lightningColor}
            emissive={lightningColor}
            emissiveIntensity={3}
            metalness={1}
            roughness={0}
          />
        </mesh>
        
        {/* Inner glow */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial
            color={lightningColor}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Lightning Bolts radiating outward */}
      <group ref={boltsRef}>
        {/* 12 lightning bolts in different directions */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 2;
          const height = (Math.random() - 0.5) * 2;
          
          const endX = Math.cos(angle) * radius;
          const endY = height;
          const endZ = Math.sin(angle) * radius;
          
          const points = createLightningBolt([0, 0, 0], [endX, endY, endZ]);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          return (
            <line key={i} geometry={geometry}>
              <lineBasicMaterial
                color={lightningColor}
                transparent
                opacity={0.8}
                linewidth={3}
              />
            </line>
          );
        })}
      </group>

      {/* Energy Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Secondary Ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Energy Particles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 1.2 + Math.random() * 0.8;
        const height = (Math.random() - 0.5) * 3;
        
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle + i * 0.1) * radius,
              height,
              Math.sin(angle + i * 0.1) * radius,
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? lightningColor : i % 3 === 1 ? glowColor : '#00ffff'}
              emissive={i % 3 === 0 ? lightningColor : i % 3 === 1 ? glowColor : '#00ffff'}
              emissiveIntensity={4}
            />
          </mesh>
        );
      })}

      {/* Avatar Shield (octahedron wireframe) */}
      <mesh>
        <octahedronGeometry args={[2.2, 0]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

export default LightningAvatar;
