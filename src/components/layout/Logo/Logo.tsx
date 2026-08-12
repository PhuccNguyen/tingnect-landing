// src/components/layout/Logo/Logo.tsx
import Image from 'next/image';

/**
 * Component DUY NHAT duoc phep render logo Yaa Club.
 *
 * Quy tac brand: logo khong bao gio duoc ve lai hay re-typeset bang CSS/SVG —
 * luon dung file artwork goc. Moi noi can logo phai di qua day de kich thuoc,
 * alt text va bien the mau luon nhat quan.
 *
 * File nguon sinh boi `node scripts/optimize-brand-logos.mjs`.
 */

type Variant = 'standard' | 'inverted' | 'lime';
type Orientation = 'horizontal' | 'vertical' | 'icon';

/** Kich thuoc that cua file — next/image can de tinh ti le, tranh layout shift */
const ASSETS: Record<Orientation, Partial<Record<Variant, { src: string; w: number; h: number }>>> = {
  horizontal: {
    standard: { src: '/brand/logo/lockup-horizontal.webp', w: 726, h: 340 },
    inverted: { src: '/brand/logo/lockup-horizontal-cream.webp', w: 726, h: 340 },
  },
  vertical: {
    standard: { src: '/brand/logo/lockup-vertical.webp', w: 488, h: 560 },
    inverted: { src: '/brand/logo/lockup-vertical-cream.webp', w: 488, h: 560 },
    lime: { src: '/brand/logo/lockup-vertical-lime.webp', w: 488, h: 560 },
  },
  icon: {
    standard: { src: '/brand/logo/icon.webp', w: 506, h: 512 },
    inverted: { src: '/brand/logo/icon-cream.webp', w: 506, h: 512 },
  },
};

interface LogoProps {
  /** standard = den (nen sang) · inverted = kem (nen toi) · lime = xanh neon */
  variant?: Variant;
  orientation?: Orientation;
  /** Chieu cao render, px. Chieu rong tu tinh theo ti le goc. */
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function Logo({
  variant = 'standard',
  orientation = 'horizontal',
  height = 40,
  priority = false,
  className,
}: LogoProps) {
  // lime chi co ban vertical -> tu lui ve standard thay vi vo man hinh
  const asset = ASSETS[orientation][variant] ?? ASSETS[orientation].standard!;
  const width = Math.round((asset.w / asset.h) * height);

  return (
    <Image
      src={asset.src}
      alt="Yaa Club"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: 'auto', objectFit: 'contain' }}
    />
  );
}
