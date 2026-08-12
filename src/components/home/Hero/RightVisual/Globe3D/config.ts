// src/components/home/Hero/RightVisual/Globe3D/config.ts
//
// Bang dieu khien duy nhat cua Globe3D. Moi con so tinh chinh nam o day
// de khong phai mo tung component khi can chinh visual.

/** Duong dan texture da toi uu - sinh boi scripts/optimize-globe-textures.mjs */
export const TEXTURES = {
  surface: '/textures/globe/earth-surface.webp',
  landMask: '/textures/globe/earth-landmask.webp',
  elevation: '/textures/globe/earth-elevation.webp',
  clouds: '/textures/globe/earth-clouds.webp',
} as const;

export const GEOMETRY = {
  earthRadius: 1.0,
  /** Cach Trai Dat 4.5% -> parallax ro. Duoi 1.01 se bi z-fighting. */
  cloudRadius: 1.045,
  /* 1.09: sat be mat de quang sang doc thanh khi quyen. De xa hon (~1.14)
     se ho ra mot vanh toi giua ria Trai Dat va quang sang -> nhin nhu qua
     cau thuy tinh chu khong phai khi quyen. */
  atmoRadius: 1.09,
  segments: { desktop: 96, mobile: 48 },
} as const;

/**
 * Toc do xoay, don vi radian/giay.
 * DUONG = nguoc chieu kim dong ho khi nhin tu cuc Bac (dung chieu Trai Dat that).
 *
 * Tham chieu o be rong globe 880px, diem tren duong ria:
 *   0.028 rad/s = 1.6 do/giay = ~12 px/giay  -> thay ro nhung van diu
 *   1 vong tron = ~224 giay (3.7 phut)
 * Duoi 0.015 thi mat thuong gan nhu khong nhan ra la dang xoay.
 */
export const ROTATION = {
  earth: 0.028,
  /** AM = xoay nguoc lai lop 1-2-3 */
  clouds: -0.018,
  tiltDeg: 23.5,
} as const;

export const MOTION = {
  /**
   * He so toc do khi nguoi dung bat "giam chuyen dong" o cap he dieu hanh
   * (Windows: Settings > Accessibility > Visual effects > Animation effects).
   *
   * De 0 la DUNG HAN - dung ve mat a11y nhung nguy hiem khi demo: may nao
   * tat animation la qua cau dung im, trong nhu hong. Dung 0.35 vi day chi
   * la chuyen dong trang tri cham, khong nhap nhay / khong parallax / khong
   * cuop scroll - tuc khong thuoc nhom gay chong mat ma WCAG nham toi.
   */
  reducedMotionFactor: 0.35,
} as const;

export const MATERIAL = {
  /** >0.06 la lo gia o ria qua cau */
  bumpScale: 0.035,
  /** Nhan voi roughnessMap (2.png): trang=dat=nham, den=bien=it nham hon */
  roughnessBase: 1.0,
  /**
   * 0 = TAT HAN phan chieu kim loai.
   * Bat ky gia tri > 0 nao cung sinh dom sang mat troi choi loi giua bien.
   * Cung voi san nham 0.75 trong optimize-globe-textures.mjs, be mat gio
   * chi con khuech tan thuan - van giu ranh gioi ngay/dem, khong con loa.
   */
  metalness: 0,
  cloudOpacity: 0.85,
  cloudTint: '#e8f2ff',
  /** May trong 4.png kha xin -> nhan sang len */
  cloudBoost: 1.35,
} as const;

export const ATMOSPHERE = {
  /**
   * TAT: yeu cau la qua cau tach nen 100%, chi con dung 4 lop texture,
   * khong quang sang / khong blur vien. Bat lai bang cach doi thanh true.
   */
  enabled: false,
  color: '#7ab8ff',
  /** Cang cao vanh sang cang mong */
  power: 3.2,
  intensity: 1.25,
} as const;

/**
 * Camera phai du xa de lop NGOAI CUNG dang bat khong bi xen:
 *   asin(banKinhNgoaiCung / z) < fov / 2
 *
 * Khi tat ATMOSPHERE, lop ngoai cung la may (1.045):
 *   asin(1.045 / 3.0) = 20.4 < 21  -> qua cau chiem ~97% khung, gan sat mep.
 * Neu bat lai ATMOSPHERE (1.09) thi PHAI keo z len >= 3.25, khong thi
 * vanh sang bi cat cut.
 */
export const CAMERA = {
  position: [0, 0, 3.0] as [number, number, number],
  fov: 42,
} as const;
