import * as THREE from 'three';
import { ParticleBackground } from './ParticleBackground.js';
import { MinimalistScene } from './MinimalistScene.js';
import { AutumnLeaves } from './AutumnLeaves.js';
import { CameraController } from './CameraController.js';

export class SceneManager {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0c0907, 0.035);

    this.mouse = { x: 0, y: 0, rawX: 0, rawY: 0 };
    this.clock = new THREE.Clock();
    this.isRunning = true;

    this.init();
  }

  init() {
    // 1. Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 0.4, 6.2);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = false;

    this.container.appendChild(this.renderer.domElement);

    // 3. Components
    this.particles = new ParticleBackground(this.scene);
    this.sculpture = new MinimalistScene(this.scene);
    this.autumnLeaves = new AutumnLeaves(this.scene);
    this.cameraController = new CameraController(this.camera);

    // 4. Events
    this.bindEvents();

    // 5. Start loop
    this.animate();
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mouse.rawX = e.clientX;
      this.mouse.rawY = e.clientY;
    });

    this.setupScrollObserver();

    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        this.clock.start();
        this.animate();
      }
    });
  }

  setupScrollObserver() {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const id = entry.target.getAttribute('id');
            this.cameraController.setSection(id);
          }
        });
      },
      { threshold: [0.25, 0.5] }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setSection(sectionId) {
    this.cameraController.setSection(sectionId);
  }

  animate() {
    if (!this.isRunning) return;

    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    this.particles.update(delta, this.mouse.x, this.mouse.y);
    this.sculpture.update(delta, this.mouse.x, this.mouse.y);
    if (this.autumnLeaves) {
      this.autumnLeaves.update(delta, this.mouse.x, this.mouse.y);
    }
    this.cameraController.update(delta, this.mouse.x, this.mouse.y);

    this.renderer.render(this.scene, this.camera);
  }
}
