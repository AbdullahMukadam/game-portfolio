// Clean, crisp vector icon system based on standard Lucide icons (24x24 viewBox, stroke-based)

const ICONS = {
  heart: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
  droplet: `<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>`,
  settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
  shield: `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`,
  sword: `<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m19 21 2-2"/>`,
  swords: `<path d="m14 10-2-2"/><path d="m20 4-4 4"/><path d="m17 7 3-3"/><path d="m10 14-2-2"/><path d="m4 20 4-4"/><path d="m7 17-3 3"/><path d="m18 10 3 3-8 8-3-3 8-8Z"/><path d="m6 14-3-3 8-8 3 3-8 8Z"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>`,
  package: `<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>`,
  scroll: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>`,
  mapPin: `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  building: `<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>`,
  externalLink: `<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>`,
  code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  github: `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>`,
  linkedin: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>`,
  mail: `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`,
  brain: `<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M12 18v4"/>`,
  gem: `<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>`,
  palette: `<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>`,
  compass: `<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>`,
  music: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
  volume2: `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`,
  volumeX: `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>`,
  rotateCcw: `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>`,
  gamepad: `<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>`,
  move: `<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>`,
  check: `<polyline points="20 6 9 17 4 12"/>`,
  circleDot: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/>`,
  x: `<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>`
}

export function icon(name, { size = 16, className = '', strokeWidth = 2 } = {}) {
  const content = ICONS[name]
  if (!content) {
    console.warn(`Icon "${name}" not found in icons library.`)
    return ''
  }
  return `<svg class="ui-icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${content}</svg>`
}

export function createIconElement(name, options = {}) {
  const span = document.createElement('span')
  span.className = `icon-wrap ${options.wrapperClass || ''}`
  span.innerHTML = icon(name, options)
  return span
}

/* ==========================================================================
   Technology Brand Icons for Skills & Tech Stack Chips
   ========================================================================== */

const TECH_ICONS = {
  typescript: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="22" height="22" x="1" y="1" rx="4" fill="#3178c6"/>
      <path d="M5.5 10h6m-3 0v7.5" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M14 17.5c1.8 0 2.8-.9 2.8-2.2 0-1.2-1.1-1.7-2.2-2-1-.3-1.6-.7-1.6-1.4 0-.8.8-1.4 1.8-1.4 1.1 0 1.9.5 2.2 1" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>`,

  nextjs: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000000"/>
      <path d="M7.5 7.5v9M7.5 7.5l9 10M16.5 7.5v6" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  tailwind: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="#06b6d4" aria-hidden="true">
      <path d="M12 7.5c-2.4 0-3.9 1.2-5.1 3.6 1.2-1.2 2.7-1.6 4.2-1.6 1.8 0 2.7.9 3.6 2.2 1.4 1.8 2.8 2.8 5.1 2.8 2.4 0 3.9-1.2 5.1-3.6-1.2 1.2-2.7 1.6-4.2 1.6-1.8 0-2.7-.9-3.6-2.2-1.4-1.8-2.8-2.8-5.1-2.8zM6.9 12.5c-2.4 0-3.9 1.2-5.1 3.6 1.2-1.2 2.7-1.6 4.2-1.6 1.8 0 2.7.9 3.6 2.2 1.4 1.8 2.8 2.8 5.1 2.8 2.4 0 3.9-1.2 5.1-3.6-1.2 1.2-2.7 1.6-4.2 1.6-1.8 0-2.7-.9-3.6-2.2-1.4-1.8-2.8-2.8-5.1-2.8z"/>
    </svg>`,

  graphql: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#e10098" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2.5 20.2 7.2 20.2 16.8 12 21.5 3.8 16.8 3.8 7.2"/>
      <circle cx="12" cy="2.5" r="1.5" fill="#e10098"/>
      <circle cx="20.2" cy="7.2" r="1.5" fill="#e10098"/>
      <circle cx="20.2" cy="16.8" r="1.5" fill="#e10098"/>
      <circle cx="12" cy="21.5" r="1.5" fill="#e10098"/>
      <circle cx="3.8" cy="16.8" r="1.5" fill="#e10098"/>
      <circle cx="3.8" cy="7.2" r="1.5" fill="#e10098"/>
      <line x1="3.8" y1="7.2" x2="20.2" y2="16.8"/>
      <line x1="20.2" y1="7.2" x2="3.8" y2="16.8"/>
      <line x1="12" y1="2.5" x2="12" y2="21.5"/>
    </svg>`,

  postgres: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#336791" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" fill="#e0f2fe"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
    </svg>`,

  prisma: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 3 17.5 7.5 22 21 8.5 12 2Z" fill="#1a202c"/>
      <path d="M12 2 7.5 22 3 17.5 12 2Z" fill="#5a67d8"/>
      <path d="M12 2 21 8.5 7.5 22 12 2Z" fill="#2d3748"/>
    </svg>`,

  shopify: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.5 6.5h-2.8a3.7 3.7 0 0 0-7.4 0H5.5L4 20.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5L18.5 6.5Z" fill="#95bf47"/>
      <path d="M10.2 6.5a1.8 1.8 0 0 1 3.6 0" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M13.2 11.2c-.4-.4-1.1-.6-1.7-.4-.7.3-.9.9-.5 1.5.5.6 1.8.8 1.8 1.8 0 .9-.8 1.5-1.8 1.5-1 0-1.7-.5-2-1.1" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,

  remix: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="22" height="22" x="1" y="1" rx="4" fill="#121212"/>
      <path d="M7 6h5.2a3.3 3.3 0 0 1 0 6.6H7V6Z" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M7 12.6v5.4m5.2-5.4 4.8 5.4" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,

  docker: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 13.5c1.5 0 2.5.5 4 0 1.5-.5 2.5-.5 4 0 1.5.5 2.5.5 4 0 1.5-.5 2.5-.5 4 0 1 .3 2.5 1.2 2.5 2.5 0 2.8-4.5 5.5-11 5.5S2 18.5 2 15.5c0-.8.2-1.5.5-2Z" fill="#2496ed"/>
      <rect x="6.5" y="9.5" width="2.5" height="2.5" fill="#ffffff" rx=".3"/>
      <rect x="10" y="9.5" width="2.5" height="2.5" fill="#ffffff" rx=".3"/>
      <rect x="13.5" y="9.5" width="2.5" height="2.5" fill="#ffffff" rx=".3"/>
      <rect x="10" y="6" width="2.5" height="2.5" fill="#ffffff" rx=".3"/>
    </svg>`,

  react: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#61dafb" stroke-width="1.8" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="1.8" fill="#61dafb"/>
    </svg>`,

  node: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#339933" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2.5 20.5 7.4v9.8L12 22.1 3.5 17.2V7.4L12 2.5Z" fill="#f0fdf4"/>
      <path d="M12 7.5v9M8 9.5l4-2 4 2M8 15l4 2 4-2"/>
    </svg>`,

  socketio: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#010101"/>
      <polygon points="13 3 5 14 11 14 10 21 19 10 13 10 13 3" fill="#ffffff"/>
    </svg>`,

  tiptap: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="22" height="22" x="1" y="1" rx="4" fill="#68d391"/>
      <path d="M6 8h12M12 8v10" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,

  shadcnui: (size, cls) => `
    <svg class="tech-icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="22" height="22" x="1" y="1" rx="4" fill="#18181b"/>
      <line x1="4" y1="20" x2="20" y2="4" stroke="#ffffff" stroke-width="2"/>
      <polygon points="4 4 12 4 4 12" fill="#ffffff"/>
    </svg>`
}

// Aliases
TECH_ICONS.ts = TECH_ICONS.typescript
TECH_ICONS.next = TECH_ICONS.nextjs
TECH_ICONS.tailwindcss = TECH_ICONS.tailwind
TECH_ICONS.postgresql = TECH_ICONS.postgres
TECH_ICONS.nodejs = TECH_ICONS.node
TECH_ICONS.shadcn = TECH_ICONS.shadcnui
TECH_ICONS['shadcn-ui'] = TECH_ICONS.shadcnui

export function techIcon(idOrName, { size = 16, className = '' } = {}) {
  const key = String(idOrName || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

  const renderer = TECH_ICONS[key] || TECH_ICONS[idOrName]
  if (renderer) {
    return renderer(size, className)
  }

  // Fallback to crisp generic tech code icon
  return icon('code', { size, className })
}
