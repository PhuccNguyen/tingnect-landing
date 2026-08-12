// src/components/home/Hero/RightVisual/Globe3D/hooks/useGlobeTextures.ts
'use client';

import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { TEXTURES } from '../config';

/**
 * Load 4 texture cua globe va cau hinh dung chuan.
 *
 * QUY TAC VANG ve color space (three r152+ khong tu set):
 *   - texture MAU  -> SRGBColorSpace        (quen -> Trai Dat bac mau, xam xit)
 *   - map DU LIEU  -> LinearSRGBColorSpace  (set nham sRGB -> bump/may sai cuong do)
 */
export function useGlobeTextures() {
  const gl = useThree((state) => state.gl);
  const textures = useTexture({ ...TEXTURES });

  return useMemo(() => {
    textures.surface.colorSpace = THREE.SRGBColorSpace;
    textures.landMask.colorSpace = THREE.LinearSRGBColorSpace;
    textures.elevation.colorSpace = THREE.LinearSRGBColorSpace;
    // clouds chi dung lam alphaMap nen cung la du lieu, khong phai mau
    textures.clouds.colorSpace = THREE.LinearSRGBColorSpace;

    const anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());

    for (const texture of Object.values(textures)) {
      // Cuu chi tiet o ria qua cau va hai cuc, noi UV bi keo gian manh
      texture.anisotropy = anisotropy;
      texture.wrapS = THREE.RepeatWrapping;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
    }

    return textures;
  }, [textures, gl]);
}
