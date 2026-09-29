import * as THREE from 'three';

export class ParticleBackground {
  constructor(scene) {
    this.scene = scene;
    this.particleCount = 300;
    this.init();
  }

  init() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const scales = new Float32Array(this.particleCount);

    // Warm luxury dark-brown & golden-amber palette
    const colorPalette = [
      new THREE.Color(0xf59e0b), // Amber gold
      new THREE.Color(0xd97706), // Bronze
      new THREE.Color(0xb45309), // Copper
      new THREE.Color(0xfde68a), // Champagne
      new THREE.Color(0x8c6b54), // Warm mocha
    ];

    for (let i = 0; i < this.particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      scales[i] = Math.random() * 1.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft warm circle texture via canvas
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(254, 243, 199, 0.95)');
    grad.addColorStop(0.35, 'rgba(217, 119, 6, 0.45)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.22,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  update(delta, mouseX, mouseY) {
    if (!this.points) return;
    this.points.rotation.y += delta * 0.012;
    this.points.rotation.x += delta * 0.006;

    this.points.position.x += (mouseX * 1.2 - this.points.position.x) * 0.03;
    this.points.position.y += (-mouseY * 1.2 - this.points.position.y) * 0.03;
  }
}
