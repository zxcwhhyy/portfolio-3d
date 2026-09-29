export const portfolioData = {
  personal: {
    name: "Ilya",
    englishName: "Ilya",
    nickname: "whhyy.dev",
    role: "Fullstack & Creative Web Developer",
    status: "🟢 Available for new projects & opportunities",
    tagline: "Crafting high-performance, modern, and visually engaging web applications at the intersection of 3D graphics, responsive design, and clean code.",
    location: "Worldwide / Remote",
    email: "ilya@whhyy.dev",
    telegram: "https://t.me/whhyy_dev",
    github: "https://github.com/zxcwhhyy",
    linkedin: "https://linkedin.com/in/whhyy-dev",
    resumeLink: "#",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: [
      "Hello! I am Ilya (whhyy.dev), a fullstack web developer passionate about modern web technologies, interactive 3D graphics, and resilient scalable systems.",
      "I engineer end-to-end web applications, real-time dashboards, WebGL experiences, and robust backend APIs with clean, modular architecture.",
      "My core focus is lightning-fast performance, intuitive user experience, accessibility, and high visual standards."
    ]
  },

  stats: [
    { label: "Years of Commercial Exp", value: "3+" },
    { label: "Completed Projects", value: "28+" },
    { label: "Client Satisfaction", value: "99%" },
    { label: "Clean Lines of Code", value: "250K+" }
  ],

  skillCategories: [
    {
      name: "Frontend & UI",
      icon: "Code2",
      description: "Building responsive, blazing-fast, and accessible user interfaces",
      skills: [
        { name: "JavaScript (ESNext)", level: 95, color: "#f7df1e" },
        { name: "TypeScript", level: 90, color: "#3178c6" },
        { name: "React / Next.js", level: 92, color: "#61dafb" },
        { name: "Vue.js / Nuxt", level: 80, color: "#42b883" },
        { name: "Tailwind CSS / SCSS", level: 95, color: "#38bdf8" },
        { name: "Redux Toolkit / Zustand", level: 88, color: "#764abc" }
      ]
    },
    {
      name: "3D & Creative Web",
      icon: "Boxes",
      description: "Interactive 3D graphics, smooth shaders, and real-time animations in the browser",
      skills: [
        { name: "Three.js / WebGL", level: 85, color: "#38bdf8" },
        { name: "GLSL Shaders", level: 75, color: "#818cf8" },
        { name: "GSAP / Framer Motion", level: 90, color: "#a855f7" },
        { name: "Canvas API & Math", level: 88, color: "#34d399" }
      ]
    },
    {
      name: "Backend & API",
      icon: "Server",
      description: "Server architecture, microservices, REST/GraphQL APIs, and database design",
      skills: [
        { name: "Node.js / Express", level: 88, color: "#68a063" },
        { name: "NestJS", level: 82, color: "#ea2845" },
        { name: "PostgreSQL / Prisma / TypeORM", level: 85, color: "#336791" },
        { name: "MongoDB / Redis", level: 80, color: "#47a248" },
        { name: "RESTful & GraphQL API", level: 90, color: "#e535ab" }
      ]
    },
    {
      name: "DevOps & Tooling",
      icon: "Cpu",
      description: "Containerization, CI/CD automation, cloud deployment, and workflow optimization",
      skills: [
        { name: "Git / GitHub Actions", level: 92, color: "#f05032" },
        { name: "Docker & Docker Compose", level: 80, color: "#2496ed" },
        { name: "Vite / Webpack", level: 88, color: "#646cff" },
        { name: "Linux / Nginx / Cloud VPS", level: 78, color: "#fcc624" }
      ]
    }
  ],

  projects: [
    {
      id: "cyber-hub",
      title: "Nexus Dashboard & AI Analytics",
      category: "Fullstack",
      description: "Enterprise analytics platform with real-time WebSocket telemetry, automated LLM-driven anomaly detection, and highly customizable interactive dashboards.",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Socket.io"],
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      stats: "⚡ 60 FPS • 10K+ RPS • 99.9% Uptime",
      github: "https://github.com/zxcwhhyy/nexus-dashboard",
      live: "/demos/nexus/index.html",
      featured: true
    },
    {
      id: "spatial-3d-shop",
      title: "Spatial 3D E-Commerce Showcase",
      category: "3D & Creative",
      description: "Interactive 3D product configurator built with Three.js, featuring real-time PBR material customization, studio lighting simulation, and seamless mobile touch controls.",
      tags: ["Three.js", "WebGL", "React", "GSAP", "TailwindCSS"],
      gradient: "from-purple-600 via-pink-500 to-rose-400",
      stats: "🎨 3D Realtime • PBR Materials • 60 FPS",
      github: "https://github.com/zxcwhhyy/spatial-3d-audio",
      live: "/demos/spatial/index.html",
      featured: true
    },
    {
      id: "fintech-cloud",
      title: "FinFlow: Smart Wealth & Asset Tracker",
      category: "Fullstack",
      description: "Secure fintech web application for real-time asset monitoring, multi-currency transactions, and portfolio analytics with end-to-end encrypted session tokens.",
      tags: ["React", "NestJS", "PostgreSQL", "Redis", "Docker", "Chart.js"],
      gradient: "from-emerald-600 via-teal-500 to-cyan-400",
      stats: "🔒 End-to-End Auth • Instant Sync",
      github: "https://github.com/zxcwhhyy/finflow-wealth-os",
      live: "/demos/finflow/index.html",
      featured: true
    },
    {
      id: "ai-code-companion",
      title: "Synapse AI: Developer Workspace",
      category: "AI & Tools",
      description: "Intelligent code analysis and refactoring interface featuring AST parsing, automated test generation, and deep IDE integration via lightweight extensions.",
      tags: ["TypeScript", "OpenAI API", "FastAPI", "React", "Monaco Editor"],
      gradient: "from-amber-500 via-orange-600 to-red-500",
      stats: "🤖 5+ LLM Models • AST Parsing",
      github: "https://github.com/zxcwhhyy/synapse-ai-studio",
      live: "/demos/synapse/index.html",
      featured: true
    }
  ],

  experience: [
    {
      period: "2023 — Present",
      role: "Senior Frontend / Fullstack Developer",
      company: "TechNova Studio",
      description: "Spearheaded the development of high-load customer-facing web platforms, integrated WebGL/Three.js interactive modules, and optimized Core Web Vitals to 95+ score across all devices."
    },
    {
      period: "2021 — 2023",
      role: "Frontend Developer",
      company: "Digital Horizon Labs",
      description: "Engineered scalable Single Page Applications using React and TypeScript, built a shared design system with reusable component libraries, and automated CI/CD deployment pipelines."
    },
    {
      period: "2020 — 2021",
      role: "Junior Web Developer",
      company: "WebCraft Agency",
      description: "Developed adaptive e-commerce storefronts and corporate portals, adhering to semantic HTML5, BEM methodology, and RESTful API integrations."
    }
  ],

  terminalCommands: {
    help: "Available commands:\n  • bio          - Learn about my background\n  • skills       - View core technical stack\n  • projects     - Inspect featured projects\n  • contact      - Get my direct contact info\n  • matrix       - Toggle the Matrix digital rain\n  • clear        - Clear terminal console",
    bio: "Ilya (whhyy.dev) — Fullstack Web Developer.\nSpecialization: React/Next.js, Node.js, TypeScript, Three.js 3D WebGL.\nFocused on high performance, elegant UI, and scalable architecture.",
    skills: "Frontend: React, Next.js, TypeScript, TailwindCSS\nBackend: Node.js, NestJS, PostgreSQL, Redis, Docker\n3D & Creative: Three.js, WebGL, GLSL, GSAP",
    projects: "1. Nexus Dashboard - Real-time AI analytics & telemetry\n2. Spatial 3D Shop - Real-time 3D product configurator\n3. FinFlow - Secure fintech wealth management platform\n4. Synapse AI - Intelligent developer workspace & AST tools",
    contact: "Email: ilya@whhyy.dev\nTelegram: @whhyy_dev\nGitHub: github.com/zxcwhhyy\nPortfolio: whhyy.dev"
  }
};
