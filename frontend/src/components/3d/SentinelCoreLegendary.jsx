import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, TorusKnot } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const SentinelCoreLegendary = () => {
  const coreRef = useRef();
  const knotRef = useRef();
  const particlesRef = useRef();
  const { mouse } = useThree();

  // Create particle system
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const radius = THREE.MathUtils.randFloat(3, 5);
      temp.push({
        position: [
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta),
        ],
        scale: THREE.MathUtils.randFloat(0.05, 0.1),
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Breathing/Pulsing effect on core
    if (coreRef.current) {
      const breathScale = 1 + Math.sin(time * 0.8) * 0.1;
      coreRef.current.scale.setScalar(breathScale);
      
      // Slow rotation
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

      // React to mouse movement
      coreRef.current.rotation.y += mouse.x * 0.001;
      coreRef.current.rotation.x += mouse.y * 0.001;
    }

    // Torus knot rotation
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.2;
      knotRef.current.rotation.y += delta * 0.15;
      knotRef.current.rotation.z += delta * 0.1;
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
      particlesRef.current.children.forEach((particle, i) => {
        const offset = i * 0.1;
        particle.position.y = Math.sin(time + offset) * 0.2;
      });
    }
  });

  return (
    <group>
      {/* Main Sentinel Core - Distorted Sphere */}
      <Sphere ref={coreRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.8}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Outer Wireframe Shell */}
      <Sphere args={[1.3, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#E0E0E0"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Torus Knot Ring */}
      <TorusKnot
        ref={knotRef}
        args={[2, 0.15, 128, 16, 2, 3]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.5}
          wireframe
        />
      </TorusKnot>

      {/* Particle Cloud */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.scale, 8, 8]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Lighting */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E0E0E0" />
      <ambientLight intensity={0.2} />

      {/* Bloom Post-Processing Effect */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
};

export default SentinelCoreLegendary;
