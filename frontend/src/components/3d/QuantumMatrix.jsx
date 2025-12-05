import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const QuantumMatrix = () => {
  const matrixRef = useRef();
  const dataStreamRef = useRef();
  const coreRef = useRef();
  const shieldRingRef = useRef();

  // Create quantum data nodes (glowing cubes in 3D grid)
  const quantumNodes = useMemo(() => {
    const nodes = [];
    const gridSize = 7;
    const spacing = 0.6;
    const offset = (gridSize - 1) * spacing / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          nodes.push({
            position: [
              x * spacing - offset,
              y * spacing - offset,
              z * spacing - offset,
            ],
            delay: (x + y + z) * 0.1,
            color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6),
          });
        }
      }
    }
    return nodes;
  }, []);

  // Create binary data streams (flowing lines)
  const dataStreams = useMemo(() => {
    const streams = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 3;
      streams.push({
        start: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          -2,
        ],
        end: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          2,
        ],
        delay: i * 0.05,
      });
    }
    return streams;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotate entire matrix
    if (matrixRef.current) {
      matrixRef.current.rotation.y = time * 0.15;
      matrixRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Pulse data streams
    if (dataStreamRef.current) {
      dataStreamRef.current.children.forEach((stream, i) => {
        const pulseSpeed = 2;
        const pulse = Math.sin(time * pulseSpeed + i * 0.3);
        stream.material.opacity = 0.3 + pulse * 0.4;
      });
    }

    // Rotate core
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.5;
      coreRef.current.rotation.y = time * 0.3;
      const scale = 1 + Math.sin(time * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Rotate shield rings
    if (shieldRingRef.current) {
      shieldRingRef.current.rotation.z = time * 0.4;
      shieldRingRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={matrixRef}>
      {/* Central Quantum Core */}
      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Inner glow */}
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Quantum Nodes (3D Grid of glowing cubes) */}
      {quantumNodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Data Streams (flowing binary lines) */}
      <group ref={dataStreamRef}>
        {dataStreams.map((stream, i) => {
          const points = [
            new THREE.Vector3(...stream.start),
            new THREE.Vector3(...stream.end),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={i} geometry={geometry}>
              <lineBasicMaterial
                color="#00d4ff"
                transparent
                opacity={0.5}
                linewidth={2}
              />
            </line>
          );
        })}
      </group>

      {/* Shield Rings (protective layers) */}
      <group ref={shieldRingRef}>
        {[1.8, 2.2, 2.6].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={i === 0 ? "#ff00ff" : i === 1 ? "#00ffff" : "#ffff00"}
              emissive={i === 0 ? "#ff00ff" : i === 1 ? "#00ffff" : "#ffff00"}
              emissiveIntensity={1.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Wireframe Sphere (outer boundary) */}
      <mesh>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Energy Particles (floating around) */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 2.5 + Math.random() * 0.5;
        const height = (Math.random() - 0.5) * 4;
        
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle + i * 0.1) * radius,
              height,
              Math.sin(angle + i * 0.1) * radius,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00ffff"
              emissiveIntensity={3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default QuantumMatrix;
