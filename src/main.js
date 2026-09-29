import './style.css';
import { SceneManager } from './three/SceneManager.js';
import { createNavbar } from './components/Navbar.js';
import { createHero } from './components/Hero.js';
import { createAbout } from './components/About.js';
import { createSkills } from './components/Skills3D.js';
import { createProjects } from './components/Projects.js';
import { createTerminal } from './components/Terminal.js';
import { createContact } from './components/Contact.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const webglContainer = document.getElementById('webgl-container');

  // 1. Initialize 3D Scene
  let sceneManager = null;
  try {
    sceneManager = new SceneManager(webglContainer);
  } catch (err) {
    console.error('Failed to initialize Three.js WebGL scene:', err);
  }

  // 2. Mount UI Components
  const navbar = createNavbar();
  const hero = createHero();
  const about = createAbout();
  const skills = createSkills();
  const projects = createProjects();
  const terminal = createTerminal();
  const contact = createContact();

  app.appendChild(navbar);
  app.appendChild(hero);
  app.appendChild(about);
  app.appendChild(skills);
  app.appendChild(projects);
  app.appendChild(terminal);
  app.appendChild(contact);

  // 3. Highlight Active Navigation Item On Scroll
  const sections = [hero, about, skills, projects, terminal, contact];
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('text-amber-400');
            link.classList.remove('text-stone-300');
          } else {
            link.classList.remove('text-amber-400');
            link.classList.add('text-stone-300');
          }
        });

        // Inform 3D scene of active section
        if (sceneManager) {
          sceneManager.setSection(id);
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();
});
