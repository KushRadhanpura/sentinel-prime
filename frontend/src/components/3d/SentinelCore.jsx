import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Sphere, Torus } from '@react-three/drei';

const SentinelCore = () => {
  const coreRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    // Rotate core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Rotate rings
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.5;
      ringRef.current.rotation.z += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.4;
      ring2Ref.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group>
      {/* Central Sphere - The Core */}
      <Sphere ref={coreRef} args={[1, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          wireframe={false}
          metalness={0.8}
          roughness={0.2}
        />
        <Edges color="#ffffff" linewidth={1} />
      </Sphere>

      {/* Ring 1 */}
      <Torus ref={ringRef} args={[2, 0.1, 8, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </Torus>

      {/* Ring 2 */}
      <Torus ref={ring2Ref} args={[2.5, 0.08, 8, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
          wireframe={false}
        />
      </Torus>

      {/* Orbital Particles (Low-poly) */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Sphere key={i} args={[0.1, 4, 4]} position={[x, 0, z]}>
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={0.8}
            />
          </Sphere>
        );
      })}
    </group>
  );
};

export default SentinelCore;
