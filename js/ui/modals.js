import {
  ACHIEVEMENTS,
  EDUCATION,
  EXPERIENCE,
  GALLERY,
  PLAYER_STATS,
  PROFILE,
  PROJECTS,
  SKILL_ROOTS,
  TECH_COLORS,
  VAULT_ITEMS
} from '../../data/portfolio.js'
import { icon, techIcon } from './icons.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/* Must mirror the .skilltree single-column breakpoint in modals.css. When the
   tree stacks, parent-to-child links would be drawn through the nodes. */
const STACKED_TREE_QUERY = '(max-width: 700px), (hover: none) and (pointer: coarse)'

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function button(className, text) {
  const node = el('button', className, text)
  node.type = 'button'
  return node
}

function link(className, text, href, download) {
  const node = el('a', className)
  node.href = href
  if (typeof text === 'string') {
    node.innerHTML = text
  } else if (text) {
    node.append(text)
  }
  if (download) node.setAttribute('download', '')
  return node
}

function chip(text) {
  const node = el('li', 'forge__chip')
  const iconHtml = techIcon(text, { size: 12, className: 'chip__icon' })
  node.innerHTML = `${iconHtml}<span>${text}</span>`
  const color = TECH_COLORS[text]
  if (color) node.style.setProperty('--chip', color)
  return node
}

function buildGuild(body) {
  const intro = el('section', 'slab guild__intro')
  intro.append(el('span', 'slab__label', 'The Adventurer Dossier'))
  intro.append(el('p', 'guild__bio', PROFILE.bio))
  body.append(intro)

  const sectionHead = el('div', 'guild__section-head')
  sectionHead.append(el('span', 'slab__label', 'Career Quests & Chronicles'))
  body.append(sectionHead)

  EXPERIENCE.forEach((role, idx) => {
    const entry = el('article', 'quest')

    const head = el('div', 'quest__header')
    const heading = el('h3', 'quest__title')
    if (role.url) {
      const title = link('quest__link', role.title, role.url)
      heading.append(title)
    } else {
      heading.textContent = role.title
    }
    const badge = el('span', idx === 0 ? 'quest__badge quest__badge--active' : 'quest__badge')
    badge.innerHTML = `${icon(idx === 0 ? 'circleDot' : 'check', { size: 10 })} <span>${idx === 0 ? 'Active Quest' : 'Completed'}</span>`
    head.append(heading, badge)
    entry.append(head)

    const meta = el('div', 'quest__meta')
    const compSpan = el('span', 'quest__company')
    compSpan.innerHTML = `${icon('building', { size: 12 })} <span>${role.company}</span>`

    const locSpan = el('span', 'quest__location')
    locSpan.innerHTML = `${icon('mapPin', { size: 12 })} <span>${role.location}</span>`

    const durSpan = el('span', 'quest__duration')
    durSpan.innerHTML = `${icon('clock', { size: 12 })} <span>${role.duration}</span>`

    meta.append(compSpan, locSpan, durSpan)
    entry.append(meta)

    const list = el('ul', 'quest__list')
    role.quests.forEach((quest) => list.append(el('li', null, quest)))
    entry.append(list)

    body.append(entry)
  })
}

const PILLAR_CONFIG = {
  frontend: { iconName: 'shield', domain: 'Client Realm' },
  backend: { iconName: 'swords', domain: 'Server Citadel' },
  platform: { iconName: 'code', domain: 'Cloud & Engine' }
}

function buildSkills(body) {
  const tree = el('div', 'skilltree')
  const links = document.createElementNS(SVG_NS, 'svg')
  links.setAttribute('class', 'skilltree__links')
  links.setAttribute('aria-hidden', 'true')

  tree.append(links)

  function node({ id, name, parent, isChild }) {
    const item = el('div', isChild ? 'node node--child' : 'node node--root')
    item.dataset.node = id
    if (parent) item.dataset.parent = parent

    const iconSpan = el('span', 'node__icon')
    if (isChild) {
      iconSpan.innerHTML = techIcon(id, { size: 18, className: 'node__tech-icon' })
    } else {
      iconSpan.innerHTML = icon(PILLAR_CONFIG[id]?.iconName || 'shield', { size: 15 })
    }
    const nameSpan = el('span', 'node__name', name)
    const tagSpan = el('span', 'node__tag', isChild ? 'Skill' : 'Mastery')

    item.append(iconSpan, nameSpan, tagSpan)

    return item
  }

  SKILL_ROOTS.forEach((root) => {
    const column = el('div', 'skilltree__col')
    column.dataset.branch = root.id

    const banner = el('div', 'skilltree__pillar-head')
    banner.innerHTML = `
      <span class="skilltree__pillar-icon">${icon(PILLAR_CONFIG[root.id]?.iconName || 'shield', { size: 13 })}</span>
      <span class="skilltree__pillar-title">${PILLAR_CONFIG[root.id]?.domain || root.name}</span>
    `
    column.append(banner)

    column.append(node(root))

    root.children.forEach((child) => {
      column.append(node({ ...child, parent: root.id, isChild: true }))
    })

    tree.append(column)
  })

  body.append(tree)

  function drawLinks() {
    const stacked = window.matchMedia(STACKED_TREE_QUERY).matches

    /* `hidden` is an HTMLElement property; this is an SVGElement, so the IDL
       assignment would be a no-op and the attribute must be set directly. */
    if (stacked) {
      links.setAttribute('hidden', '')
      return
    }

    links.removeAttribute('hidden')

    const box = tree.getBoundingClientRect()
    links.textContent = ''

    if (box.width === 0) return

    tree.querySelectorAll('[data-parent]').forEach((child) => {
      const parent = tree.querySelector(`[data-node="${child.dataset.parent}"]`)
      if (!parent) return

      const from = parent.getBoundingClientRect()
      const to = child.getBoundingClientRect()

      const line = document.createElementNS(SVG_NS, 'line')
      line.setAttribute('x1', from.left + from.width / 2 - box.left)
      line.setAttribute('y1', from.bottom - box.top)
      line.setAttribute('x2', to.left + to.width / 2 - box.left)
      line.setAttribute('y2', to.top - box.top)
      links.append(line)
    })
  }

  return drawLinks
}

const FORGE_TABS = [
  { id: 'projects', label: 'Projects', iconName: 'swords', items: PROJECTS },
  { id: 'gallery', label: 'Gallery', iconName: 'palette', items: GALLERY }
]

function buildProjects(body) {
  const forge = el('div', 'forge')

  const tabs = el('div', 'tabs')
  tabs.setAttribute('role', 'tablist')
  const bar = el('div', 'forge__bar')
  const grid = el('div', 'forge__slots')
  grid.setAttribute('role', 'listbox')
  const details = el('div', 'slab forge__details')

  const mediaFrame = el('div', 'forge__media-frame')
  const title = el('h3', 'forge__title')
  const meta = el('p', 'forge__meta')
  const blurb = el('p', 'forge__blurb')
  const stack = el('ul', 'forge__stack')
  const actions = el('div', 'forge__actions')

  details.append(mediaFrame, title, meta, blurb, stack, actions)
  bar.append(tabs, grid)
  forge.append(bar, details)
  body.append(forge)

  const liveAction = link('pixel-button pixel-button--primary', `${icon('externalLink', { size: 13 })} <span>Launch Live Demo</span>`, '#')
  const codeAction = link('pixel-button pixel-button--secondary', `${icon('github', { size: 13 })} <span>Inspect Repository</span>`, '#')
  actions.append(liveAction, codeAction)

  const filters = el('div', 'filters')

  const yearGroup = el('div', 'filters__group')
  yearGroup.append(el('span', 'filters__label', 'Year'))
  const yearFilter = el('div', 'segmented')
  yearGroup.append(yearFilter)

  const statusGroup = el('div', 'filters__group')
  statusGroup.append(el('span', 'filters__label', 'Status'))
  const statusFilter = el('div', 'segmented')
  statusGroup.append(statusFilter)

  filters.append(yearGroup, statusGroup)
  bar.insertBefore(filters, grid)

  let activeTab = 'projects'
  let activeYear = 'all'
  let activeStatus = 'all'
  let buttons = []
  let selectedId = null

  function allYears() {
    return [...new Set(FORGE_TABS.flatMap((tab) => tab.items.map((i) => i.year)))].sort(
      (a, b) => Number(b) - Number(a)
    )
  }

  function currentItems() {
    const tab = FORGE_TABS.find((entry) => entry.id === activeTab)
    return tab.items.filter(
      (item) =>
        (activeYear === 'all' || item.year === activeYear) &&
        (activeStatus === 'all' || item.status === activeStatus)
    )
  }

  function setPressed(group, value) {
    group.querySelectorAll('button').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.value === value))
    })
  }

  function buildFilterGroup(group, values, onPick) {
    group.textContent = ''
    ;['all', ...values].forEach((value) => {
      const btn = button(null, value === 'all' ? 'All' : value)
      btn.dataset.value = value
      btn.setAttribute('aria-pressed', 'false')
      btn.addEventListener('click', () => onPick(value))
      group.append(btn)
    })
  }

  function renderMedia(container, item) {
    container.textContent = ''
    container.classList.remove('forge__media-frame--missing')

    if (!item.video && !item.imageSrc) {
      container.hidden = true
      return
    }
    container.hidden = false

    if (item.video) {
      const video = document.createElement('video')
      video.className = 'forge__media-video'
      video.src = item.video
      if (item.imageSrc) video.poster = item.imageSrc
      video.controls = true
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.setAttribute('preload', 'metadata')

      const badge = el('div', 'forge__media-badge')
      badge.innerHTML = `${icon('sparkles', { size: 10 })} <span>DEMO REEL</span>`

      container.append(video, badge)
    } else if (item.imageSrc) {
      const img = document.createElement('img')
      img.className = 'forge__media-image'
      img.src = item.imageSrc
      img.alt = `${item.title} Preview Screenshot`
      img.loading = 'lazy'

      img.onerror = () => {
        container.classList.add('forge__media-frame--missing')
        container.innerHTML = `
          <div class="forge__media-fallback">
            <span class="forge__media-fallback-icon">${icon('palette', { size: 24 })}</span>
            <span class="forge__media-fallback-title">${item.title}</span>
            <span class="forge__media-fallback-hint">Asset placed at: <code>${item.imageSrc}</code></span>
          </div>
        `
      }

      const badge = el('div', 'forge__media-badge')
      badge.innerHTML = `${icon('palette', { size: 10 })} <span>SCREENSHOT</span>`

      container.append(img, badge)
    }
  }

  function select(item) {
    if (!item) return
    selectedId = item.id

    buttons.forEach((btn) =>
      btn.setAttribute('aria-pressed', String(btn.dataset.id === item.id))
    )

    renderMedia(mediaFrame, item)

    title.textContent = item.title
    meta.textContent = [item.year, item.status].filter(Boolean).join(' · ')
    blurb.textContent = item.blurb
    stack.textContent = ''

    item.stack.filter(Boolean).forEach((tech) => stack.append(chip(tech)))

    bindAction(liveAction, item.url, 'Launch Live Demo', 'externalLink')
    bindAction(codeAction, item.code, 'Inspect Repository', 'github')
  }

  function bindAction(node, href, label, iconName) {
    if (href) {
      node.href = href
      node.innerHTML = `${icon(iconName, { size: 13 })} <span>${label}</span>`
      node.removeAttribute('aria-disabled')
      node.removeAttribute('title')
      node.classList.remove('pixel-button--disabled')
      return
    }

    node.removeAttribute('href')
    node.innerHTML = `${icon(iconName, { size: 13 })} <span>${label} (Soon)</span>`
    node.setAttribute('aria-disabled', 'true')
    node.classList.add('pixel-button--disabled')
    node.title = 'No link available yet'
  }

  function render() {
    const items = currentItems()

    grid.textContent = ''
    buttons = items.map((item) => {
      const slot = button('slot slot--card')
      slot.dataset.id = item.id
      slot.setAttribute('role', 'option')
      slot.setAttribute('aria-pressed', 'false')

      const thumb = el('div', 'slot__thumb')
      if (item.imageSrc) {
        const img = document.createElement('img')
        img.className = 'slot__thumb-img'
        img.src = item.imageSrc
        img.alt = item.title
        img.loading = 'lazy'
        thumb.append(img)
      } else {
        const placeholder = el('div', 'slot__thumb-placeholder')
        placeholder.innerHTML = icon(item.video ? 'sparkles' : 'palette', { size: 18 })
        thumb.append(placeholder)
      }

      if (item.video) {
        const vidBadge = el('span', 'slot__vid-tag')
        vidBadge.innerHTML = `${icon('sparkles', { size: 9 })} VIDEO`
        thumb.append(vidBadge)
      }

      const body = el('div', 'slot__body')
      const slotTitle = el('span', 'slot__title', item.title)
      const slotMeta = el('div', 'slot__meta-row')
      const slotStatus = el('span', `slot__status slot__status--${(item.status || 'live').toLowerCase()}`, item.status || 'Live')
      const slotYear = el('span', 'slot__year', item.year || '')
      slotMeta.append(slotStatus, slotYear)
      body.append(slotTitle, slotMeta)

      slot.append(thumb, body)
      slot.addEventListener('click', () => select(item))
      grid.append(slot)
      return slot
    })

    if (items.length === 0) {
      grid.append(el('p', 'forge__empty', 'Nothing matches that filter yet.'))
      return
    }

    const keep = items.find((item) => item.id === selectedId)
    select(keep || items[0])
  }

  FORGE_TABS.forEach((tab) => {
    const btn = button('tabs__tab')
    btn.innerHTML = `${icon(tab.iconName, { size: 13 })} <span>${tab.label}</span>`
    btn.dataset.tab = tab.id
    btn.setAttribute('role', 'tab')
    btn.setAttribute('aria-pressed', String(tab.id === activeTab))
    btn.addEventListener('click', () => {
      activeTab = tab.id
      selectedId = null
      tabs.querySelectorAll('button').forEach((other) => {
        other.setAttribute('aria-pressed', String(other.dataset.tab === activeTab))
      })
      render()
    })
    tabs.append(btn)
  })

  buildFilterGroup(yearFilter, allYears(), (value) => {
    activeYear = value
    setPressed(yearFilter, value)
    render()
  })
  setPressed(yearFilter, activeYear)

  const statuses = [...new Set(PROJECTS.map((item) => item.status))]
  buildFilterGroup(statusFilter, statuses, (value) => {
    activeStatus = value
    setPressed(statusFilter, value)
    render()
  })
  setPressed(statusFilter, activeStatus)

  render()
}

function buildVault(body) {
  const vault = el('div', 'vault')

  const portrait = el('div', 'vault__portrait')
  const avatarWrapper = el('div', 'vault__avatar-wrap')
  const avatar = el('img', 'vault__avatar')
  avatar.src = PROFILE.avatar
  avatar.alt = `${PROFILE.name} avatar`
  avatar.width = 54
  avatar.height = 76
  const lvlBadge = el('span', 'vault__lvl-tag', 'LV.99')
  avatarWrapper.append(avatar, lvlBadge)
  portrait.append(avatarWrapper)

  const who = el('div', 'vault__who')
  who.append(el('h3', 'vault__name', PROFILE.name))

  const role1 = el('p', 'vault__role')
  role1.innerHTML = `${icon('code', { size: 12 })} <span>${PROFILE.title}</span>`

  const role2 = el('p', 'vault__role vault__role--soft')
  role2.innerHTML = `${icon('shield', { size: 12 })} <span>${PROFILE.secondaryTitle}</span>`

  who.append(role1, role2)
  portrait.append(who)
  vault.append(portrait)

  const right = el('div', 'vault__content')

  const bio = el('section', 'slab')
  bio.append(el('span', 'slab__label', 'Adventurer Dossier'))
  bio.append(el('p', 'vault__bio', PROFILE.bio))
  right.append(bio)

  const stats = el('section', 'slab')
  stats.append(el('span', 'slab__label', 'Character Attributes & Vitality'))

  const statKeys = { 'Problem Solving': 'solving', Creativity: 'creativity', 'Code Quality': 'quality' }
  const statIcons = { 'Problem Solving': 'brain', Creativity: 'palette', 'Code Quality': 'gem' }

  PLAYER_STATS.forEach((stat) => {
    const row = el('div', 'stat')
    const labelBox = el('div', 'stat__label-box')
    labelBox.innerHTML = `
      <span class="stat__icon">${icon(statIcons[stat.name] || 'zap', { size: 13 })}</span>
      <span class="stat__label">${stat.name}</span>
    `
    row.append(labelBox)

    const track = el('span', 'stat__track')
    const fill = el('span', 'stat__fill')
    fill.style.width = `${stat.value}%`
    fill.dataset.stat = statKeys[stat.name] || 'solving'
    track.append(fill)
    row.append(track)

    row.append(el('span', 'stat__value', `${stat.value} / 100`))
    stats.append(row)
  })

  right.append(stats)

  const education = el('section', 'slab')
  education.append(el('span', 'slab__label', 'Academy & Training'))

  const schoolTitle = el('h3', 'forge__title')
  schoolTitle.innerHTML = `${icon('building', { size: 14 })} <span>${EDUCATION.school}</span>`

  const schoolBlurb = el('p', 'forge__blurb')
  schoolBlurb.innerHTML = `${icon('scroll', { size: 14 })} <span>${EDUCATION.degree}</span>`

  const schoolMeta = el('p', 'inventory__note')
  schoolMeta.innerHTML = `${icon('mapPin', { size: 12 })} <span>${EDUCATION.location}</span> · ${icon('clock', { size: 12 })} <span>${EDUCATION.duration}</span>`

  education.append(schoolTitle, schoolBlurb, schoolMeta)
  right.append(education)

  const items = el('section', 'slab')
  items.append(el('span', 'slab__label', 'Equipment & Artifacts'))

  const ITEM_ICONS = {
    Resume: 'scroll',
    GitHub: 'github',
    LinkedIn: 'linkedin',
    Email: 'mail'
  }

  const list = el('ul', 'inventory')
  VAULT_ITEMS.forEach((item) => {
    const row = el('li', 'inventory__item')
    const itemLeft = el('div', 'inventory__left')
    const iconSpan = el('span', 'inventory__icon')
    iconSpan.innerHTML = icon(ITEM_ICONS[item.name] || 'package', { size: 14 })
    itemLeft.append(iconSpan)

    if (item.url) {
      itemLeft.append(link('inventory__link', item.name, item.url, item.name === 'Resume'))
    } else {
      itemLeft.append(el('span', 'inventory__name', item.name))
    }

    row.append(itemLeft)
    row.append(el('span', 'inventory__note', item.note))
    list.append(row)
  })
  items.append(list)

  if (ACHIEVEMENTS.length) {
    items.append(el('span', 'slab__label slab__label--spaced', 'Honors & Medals'))
    const awards = el('ul', 'inventory')
    ACHIEVEMENTS.forEach((award) => {
      const row = el('li', 'inventory__item inventory__item--achievement')
      const itemLeft = el('div', 'inventory__left')
      const iconSpan = el('span', 'inventory__icon')
      iconSpan.innerHTML = icon('trophy', { size: 14 })
      itemLeft.append(iconSpan)

      if (award.url) {
        itemLeft.append(link('inventory__link', award.name, award.url))
      } else {
        itemLeft.append(el('span', 'inventory__name', award.name))
      }
      row.append(itemLeft)
      row.append(el('span', 'inventory__note', award.note))
      awards.append(row)
    })
    items.append(awards)
  }

  right.append(items)
  vault.append(right)
  body.append(vault)
}

const BUILDERS = {
  guild: buildGuild,
  skills: buildSkills,
  projects: buildProjects,
  vault: buildVault
}

export function createModals({ elements, input, gameState }) {
  const panels = new Map()
  let drawSkillLinks = () => {}
  let openId = null
  let lastFocused = null

  Object.entries(elements).forEach(([id, parts]) => {
    if (BUILDERS[id] === buildSkills) drawSkillLinks = buildSkills(parts.body)
    else BUILDERS[id](parts.body)

    const closePanel = () => close()

    parts.close.addEventListener('click', closePanel)

    parts.root.addEventListener('pointerdown', (event) => {
      if (event.target === parts.root) closePanel()
    })

    panels.set(id, { ...parts, closePanel })
  })

  function open(id) {
    if (openId === id) return

    const panel = panels.get(id)
    if (!panel) return

    lastFocused = document.activeElement

    panels.forEach((entry, panelId) => {
      entry.root.classList.toggle('active', panelId === id)
    })

    openId = id
    gameState.openModal()

    input.releaseAll()

    if (id === 'skills') drawSkillLinks()

    const focusTarget = panel.close || panel.root
    if (focusTarget) focusTarget.focus({ preventScroll: true })
  }

  function close() {
    if (openId === null) return

    openId = null

    panels.forEach((entry) => {
      entry.root.classList.toggle('active', false)
    })

    gameState.closeModal()
    gameState.setZone(null)

    if (lastFocused && lastFocused.isConnected) {
      lastFocused.focus({ preventScroll: true })
    }
    lastFocused = null
  }

  function toggle(id) {
    if (openId === id) close()
    else open(id)
  }

  function isOpen() {
    return openId !== null
  }

  window.addEventListener('keydown', (event) => {
    if (openId === null) return

    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }

    if (event.key !== 'Tab') return

    const panel = panels.get(openId)
    const focusables = [...panel.root.querySelectorAll(FOCUSABLE)].filter(
      (node) => node.offsetParent !== null || node === document.activeElement
    )

    if (focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  })

  return { open, close, toggle, isOpen, redrawSkillLinks: drawSkillLinks }
}
