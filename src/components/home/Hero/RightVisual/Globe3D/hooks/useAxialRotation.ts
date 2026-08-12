// src/components/home/Hero/RightVisual/Globe3D/hooks/useAxialRotation.ts
'use client';

import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import type { Object3D } from 'three';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { MOTION } from '../config';

/** Chan delta khi user roi tab roi quay lai - delta co the la vai giay */
const MAX_DELTA = 0.05;

/**
 * Xoay object quanh truc Y cuc bo.
 *
 * @param speed radian/giay. DUONG = nguoc chieu kim dong ho nhin tu cuc Bac.
 */
export function useAxialRotation(ref: RefObject<Object3D | null>, speed: number) {
  const reducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    const object = ref.current;
    if (!object) return;

    // Giam toc thay vi dung han - xem MOTION.reducedMotionFactor trong config
    const factor = reducedMotion ? MOTION.reducedMotionFactor : 1;
    object.rotation.y += speed * factor * Math.min(delta, MAX_DELTA);
  });
}
