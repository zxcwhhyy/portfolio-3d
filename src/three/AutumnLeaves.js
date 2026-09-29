import * as THREE from 'three';

export class AutumnLeaves {
  constructor(scene) {
    this.scene = scene;
    this.count = 95; // Number of autumn leaves
    this.clock = new THREE.Clock();

    this.init();
  }

  createLeafTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 128, 128);

    // Draw stylized curved autumn leaf shape
    ctx.save();
    ctx.translate(64, 64);

    // Leaf path
    ctx.beginPath();
    ctx.moveTo(0, -56); // Leaf tip
    // Right lobe
    ctx.bezierCurveTo(36, -38, 52, -10, 48, 22);
    ctx.bezierCurveTo(44, 46, 20, 54, 0, 58); // Base
    // Left lobe
    ctx.bezierCurveTo(-20, 54, -44, 46, -48, 22);
    ctx.bezierCurveTo(-52, -10, -36, -38, 0, -56);
    ctx.closePath();

    // Fill with soft gradient
    const grad = ctx.createRadialGradient(0, 0, 8, 0, 0, 55);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.75, 'rgba(240, 240, 240, 0.85)');
    grad.addColorStop(1, 'rgba(200, 200, 200, 0.4)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Central vein & lateral veins for organic autumn texture
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, -52);
    ctx.lineTo(0, 56);
    ctx.stroke();

    // Lateral veins
    ctx.lineWidth = 1.2;
    const sideVeins = [-30, -12, 8, 28];
    sideVeins.forEach(y => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(24, y - 12);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(-24, y - 12);
      ctx.stroke();
    });

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  init() {
    // 3D curved leaf geometry
    const width = 0.38;
    const height = 0.46;
    const geo = new THREE.PlaneGeometry(width, height, 4, 4);

    // Natural 3D crease / curve along spine
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distFromSpine = Math.abs(x) / (width * 0.5);
      // Curl sides upward slightly like a dry leaf
      const curl = Math.pow(distFromSpine, 2) * 0.05 - Math.sin((y / height + 0.5) * Math.PI) * 0.04;
      pos.setZ(i, curl);
    }
    geo.computeVertexNormals();

    // Translucent autumn leaf material
    const texture = this.createLeafTexture();
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      alphaMap: texture,
      transparent: true,
      roughness: 0.5,
      metalness: 0.15,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.instancedMesh = new THREE.InstancedMesh(geo, mat, this.count);

    // Autumn color palette (russet, terracotta, amber gold, warm chestnut, burnt sienna)
    const autumnPalette = [
      new THREE.Color(0xf59e0b), // Amber gold
      new THREE.Color(0xd97706), // Warm bronze
      new THREE.Color(0xea580c), // Burnt orange
      new THREE.Color(0xc2410c), // Deep terracotta
      new THREE.Color(0x9a3412), // Russet
      new THREE.Color(0x78350f), // Warm chestnut
      new THREE.Color(0xb45309), // Copper
      new THREE.Color(0xeab308), // Golden ochre
      new THREE.Color(0x991b1b), // Deep crimson fall
    ];

    this.leafData = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < this.count; i++) {
      // Random position distributed in 3D volume around scene
      const x = (Math.random() - 0.5) * 22;
      const y = Math.random() * 12 - 4; // Spread vertically
      const z = (Math.random() - 0.5) * 16;

      const scale = 0.65 + Math.random() * 0.65;

      // Color
      const color = autumnPalette[Math.floor(Math.random() * autumnPalette.length)];
      this.instancedMesh.setColorAt(i, color);

      this.leafData.push({
        pos: new THREE.Vector3(x, y, z),
        scale: scale,
        // Individual aerodynamic parameters for tumbling motion
        fallSpeed: 0.35 + Math.random() * 0.45,
        swaySpeedX: 1.2 + Math.random() * 1.5,
        swaySpeedZ: 0.9 + Math.random() * 1.2,
        swayAmplitudeX: 0.25 + Math.random() * 0.4,
        swayAmplitudeZ: 0.15 + Math.random() * 0.3,
        rotSpeedX: (Math.random() - 0.5) * 2.2,
        rotSpeedY: (Math.random() - 0.5) * 2.8,
        rotSpeedZ: (Math.random() - 0.5) * 2.0,
        phase: Math.random() * Math.PI * 2,
        rot: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        )
      });

      dummy.position.set(x, y, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      this.instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
    }

    this.scene.add(this.instancedMesh);
  }

  update(delta, mouseX, mouseY) {
    if (!this.instancedMesh) return;
    const time = this.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    // Wind breeze influence from cursor movement
    const windBreezeX = mouseX * 0.8;
    const windBreezeZ = -mouseY * 0.5;

    for (let i = 0; i < this.count; i++) {
      const data = this.leafData[i];

      // Fall downwards with gentle gravity
      data.pos.y -= data.fallSpeed * delta;

      // Fluttering horizontal sway (pendulum aerodynamics of a falling leaf)
      const swayX = Math.sin(time * data.swaySpeedX + data.phase) * data.swayAmplitudeX * delta * 2.5;
      const swayZ = Math.cos(time * data.swaySpeedZ + data.phase) * data.swayAmplitudeZ * delta * 2.0;

      data.pos.x += swayX + windBreezeX * delta * 0.6;
      data.pos.z += swayZ + windBreezeZ * delta * 0.6;

      // 3D Tumbling rotations
      data.rot.x += data.rotSpeedX * delta;
      data.rot.y += data.rotSpeedY * delta;
      data.rot.z += Math.sin(time * data.swaySpeedX + data.phase) * 1.5 * delta;

      // Loop back to top when falling below screen
      if (data.pos.y < -4.5) {
        data.pos.y = 7.5 + Math.random() * 2.5;
        data.pos.x = (Math.random() - 0.5) * 22;
        data.pos.z = (Math.random() - 0.5) * 16;
      }

      dummy.position.copy(data.pos);
      dummy.rotation.copy(data.rot);
      dummy.scale.set(data.scale, data.scale, data.scale);
      dummy.updateMatrix();

      this.instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
  }
}
