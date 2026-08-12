// scripts/optimize-brand-logos.mjs
//
// Sinh cac bien the logo Yaa Club o kich thuoc dung duoc cho web.
//
//   node scripts/optimize-brand-logos.mjs
//
// Anh goc trong public/Image/Logo/ o kich thuoc in an (7117x3335 cho lockup
// ngang). Header chi cao ~40px nen serve anh goc la lang phi bang thong va
// bat trinh duyet decode mot bitmap 24 megapixel moi lan load trang.
//
// Chieu cao lon nhat logo duoc dung tren site la ~56px, nhan 3 cho man hinh
// retina 3x = 168px. Xuat o 340px chieu cao la thua headroom.

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

const SRC = 'public/Image/Logo';
const OUT = 'public/brand/logo';

// WebP giu duoc alpha channel (anh goc la colorType 6 = RGBA).
const JOBS = [
  { src: 'yaa-lockup-horizontal.png', out: 'lockup-horizontal.webp', h: 340 },
  { src: 'yaa-lockup-horizontal-cream.png', out: 'lockup-horizontal-cream.webp', h: 340 },
  { src: 'yaa-lockup-vertical.png', out: 'lockup-vertical.webp', h: 560 },
  { src: 'yaa-lockup-vertical-cream.png', out: 'lockup-vertical-cream.webp', h: 560 },
  { src: 'yaa-lockup-vertical-lime.png', out: 'lockup-vertical-lime.webp', h: 560 },
  { src: 'yaa-icon.png', out: 'icon.webp', h: 512 },
  { src: 'yaa-icon-cream.png', out: 'icon-cream.webp', h: 512 },
  // PNG cho favicon / manifest / og-image: cac noi khong chac ho tro WebP
  { src: 'yaa-icon.png', out: 'icon-512.png', h: 512, format: 'png' },
  { src: 'yaa-icon-cream.png', out: 'icon-cream-512.png', h: 512, format: 'png' },
];

await mkdir(OUT, { recursive: true });

let before = 0;
let after = 0;
const seen = new Set();

for (const job of JOBS) {
  if (!seen.has(job.src)) {
    before += (await stat(`${SRC}/${job.src}`)).size;
    seen.add(job.src);
  }

  const pipeline = sharp(`${SRC}/${job.src}`)
    // null = tu tinh chieu rong theo ti le goc
    .resize({ height: job.h, width: null, fit: 'inside', kernel: 'lanczos3' });

  await (job.format === 'png'
    ? pipeline.png({ compressionLevel: 9, palette: true })
    : pipeline.webp({ quality: 92, effort: 6, alphaQuality: 100 })
  ).toFile(`${OUT}/${job.out}`);

  const meta = await sharp(`${OUT}/${job.out}`).metadata();
  const size = (await stat(`${OUT}/${job.out}`)).size;
  after += size;

  console.log(
    `${job.out.padEnd(32)} ${`${meta.width}x${meta.height}`.padEnd(11)} ${(size / 1024).toFixed(1)} KB`
  );
}

console.log(
  `\nNguon: ${(before / 1024).toFixed(0)} KB (7 file) -> Xuat: ${(after / 1024).toFixed(0)} KB (${JOBS.length} file)`
);
