// src/components/home/Hero/RightVisual/Globe3D/GlobeLighting.tsx
'use client';

export default function GlobeLighting() {
  return (
    <>
      {/*
        Nen. Ha xuong 0.2 de vung bong o goc duoi-trai chim sau, dung nhu
        anh mau goble-3d.png. De cao hon thi bong bi "bet", mat cam giac khoi.
      */}
      <ambientLight intensity={0.2} color="#bfdbfe" />

      {/*
        Key light = mat troi, dat o goc TREN - PHAI - TRUOC.
        Huong nay lam mang sang do vao Bac My (trung tam) va man phai, day
        bong do cheo xuong goc duoi-trai — khop anh mau.
        Truoc day key nam ben trai [-3.2, 1.8, 4.2] nen bong do nguoc sang phai.
      */}
      <directionalLight position={[4.5, 2.5, 3.5]} intensity={2.5} color="#ffffff" />

      {/*
        Fill rat nhe tu sau-trai. Trong anh mau, phia bong gan nhu toi han va
        KHONG co vien sang, nen den nay chi de ria khong den kit chu khong
        duoc tao thanh vanh. Truoc day no o ben phai (3.5) — cung phia voi
        key moi nen se lam chay sang, phai doi sang trai.
      */}
      <directionalLight position={[-3.0, -1.2, -2.0]} intensity={0.25} color="#7ab8ff" />
    </>
  );
}
