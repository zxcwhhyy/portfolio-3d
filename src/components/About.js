import { portfolioData } from '../data/portfolioData.js';
import { sound } from './AudioController.js';

export function createAbout() {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'relative py-28 px-4 sm:px-6 lg:px-8 pointer-events-none';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto w-full pointer-events-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-start mb-16">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs mb-3">
          &lt;SECTION: 01_ABOUT /&gt;
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
          Engineering Mindset & <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">Passion for Code</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- Left: Bio & Highlights (7 cols) -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          <div class="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 class="text-xl font-bold text-stone-100 mb-4 flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Who I am & What I do
            </h3>
            <div class="space-y-4 text-stone-300 text-base leading-relaxed">
              ${portfolioData.personal.bio.map(p => `<p>${p}</p>`).join('')}
            </div>

            <!-- Pillars of work -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-amber-900/30">
              <div class="flex items-start gap-3.5">
                <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-stone-100 text-sm">Peak Performance</h4>
                  <p class="text-xs text-stone-400 mt-1">Zero lag, 95+ Core Web Vitals, silky 60 FPS WebGL animations.</p>
                </div>
              </div>

              <div class="flex items-start gap-3.5">
                <div class="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-stone-100 text-sm">Clean Architecture</h4>
                  <p class="text-xs text-stone-400 mt-1">SOLID, DRY, strict TypeScript typings, and modular maintainability.</p>
                </div>
              </div>

              <div class="flex items-start gap-3.5">
                <div class="p-2.5 rounded-xl bg-amber-600/10 border border-amber-600/20 text-amber-300">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-stone-100 text-sm">Creative 3D UI</h4>
                  <p class="text-xs text-stone-400 mt-1">Immersive Three.js micro-interactions and tactile visual fidelity.</p>
                </div>
              </div>

              <div class="flex items-start gap-3.5">
                <div class="p-2.5 rounded-xl bg-emerald-600/10 border border-emerald-600/20 text-emerald-400">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-stone-100 text-sm">Delivery Discipline</h4>
                  <p class="text-xs text-stone-400 mt-1">Clear sprint milestones, transparent feedback, and rapid deployment.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Career Timeline -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 class="text-xl font-bold text-stone-100 mb-6 flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Career Milestones & Experience
            </h3>

            <div class="relative pl-6 border-l-2 border-amber-900/40 space-y-8">
              ${portfolioData.experience.map((item) => `
                <div class="relative group">
                  <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#120d0a] border-2 border-amber-400 group-hover:bg-amber-400 transition-colors"></div>
                  <div class="text-xs font-mono text-amber-400 font-semibold mb-1">${item.period}</div>
                  <h4 class="text-base font-bold text-stone-100">${item.role}</h4>
                  <div class="text-xs font-medium text-amber-300/80 mb-2">${item.company}</div>
                  <p class="text-sm text-stone-300 leading-relaxed">${item.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Developer Specs Card (5 cols) -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="glass-panel rounded-3xl p-6 font-mono text-sm shadow-2xl">
            <div class="flex items-center justify-between pb-4 mb-4 border-b border-amber-900/30">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span class="text-xs text-stone-400 font-mono">whhyy@workstation: ~</span>
              <span class="text-xs text-amber-400 font-mono">v3.8-lts</span>
            </div>

            <div class="space-y-3 text-xs sm:text-sm">
              <div class="text-amber-400 font-bold">$ dev-spec --detailed</div>
              <div class="grid grid-cols-3 gap-2 text-stone-400 pt-2">
                <span class="text-stone-500">Developer:</span>
                <span class="col-span-2 text-stone-100 font-semibold">Ilya (@whhyy.dev)</span>
                
                <span class="text-stone-500">Location:</span>
                <span class="col-span-2 text-stone-200">${portfolioData.personal.location}</span>
                
                <span class="text-stone-500">Focus:</span>
                <span class="col-span-2 text-amber-300">Frontend / Fullstack / 3D Web</span>
                
                <span class="text-stone-500">Languages:</span>
                <span class="col-span-2 text-stone-200">TypeScript, JS (ESNext), SQL, HTML/CSS</span>
                
                <span class="text-stone-500">Frameworks:</span>
                <span class="col-span-2 text-stone-200">React, Next.js, Node.js, Three.js</span>
                
                <span class="text-stone-500">Architecture:</span>
                <span class="col-span-2 text-stone-200">Microservices, REST, WebSockets</span>
                
                <span class="text-stone-500">Editor:</span>
                <span class="col-span-2 text-amber-200">VS Code + Neovim</span>
                
                <span class="text-stone-500">Coffee / Day:</span>
                <span class="col-span-2 text-amber-400">☕ 3 cups minimum</span>
                
                <span class="text-stone-500">Status:</span>
                <span class="col-span-2 text-amber-400 font-semibold">Available for hire / freelance</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-900/30">
              <div class="text-xs text-stone-400 mb-2 flex justify-between">
                <span>Code Quality & Tests</span>
                <span class="text-amber-400 font-bold">100% Passed</span>
              </div>
              <div class="w-full bg-[#1e1510] rounded-full h-2 overflow-hidden border border-amber-900/30">
                <div class="bg-gradient-to-r from-amber-500 to-yellow-500 h-full w-[96%] rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Mindset Quote Card -->
          <div class="glass-panel p-6 rounded-3xl bg-gradient-to-br from-[#241710]/40 to-[#150e09]/60 border border-amber-900/40">
            <div class="text-3xl text-amber-400 mb-2 font-serif">“</div>
            <p class="text-stone-300 text-sm italic leading-relaxed">
              Good code solves a business problem. Exceptional code solves it with an interface people love using and an architecture that scales effortlessly for years.
            </p>
            <div class="mt-4 text-xs font-mono text-amber-400 font-semibold">— Core Engineering Philosophy</div>
          </div>
        </div>

      </div>
    </div>
  `;

  section.querySelectorAll('a, button, .glass-panel').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playHover());
  });

  return section;
}
