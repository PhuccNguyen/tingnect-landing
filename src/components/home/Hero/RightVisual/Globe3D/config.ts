// src/components/home/Hero/RightVisual/Globe3D/config.ts
//
// Bang dieu khien duy nhat cua Globe3D. Moi con so tinh chinh nam o day
// de khong phai mo tung component khi can chinh visual.

/** Duong dan texture da toi uu - sinh boi scripts/optimize-globe-textures.mjs */
export const TEXTURES = {
  /** Mau goc, khong giam bao hoa. */
  surface: '/textures/globe/earth-surface.webp',
  landMask: '/textures/globe/earth-landmask.webp',
  elevation: '/textures/globe/earth-elevation.webp',
  clouds: '/textures/globe/earth-clouds.webp',
} as const;

export const GEOMETRY = {
  earthRadius: 1.0,
  /**
   * 1.075 — may bay LO LUNG cach be mat, tao chieu sau 3D khi xoay.
   * PHAI lon hon (earthRadius + displacementScale = 1.05), neu khong dinh nui
   * se dam xuyen qua lop may.
   * Vanh "diem" truoc day khong phai do ban kinh ma do AdditiveBlending —
   * da sua o CloudLayer nen gio nang len thoai mai.
   */
  cloudRadius: 1.045,
  /* 1.09: sat be mat de quang sang doc thanh khi quyen. De xa hon (~1.14)
     se ho ra mot vanh toi giua ria Trai Dat va quang sang -> nhin nhu qua
     cau thuy tinh chu khong phai khi quyen. */
  atmoRadius: 1.12,
  /**
   * Displacement can luoi DAY moi hien duoc nui: moi dinh nui la mot vertex.
   * 96 segment (~4.6k quad) qua tho, dinh nui bi bo tron mat. 256 = 32k quad
   * = 65k tam giac, van rat nhe voi GPU.
   */
  segments: { desktop: 256, mobile: 128 },
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
  /**
   * DISPLACEMENT — day vertex ra ngoai theo do cao, tao nui THAT.
   * Khac han bumpMap: bump chi danh lua anh sang, silhouette van tron tuyet
   * doi. Displacement lam bien dang hinh hoc nen khi xoay, nui hien ro go
   * ghe o duong ria.
   *
   * 0.035 = 3.5% ban kinh. Nghe qua thi cuong dieu (Everest that chi bang
   * 0.14% ban kinh Trai Dat, o ti le that se hoan toan vo hinh), nhung day
   * la qua dia cau phong cach hoa nen phai phong dai moi thay.
   */
  displacementScale: 0.035,
  /** Bump giu lai de tao chi tiet anh sang nho hon buoc luoi displacement */
  bumpScale: 0.025,
  /** Nhan voi roughnessMap (2.png): trang=dat=nham, den=bien=it nham hon */
  roughnessBase: 1.0,
  /**
   * 0 = TAT HAN phan chieu kim loai.
   * Bat ky gia tri > 0 nao cung sinh dom sang mat troi choi loi giua bien.
   * Cung voi san nham 0.75 trong optimize-globe-textures.mjs, be mat gio
   * chi con khuech tan thuan - van giu ranh gioi ngay/dem, khong con loa.
   */
  metalness: 0,
  cloudOpacity: 0.72,
  cloudTint: '#ffffff',
  /**
   * 1.0 = khong nhan sang.
   * He so >1 chi co y nghia voi AdditiveBlending (nen toi). Da chuyen
   * CloudLayer sang NormalBlending de may hien duoc tren MOI mau nen,
   * luc do nhan sang qua 1.0 se lam may bi chay trang.
   */
  cloudBoost: 1.0,
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
 * Khi tat ATMOSPHERE, lop ngoai cung la may (1.075):
 *   asin(1.075 / 3.15) = 19.9 < 21  -> vua khit, con vien ~5%.
 * Neu bat lai ATMOSPHERE (1.09) thi PHAI keo z len >= 3.25, khong thi
 * vanh sang bi cat cut.
 */
export const CAMERA = {
  position: [0, 0, 3.05] as [number, number, number],
  fov: 42,
} as const;
