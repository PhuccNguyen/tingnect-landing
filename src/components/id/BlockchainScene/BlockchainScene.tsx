// src/components/id/BlockchainScene/BlockchainScene.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
}

function ParticleSystem({ count = 2000 }: ParticleSystemProps) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Purple gradient colors
      const color = new THREE.Color();
      color.setHSL(0.75 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <bufferAttribute
        attach="attributes-color"
        args={[colors, 3]}
      />
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function BlockchainNodes() {
  const ref = useRef<THREE.Group>(null);
  const nodeCount = 80;
  
  const nodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      nodes.push({
        position,
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.02 + 0.005,
        color: new THREE.Color().setHSL(0.75 + Math.random() * 0.15, 0.8, 0.4 + Math.random() * 0.4)
      });
    }
    return nodes;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
      
      ref.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const node = nodes[i];
          const pulse = Math.sin(state.clock.elapsedTime * node.speed * 15) * 0.3 + 1;
          child.scale.setScalar(node.scale * pulse);
          
          // Subtle floating movement
          child.position.y = node.position.y + Math.sin(state.clock.elapsedTime * node.speed * 5) * 0.5;
        }
      });
    }
  });

  return (
    <group ref={ref}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <octahedronGeometry args={[0.08, 1]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.6}
            wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function NetworkConnections() {
  const ref = useRef<THREE.LineSegments>(null);
  
  const { positions, colors } = useMemo(() => {
    const lineCount = 150;
    const positions = new Float32Array(lineCount * 6);
    const colors = new Float32Array(lineCount * 6);
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      
      // Create connected network points
      const distance = Math.random() * 8 + 2;
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI;
      
      // Start point
      positions[i6] = Math.cos(angle1) * Math.sin(angle2) * distance;
      positions[i6 + 1] = Math.cos(angle2) * distance;
      positions[i6 + 2] = Math.sin(angle1) * Math.sin(angle2) * distance;
      
      // End point (nearby)
      const nearbyDistance = distance + Math.random() * 3;
      const nearbyAngle1 = angle1 + (Math.random() - 0.5) * 0.5;
      const nearbyAngle2 = angle2 + (Math.random() - 0.5) * 0.5;
      
      positions[i6 + 3] = Math.cos(nearbyAngle1) * Math.sin(nearbyAngle2) * nearbyDistance;
      positions[i6 + 4] = Math.cos(nearbyAngle2) * nearbyDistance;
      positions[i6 + 5] = Math.sin(nearbyAngle1) * Math.sin(nearbyAngle2) * nearbyDistance;
      
      // Colors (gradient from purple to blue)
      const color1 = new THREE.Color().setHSL(0.75, 0.8, 0.5);
      const color2 = new THREE.Color().setHSL(0.65, 0.7, 0.3);
      
      colors[i6] = color1.r;
      colors[i6 + 1] = color1.g;
      colors[i6 + 2] = color1.b;
      
      colors[i6 + 3] = color2.r;
      colors[i6 + 4] = color2.g;
      colors[i6 + 5] = color2.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.015) * 0.05;
      
      // Animate opacity
      const material = ref.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function Fireflies() {
  const ref = useRef<THREE.Group>(null);
  const fireflyCount = 100;
  
  const fireflies = useMemo(() => {
    const fireflies = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.02
        ),
        glowIntensity: Math.random() * 0.5 + 0.5,
        glowSpeed: Math.random() * 2 + 0.5,
        color: new THREE.Color().setHSL(0.75 + Math.random() * 0.2, 1, 0.7)
      });
    }
    return fireflies;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const firefly = fireflies[i];
          
          // Update position
          firefly.position.add(firefly.velocity);
          child.position.copy(firefly.position);
          
          // Boundary bounce
          if (Math.abs(firefly.position.x) > 15) firefly.velocity.x *= -1;
          if (Math.abs(firefly.position.y) > 10) firefly.velocity.y *= -1;
          if (Math.abs(firefly.position.z) > 15) firefly.velocity.z *= -1;
          
          // Pulsing glow
          const glow = firefly.glowIntensity + Math.sin(state.clock.elapsedTime * firefly.glowSpeed) * 0.3;
          child.scale.setScalar(glow * 0.3);
          
          // Update material opacity
          const material = child.material as THREE.MeshBasicMaterial;
          material.opacity = glow;
        }
      });
    }
  });

  return (
    <group ref={ref}>
      {fireflies.map((firefly, i) => (
        <mesh key={i} position={firefly.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color={firefly.color}
            transparent
            opacity={firefly.glowIntensity}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingBlocks() {
  const ref = useRef<THREE.Group>(null);
  const blockCount = 30;
  
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < blockCount; i++) {
      blocks.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 25
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        scale: Math.random() * 0.3 + 0.1,
        floatSpeed: Math.random() * 0.02 + 0.005
      });
    }
    return blocks;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const block = blocks[i];
          
          // Rotation
          child.rotation.x += block.rotationSpeed.x;
          child.rotation.y += block.rotationSpeed.y;
          child.rotation.z += block.rotationSpeed.z;
          
          // Floating movement
          child.position.y = block.position.y + Math.sin(state.clock.elapsedTime * block.floatSpeed * 10) * 0.8;
          child.position.x = block.position.x + Math.cos(state.clock.elapsedTime * block.floatSpeed * 5) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={ref}>
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} scale={block.scale}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Subtle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.02) * 2;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.03) * 1;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}
export default function BlockchainScene(): React.ReactElement {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    }}>
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 50,
          near: 0.1,
          far: 100
        }}
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
          `
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={0.4} 
          color="#8b5cf6"
          distance={30}
          decay={2}
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.3} 
          color="#7c3aed"
          distance={25}
          decay={2}
        />
        <pointLight 
          position={[0, 15, 0]} 
          intensity={0.2} 
          color="#c4b5fd"
          distance={20}
          decay={2}
        />
        
        {/* Scene Components */}
        <ParticleSystem count={1500} />
        <BlockchainNodes />
        <NetworkConnections />
        <Fireflies />
        <FloatingBlocks />
        <CameraController />
        
        {/* Add some fog for depth */}
        <fog attach="fog" args={['#0f0f23', 10, 50]} />
      </Canvas>
    </div>
  );
}
