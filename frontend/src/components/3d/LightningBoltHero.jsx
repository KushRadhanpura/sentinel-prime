import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LightningBoltHero = () => {
  const groupRef = useRef();
  const boltRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    }

    // Pulse bolt
    if (boltRef.current) {
      const pulse = 1 + Math.sin(time * 4) * 0.15;
      boltRef.current.scale.set(pulse, pulse, pulse);
    }

    // Rotate rings
    if (ringsRef.current) {
      ringsRef.current.rotation.x = time * 0.4;
      ringsRef.current.rotation.z = time * 0.3;
    }
  });

  // Lightning bolt vertices
  const createBoltGeometry = () => {
    const shape = new THREE.Shape();
    
    // Draw lightning bolt
    shape.moveTo(0, 2);
    shape.lineTo(0.4, 0.6);
    shape.lineTo(0.15, 0.6);
    shape.lineTo(0.6, -0.8);
    shape.lineTo(0.25, -0.8);
    shape.lineTo(0.35, -2);
    shape.lineTo(0, -1.2);
    shape.lineTo(-0.35, -2);
    shape.lineTo(-0.25, -0.8);
    shape.lineTo(-0.6, -0.8);
    shape.lineTo(-0.15, 0.6);
    shape.lineTo(-0.4, 0.6);
    shape.lineTo(0, 2);
    
    return shape;
  };

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Energy rings */}
      <group ref={ringsRef}>
        {[3, 3.5, 4].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.04, 16, 100]} />
            <meshStandardMaterial
              color="#ffcc00"
              emissive="#ffcc00"
              emissiveIntensity={1.5 - i * 0.3}
              transparent
              opacity={0.4 - i * 0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Main lightning bolt */}
      <mesh ref={boltRef}>
        <extrudeGeometry
          args={[
            createBoltGeometry(),
            {
              depth: 0.4,
              bevelEnabled: true,
              bevelThickness: 0.15,
              bevelSize: 0.1,
              bevelSegments: 5,
            },
          ]}
        />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Electric sparks */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 2 + Math.random() * 1;
        const height = (Math.random() - 0.5) * 4;
        
        return (
          <mesh
            key={`spark-${i}`}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffff00"
              emissiveIntensity={4}
            />
          </mesh>
        );
      })}

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffff00"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color="#ffff00"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Energy beams */}
      {[0, Math.PI / 4, Math.PI / 2, (Math.PI * 3) / 4, Math.PI, (Math.PI * 5) / 4, (Math.PI * 3) / 2, (Math.PI * 7) / 4].map((angle, i) => (
        <group key={`beam-${i}`} rotation={[0, angle, 0]}>
          <mesh position={[0, 0, 2.5]}>
            <cylinderGeometry args={[0.03, 0.03, 2.5, 8]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default LightningBoltHero;
