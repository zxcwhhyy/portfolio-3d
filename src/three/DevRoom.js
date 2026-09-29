import * as THREE from 'three';

export class DevRoom {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.interactiveObjects = [];
    this.clock = new THREE.Clock();

    // Textures for screens
    this.screenCanvas = document.createElement('canvas');
    this.screenCanvas.width = 1024;
    this.screenCanvas.height = 512;
    this.screenCtx = this.screenCanvas.getContext('2d');
    this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);

    this.vertScreenCanvas = document.createElement('canvas');
    this.vertScreenCanvas.width = 512;
    this.vertScreenCanvas.height = 1024;
    this.vertScreenCtx = this.vertScreenCanvas.getContext('2d');
    this.vertScreenTexture = new THREE.CanvasTexture(this.vertScreenCanvas);

    this.codeLines = [
      "const developer = new WebDeveloper({",
      "  name: 'Ilya (whhyy.dev)',",
      "  passion: ['Three.js', 'React', 'TypeScript'],",
      "  status: 'Building the future of the Web',",
      "  performance: '60 FPS Guaranteed'",
      "});",
      "",
      "async function renderDreamProject() {",
      "  const scene = new 3DScene({",
      "    atmosphere: 'Cyberpunk & Futuristic',",
      "    quality: 'Ultra HD'",
      "  });",
      "  await scene.compileShaders();",
      "  return scene.deploy();",
      "}",
      "",
      "// System ready. Connecting to portfolio...",
      "developer.renderInteractiveWorld();"
    ];
    this.typeIndex = 0;
    this.charIndex = 0;
    this.lastTypeTime = 0;

    this.init();
  }

  init() {
    this.buildCyberGrid();
    this.buildDesk();
    this.buildMonitors();
    this.buildComputer();
    this.buildPeripherals();
    this.buildHoloCore();
    this.buildFloatingTechCubes();
    this.buildLighting();

    this.scene.add(this.group);
  }

  buildCyberGrid() {
    // Subtle, clean dark floor grid
    const grid = new THREE.GridHelper(36, 36, 0x1e293b, 0x0c111d);
    grid.position.y = -1.8;
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
    this.group.add(grid);
  }

  buildDesk() {
    const deskGroup = new THREE.Group();

    // Tabletop
    const topGeo = new THREE.BoxGeometry(5.2, 0.12, 2.4);
    const topMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.85
    });
    const tabletop = new THREE.Mesh(topGeo, topMat);
    tabletop.position.y = 0;
    deskGroup.add(tabletop);

    // Neon edge strip along the front of the desk
    const stripGeo = new THREE.BoxGeometry(5.22, 0.04, 0.04);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const strip = new THREE.Mesh(stripGeo, stripMat);
    strip.position.set(0, 0, 1.21);
    deskGroup.add(strip);

    // Desk legs (modern angular frame)
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.5,
      metalness: 0.9
    });

    const legGeo = new THREE.BoxGeometry(0.12, 1.8, 2.0);

    const legLeft = new THREE.Mesh(legGeo, legMat);
    legLeft.position.set(-2.4, -0.9, 0);
    deskGroup.add(legLeft);

    const legRight = new THREE.Mesh(legGeo, legMat);
    legRight.position.set(2.4, -0.9, 0);
    deskGroup.add(legRight);

    // Cable organizer / cyber back bar
    const barGeo = new THREE.BoxGeometry(4.8, 0.1, 0.1);
    const backBar = new THREE.Mesh(barGeo, legMat);
    backBar.position.set(0, -0.5, -0.9);
    deskGroup.add(backBar);

    this.group.add(deskGroup);
  }

  buildMonitors() {
    // Main Curved Ultrawide Monitor
    const mainMonitorGroup = new THREE.Group();
    mainMonitorGroup.position.set(0, 0.75, -0.4);

    // Screen Bezel
    const bezelGeo = new THREE.BoxGeometry(2.9, 1.4, 0.08);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.3
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    mainMonitorGroup.add(bezel);

    // Screen Display with dynamic texture
    const screenGeo = new THREE.PlaneGeometry(2.8, 1.3);
    const screenMat = new THREE.MeshBasicMaterial({
      map: this.screenTexture,
      toneMapped: false
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.045;
    mainMonitorGroup.add(screen);

    // Stand
    const standGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.75, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.9 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.set(0, -0.4, -0.2);
    mainMonitorGroup.add(stand);

    const baseGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.04, 24);
    const base = new THREE.Mesh(baseGeo, standMat);
    base.position.set(0, -0.73, -0.2);
    mainMonitorGroup.add(base);

    // Ambient backlight on the wall behind main monitor
    const backlight = new THREE.PointLight(0x00f0ff, 2.5, 3);
    backlight.position.set(0, 0, -0.3);
    mainMonitorGroup.add(backlight);

    this.group.add(mainMonitorGroup);

    // Secondary Vertical Monitor (Right side, angled)
    const vertGroup = new THREE.Group();
    vertGroup.position.set(2.0, 0.8, -0.2);
    vertGroup.rotation.y = -0.35;

    const vertBezelGeo = new THREE.BoxGeometry(1.0, 1.7, 0.07);
    const vertBezel = new THREE.Mesh(vertBezelGeo, bezelMat);
    vertGroup.add(vertBezel);

    const vertScreenGeo = new THREE.PlaneGeometry(0.92, 1.6);
    const vertScreenMat = new THREE.MeshBasicMaterial({
      map: this.vertScreenTexture,
      toneMapped: false
    });
    const vertScreen = new THREE.Mesh(vertScreenGeo, vertScreenMat);
    vertScreen.position.z = 0.04;
    vertGroup.add(vertScreen);

    const vertStand = new THREE.Mesh(standGeo, standMat);
    vertStand.position.set(0, -0.45, -0.15);
    vertGroup.add(vertStand);

    const vertBacklight = new THREE.PointLight(0x8a2be2, 2.0, 2.5);
    vertBacklight.position.set(0, 0, -0.2);
    vertGroup.add(vertBacklight);

    this.group.add(vertGroup);
  }

  buildComputer() {
    // Custom High-End Gaming/Dev PC Tower on the left
    const pcGroup = new THREE.Group();
    pcGroup.position.set(-2.0, 0.5, 0.2);

    // Case body
    const caseGeo = new THREE.BoxGeometry(0.65, 0.95, 1.1);
    const caseMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.2,
      metalness: 0.9
    });
    const pcCase = new THREE.Mesh(caseGeo, caseMat);
    pcGroup.add(pcCase);

    // Glass Side Panel
    const glassGeo = new THREE.PlaneGeometry(1.05, 0.9);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.rotation.y = Math.PI / 2;
    glass.position.set(0.33, 0, 0);
    pcGroup.add(glass);

    // Internal RGB Coolers (2 spinning rings)
    this.fans = [];
    const fanGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 32);
    const fanMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const fanMat2 = new THREE.MeshBasicMaterial({ color: 0xff007f });

    const fan1 = new THREE.Mesh(fanGeo, fanMat1);
    fan1.position.set(0.15, 0.2, 0.45);
    pcGroup.add(fan1);
    this.fans.push(fan1);

    const fan2 = new THREE.Mesh(fanGeo, fanMat2);
    fan2.position.set(0.15, -0.15, 0.45);
    pcGroup.add(fan2);
    this.fans.push(fan2);

    // Internal RGB Light
    const pcLight = new THREE.PointLight(0xff007f, 2, 2);
    pcLight.position.set(0.1, 0, 0);
    pcGroup.add(pcLight);

    this.group.add(pcGroup);
  }

  buildPeripherals() {
    // Mechanical Keyboard
    const kbGeo = new THREE.BoxGeometry(1.3, 0.04, 0.45);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, 0.08, 0.45);
    this.group.add(keyboard);

    // RGB glow under keyboard
    const kbGlowGeo = new THREE.BoxGeometry(1.34, 0.01, 0.49);
    const kbGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    const kbGlow = new THREE.Mesh(kbGlowGeo, kbGlowMat);
    kbGlow.position.set(0, 0.065, 0.45);
    this.group.add(kbGlow);

    // Mouse & Pad
    const padGeo = new THREE.BoxGeometry(2.0, 0.01, 0.8);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const mousePad = new THREE.Mesh(padGeo, padMat);
    mousePad.position.set(0.3, 0.065, 0.45);
    this.group.add(mousePad);

    const mouseGeo = new THREE.BoxGeometry(0.12, 0.05, 0.22);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(1.0, 0.09, 0.45);
    this.group.add(mouse);

    // Coffee Mug with cyber steam
    const mugGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.22, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.2 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(-1.1, 0.17, 0.4);
    this.group.add(mug);
  }

  buildHoloCore() {
    // Floating Holographic Icosahedron & Tech Rings above the center
    this.holoGroup = new THREE.Group();
    this.holoGroup.position.set(0, 2.3, -0.6);

    // Central Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.42, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4
    });
    this.holoCore = new THREE.Mesh(icoGeo, icoMat);
    this.holoGroup.add(this.holoCore);

    // Inner Core
    const innerGeo = new THREE.OctahedronGeometry(0.18, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
    this.innerCore = new THREE.Mesh(innerGeo, innerMat);
    this.holoGroup.add(this.innerCore);

    // Minimal Gyro Rings
    const ring1Geo = new THREE.TorusGeometry(0.68, 0.01, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.4 });
    this.holoRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    this.holoGroup.add(this.holoRing1);

    const ring2Geo = new THREE.TorusGeometry(0.82, 0.01, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
    this.holoRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    this.holoRing2.rotation.x = Math.PI / 3;
    this.holoGroup.add(this.holoRing2);

    const holoLight = new THREE.PointLight(0x38bdf8, 1.5, 4);
    this.holoGroup.add(holoLight);

    this.group.add(this.holoGroup);
  }

  buildFloatingTechCubes() {
    this.floatingCubes = [];
    const techColors = [0x38bdf8, 0x818cf8, 0x94a3b8];
    const techPositions = [
      [-3.2, 1.8, -1.0],
      [3.2, 2.0, -0.8],
      [-2.4, 2.6, 0.6],
      [2.5, 2.4, 0.8]
    ];

    for (let i = 0; i < techPositions.length; i++) {
      const size = 0.22 + Math.random() * 0.08;
      const cubeGeo = new THREE.BoxGeometry(size, size, size);

      const color = techColors[i % techColors.length];
      const cubeMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.3,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.25
      });

      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(...techPositions[i]);
      cube.userData = {
        baseY: techPositions[i][1],
        speed: 0.6 + Math.random() * 0.5,
        rotSpeedX: (Math.random() - 0.5) * 1.5,
        rotSpeedY: (Math.random() - 0.5) * 1.5,
        phase: Math.random() * Math.PI * 2
      };

      const wireGeo = new THREE.EdgesGeometry(cubeGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.6 });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      cube.add(wire);

      this.floatingCubes.push(cube);
      this.group.add(cube);
    }
  }

  buildLighting() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0x0f172a, 1.4);
    this.group.add(ambient);

    // Directional studio light
    const dirLight = new THREE.DirectionalLight(0xf1f5f9, 1.4);
    dirLight.position.set(5, 8, 4);
    this.group.add(dirLight);

    // Soft rim fill light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    fillLight.position.set(-5, 4, 3);
    this.group.add(fillLight);
  }

  updateScreenText(delta) {
    this.lastTypeTime += delta;

    // Draw main screen (Code editor with syntax highlights)
    const ctx = this.screenCtx;
    ctx.fillStyle = '#050711';
    ctx.fillRect(0, 0, 1024, 512);

    // Header bar (Window controls)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 40);

    // Dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(24, 20, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(48, 20, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(72, 20, 7, 0, Math.PI * 2); ctx.fill();

    // Tab title
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px monospace';
    ctx.fillText('PortfolioScene.ts — Active WebGL Engine', 110, 25);

    // Code lines
    ctx.font = 'bold 20px "Fira Code", monospace';
    let y = 80;
    const time = this.clock.getElapsedTime();

    for (let i = 0; i < this.codeLines.length; i++) {
      const line = this.codeLines[i];
      // Line numbers
      ctx.fillStyle = '#334155';
      ctx.fillText((i + 1).toString().padStart(2, '0'), 30, y);

      // Syntax color picking
      if (line.includes('const') || line.includes('async') || line.includes('function') || line.includes('return')) {
        ctx.fillStyle = '#ff007f'; // Keyword pink
      } else if (line.includes('new') || line.includes('await')) {
        ctx.fillStyle = '#c084fc'; // Purple
      } else if (line.includes("'")) {
        ctx.fillStyle = '#38bdf8'; // Cyan string
      } else if (line.includes('//')) {
        ctx.fillStyle = '#64748b'; // Gray comment
      } else {
        ctx.fillStyle = '#f8fafc';
      }

      ctx.fillText(line, 80, y);
      y += 28;
    }

    // Blinking cursor
    if (Math.floor(time * 2) % 2 === 0) {
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(80 + ctx.measureText(this.codeLines[this.codeLines.length - 1]).width + 6, y - 32, 12, 24);
    }

    this.screenTexture.needsUpdate = true;

    // Draw vertical screen (Server log / Matrix stream)
    const vCtx = this.vertScreenCtx;
    vCtx.fillStyle = 'rgba(5, 7, 17, 0.2)';
    vCtx.fillRect(0, 0, 512, 1024);

    vCtx.font = '16px monospace';
    vCtx.fillStyle = '#00f0ff';
    vCtx.fillText('STATUS: ONLINE 24/7', 30, 40);
    vCtx.fillStyle = '#10b981';
    vCtx.fillText('CPU LOAD: 18% | RAM: 4.2GB', 30, 70);
    vCtx.fillText('FPS: 60.0 STABLE', 30, 100);

    // Random cyber log entries
    const logs = [
      `[GET] /api/projects/all 200 OK`,
      `[WS] Client connected: 3D session`,
      `[SHADERS] WebGL2 compiled: 0 errors`,
      `[SECURITY] TLS 1.3 Active`,
      `[PING] Moscow <-> Global: 12ms`,
      `[BUNDLE] Vite HMR optimized`,
      `[DB] PostgreSQL query: 1.4ms`,
      `[SYNC] State synchronized`
    ];

    vCtx.fillStyle = '#94a3b8';
    for (let i = 0; i < logs.length; i++) {
      const logY = 160 + i * 45;
      vCtx.fillText(logs[i], 30, logY);
    }

    // Dynamic wave / audio spectrum simulator at bottom
    vCtx.fillStyle = '#8a2be2';
    for (let x = 30; x < 480; x += 12) {
      const h = Math.abs(Math.sin(time * 3 + x * 0.05)) * 120 + 10;
      vCtx.fillRect(x, 950 - h, 8, h);
    }

    this.vertScreenTexture.needsUpdate = true;
  }

  update(delta, mouseX, mouseY) {
    // Fan spin
    if (this.fans) {
      this.fans.forEach(fan => {
        fan.rotation.z += delta * 6;
      });
    }

    // Hologram spin
    if (this.holoGroup) {
      this.holoCore.rotation.x += delta * 0.5;
      this.holoCore.rotation.y += delta * 0.8;
      this.innerCore.rotation.y -= delta * 1.5;
      this.innerCore.rotation.z += delta * 1.0;

      this.holoRing1.rotation.x += delta * 0.7;
      this.holoRing1.rotation.y += delta * 0.4;
      this.holoRing2.rotation.y -= delta * 0.6;
      this.holoRing2.rotation.z += delta * 0.5;

      // Gentle floating bobbing
      const time = this.clock.getElapsedTime();
      this.holoGroup.position.y = 2.3 + Math.sin(time * 1.5) * 0.08;
    }

    // Floating tech cubes
    if (this.floatingCubes) {
      const time = this.clock.getElapsedTime();
      this.floatingCubes.forEach(cube => {
        cube.rotation.x += delta * cube.userData.rotSpeedX;
        cube.rotation.y += delta * cube.userData.rotSpeedY;
        cube.position.y = cube.userData.baseY + Math.sin(time * cube.userData.speed + cube.userData.phase) * 0.15;
      });
    }

    // Update screen dynamic textures throttled to ~15fps for maximum performance
    this.screenUpdateTimer = (this.screenUpdateTimer || 0) + delta;
    if (this.screenUpdateTimer > 0.06) {
      this.updateScreenText(this.screenUpdateTimer);
      this.screenUpdateTimer = 0;
    }

    // Subtle desk tilt to cursor
    this.group.rotation.y = mouseX * 0.12;
    this.group.rotation.x = -mouseY * 0.06;
  }
}
