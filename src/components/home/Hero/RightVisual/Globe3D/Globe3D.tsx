// src/components/home/Hero/RightVisual/Globe3D/Globe3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import GlobeScene from './GlobeScene';
import GlobeLighting from './GlobeLighting';
import { CAMERA } from './config';
import styles from './Globe3D.module.css';

export default function Globe3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mq.matches);

    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{ position: CAMERA.position, fov: CAMERA.fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: true,
          // Nen trong suot de hoa voi gradient cua Hero
          alpha: true,
          powerPreference: 'high-performance',
          // NoToneMapping: 1.png da la tranh ve hoan chinh. ACESFilmic
          // (mac dinh cua R3F) se lam bac mau xanh la va xanh bien ~15-20%.
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <Suspense fallback={null}>
          <GlobeLighting />
          <GlobeScene isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
