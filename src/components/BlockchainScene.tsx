'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// import { Points } from '@react-three/drei'
import { Points, Line } from '@react-three/drei'

import type { Line2, LineMaterial } from 'three-stdlib'
import * as THREE from 'three'

// Types
interface NodePosition {
  x: number
  y: number
  z: number
}

interface BlockchainNodeProps {
  position: [number, number, number]
  index: number
}

interface ConnectionLineProps {
  start: THREE.Vector3
  end: THREE.Vector3
  opacity: number
}

// Particle System Component
function BlockchainParticles() {
  const ref = useRef<THREE.Points>(null!)
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < 1000; i++) {
      const radius = Math.random() * 2 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.1
      ref.current.rotation.y -= delta * 0.15
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
        <pointsMaterial
          transparent
          color="#64ffda"
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}

// Individual Blockchain Node Component
function BlockchainNode({ position, index }: BlockchainNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.x = time * 0.5 + index * 0.1
      meshRef.current.rotation.y = time * 0.3 + index * 0.05
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1
      
      // Pulse effect
      const scale = 1 + Math.sin(time * 2 + index) * 0.1
      meshRef.current.scale.setScalar(scale)
    }

    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation)
      glowRef.current.position.copy(meshRef.current.position)
      glowRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.2)
    }
  })

  return (
    <group>
      {/* Glow effect */}
      <mesh ref={glowRef} position={position}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial 
          color="#64ffda" 
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Main node */}
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial 
          color="#00bcd4" 
          emissive="#004d5c"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

function ConnectionLine({ start, end, opacity }: { start: THREE.Vector3; end: THREE.Vector3; opacity: number }) {
  // Drei <Line /> kỳ vọng ref là Line2 | LineSegments2
  const ref = useRef<Line2>(null!)

  // Tính mờ động mỗi frame, không dùng any
  useFrame(({ clock }) => {
    const mat = ref.current?.material as LineMaterial | undefined
    if (!mat) return
    mat.transparent = true
    mat.opacity = opacity * (0.5 + Math.sin(clock.elapsedTime * 2) * 0.3)
  })

  // Có thể truyền trực tiếp Vector3[], drei chấp nhận
  return (
    <Line
      ref={ref}
      points={[start, end]}
      color="#64ffda"
      depthWrite={false}
      lineWidth={1}   // hiệu lực với Line2 (fat lines)
    />
  )
}

// Blockchain Nodes System
function BlockchainNodes() {
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = []
    const nodeCount = 30
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 3 + Math.random() * 2
      const height = (Math.random() - 0.5) * 4
      
      nodePositions.push([
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        height,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 2
      ])
    }
    return nodePositions
  }, [])

  return (
    <>
      {nodes.map((position, index) => (
        <BlockchainNode 
          key={index} 
          position={position} 
          index={index}
        />
      ))}
    </>
  )
}

// Connection Network
function ConnectionNetwork() {
  const groupRef = useRef<THREE.Group>(null!)
  
  const connections = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; opacity: number }[] = []
    const connectionCount = 20
    
    for (let i = 0; i < connectionCount; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8
      )
      
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8
      )
      
      const opacity = 0.3 + Math.random() * 0.4
      
      lines.push({ start, end, opacity })
    }
    return lines
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {connections.map((connection, index) => (
        <ConnectionLine
          key={index}
          start={connection.start}
          end={connection.end}
          opacity={connection.opacity}
        />
      ))}
    </group>
  )
}

// Data Flow Effect
function DataFlow() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const dataParticles = useMemo(() => {
    const positions = new Float32Array(300)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.2
      particlesRef.current.rotation.z += delta * 0.1
      
      // Animate positions
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={particlesRef} positions={dataParticles} stride={3}>
      <pointsMaterial
        transparent
        color="#00bcd4"
        size={0.05}
        sizeAttenuation={true}
        opacity={0.8}
      />
    </Points>
  )
}

// Main Scene Component
export default function BlockchainScene() {
  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1
    }}>
      <Canvas
        camera={{ 
          position: [0, 2, 8],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          width: '100%',
          height: '100%'
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#64ffda" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00bcd4" />
        <spotLight 
          position={[0, 20, 0]} 
          angle={0.3} 
          intensity={0.5}
          color="#ffffff"
          castShadow
        />

        {/* 3D Elements */}
        <BlockchainParticles />
        <BlockchainNodes />
        <ConnectionNetwork />
        <DataFlow />
      </Canvas>
    </div>
  )
}
