// scripts/optimize-globe-textures.mjs
//
// Nen 4 anh equirectangular goc (3548x1774 PNG, ~7.2 MB) thanh WebP nhe hon
// cho Globe3D trong Hero.
//
//   node scripts/optimize-globe-textures.mjs
//
// Chay lai bat cu luc nao khi anh nguon thay doi. Output ghi de.

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

const SRC = 'public/Image/MapYaaClubWeb';
const OUT = 'public/textures/globe';

// fit:'fill' ep dung ti le 2:1 - bat buoc voi equirectangular.
// Nguon 3548x1774 = 2.0002:1 nen bien dang ~0.01%, mat khong thay.
//
// gray:true chi ap cho cac map DU LIEU: three doc kenh green cua
// roughnessMap/bumpMap/alphaMap, ma anh xam thi R=G=B -> khong mat mat gi.
//
// linear(a, b) ap cong thuc out = a*in + b tren thang 0-255.
// Rieng landmask: 2.png co bien = 0 tuyet doi, dung lam roughnessMap thi
// roughness=0 -> specular co lai thanh dom trang chay giua bien.
// Nen ep dai gia tri ve [191, 255] = roughness [0.75, 1.0]:
//   bien 0.75 -> khong con dom nang, chi con sac thai rat nhe so voi dat
//   dat  1.00 -> nham hoan toan
// Muon lay lai anh nang lap lanh tren bien thi ha 191 xuong (vd 64 = 0.25).
const JOBS = [
  { src: '1.png', out: 'earth-surface.webp', w: 2048, h: 1024, q: 82, gray: false },
  { src: '2.png', out: 'earth-landmask.webp', w: 1024, h: 512, q: 80, gray: true, linear: [0.25, 191] },
  { src: '3.png', out: 'earth-elevation.webp', w: 2048, h: 1024, q: 82, gray: true },
  { src: '4.png', out: 'earth-clouds.webp', w: 1024, h: 512, q: 82, gray: true },
];

await mkdir(OUT, { recursive: true });

let before = 0;
let after = 0;

for (const job of JOBS) {
  before += (await stat(`${SRC}/${job.src}`)).size;

  let pipeline = sharp(`${SRC}/${job.src}`).resize(job.w, job.h, {
    fit: 'fill',
    kernel: 'lanczos3',
  });
  if (job.gray) pipeline = pipeline.grayscale();
  if (job.linear) pipeline = pipeline.linear(job.linear[0], job.linear[1]);

  await pipeline.webp({ quality: job.q, effort: 6 }).toFile(`${OUT}/${job.out}`);

  const size = (await stat(`${OUT}/${job.out}`)).size;
  after += size;
  console.log(
    `${job.src.padEnd(6)} -> ${job.out.padEnd(22)} ${`${job.w}x${job.h}`.padEnd(10)} ${(size / 1024).toFixed(0)} KB`
  );
}

console.log(
  `\nTong: ${(before / 1048576).toFixed(2)} MB -> ${(after / 1024).toFixed(0)} KB ` +
    `(giam ${(100 - (after / before) * 100).toFixed(1)}%)`
);
