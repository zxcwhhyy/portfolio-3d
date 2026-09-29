import { portfolioData } from '../data/portfolioData.js';
import { sound } from './AudioController.js';

export function createTerminal() {
  const section = document.createElement('section');
  section.id = 'terminal';
  section.className = 'relative py-28 px-4 sm:px-6 lg:px-8 pointer-events-none';

  let matrixActive = false;
  let matrixInterval = null;

  function toggleMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    matrixActive = !matrixActive;
    if (matrixActive) {
      canvas.style.display = 'block';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');

      const chars = '01ABCDEFXYZ0123456789{}[]()<>/\\*+=-_~';
      const fontSize = 15;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);

      matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(12, 9, 7, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#f59e0b';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }, 35);
    } else {
      if (matrixInterval) clearInterval(matrixInterval);
      canvas.style.display = 'none';
    }
  }

  section.innerHTML = `
    <div class="max-w-5xl mx-auto w-full pointer-events-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-start mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs mb-3">
          &lt;SECTION: 04_DEV_TERMINAL /&gt;
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
          Interactive <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">Web Console</span>
        </h2>
        <p class="text-sm sm:text-base text-stone-300 mt-2">
          Navigate and interact with the portfolio through a developer CLI. Try running <span class="text-amber-400 font-mono">help</span> or <span class="text-amber-400 font-mono">matrix</span>.
        </p>
      </div>

      <!-- Terminal Window -->
      <div class="glass-panel rounded-3xl overflow-hidden shadow-2xl bg-[#140e0a]/90 font-mono text-xs sm:text-sm border border-amber-900/40">
        
        <!-- Terminal Title Bar -->
        <div class="flex items-center justify-between px-6 py-4 bg-[#1b130e]/90 border-b border-amber-900/30">
          <div class="flex items-center gap-2">
            <span class="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:brightness-120 cursor-pointer"></span>
            <span class="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:brightness-120 cursor-pointer"></span>
            <span class="w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:brightness-120 cursor-pointer"></span>
          </div>
          <div class="text-stone-400 text-xs flex items-center gap-2">
            <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>bash — whhyy@workstation</span>
          </div>
          <div class="text-xs text-stone-500 font-mono">UTF-8</div>
        </div>

        <!-- Terminal Quick Action Chips -->
        <div class="px-6 py-2.5 bg-[#17100b]/60 border-b border-amber-900/30 flex flex-wrap items-center gap-2">
          <span class="text-xs text-stone-500">Quick commands:</span>
          <button class="term-quick-cmd px-2.5 py-1 rounded bg-[#271911] text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors" data-cmd="help">help</button>
          <button class="term-quick-cmd px-2.5 py-1 rounded bg-[#271911] text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors" data-cmd="bio">bio</button>
          <button class="term-quick-cmd px-2.5 py-1 rounded bg-[#271911] text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors" data-cmd="skills">skills</button>
          <button class="term-quick-cmd px-2.5 py-1 rounded bg-[#271911] text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors" data-cmd="projects">projects</button>
          <button class="term-quick-cmd px-2.5 py-1 rounded bg-[#271911] text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors" data-cmd="matrix">matrix</button>
          <button class="term-quick-cmd px-2.5 py-1 rounded bg-[#271911] text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors" data-cmd="clear">clear</button>
        </div>

        <!-- Terminal Content Area -->
        <div id="terminal-history" class="p-6 space-y-4 max-h-96 overflow-y-auto min-h-[260px]">
          <div class="text-stone-400">
            Welcome to Ilya (whhyy.dev) Portfolio OS [Version 3.8.0-webgl].<br>
            Type <span class="text-amber-400 font-bold">'help'</span> to view available commands.
          </div>
        </div>

        <!-- Terminal Prompt Input -->
        <form id="terminal-form" class="flex items-center px-6 py-4 bg-[#100b08] border-t border-amber-900/30">
          <span class="text-amber-400 font-bold mr-2">whhyy@dev:~$</span>
          <input type="text" id="terminal-input" autocomplete="off" spellcheck="false" class="flex-1 bg-transparent text-amber-300 focus:outline-none font-mono text-sm placeholder-stone-600" placeholder="type a command (help, bio, skills, matrix...)" />
          <button type="submit" class="px-3 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 text-xs transition-colors">
            Enter ↵
          </button>
        </form>

      </div>
    </div>
  `;

  const form = section.querySelector('#terminal-form');
  const input = section.querySelector('#terminal-input');
  const history = section.querySelector('#terminal-history');

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();

    const cmdDiv = document.createElement('div');
    cmdDiv.className = 'flex items-center text-stone-200';
    cmdDiv.innerHTML = `<span class="text-amber-400 font-bold mr-2">whhyy@dev:~$</span> <span>${rawCmd}</span>`;
    history.appendChild(cmdDiv);

    const resDiv = document.createElement('div');
    resDiv.className = 'text-stone-300 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-amber-500/40 my-2';

    if (cmd === 'clear') {
      history.innerHTML = '';
      return;
    } else if (cmd === 'matrix') {
      sound.playGlitch();
      toggleMatrixRain();
      resDiv.innerHTML = matrixActive
        ? '<span class="text-amber-400">Matrix golden digital rain activated. Type "matrix" again to turn off.</span>'
        : '<span class="text-stone-400">Matrix effect disabled.</span>';
    } else if (portfolioData.terminalCommands[cmd]) {
      resDiv.textContent = portfolioData.terminalCommands[cmd];
    } else {
      sound.playGlitch();
      resDiv.innerHTML = `<span class="text-red-400">Command not found: "${cmd}". Type <span class="text-amber-400">help</span> for assistance.</span>`;
    }

    history.appendChild(resDiv);
    history.scrollTop = history.scrollHeight;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = '';
    executeCommand(val);
  });

  section.querySelectorAll('.term-quick-cmd').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cmd = e.currentTarget.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  return section;
}
