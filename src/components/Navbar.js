import { sound } from './AudioController.js';
import { portfolioData } from '../data/portfolioData.js';

export function createNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'fixed top-0 left-0 w-full z-50 glass-nav transition-all duration-300';
  nav.id = 'main-navbar';

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18">
        
        <!-- Logo -->
        <a href="#hero" class="flex items-center gap-3 group" data-nav="hero">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-amber-600/20 group-hover:scale-105 transition-transform border border-amber-500/30">
            &lt;/&gt;
          </div>
          <div>
            <div class="font-mono font-bold text-lg text-[#f7f1eb] tracking-wide group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
              whhyy<span class="text-amber-400">.dev</span>
            </div>
            <div class="text-[11px] font-mono text-amber-400/90 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Available for work
            </div>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center gap-1 bg-[#1a130e]/80 p-1.5 rounded-full border border-amber-900/40 backdrop-blur-md">
          <a href="#hero" data-nav="hero" class="nav-link px-4 py-1.5 rounded-full text-sm font-medium text-amber-400 hover:text-white hover:bg-amber-950/50 transition-all">Home</a>
          <a href="#about" data-nav="about" class="nav-link px-4 py-1.5 rounded-full text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-amber-950/50 transition-all">About</a>
          <a href="#skills" data-nav="skills" class="nav-link px-4 py-1.5 rounded-full text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-amber-950/50 transition-all">Skills</a>
          <a href="#projects" data-nav="projects" class="nav-link px-4 py-1.5 rounded-full text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-amber-950/50 transition-all">Projects</a>
          <a href="#terminal" data-nav="terminal" class="nav-link px-4 py-1.5 rounded-full text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-amber-950/50 transition-all">Terminal</a>
          <a href="#contact" data-nav="contact" class="nav-link px-4 py-1.5 rounded-full text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-amber-950/50 transition-all">Contact</a>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-3">
          <!-- Audio FX Toggle -->
          <button id="sound-toggle-btn" class="p-2.5 rounded-xl bg-[#221711]/70 hover:bg-[#2e2017] border border-amber-900/40 text-stone-400 hover:text-amber-300 transition-all flex items-center justify-center" title="Toggle audio effects">
            <svg id="sound-icon-off" class="w-5 h-5 block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            <svg id="sound-icon-on" class="w-5 h-5 hidden text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>

          <!-- Contact CTA Button -->
          <a href="#contact" class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-600/20 hover:shadow-amber-600/35 transition-all transform hover:-translate-y-0.5">
            <span>Let's Talk</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-toggle" class="md:hidden p-2.5 rounded-xl bg-[#221711] border border-amber-900/40 text-stone-300">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div id="mobile-menu" class="hidden md:hidden px-4 pt-2 pb-6 border-t border-amber-900/40 bg-[#120d0a]/95 backdrop-blur-xl">
      <div class="flex flex-col gap-2 pt-2">
        <a href="#hero" data-nav="hero" class="mobile-nav-link px-4 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/60 hover:text-amber-400">Home</a>
        <a href="#about" data-nav="about" class="mobile-nav-link px-4 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/60 hover:text-amber-400">About</a>
        <a href="#skills" data-nav="skills" class="mobile-nav-link px-4 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/60 hover:text-amber-400">Skills</a>
        <a href="#projects" data-nav="projects" class="mobile-nav-link px-4 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/60 hover:text-amber-400">Projects</a>
        <a href="#terminal" data-nav="terminal" class="mobile-nav-link px-4 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/60 hover:text-amber-400">Terminal</a>
        <a href="#contact" data-nav="contact" class="mobile-nav-link px-4 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/60 hover:text-amber-400">Contact</a>
      </div>
    </div>
  `;

  // Bind Events
  const soundBtn = nav.querySelector('#sound-toggle-btn');
  const iconOff = nav.querySelector('#sound-icon-off');
  const iconOn = nav.querySelector('#sound-icon-on');

  soundBtn.addEventListener('click', () => {
    const isEnabled = sound.toggle();
    if (isEnabled) {
      iconOff.classList.add('hidden');
      iconOn.classList.remove('hidden');
    } else {
      iconOff.classList.remove('hidden');
      iconOn.classList.add('hidden');
    }
  });

  const mobileBtn = nav.querySelector('#mobile-menu-toggle');
  const mobileMenu = nav.querySelector('#mobile-menu');

  mobileBtn.addEventListener('click', () => {
    sound.playClick();
    mobileMenu.classList.toggle('hidden');
  });

  const links = nav.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => sound.playHover());
    link.addEventListener('click', () => {
      sound.playClick();
      mobileMenu.classList.add('hidden');
    });
  });

  return nav;
}
