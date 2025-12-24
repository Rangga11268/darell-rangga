"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function Artifact({ onHover }: { onHover: (hovered: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHover(true);
          onHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(false);
        }}
        scale={hovered ? 1.2 : 1}
      >
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={hovered ? "#ffd700" : "#c5a059"}
          emissive={hovered ? "#ffaa00" : "#5c4d3c"}
          emissiveIntensity={hovered ? 2 : 0.5}
          roughness={0.3}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh scale={0.5}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#ffaa00"
          wireframe={false}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export function HeroArtifact() {
  const [hovered, setHover] = useState(false);

  return (
    <div className="w-full h-full relative z-10 fade-in-scale">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#8d6e63"
        />

        <Artifact onHover={setHover} />

        <Stars
          radius={100}
          depth={50}
          count={500}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>

      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#c5a059] text-sm font-cinzel tracking-widest pointer-events-none"
        >
          ANCIENT ARTIFACT DETECTED
        </motion.div>
      )}
    </div>
  );
}
