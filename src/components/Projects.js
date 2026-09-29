import { portfolioData } from '../data/portfolioData.js';
import { sound } from './AudioController.js';
import confetti from 'canvas-confetti';

export function createProjects() {
  const section = document.createElement('section');
  section.id = 'projects';
  section.className = 'relative py-28 px-4 sm:px-6 lg:px-8 pointer-events-none';

  let currentCategory = 'all';

  function getFilteredProjects() {
    if (currentCategory === 'all') return portfolioData.projects;
    return portfolioData.projects.filter(p => p.category === currentCategory);
  }

  function renderCategoryTabs() {
    const categories = ['all', 'Fullstack', '3D & Creative', 'AI & Tools'];
    return `
      <div class="flex flex-wrap items-center gap-2 mb-10">
        ${categories.map(cat => `
          <button data-cat="${cat}" class="proj-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            cat === currentCategory
              ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-stone-950 font-bold shadow-lg shadow-amber-600/30 scale-105'
              : 'glass-panel text-stone-300 hover:text-amber-300 hover:border-amber-400/40'
          }">
            ${cat === 'all' ? 'All Projects' : cat}
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderProjectsGrid() {
    const projs = getFilteredProjects();

    return `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        ${projs.map((project) => `
          <div class="project-tilt-card glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
               data-id="${project.id}">
            
            <div class="absolute -right-20 -top-20 w-52 h-52 rounded-full bg-gradient-to-br from-amber-600/10 via-amber-800/15 to-transparent blur-3xl transition-opacity pointer-events-none"></div>

            <div>
              <!-- Top Category & Metrics Badge -->
              <div class="flex items-center justify-between gap-2 mb-5">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  ${project.category}
                </span>
                <span class="text-xs font-mono text-stone-400 bg-[#160f0b]/80 px-3 py-1 rounded-full border border-amber-900/30">
                  ${project.stats}
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-2xl font-bold text-stone-100 mb-3 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                ${project.title}
                <svg class="w-5 h-5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>

              <!-- Description -->
              <p class="text-sm text-stone-300 leading-relaxed mb-6">
                ${project.description}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-8">
                ${project.tags.map(tag => `
                  <span class="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#140e0a]/90 text-stone-300 border border-amber-900/30">
                    #${tag}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Bottom Actions -->
            <div class="flex items-center justify-between pt-5 border-t border-amber-900/30 mt-auto">
              <div class="flex items-center gap-3">
                <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="live-demo-btn px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all">
                  <span>Demo</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl glass-panel text-stone-300 hover:text-white text-xs sm:text-sm font-medium flex items-center gap-2 transition-all">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Code</span>
                </a>
              </div>

              <!-- Deep dive detail button -->
              <button class="project-modal-trigger text-xs text-stone-400 hover:text-amber-300 font-mono flex items-center gap-1 transition-colors" data-id="${project.id}">
                Architecture →
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function updateDOM() {
    const container = section.querySelector('#projects-container');
    if (container) {
      container.innerHTML = `
        ${renderCategoryTabs()}
        ${renderProjectsGrid()}
      `;
      setupTiltAndEvents();
    }
  }

  function setupTiltAndEvents() {
    section.querySelectorAll('.proj-tab-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => sound.playHover());
      btn.addEventListener('click', (e) => {
        sound.playClick();
        currentCategory = e.currentTarget.getAttribute('data-cat');
        updateDOM();
      });
    });

    const cards = section.querySelectorAll('.project-tilt-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => sound.playHover());

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });

    section.querySelectorAll('.live-demo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sound.playSuccess();
        const rect = e.target.getBoundingClientRect();
        confetti({
          particleCount: 45,
          spread: 60,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          },
          colors: ['#f59e0b', '#d97706', '#b45309', '#fde68a', '#ffffff']
        });
      });
    });

    section.querySelectorAll('.project-modal-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  function openProjectModal(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;

    sound.playClick();

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in pointer-events-auto';
    modal.innerHTML = `
      <div class="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-amber-900/50 shadow-2xl relative">
        <button class="modal-close-btn absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-amber-950/40 transition-all">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex items-center gap-2 mb-3">
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            ${project.category}
          </span>
          <span class="text-xs font-mono text-stone-400">${project.stats}</span>
        </div>

        <h3 class="text-2xl sm:text-3xl font-bold text-stone-100 mb-4">${project.title}</h3>
        
        <p class="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">${project.description}</p>

        <div class="p-4 rounded-2xl bg-[#140e0a] border border-amber-900/30 mb-6 font-mono text-xs text-stone-300 space-y-2">
          <div class="text-amber-400 font-bold mb-1">// Architectural Highlights & Decisions:</div>
          <div>• Client-server separation of concerns with REST & WebSockets</div>
          <div>• Reactive client caching and optimized rendering cycles</div>
          <div>• Comprehensive integration & unit testing coverage</div>
          <div>• Automated CI/CD pipelines with strict static type verification</div>
        </div>

        <div class="flex flex-wrap gap-2 mb-8">
          ${project.tags.map(t => `<span class="px-3 py-1 bg-amber-950/40 border border-amber-500/20 text-amber-300 rounded-lg text-xs font-mono">#${t}</span>`).join('')}
        </div>

        <div class="flex items-center justify-end gap-3">
          <button class="modal-close-btn px-5 py-2.5 rounded-xl glass-panel text-stone-300 hover:text-white text-sm">
            Close
          </button>
          <a href="${project.live}" target="_blank" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold text-sm">
            Live Preview
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeButtons = modal.querySelectorAll('.modal-close-btn');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        modal.remove();
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        sound.playClick();
        modal.remove();
      }
    });
  }

  section.innerHTML = `
    <div class="max-w-7xl mx-auto w-full pointer-events-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-start mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs mb-3">
          &lt;SECTION: 03_PORTFOLIO_WORKS /&gt;
        </div>
        <div class="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
          <div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
              Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">Projects</span>
            </h2>
            <p class="text-sm sm:text-base text-stone-300 mt-2 max-w-xl">
              Selected production web apps, interactive 3D platforms, and scalable architecture solutions.
            </p>
          </div>
          <div class="text-xs font-mono text-amber-400/90 bg-[#19110d]/80 px-3.5 py-1.5 rounded-full border border-amber-900/40">
            ✦ Interactive 3D-Tilt on hover
          </div>
        </div>
      </div>

      <div id="projects-container">
        ${renderCategoryTabs()}
        ${renderProjectsGrid()}
      </div>

    </div>
  `;

  setTimeout(setupTiltAndEvents, 0);

  return section;
}
