import { portfolioData } from '../data/portfolioData.js';
import { sound } from './AudioController.js';

export function createHero() {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 pointer-events-none';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto w-full pointer-events-auto">
      <div class="max-w-3xl">
        
        <!-- Status Badge -->
        <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel mb-8 animate-float">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span class="text-xs sm:text-sm font-mono text-amber-300 tracking-wide font-medium">
            3D WebGL Portfolio • ${portfolioData.personal.role}
          </span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-100 tracking-tight leading-[1.1] mb-6">
          Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 neon-text-amber">${portfolioData.personal.name}</span>
        </h1>

        <!-- Typing Specialty -->
        <div class="h-10 sm:h-12 mb-6 flex items-center">
          <span class="text-xl sm:text-2xl lg:text-3xl font-mono text-stone-300 font-semibold">
            I engineer <span id="hero-typewriter" class="text-amber-400 border-b-2 border-amber-400 pb-0.5"></span>
          </span>
        </div>

        <!-- Bio tagline -->
        <p class="text-base sm:text-xl text-stone-300 max-w-2xl leading-relaxed mb-10">
          ${portfolioData.personal.tagline}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center gap-4 mb-16">
          <a href="#projects" class="hero-cta-primary px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold text-base shadow-xl shadow-amber-600/20 hover:shadow-amber-600/35 transition-all transform hover:-translate-y-0.5 flex items-center gap-3">
            <span>View Projects</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a href="#contact" class="hero-cta-secondary px-8 py-4 rounded-xl glass-panel text-stone-100 hover:text-amber-300 hover:border-amber-400/40 font-medium text-base transition-all transform hover:-translate-y-0.5 flex items-center gap-3">
            <span>Get in Touch</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>

          <div class="flex items-center gap-3 ml-2">
            <a href="${portfolioData.personal.github}" target="_blank" rel="noopener noreferrer" class="p-3.5 rounded-xl glass-panel text-stone-400 hover:text-amber-300 hover:border-amber-400/40 transition-all hover:scale-105" title="GitHub Profile">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="${portfolioData.personal.telegram}" target="_blank" rel="noopener noreferrer" class="p-3.5 rounded-xl glass-panel text-stone-400 hover:text-amber-300 hover:border-amber-400/40 transition-all hover:scale-105" title="Telegram">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.196 1.006.128.832.946z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${portfolioData.stats.map(stat => `
            <div class="glass-panel p-4 rounded-2xl">
              <div class="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 font-mono">
                ${stat.value}
              </div>
              <div class="text-xs sm:text-sm text-stone-400 mt-1">
                ${stat.label}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </div>

    <!-- 3D Scene Interaction Indicator -->
    <div class="max-w-7xl mx-auto w-full mt-12 flex items-center text-xs font-mono text-stone-400 pointer-events-auto">
      <div class="flex items-center gap-2 text-amber-300/90 bg-[#18110d]/80 px-3.5 py-1.5 rounded-full border border-amber-900/40 backdrop-blur-md">
        <svg class="w-4 h-4 animate-pulse text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <span>Rotate 3D sculpture by dragging or touch</span>
      </div>
    </div>
  `;

  const words = [
    "high-performance web apps",
    "interactive 3D WebGL experiences",
    "modern React & Next.js systems",
    "scalable Node.js backend services",
    "fluid user-centric digital products"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterSpan = section.querySelector('#hero-typewriter');

  function typeEffect() {
    if (!typewriterSpan) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 35 : 85;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  setTimeout(typeEffect, 500);

  section.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => sound.playHover());
    el.addEventListener('click', () => sound.playClick());
  });

  return section;
}
