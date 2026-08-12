// src/components/home/Hero/RightVisual/Globe3D/GlobeScene.tsx
'use client';

import { useMemo } from 'react';
import { MathUtils } from 'three';
import EarthLayer from './layers/EarthLayer';
import CloudLayer from './layers/CloudLayer';
import AtmosphereLayer from './layers/AtmosphereLayer';
import { ATMOSPHERE, GEOMETRY, ROTATION } from './config';

export default function GlobeScene({ isMobile }: { isMobile: boolean }) {
  const segments = isMobile ? GEOMETRY.segments.mobile : GEOMETRY.segments.desktop;
  const tilt = useMemo(() => MathUtils.degToRad(ROTATION.tiltDeg), []);

  // Tilt dat o GROUP CHA: nghieng truc Y mot lan, Dat + May + Khi quyen cung
  // nghieng theo. Neu tilt tung mesh rieng -> truc lech nhau, may truot sai.
  return (
    <group rotation={[0, 0, tilt]}>
      <EarthLayer segments={segments} />
      <CloudLayer segments={segments} />
      {ATMOSPHERE.enabled && <AtmosphereLayer />}
    </group>
  );
}
