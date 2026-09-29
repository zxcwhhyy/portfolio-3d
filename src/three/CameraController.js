import * as THREE from 'three';

export class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.targetPos = new THREE.Vector3(0, 0.4, 6.2);
    this.targetLookAt = new THREE.Vector3(0.6, 0.2, 0);
    this.currentLookAt = new THREE.Vector3(0.6, 0.2, 0);

    this.mouseParallax = { x: 0, y: 0 };
    this.dragOffset = { x: 0, y: 0 };
    this.isDragging = false;
    this.prevMouse = { x: 0, y: 0 };

    this.sectionPresets = {
      hero: {
        pos: new THREE.Vector3(0, 0.4, 6.2),
        lookAt: new THREE.Vector3(0.6, 0.2, 0)
      },
      about: {
        pos: new THREE.Vector3(-0.8, 0.5, 5.8),
        lookAt: new THREE.Vector3(0.9, 0.2, 0)
      },
      skills: {
        pos: new THREE.Vector3(1.2, 0.6, 6.0),
        lookAt: new THREE.Vector3(0.0, 0.2, 0)
      },
      projects: {
        pos: new THREE.Vector3(0, -0.2, 6.8),
        lookAt: new THREE.Vector3(0.4, 0.2, 0)
      },
      terminal: {
        pos: new THREE.Vector3(-0.6, 0.3, 5.6),
        lookAt: new THREE.Vector3(0.5, 0.2, 0)
      },
      contact: {
        pos: new THREE.Vector3(0, 0.6, 6.0),
        lookAt: new THREE.Vector3(0.4, 0.2, 0)
      }
    };

    this.activeSection = 'hero';
    this.setupDragListeners();
  }

  setupDragListeners() {
    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, textarea, select, .glass-panel, pre, code')) return;
      this.isDragging = true;
      this.prevMouse.x = e.clientX;
      this.prevMouse.y = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = (e.clientX - this.prevMouse.x) * 0.004;
        const deltaY = (e.clientY - this.prevMouse.y) * 0.004;
        this.dragOffset.x += deltaX;
        this.dragOffset.y = Math.max(-0.5, Math.min(0.5, this.dragOffset.y + deltaY));
        this.prevMouse.x = e.clientX;
        this.prevMouse.y = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1 && !e.target.closest('button, a, input, textarea, select, .glass-panel, pre, code')) {
        this.isDragging = true;
        this.prevMouse.x = e.touches[0].clientX;
        this.prevMouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const deltaX = (e.touches[0].clientX - this.prevMouse.x) * 0.004;
        const deltaY = (e.touches[0].clientY - this.prevMouse.y) * 0.004;
        this.dragOffset.x += deltaX;
        this.dragOffset.y = Math.max(-0.5, Math.min(0.5, this.dragOffset.y + deltaY));
        this.prevMouse.x = e.touches[0].clientX;
        this.prevMouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  setSection(sectionId) {
    if (this.sectionPresets[sectionId]) {
      this.activeSection = sectionId;
      const preset = this.sectionPresets[sectionId];
      this.targetPos.copy(preset.pos);
      this.targetLookAt.copy(preset.lookAt);
      this.dragOffset.x *= 0.5;
      this.dragOffset.y *= 0.5;
    }
  }

  update(delta, mouseX, mouseY) {
    // Subtle parallax
    this.mouseParallax.x = mouseX * 0.25;
    this.mouseParallax.y = -mouseY * 0.2;

    if (!this.isDragging) {
      this.dragOffset.x += (0 - this.dragOffset.x) * 0.04;
      this.dragOffset.y += (0 - this.dragOffset.y) * 0.04;
    }

    const desiredX = this.targetPos.x + this.mouseParallax.x + this.dragOffset.x * 2.0;
    const desiredY = this.targetPos.y + this.mouseParallax.y - this.dragOffset.y * 1.5;
    const desiredZ = this.targetPos.z;

    this.camera.position.x += (desiredX - this.camera.position.x) * 0.05;
    this.camera.position.y += (desiredY - this.camera.position.y) * 0.05;
    this.camera.position.z += (desiredZ - this.camera.position.z) * 0.05;

    this.currentLookAt.x += (this.targetLookAt.x + this.dragOffset.x - this.currentLookAt.x) * 0.05;
    this.currentLookAt.y += (this.targetLookAt.y - this.dragOffset.y - this.currentLookAt.y) * 0.05;
    this.currentLookAt.z += (this.targetLookAt.z - this.currentLookAt.z) * 0.05;

    this.camera.lookAt(this.currentLookAt);
  }
}
