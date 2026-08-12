// src/components/home/Hero/RightVisual/Globe3D/GlobeLighting.tsx
'use client';

export default function GlobeLighting() {
  return (
    <>
      {/* Nen: ban cau toi van doc duoc hinh, am xanh cho khop palette Hero */}
      <ambientLight intensity={0.35} color="#bfdbfe" />

      {/* Key light = mat troi. Tu trai-tren-truoc, tao terminator (ranh gioi
          ngay/dem) chay cheo qua qua cau -> cam giac khoi 3D ro nhat. */}
      <directionalLight position={[-3.2, 1.8, 4.2]} intensity={2.2} color="#ffffff" />

      {/* Rim light phia sau-phai: tach qua cau khoi nen, an khop voi vanh Fresnel */}
      <directionalLight position={[3.5, -0.8, -2.5]} intensity={0.55} color="#7ab8ff" />
    </>
  );
}
