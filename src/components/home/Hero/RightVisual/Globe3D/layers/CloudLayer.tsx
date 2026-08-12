// src/components/home/Hero/RightVisual/Globe3D/layers/CloudLayer.tsx
'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGlobeTextures } from '../hooks/useGlobeTextures';
import { useAxialRotation } from '../hooks/useAxialRotation';
import { GEOMETRY, MATERIAL, ROTATION } from '../config';

/** Lop 4 - bau khi quyen. Ban kinh lon hon va xoay NGUOC chieu lop 1-2-3. */
export default function CloudLayer({ segments }: { segments: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { clouds } = useGlobeTextures();

  useAxialRotation(meshRef, ROTATION.clouds);

  // May trong 4.png xam nhat, de nguyen se mo tit
  const color = useMemo(
    () => new THREE.Color(MATERIAL.cloudTint).multiplyScalar(MATERIAL.cloudBoost),
    []
  );

  return (
    <mesh ref={meshRef} renderOrder={1}>
      <sphereGeometry args={[GEOMETRY.cloudRadius, segments, segments / 2]} />
      <meshBasicMaterial
        color={color}
        // Dung alphaMap chu KHONG dung map: mot texture khong the vua sRGB
        // (cho map) vua Linear (cho alphaMap). May trang nen chi can mask.
        alphaMap={clouds}
        transparent
        opacity={MATERIAL.cloudOpacity}
        // Bat buoc: khong tat se duc lo vao Trai Dat phia duoi
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        // DoubleSide + additive se ve may ban cau sau xuyen qua Trai Dat
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
