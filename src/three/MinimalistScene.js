import * as THREE from 'three';

export class MinimalistScene {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    this.modelsGroup = new THREE.Group();
    this.modelsGroup.position.set(2.2, 0.2, 0); // Framed on right side of screen

    // Build the web development 3D models
    this.buildLaptop();
    this.buildBrowserWindow();
    this.buildDatabase();
    this.buildTechAtom();
    this.buildDataConnections();

    this.buildWaveGrid();
    this.buildLighting();

    this.group.add(this.modelsGroup);
    this.scene.add(this.group);
  }

  // ==============================================================
  // 1. Sleek 3D Laptop (Web Developer Machine)
  // ==============================================================
  buildLaptop() {
    this.laptopGroup = new THREE.Group();
    this.laptopGroup.position.set(-0.2, -0.3, 0.4);
    this.laptopGroup.rotation.set(0.2, -0.4, 0.05);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1a120c,
      roughness: 0.25,
      metalness: 0.9,
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xe0a96d,
      transparent: true,
      opacity: 0.5,
    });

    // Laptop Base Chassis
    const baseGeo = new THREE.BoxGeometry(1.65, 0.05, 1.15);
    const baseMesh = new THREE.Mesh(baseGeo, metalMat);
    const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), edgeMat);
    baseMesh.add(baseEdges);
    this.laptopGroup.add(baseMesh);

    // Keyboard recess & keys
    const kbGeo = new THREE.BoxGeometry(1.45, 0.015, 0.65);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x110b07, roughness: 0.6 });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, 0.026, -0.12);
    this.laptopGroup.add(kbMesh);

    // Trackpad
    const padGeo = new THREE.BoxGeometry(0.55, 0.01, 0.35);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x241810, roughness: 0.4, metalness: 0.8 });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.position.set(0, 0.026, 0.32);
    this.laptopGroup.add(padMesh);

    // Laptop Screen Lid (Angled at ~115 degrees)
    this.screenLid = new THREE.Group();
    this.screenLid.position.set(0, 0.025, -0.575);
    this.screenLid.rotation.x = -Math.PI / 2 + 0.42; // ~115 deg open

    const lidGeo = new THREE.BoxGeometry(1.65, 1.15, 0.035);
    const lidMesh = new THREE.Mesh(lidGeo, metalMat);
    lidMesh.position.set(0, 0.575, 0);
    const lidEdges = new THREE.LineSegments(new THREE.EdgesGeometry(lidGeo), edgeMat);
    lidMesh.add(lidEdges);
    this.screenLid.add(lidMesh);

    // Screen Display Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    // IDE Dark Background
    ctx.fillStyle = '#0f0a07';
    ctx.fillRect(0, 0, 512, 360);

    // Titlebar
    ctx.fillStyle = '#1c130d';
    ctx.fillRect(0, 0, 512, 28);
    // Dots
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(16, 14, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(32, 14, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(48, 14, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d4b79f'; ctx.font = '12px monospace';
    ctx.fillText('App.tsx — Web Engine', 75, 18);

    // Code lines with syntax colors
    ctx.font = '14px "Fira Code", monospace';
    const lines = [
      { text: "import { React, ThreeJS } from 'web';", col: "#d97706" },
      { text: "const app = new WebApplication({", col: "#fde68a" },
      { text: "  developer: 'Ilya (whhyy.dev)',", col: "#f59e0b" },
      { text: "  stack: ['Fullstack', 'WebGL', 'API'],", col: "#ecdcce" },
      { text: "  status: 'Deployed & 60 FPS'", col: "#34d399" },
      { text: "});", col: "#fde68a" },
      { text: "", col: "#ffffff" },
      { text: "await app.renderInteractiveWorld();", col: "#f59e0b" },
      { text: "// ✦ System online: Ready for projects", col: "#785340" }
    ];

    let y = 60;
    lines.forEach((l, idx) => {
      ctx.fillStyle = '#5c4637';
      ctx.fillText((idx + 1).toString().padStart(2, '0'), 15, y);
      ctx.fillStyle = l.col;
      ctx.fillText(l.text, 45, y);
      y += 24;
    });

    const screenTexture = new THREE.CanvasTexture(canvas);
    const screenGeo = new THREE.PlaneGeometry(1.55, 1.05);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.575, 0.019);
    this.screenLid.add(screenMesh);

    this.laptopGroup.add(this.screenLid);
    this.modelsGroup.add(this.laptopGroup);
  }

  // ==============================================================
  // 2. 3D Floating Web Browser Window
  // ==============================================================
  buildBrowserWindow() {
    this.browserGroup = new THREE.Group();
    this.browserGroup.position.set(0.65, 1.15, -0.35);
    this.browserGroup.rotation.set(-0.1, 0.25, -0.05);

    // Frosted Glass Window Frame
    const winGeo = new THREE.BoxGeometry(1.6, 1.1, 0.03);
    const winMat = new THREE.MeshPhysicalMaterial({
      color: 0x1b130e,
      transparent: true,
      opacity: 0.82,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
    });
    const winMesh = new THREE.Mesh(winGeo, winMat);

    const winEdgeMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 });
    const winEdges = new THREE.LineSegments(new THREE.EdgesGeometry(winGeo), winEdgeMat);
    winMesh.add(winEdges);
    this.browserGroup.add(winMesh);

    // Browser Canvas Content
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 352;
    const ctx = canvas.getContext('2d');

    // Titlebar
    ctx.fillStyle = 'rgba(28, 19, 13, 0.95)';
    ctx.fillRect(0, 0, 512, 45);

    // Window control buttons
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(20, 22, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(40, 22, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(60, 22, 6, 0, Math.PI * 2); ctx.fill();

    // URL address bar
    ctx.fillStyle = 'rgba(46, 32, 22, 0.85)';
    ctx.roundRect(85, 10, 340, 26, [6]);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.font = '12px monospace';
    ctx.fillText('🔒 https://whhyy.dev', 100, 27);

    // Web Page Layout Mockup inside browser
    // Hero Banner
    ctx.fillStyle = 'rgba(217, 119, 6, 0.18)';
    ctx.roundRect(24, 65, 464, 90, [8]);
    ctx.fill();

    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Modern Web Application', 44, 102);
    ctx.fillStyle = '#b89479';
    ctx.font = '12px sans-serif';
    ctx.fillText('Built with React, Three.js & Node.js Architecture', 44, 126);

    // 3 Content Cards inside layout
    const cardColors = ['rgba(245, 158, 11, 0.2)', 'rgba(180, 83, 9, 0.2)', 'rgba(212, 163, 115, 0.18)'];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = cardColors[i];
      ctx.roundRect(24 + i * 160, 175, 144, 140, [8]);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(40 + i * 160, 195, 45, 8);
      ctx.fillStyle = '#785340';
      ctx.fillRect(40 + i * 160, 215, 85, 5);
      ctx.fillRect(40 + i * 160, 227, 70, 5);
    }

    const browserTexture = new THREE.CanvasTexture(canvas);
    const planeGeo = new THREE.PlaneGeometry(1.52, 1.02);
    const planeMat = new THREE.MeshBasicMaterial({ map: browserTexture, transparent: true });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.position.set(0, 0, 0.018);
    this.browserGroup.add(planeMesh);

    this.modelsGroup.add(this.browserGroup);
  }

  // ==============================================================
  // 3. 3D Database Server Node (Backend & Database Stack)
  // ==============================================================
  buildDatabase() {
    this.dbGroup = new THREE.Group();
    this.dbGroup.position.set(-1.1, 0.85, -0.2);
    this.dbGroup.rotation.set(0.15, 0.35, -0.1);

    const discMat = new THREE.MeshStandardMaterial({
      color: 0x22160f,
      roughness: 0.2,
      metalness: 0.9,
    });

    const discEdgeMat = new THREE.LineBasicMaterial({ color: 0xd4a373, transparent: true, opacity: 0.6 });

    // 3 Stacked database discs
    this.discs = [];
    const discRadius = 0.42;
    const discHeight = 0.18;

    for (let i = 0; i < 3; i++) {
      const discGroup = new THREE.Group();
      discGroup.position.y = (i - 1) * 0.28;

      const cylGeo = new THREE.CylinderGeometry(discRadius, discRadius, discHeight, 32);
      const cylMesh = new THREE.Mesh(cylGeo, discMat);
      const cylEdges = new THREE.LineSegments(new THREE.EdgesGeometry(cylGeo, 30), discEdgeMat);
      cylMesh.add(cylEdges);
      discGroup.add(cylMesh);

      // Glowing Data Activity Ring between discs
      const ringGeo = new THREE.TorusGeometry(discRadius + 0.015, 0.012, 16, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: i === 1 ? 0xf59e0b : 0xd97706 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      discGroup.add(ringMesh);

      // Front Activity LED
      const ledGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const ledMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0x10b981 : 0xf59e0b });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0, 0, discRadius + 0.01);
      discGroup.add(ledMesh);

      this.dbGroup.add(discGroup);
      this.discs.push(discGroup);
    }

    this.modelsGroup.add(this.dbGroup);
  }

  // ==============================================================
  // 4. 3D Web Technology Atom (React / Three.js Core)
  // ==============================================================
  buildTechAtom() {
    this.atomGroup = new THREE.Group();
    this.atomGroup.position.set(1.15, -0.65, 0.25);

    // Glowing Central Core
    const coreGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
    });
    this.atomCore = new THREE.Mesh(coreGeo, coreMat);
    this.atomGroup.add(this.atomCore);

    // 3 Intersecting Orbital Rings
    this.atomRings = [];
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe0a96d, transparent: true, opacity: 0.65 });
    const ringRadius = 0.52;
    const ringThickness = 0.009;

    const ringGeo = new THREE.TorusGeometry(ringRadius, ringThickness, 16, 64);

    const angles = [0, Math.PI / 3, -Math.PI / 3];
    angles.forEach((angle, idx) => {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.3;
      ring.rotation.y = angle;
      this.atomGroup.add(ring);
      this.atomRings.push(ring);

      // Tiny orbiting data electrons
      const electronGeo = new THREE.SphereGeometry(0.028, 8, 8);
      const electronMat = new THREE.MeshBasicMaterial({ color: 0xfde68a });
      const electron = new THREE.Mesh(electronGeo, electronMat);
      electron.position.set(ringRadius, 0, 0);
      ring.add(electron);
    });

    this.modelsGroup.add(this.atomGroup);
  }

  // ==============================================================
  // 5. Data Flow Connection Beams
  // ==============================================================
  buildDataConnections() {
    this.beamGroup = new THREE.Group();

    // Curve connecting Database to Laptop
    const curve1 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.1, 0.85, -0.2),
      new THREE.Vector3(-0.9, 0.2, 0.1),
      new THREE.Vector3(-0.2, -0.1, 0.4)
    );

    // Curve connecting Laptop to Browser
    const curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.2, 0.1, 0.4),
      new THREE.Vector3(0.2, 0.6, 0.1),
      new THREE.Vector3(0.65, 1.15, -0.35)
    );

    const lineMat = new THREE.LineDashedMaterial({
      color: 0xf59e0b,
      dashSize: 0.12,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.4,
    });

    [curve1, curve2].forEach(curve => {
      const points = curve.getPoints(30);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, lineMat);
      line.computeLineDistances();
      this.beamGroup.add(line);
    });

    this.modelsGroup.add(this.beamGroup);
  }

  buildWaveGrid() {
    const width = 45;
    const height = 45;
    const segments = 45;
    this.gridGeo = new THREE.PlaneGeometry(width, height, segments, segments);
    this.gridGeo.rotateX(-Math.PI / 2);

    const pos = this.gridGeo.attributes.position;
    this.baseYPositions = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      this.baseYPositions[i] = pos.getY(i);
    }

    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x2e1e15,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });

    this.gridMesh = new THREE.Mesh(this.gridGeo, gridMat);
    this.gridMesh.position.set(0, -3.2, 0);
    this.group.add(this.gridMesh);
  }

  buildLighting() {
    const ambient = new THREE.AmbientLight(0x241812, 1.9);
    this.group.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    keyLight.position.set(5, 8, 6);
    this.group.add(keyLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2.5, 15);
    amberLight.position.set(1.5, 1.2, 2.5);
    this.group.add(amberLight);

    const rimLight = new THREE.PointLight(0xb45309, 1.6, 12);
    rimLight.position.set(-3, 1, -2);
    this.group.add(rimLight);
  }

  update(delta, mouseX, mouseY) {
    const time = this.clock.getElapsedTime();

    // 1. Laptop gentle float & screen pulse
    if (this.laptopGroup) {
      this.laptopGroup.position.y = -0.3 + Math.sin(time * 0.9) * 0.08;
      this.laptopGroup.rotation.y = -0.4 + Math.sin(time * 0.5) * 0.06;
    }

    // 2. Browser window float
    if (this.browserGroup) {
      this.browserGroup.position.y = 1.15 + Math.sin(time * 1.1 + 1.2) * 0.09;
      this.browserGroup.rotation.x = -0.1 + Math.cos(time * 0.6) * 0.04;
    }

    // 3. Database server rotation & disc pulse
    if (this.dbGroup) {
      this.dbGroup.rotation.y += delta * 0.25;
      this.dbGroup.position.y = 0.85 + Math.sin(time * 0.8 + 2.0) * 0.07;
    }

    // 4. React / Tech Atom orbital spins
    if (this.atomGroup) {
      this.atomGroup.rotation.y += delta * 0.6;
      this.atomGroup.rotation.z += delta * 0.3;
      this.atomGroup.position.y = -0.65 + Math.sin(time * 1.3 + 0.5) * 0.08;
    }

    // 5. Entire models group responsive parallax to cursor
    if (this.modelsGroup) {
      this.modelsGroup.rotation.y = mouseX * 0.25;
      this.modelsGroup.rotation.x = -mouseY * 0.18;
    }

    // 6. Terrain Wave Grid
    if (this.gridGeo) {
      const pos = this.gridGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getZ(i);
        const wave = Math.sin(u * 0.25 + time * 0.8) * Math.cos(v * 0.25 + time * 0.6) * 0.45;
        pos.setY(i, this.baseYPositions[i] + wave);
      }
      this.gridGeo.attributes.position.needsUpdate = true;
    }
  }
}
