// src/components/home/Hero/RightVisual/Globe3D/layers/AtmosphereLayer.tsx
'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { atmosphereFragmentShader, atmosphereVertexShader } from '../shaders/atmosphere';
import { ATMOSPHERE, GEOMETRY } from '../config';

/** Vo cau phat sang bao ngoai cung. Khong xoay - anh sang khong co "chieu". */
export default function AtmosphereLayer() {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(ATMOSPHERE.color) },
      uPower: { value: ATMOSPHERE.power },
      uIntensity: { value: ATMOSPHERE.intensity },
    }),
    []
  );

  return (
    <mesh renderOrder={2}>
      <sphereGeometry args={[GEOMETRY.atmoRadius, 64, 32]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
