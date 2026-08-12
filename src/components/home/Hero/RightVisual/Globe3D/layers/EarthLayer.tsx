// src/components/home/Hero/RightVisual/Globe3D/layers/EarthLayer.tsx
'use client';

import { useRef } from 'react';
import type { Mesh } from 'three';
import { useGlobeTextures } from '../hooks/useGlobeTextures';
import { useAxialRotation } from '../hooks/useAxialRotation';
import { GEOMETRY, MATERIAL, ROTATION } from '../config';

/**
 * Lop 1 + 2 + 3 gop vao MOT mesh.
 *
 * 2.png va 3.png khong phai anh de nhin ma la du lieu dieu khien vat lieu cua
 * chinh be mat 1.png - cung ban kinh, cung chieu xoay. Tach thanh 3 qua cau
 * rieng thi lop ngoai se che lop trong.
 */
export default function EarthLayer({ segments }: { segments: number }) {
  const meshRef = useRef<Mesh>(null);
  const { surface, landMask, elevation } = useGlobeTextures();

  useAxialRotation(meshRef, ROTATION.earth);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GEOMETRY.earthRadius, segments, segments / 2]} />
      <meshStandardMaterial
        // Lop 1 - mau be mat
        map={surface}
        // Lop 2 - mask dat/bien. roughnessMap quy uoc trang = nham:
        // dat (trang) -> nham, bien (den) -> nhan, bat sang mat troi.
        roughnessMap={landMask}
        roughness={MATERIAL.roughnessBase}
        // Lop 3 - height map, noi khoi nui va bang
        bumpMap={elevation}
        bumpScale={MATERIAL.bumpScale}
        metalness={MATERIAL.metalness}
      />
    </mesh>
  );
}
