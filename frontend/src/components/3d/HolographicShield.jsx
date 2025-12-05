import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * HOLOGRAPHIC SHIELD MATRIX
 * A cyberpunk-style visualization showing:
 * - Hexagonal shield grid (like a force field)
 * - Flowing data particles (encryption streams)
 * - Pulsing energy core
 * - Rotating holographic lock symbol
 */
const HolographicShield = () => {
  const shieldRef = useRef();
  const lockRef = useRef();
  const particlesRef = useRef();
  const energyCoreRef = useRef();

  // Create flowing particles (data streams)
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 1.5 + Math.random() * 2;
      
      temp.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        speed: 0.5 + Math.random() * 1.5,
        size: 0.02 + Math.random() * 0.03,
        opacity: 0.3 + Math.random() * 0.7,
      });
    }
    return temp;
  }, []);

  // Create hexagonal shield geometry
  const hexagonalShield = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const hexSize = 0.15;
    const radius = 2;
    const segments = 8;
    
    for (let ring = 0; ring < segments; ring++) {
      const ringRadius = (radius / segments) * ring;
      const hexCount = Math.max(6, ring * 6);
      
      for (let i = 0; i < hexCount; i++) {
        const angle = (i / hexCount) * Math.PI * 2;
        const x = Math.cos(angle) * ringRadius;
        const y = Math.sin(angle) * ringRadius;
        
        // Create hexagon vertices
        for (let j = 0; j < 6; j++) {
          const hexAngle = (j / 6) * Math.PI * 2;
          vertices.push(
            x + Math.cos(hexAngle) * hexSize,
            y + Math.sin(hexAngle) * hexSize,
            0
          );
        }
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotate shield slowly
    if (shieldRef.current) {
      shieldRef.current.rotation.z = time * 0.1;
      // Pulse effect
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      shieldRef.current.scale.set(pulse, pulse, pulse);
    }

    // Rotate lock symbol
    if (lockRef.current) {
      lockRef.current.rotation.y = time * 0.5;
      lockRef.current.position.y = Math.sin(time * 1.5) * 0.1;
    }

    // Energy core pulsing
    if (energyCoreRef.current) {
      const corePulse = 0.3 + Math.sin(time * 3) * 0.2;
      energyCoreRef.current.scale.set(corePulse, corePulse, corePulse);
      energyCoreRef.current.material.opacity = 0.5 + Math.sin(time * 3) * 0.3;
    }

    // Animate particles flowing upward and spiraling
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += particles[i].speed * 0.01;
        particle.position.x += Math.sin(time + i) * 0.005;
        particle.position.z += Math.cos(time + i) * 0.005;
        
        // Reset particle when it goes too high
        if (particle.position.y > 3) {
          particle.position.y = -3;
        }
        
        // Fade in/out
        particle.material.opacity = particles[i].opacity * Math.sin((particle.position.y + 3) / 6 * Math.PI);
      });
    }
  });

  return (
    <group>
      {/* Background energy sphere */}
      <mesh ref={energyCoreRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Hexagonal Shield Grid */}
      <points ref={shieldRef}>
        <bufferGeometry attach="geometry" {...hexagonalShield} />
        <pointsMaterial
          size={0.05}
          color="#FFD700"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Central Lock Symbol (composed of basic shapes) */}
      <group ref={lockRef}>
        {/* Lock Body */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.2]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Lock Shackle */}
        <mesh position={[0, 0.15, 0]}>
          <torusGeometry args={[0.25, 0.05, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color="#E0E0E0"
            emissive="#E0E0E0"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Keyhole */}
        <mesh position={[0, -0.15, 0.11]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
      </group>

      {/* Flowing Data Particles */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#E0E0E0" : "#00D4FF"}
              transparent
              opacity={particle.opacity}
            />
          </mesh>
        ))}
      </group>

      {/* Orbital Rings (data streams) */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 2, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#E0E0E0"
          emissive="#E0E0E0"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Ambient lighting */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#FFD700" distance={5} />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#00D4FF" distance={4} />
    </group>
  );
};

export default HolographicShield;
