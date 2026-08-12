// src/components/home/Hero/RightVisual/Globe3D/shaders/atmosphere.ts
//
// Fresnel rim glow - vanh sang quanh qua cau, giong nhin Trai Dat tu vu tru.

export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    // Mesh nay render voi side = BackSide, tuc la ta thay mat trong cua vo cau
    // nen normal huong RA XA camera. Phai dao lai, neu khong dot() se am va
    // glow loang khap qua cau thay vi chi o vanh.
    vec3 normalDir = normalize(-vNormal);
    vec3 viewDir = normalize(-vViewPosition);

    // Ria qua cau: be mat gan song song huong nhin -> dot ~ 0 -> rim ~ 1
    // Tam qua cau: dot ~ 1 -> rim ~ 0
    float rim = 1.0 - max(dot(viewDir, normalDir), 0.0);
    rim = pow(rim, uPower) * uIntensity;

    gl_FragColor = vec4(uColor * rim, rim);
  }
`;
