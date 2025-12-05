import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SENTINEL DRONE - The Guardian of the Vault
 * A futuristic security drone composed of:
 * - Central Eye (Red/Gold glowing sphere)
 * - Dual Gyroscopic Shield Rings (rotating on different axes)
 * - Scanning animation (left-right movement)
 * - Pulsing glow effect
 */
const SentinelDrone = () => {
  const groupRef = useRef();
  const eyeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const scannerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Main group rotation (slow spin)
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
    }

    // Eye pulsing effect (breathing)
    if (eyeRef.current) {
      const pulse = 1 + Math.sin(time * 1.5) * 0.15;
      eyeRef.current.scale.set(pulse, pulse, pulse);
      
      // Eye color shift (gold to red)
      const colorShift = Math.sin(time * 0.8) * 0.5 + 0.5;
      eyeRef.current.material.emissive = new THREE.Color(
        1,
        0.84 - colorShift * 0.3,
        colorShift * 0.1
      );
    }

    // Ring 1 - Gyroscopic rotation (X-axis)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.8;
      ring1Ref.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }

    // Ring 2 - Gyroscopic rotation (Z-axis, opposite direction)
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.6;
      ring2Ref.current.rotation.y = Math.cos(time * 0.4) * 0.2;
    }

    // Scanner beam (small sphere that moves left-right)
    if (scannerRef.current) {
      const scanX = Math.sin(time * 2) * 1.5;
      scannerRef.current.position.x = scanX;
      scannerRef.current.position.y = Math.cos(time * 2) * 0.3;
    }
  });

  // Particle field around the drone
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2 + Math.random() * 1;
      
      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
        scale: 0.02 + Math.random() * 0.03,
      });
    }
    return temp;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Eye - The Core */}
      <Sphere ref={eyeRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#FFD700"
          emissive="#FF4500"
          emissiveIntensity={2}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Inner Glow Aura */}
      <Sphere args={[0.7, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Shield Ring 1 - Horizontal Gyroscope */}
      <Torus
        ref={ring1Ref}
        args={[1.5, 0.08, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#E0E0E0"
          emissive="#4A90E2"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>

      {/* Shield Ring 2 - Vertical Gyroscope */}
      <Torus
        ref={ring2Ref}
        args={[1.8, 0.06, 16, 100]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <meshStandardMaterial
          color="#C0C0C0"
          emissive="#FFD700"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.05}
        />
      </Torus>

      {/* Scanner Beam (small moving orb) */}
      <Sphere ref={scannerRef} args={[0.08, 16, 16]} position={[1.5, 0, 0]}>
        <meshBasicMaterial color="#FF0000" />
      </Sphere>

      {/* Particle Field */}
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

      {/* Ambient Point Lights */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFD700" distance={5} />
      <pointLight position={[2, 0, 0]} intensity={0.5} color="#FF4500" distance={3} />
    </group>
  );
};

export default SentinelDrone;
