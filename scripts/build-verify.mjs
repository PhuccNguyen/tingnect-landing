// scripts/build-verify.mjs
//
// Chay `next build` vao thu muc RIENG (.next-verify) de kiem tra build
// ma KHONG dung cham .next cua dev server dang chay.
//
//   npm run build:verify
//
// Ly do ton tai: `next dev` va `next build` mac dinh cung ghi vao .next.
// Neu chay build trong luc dev dang chay, ban build se xoa cac chunk ma
// dev server con giu tham chieu -> "Cannot find module './985.js'" va
// moi route tra ve 500. Phai xoa .next roi khoi dong lai moi het.
//
// Dung `npm run build` cho deploy that (ghi vao .next nhu binh thuong),
// dung `npm run build:verify` khi chi muon kiem tra build con pass khong.

import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['next', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NEXT_DIST_DIR: '.next-verify' },
});

process.exit(result.status ?? 1);
