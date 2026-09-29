export const PROFILE = {
  name: 'Abdullah Mukadam',
  title: 'Fullstack Developer',
  secondaryTitle: 'Design Engineer',
  location: 'India',
  bio: "I'm a 22-year-old engineer from India who thrives in the chaos of fast-paced startups. I build full-stack products end to end, and care a lot about the interface layer most engineers treat as an afterthought.",
  avatar: 'img/avatar.png',
  resumeUrl: 'resume.pdf',
  resumeLabel: 'Download Resume',
  email: 'abdullahmukadam21@gmail.com',
  phone: '+91 8668394220',
  github: 'https://github.com/AbdullahMukadam',
  linkedin: 'https://www.linkedin.com/in/abdullah-mukadam-a92aba204'
}

export const EDUCATION = {
  school: 'Finolex Academy of Management and Technology',
  degree: 'B.E. in Electronics & Telecommunication',
  duration: '2022 - 2025',
  location: 'Ratnagiri, Maharashtra'
}

export const ACHIEVEMENTS = [
  {
    name: '2nd Place, College Project Competition',
    note: '2025, 150+ participants',
    url: 'https://drive.google.com/file/d/1c0RiyFh04SIvuGMehMDrSyMkUMr_X5bH/view?usp=drive_link'
  },
  {
    name: 'Published Research Paper',
    note: 'National Conference, 2025, IoT Automation',
    url: 'https://drive.google.com/file/d/1FX04B5c18Vn81-84qwIMId68mpnnWrnQ/view?usp=drive_link'
  }
]

export const HUD = {
  careerHealth: 72,
  projectMana: 48
}

export const EXPERIENCE = [
  {
    title: 'Software Engineer Intern',
    company: 'YourToken',
    url: 'https://yourtoken.io',
    location: 'Remote',
    duration: 'Feb 2026 - Aug 2026',
    quests: [
      'Built and published a Shopify embedded app from scratch using Polaris web components, React Router and TanStack Query, meeting Shopify app review standards',
      'Integrated the Shopify Admin GraphQL API and built REST services with NestJS, serving 500K+ users in production',
      'Shipped a custom product selector modal handling 500+ products at once on a production Remix application'
    ]
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Lawvriksh',
    url: 'https://www.lawvriksh.com',
    location: 'Remote',
    duration: 'Sep 2025 - Nov 2025',
    quests: [
      'Built the product end to end in Next.js with role-based access control and AI-powered features',
      'Scaled file uploads with batch processing to Amazon S3 and real-time progress updates over WebSockets',
      'Shipped a block-style rich text editor with auto-save, AI suggestions and grammar correction'
    ]
  }
]

export const SKILL_ROOTS = [
  {
    id: 'frontend',
    name: 'Frontend',
    level: 95,
    children: [
      { id: 'typescript', name: 'TypeScript', level: 92 },
      { id: 'nextjs', name: 'Next.js', level: 90 },
      { id: 'tailwind', name: 'Tailwind', level: 88 }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    level: 90,
    children: [
      { id: 'graphql', name: 'GraphQL', level: 82 },
      { id: 'postgres', name: 'PostgreSQL', level: 80 },
      { id: 'prisma', name: 'Prisma', level: 74 }
    ]
  },
  {
    id: 'platform',
    name: 'Platform',
    level: 88,
    children: [
      { id: 'shopify', name: 'Shopify', level: 85 },
      { id: 'remix', name: 'Remix', level: 78 },
      { id: 'docker', name: 'Docker', level: 76 }
    ]
  }
]

export const PROJECTS = [
  {
    id: 'metaverse',
    title: '2D Metaverse',
    blurb: 'A 2D virtual world where players meet in real time, with chat, character selection and a built-in music player.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io'],
    url: 'https://2dverse.vercel.app/',
    code: 'https://github.com/AbdullahMukadam/metaverse',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'studioflow',
    title: 'StudioFlow',
    blurb: 'An all-in-one platform for freelance designers, with lead management, Kanban boards, a proposal builder and invoice generation.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    url: 'https://crm-studioflow.vercel.app',
    code: 'https://github.com/AbdullahMukadam/crm',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'editorcn',
    title: 'Rich Text Editors',
    blurb: 'Open-source Tiptap components for the shadcn/ui ecosystem: a toolbar editor and a Notion-style block editor with slash commands.',
    stack: ['Tiptap', 'Shadcn-ui', 'Tailwind CSS'],
    url: 'https://editorcn.vercel.app',
    code: 'https://github.com/shadcn-labs/editorcn',
    status: 'Live',
    year: '2026'
  },
  {
    id: 'transition-kit',
    title: 'Transition Kit',
    blurb: 'A page transition and theme toggle library for the modern web.',
    stack: ['Shadcn-ui', 'CSS'],
    url: 'https://transition-kit.space',
    code: 'https://github.com/AbdullahMukadam/Transition-kit',
    status: 'Live',
    year: '2026'
  },
  {
    id: 'formscn',
    title: 'Shadcn Form Builder',
    blurb: 'A Shadcn-based form builder with schema-driven validation.',
    stack: ['React Hook Form', 'Shadcn-ui', 'Tailwind CSS', 'Better-auth'],
    url: 'https://www.formscn.space/',
    code: 'https://github.com/AbdullahMukadam/formscn',
    status: 'Live',
    year: '2026'
  },
  {
    id: 'zexhub',
    title: 'Zexhub',
    blurb: 'An all-in-one developer ecosystem: build portfolios, generate CSS assets, explore UI components, and ship faster.',
    stack: ['React', 'Javascript', 'Tailwind CSS'],
    url: 'https://www.zexhub.space',
    code: 'https://github.com/AbdullahMukadam/ZexHub',
    status: 'Live',
    year: '2026'
  },
  {
    id: 'questly',
    title: 'Questly AI',
    blurb: 'An AI mock interviewer with interview feedback, custom interview generation and performance analysis.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    url: 'https://questly-ai.vercel.app/',
    code: 'https://github.com/AbdullahMukadam/QuestlyAi',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'job-portal',
    title: 'Job Portal App',
    blurb: 'A full-stack job portal with automated email, dashboards and payment gateway integration.',
    stack: ['Stripe', 'Clerk', 'TypeScript', 'MongoDB'],
    url: 'https://job-portal-app-test.vercel.app/',
    code: 'https://github.com/AbdullahMukadam/Job-portal-app',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'voice-assistant',
    title: 'Voice Assistant',
    blurb: 'Turns any web app into a voice-enabled experience with contextual AI that understands on-screen content.',
    stack: ['Javascript', 'Web Speech API', 'AI', 'NPM'],
    url: 'https://www.npmjs.com/package/speak-bich',
    code: 'https://github.com/AbdullahMukadam/web_voice_assistant',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'women-safety',
    title: 'Women Safety App',
    blurb: 'A full-stack safety app with SOS and emergency alerts, plus safe places and live chat.',
    stack: ['React', 'Redux', 'MongoDB', 'Cloudinary'],
    url: 'https://woman-safety-app.vercel.app/',
    code: 'https://github.com/AbdullahMukadam/Woman-Safety-App',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'portfolio-builder',
    title: 'Portfolio Builder',
    blurb: 'A no-code portfolio website builder with live preview and downloadable source code.',
    stack: ['React', 'JSZip', 'Tailwind CSS', 'Vercel'],
    url: 'https://portfolio-website-builder.vercel.app',
    code: 'https://github.com/AbdullahMukadam/Portfolio-Website-Builder',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'superman',
    title: 'Superman Extension',
    blurb: 'A Chrome extension for writing, summarising and replying to email using AI.',
    stack: ['Chrome API', 'Javascript', 'AI'],
    code: 'https://github.com/AbdullahMukadam/Superman',
    status: 'In Development',
    year: '2024'
  },
  {
    id: 'video-calling',
    title: 'Video Calling App',
    blurb: 'A one-on-one real-time video calling app built on WebRTC and Socket.io.',
    stack: ['WebRTC', 'Socket.io', 'Node.js', 'Javascript'],
    code: 'https://github.com/AbdullahMukadam/Video-calling',
    status: 'In Development',
    year: '2024'
  },
  {
    id: 'writing-buddy',
    title: 'Writing Buddy',
    blurb: 'A minimal cloud-based notes app for securely storing important writing.',
    stack: ['React', 'Firebase', 'Redux', 'Tailwind CSS'],
    url: 'https://writing-buddy-livid.vercel.app/login',
    code: 'https://github.com/AbdullahMukadam/Writing-Buddy',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'gsap-website',
    title: 'GSAP Website',
    blurb: 'A GSAP-powered site built purely for animation practice.',
    stack: ['GSAP', 'HTML', 'CSS', 'Javascript'],
    url: 'https://abdullahmukadam.github.io/gsap-website-canvas-/',
    code: 'https://abdullahmukadam.github.io/gsap-website-canvas-/',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'blogger',
    title: 'Blogger',
    blurb: 'A full-stack blogging platform to create, publish and manage posts.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://blogger-abdullah-mukadams-projects.vercel.app/',
    code: 'https://github.com/AbdullahMukadam/Blogger',
    status: 'Live',
    year: '2024'
  },
  {
    id: 'hackerman',
    title: 'HackerMan Simulator',
    blurb: 'A hacking simulator that mimics a real terminal environment.',
    stack: ['Javascript', 'HTML', 'CSS'],
    code: 'https://github.com/AbdullahMukadam/hackerman-simulator',
    status: 'Live',
    year: '2024'
  }
]

export const GALLERY = [
  {
    id: 'theme-toggle',
    title: 'Theme Toggle',
    blurb: 'A theme toggle transition, built for the fun of it.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    year: '2026'
  },
  {
    id: 'hero-section',
    title: 'Hero Section',
    blurb: 'An ecommerce hero section built with React, Tailwind, Framer Motion and GSAP.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    year: '2026'
  },
  {
    id: 'logistic-dashboard',
    title: 'Logistics Dashboard',
    blurb: 'An animated dashboard built with React, Tailwind and Framer Motion.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    year: '2026'
  },
  {
    id: 'cards',
    title: 'Cards',
    blurb: 'A set of hover-animated cards.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    year: '2026'
  },
  {
    id: 'dashboard',
    title: 'Dashboard UI',
    blurb: 'A dashboard layout with charts and a dark data grid.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'ReCharts'],
    status: 'Live',
    year: '2025'
  },
  {
    id: 'neobrutal-card',
    title: 'Neubrutalist Card',
    blurb: 'A neubrutalist card component.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    year: '2026'
  },
  {
    id: 'studioflow-dashboard',
    title: 'StudioFlow Dashboard',
    blurb: 'The dashboard screen from StudioFlow.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'ReCharts'],
    url: 'https://crm-studioflow.vercel.app',
    code: 'https://github.com/AbdullahMukadam/crm',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'email-card',
    title: 'Email Component',
    blurb: 'An email card component built with Tailwind.',
    stack: ['React', 'Tailwind CSS'],
    status: 'Live',
    year: '2024'
  },
  {
    id: 'saas-landing',
    title: 'SaaS Landing Page',
    blurb: 'A SaaS landing page built with Framer Motion and Tailwind.',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    year: '2024'
  },
  {
    id: 'mobile-ui',
    title: 'Mobile UI',
    blurb: 'A mobile screen recreation.',
    stack: ['React', 'Tailwind CSS'],
    status: 'Live',
    year: '2024'
  },
  {
    id: 'retro-portfolio',
    title: 'Retro Portfolio',
    blurb: 'A retro-styled portfolio, and the seed for the site you are standing in.',
    stack: ['React', 'Tailwind CSS', 'GSAP'],
    status: 'In Development',
    year: '2024'
  }
]

export const PLAYER_STATS = [
  { name: 'Problem Solving', value: 90 },
  { name: 'Creativity', value: 78 },
  { name: 'Code Quality', value: 88 }
]

export const VAULT_ITEMS = [
  { name: 'Resume', kind: 'Document', note: 'Full CV, PDF', url: 'resume.pdf' },
  { name: 'GitHub', kind: 'Profile', note: 'Source for everything here', url: PROFILE.github },
  { name: 'LinkedIn', kind: 'Profile', note: 'Professional history', url: PROFILE.linkedin },
  { name: 'Email', kind: 'Contact', note: PROFILE.email, url: `mailto:${PROFILE.email}` },
  { name: 'Phone', kind: 'Contact', note: PROFILE.phone, url: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
  { name: 'Education', kind: 'Credential', note: `${EDUCATION.degree}, ${EDUCATION.duration}` },
  ...ACHIEVEMENTS.map((item) => ({
    name: item.name,
    kind: 'Award',
    note: item.note,
    url: item.url
  }))
]

export const TECH_COLORS = {
  'Next.js': '#ffffff',
  React: '#61DAFB',
  TypeScript: '#3178C6',
  Javascript: '#F7DF1E',
  'Tailwind CSS': '#06B6D4',
  'Framer Motion': '#0055FF',
  'Shadcn-ui': '#18181b',
  Tiptap: '#68D391',
  'Node.js': '#339933',
  'PostgreSQL': '#4169E1',
  MongoDB: '#47A248',
  Redis: '#DC382D',
  Prisma: '#C5F74F',
  'Socket.io': '#010101',
  Express: '#ffffff',
  Pusher: '#3a1520',
  Stripe: '#635BFF',
  Clerk: '#6C47FF',
  'React Hook Form': '#ec5990',
  'Better-auth': '#10B981',
  'Web Speech API': '#4285F4',
  AI: '#10A37F',
  NPM: '#CB3837',
  JSZip: '#f7b731',
  Vercel: '#ffffff',
  Cloudinary: '#3448C5',
  Redux: '#764ABC',
  Fast2Sms: '#ff6b35',
  WebRTC: '#1a73e8',
  Firebase: '#FFCA28',
  GSAP: '#0AE448',
  HTML: '#e34f26',
  CSS: '#1572b6',
  'Chrome API': '#4285F4'
}
