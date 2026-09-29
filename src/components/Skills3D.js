import { portfolioData } from '../data/portfolioData.js';
import { sound } from './AudioController.js';

export function createSkills() {
  const section = document.createElement('section');
  section.id = 'skills';
  section.className = 'relative py-28 px-4 sm:px-6 lg:px-8 pointer-events-none';

  let activeCategory = 'all';

  function renderCategoryButtons() {
    const categories = ['all', ...portfolioData.skillCategories.map(c => c.name)];
    return `
      <div class="flex flex-wrap items-center gap-2 mb-10">
        ${categories.map(cat => `
          <button data-cat="${cat}" class="skill-cat-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            cat === activeCategory
              ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-600/30 scale-105'
              : 'glass-panel text-stone-300 hover:text-amber-300 hover:border-amber-400/40'
          }">
            ${cat === 'all' ? 'All Technologies' : cat}
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderSkillCards() {
    const filteredCategories = activeCategory === 'all'
      ? portfolioData.skillCategories
      : portfolioData.skillCategories.filter(c => c.name === activeCategory);

    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${filteredCategories.map(cat => `
          <div class="glass-panel p-6 sm:p-8 rounded-3xl transition-all hover:border-amber-500/40">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xl font-bold text-stone-100 flex items-center gap-3">
                <span class="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                ${cat.name}
              </h3>
              <span class="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
                ${cat.skills.length} technologies
              </span>
            </div>
            
            <p class="text-xs text-stone-400 mb-6">${cat.description}</p>

            <div class="space-y-5">
              ${cat.skills.map(s => `
                <div class="group">
                  <div class="flex justify-between items-center text-sm font-medium mb-1.5">
                    <span class="text-stone-200 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full" style="background-color: ${s.color}; box-shadow: 0 0 8px ${s.color};"></span>
                      ${s.name}
                    </span>
                    <span class="text-xs font-mono text-stone-400 group-hover:text-white font-bold">${s.level}%</span>
                  </div>
                  <div class="w-full bg-[#18110c] rounded-full h-2 overflow-hidden p-0.5 border border-amber-900/30">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-125"
                         style="width: ${s.level}%; background: linear-gradient(90deg, ${s.color}88, ${s.color});">
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function updateDOM() {
    const container = section.querySelector('#skills-content-container');
    if (container) {
      container.innerHTML = `
        ${renderCategoryButtons()}
        ${renderSkillCards()}
      `;
      bindCategoryEvents();
    }
  }

  function bindCategoryEvents() {
    section.querySelectorAll('.skill-cat-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => sound.playHover());
      btn.addEventListener('click', (e) => {
        sound.playClick();
        activeCategory = e.currentTarget.getAttribute('data-cat');
        updateDOM();
      });
    });

    section.querySelectorAll('.glass-panel').forEach(card => {
      card.addEventListener('mouseenter', () => sound.playHover());
    });
  }

  section.innerHTML = `
    <div class="max-w-7xl mx-auto w-full pointer-events-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-start mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs mb-3">
          &lt;SECTION: 02_TECH_STACK /&gt;
        </div>
        <div class="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
          <div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
              Technical <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">Arsenal</span>
            </h2>
            <p class="text-sm sm:text-base text-stone-300 mt-2 max-w-xl">
              Modern tools and battle-tested frameworks for engineering resilient, responsive, and visually rich web platforms.
            </p>
          </div>
          
          <div class="glass-panel px-4 py-2.5 rounded-2xl text-xs font-mono text-stone-300 flex items-center gap-2 border border-amber-900/40">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            Production Ready • 2026 Tech Standards
          </div>
        </div>
      </div>

      <div id="skills-content-container">
        ${renderCategoryButtons()}
        ${renderSkillCards()}
      </div>

    </div>
  `;

  setTimeout(bindCategoryEvents, 0);

  return section;
}
