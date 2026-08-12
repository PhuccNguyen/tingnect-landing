// src/components/home/Hero/RightVisual/Globe3D/hooks/usePrefersReducedMotion.ts
'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Tra ve true khi nguoi dung bat "giam chuyen dong" o cap he dieu hanh.
 * Globe se dung xoay thay vi quay lien tuc.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);

    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
