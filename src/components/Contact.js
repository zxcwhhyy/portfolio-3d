import { portfolioData } from '../data/portfolioData.js';
import { sound } from './AudioController.js';
import confetti from 'canvas-confetti';

export function createContact() {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'relative py-28 px-4 sm:px-6 lg:px-8 pointer-events-none';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto w-full pointer-events-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col items-start mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs mb-3">
          &lt;SECTION: 05_GET_IN_TOUCH /&gt;
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-stone-100 tracking-tight">
          Let's build <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">something extraordinary</span>
        </h2>
        <p class="text-sm sm:text-base text-stone-300 mt-2 max-w-xl">
          Open for freelance projects, end-to-end product development, and full-time engineering roles in innovative teams.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Direct Contact Channels (5 cols) -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 class="text-xl font-bold text-stone-100 mb-2">Direct Communication</h3>
            <p class="text-sm text-stone-300 leading-relaxed">
              Reach out directly on your preferred channel. I typically respond within a couple of hours.
            </p>

            <!-- Telegram -->
            <div class="flex items-center justify-between p-4 rounded-2xl bg-[#17100b]/80 border border-amber-900/30 hover:border-amber-500/40 transition-all group">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/25">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.536-.196 1.006.128.832.946z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-stone-400">Telegram</div>
                  <div class="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">@your_telegram_handle</div>
                </div>
              </div>
              <a href="${portfolioData.personal.telegram}" target="_blank" class="p-2.5 rounded-xl bg-[#271911] text-stone-300 hover:text-amber-300 hover:bg-[#382419] transition-colors" title="Open Telegram">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <!-- Email -->
            <div class="flex items-center justify-between p-4 rounded-2xl bg-[#17100b]/80 border border-amber-900/30 hover:border-amber-500/40 transition-all group">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-amber-600/15 text-amber-300 flex items-center justify-center border border-amber-600/25">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-stone-400">Email</div>
                  <div class="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">${portfolioData.personal.email}</div>
                </div>
              </div>
              <button class="copy-email-btn p-2.5 rounded-xl bg-[#271911] text-stone-300 hover:text-amber-300 hover:bg-[#382419] transition-colors" title="Copy Email address">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <!-- GitHub -->
            <div class="flex items-center justify-between p-4 rounded-2xl bg-[#17100b]/80 border border-amber-900/30 hover:border-amber-500/40 transition-all group">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-orange-600/15 text-orange-400 flex items-center justify-center border border-orange-600/25">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-stone-400">GitHub</div>
                  <div class="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">Source Code & Repositories</div>
                </div>
              </div>
              <a href="${portfolioData.personal.github}" target="_blank" class="p-2.5 rounded-xl bg-[#271911] text-stone-300 hover:text-amber-300 hover:bg-[#382419] transition-colors" title="Open GitHub">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Interactive Form (7 cols) -->
        <div class="lg:col-span-7">
          <div class="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 class="text-xl font-bold text-stone-100 mb-6 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              Send a Message
            </h3>

            <form id="contact-form" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-mono text-stone-300 mb-2">Your Name *</label>
                  <input type="text" required name="name" placeholder="Sarah Jenkins" class="w-full px-4 py-3 rounded-xl bg-[#160f0b]/90 border border-amber-900/40 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-mono text-stone-300 mb-2">Email Address *</label>
                  <input type="email" required name="email" placeholder="sarah@company.com" class="w-full px-4 py-3 rounded-xl bg-[#160f0b]/90 border border-amber-900/40 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono text-stone-300 mb-2">Subject / Inquiry Type</label>
                <select name="subject" class="w-full px-4 py-3 rounded-xl bg-[#160f0b]/90 border border-amber-900/40 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm">
                  <option value="web-dev">End-to-end Web Application Development</option>
                  <option value="frontend-3d">Frontend & Interactive 3D WebGL</option>
                  <option value="job-offer">Career Opportunity / Full-time Role</option>
                  <option value="consulting">Architecture Consulting / Other</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-mono text-stone-300 mb-2">Project Details *</label>
                <textarea required name="message" rows="4" placeholder="Describe your vision, timeline, or requirements..." class="w-full px-4 py-3 rounded-xl bg-[#160f0b]/90 border border-amber-900/40 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm"></textarea>
              </div>

              <div class="flex items-center justify-between pt-2">
                <div class="text-xs text-stone-400 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Replies within 24 hours</span>
                </div>

                <button type="submit" id="contact-submit-btn" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-600/20 transition-all flex items-center gap-2">
                  <span>Send Message</span>
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>

            <div id="contact-toast" class="hidden mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-center gap-3">
              <svg class="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Thank you for reaching out! I'll get back to you shortly.</span>
            </div>

          </div>
        </div>

      </div>

      <!-- Footer -->
      <footer class="mt-28 pt-8 border-t border-amber-900/30 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div>
          © 2026 ${portfolioData.personal.englishName}. Built with Three.js & Tailwind CSS.
        </div>
        <div class="flex items-center gap-6">
          <a href="#hero" class="text-amber-400 hover:underline flex items-center gap-1">
            <span>Back to top</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </footer>

    </div>
  `;

  const form = section.querySelector('#contact-form');
  const toast = section.querySelector('#contact-toast');
  const copyBtn = section.querySelector('.copy-email-btn');

  copyBtn.addEventListener('click', () => {
    sound.playClick();
    navigator.clipboard.writeText(portfolioData.personal.email);
    copyBtn.innerHTML = `
      <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    `;
    setTimeout(() => {
      copyBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `;
    }, 2000);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sound.playSuccess();

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#d97706', '#b45309', '#fde68a', '#ffffff']
    });

    toast.classList.remove('hidden');
    form.reset();

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 6000);
  });

  return section;
}
