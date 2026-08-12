// src/components/home/Hero/RightVisual/RightVisual.tsx
'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { motion } from 'framer-motion';
import styles from './RightVisual.module.css';

// three.js can window/WebGL nen khong SSR duoc.
// Dynamic import cung giu ~600KB bundle three ra khoi payload dau tien.
const Globe3D = dynamic(() => import('./Globe3D'), {
  ssr: false,
  loading: () => <div className={styles.skeleton} />,
});

/*
 * memo() BAT BUOC o day.
 * MainContent chay hieu ung go chu bang setTimeout 50-100ms, moi lan set
 * state la re-render ca cay con — bao gom luon <Canvas> cua R3F. React phai
 * doi chieu lai toan bo scene 3D 10-20 lan moi giay du khong co gi thay doi.
 * RightVisual khong nhan prop nao nen memo chan dut duoc chuoi do.
 */
function RightVisual() {
  return (
    <div className={styles.rightVisual}>
      {/*
        CHI animate opacity - TUYET DOI KHONG animate scale o day.
        R3F do kich thuoc canvas bang ResizeObserver, ma ResizeObserver
        KHONG kich hoat lai khi transform doi. Neu scale tu 0.86 -> 1 thi
        R3F chot kich thuoc do duoc giua chung animation (882 x 0.938 = 827px)
        va khong bao gio do lai -> canvas vinh vien nho hon o chua 6%.
        Muon hieu ung phong to thi phai lam trong 3D (scale cua <group>).
      */}
      <motion.div
        className={styles.visualSlot}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <Globe3D />
      </motion.div>
    </div>
  );
}

export default memo(RightVisual);
