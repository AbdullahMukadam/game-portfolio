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
  const node = el('a', className, text)
  node.href = href
  if (download) node.setAttribute('download', '')
  return node
}

function chip(text) {
  const node = el('li', null, text)
  const color = TECH_COLORS[text]
  if (color) node.style.setProperty('--chip', color)
  return node
}

function buildGuild(body) {
  const intro = el('section', 'slab guild__intro')
  intro.append(el('span', 'slab__label', 'The adventurer'))
  intro.append(el('p', 'guild__bio', PROFILE.bio))
  body.append(intro)

  EXPERIENCE.forEach((role) => {
    const entry = el('article', 'quest')

    const heading = el('h3', 'quest__title')
    if (role.url) {
      const title = link('quest__link', role.title, role.url)
      heading.append(title)
    } else {
      heading.textContent = role.title
    }
    entry.append(heading)

    const meta = el('p', 'quest__meta')
    meta.append(el('span', 'quest__company', role.company))
    meta.append(el('span', null, role.location))
    meta.append(el('span', null, role.duration))
    entry.append(meta)

    const list = el('ul', 'quest__list')
    role.quests.forEach((quest) => list.append(el('li', null, quest)))
    entry.append(list)

    body.append(entry)
  })
}

function buildSkills(body) {
  const tree = el('div', 'skilltree')
  const links = document.createElementNS(SVG_NS, 'svg')
  links.setAttribute('class', 'skilltree__links')
  links.setAttribute('aria-hidden', 'true')

  tree.append(links)

  function node({ id, name, parent, isChild }) {
    const item = el('div', isChild ? 'node node--child' : 'node')
    item.dataset.node = id
    if (parent) item.dataset.parent = parent

    const iconSpan = el('span', 'node__icon', isChild ? '⚡' : '🛡️')
    const nameSpan = el('span', 'node__name', name)
    const tagSpan = el('span', 'node__tag', isChild ? 'Tech' : 'Branch')

    item.append(iconSpan, nameSpan, tagSpan)

    return item
  }

  SKILL_ROOTS.forEach((root) => {
    const column = el('div', 'skilltree__col')
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
  { id: 'projects', label: 'Projects', items: PROJECTS },
  { id: 'gallery', label: 'Gallery', items: GALLERY }
]

function buildProjects(body) {
  const forge = el('div', 'forge')

  const tabs = el('div', 'tabs')
  tabs.setAttribute('role', 'tablist')
  const bar = el('div', 'forge__bar')
  const grid = el('div', 'forge__slots')
  grid.setAttribute('role', 'listbox')
  const details = el('div', 'slab')

  const title = el('h3', 'forge__title')
  const meta = el('p', 'forge__meta')
  const blurb = el('p', 'forge__blurb')
  const stack = el('ul', 'forge__stack')
  const actions = el('div', 'forge__actions')

  details.append(title, meta, blurb, stack, actions)
  bar.append(tabs, grid)
  forge.append(bar, details)
  body.append(forge)

  const liveAction = link('pixel-button', 'Live', '#')
  const codeAction = link('pixel-button', 'Source', '#')
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

  function select(item) {
    if (!item) return
    selectedId = item.id

    buttons.forEach((btn) =>
      btn.setAttribute('aria-pressed', String(btn.dataset.id === item.id))
    )

    title.textContent = item.title
    meta.textContent = [item.year, item.status].filter(Boolean).join(' · ')
    blurb.textContent = item.blurb
    stack.textContent = ''

    item.stack.filter(Boolean).forEach((tech) => stack.append(chip(tech)))

    bindAction(liveAction, item.url, 'Live')
    bindAction(codeAction, item.code, 'Source')
  }

  function bindAction(node, href, label) {
    if (href) {
      node.href = href
      node.textContent = label
      node.removeAttribute('aria-disabled')
      node.removeAttribute('title')
      return
    }

    node.removeAttribute('href')
    node.textContent = `${label} — soon`
    node.setAttribute('aria-disabled', 'true')
    node.title = 'No link available yet'
  }

  function render() {
    const items = currentItems()

    grid.textContent = ''
    buttons = items.map((item) => {
      const slot = button('slot', item.title)
      slot.dataset.id = item.id
      slot.setAttribute('role', 'option')
      slot.setAttribute('aria-pressed', 'false')
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
    const btn = button('tabs__tab', tab.label)
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
  const avatar = el('img', 'vault__avatar')
  avatar.src = PROFILE.avatar
  avatar.alt = `${PROFILE.name} avatar`
  avatar.width = 48
  avatar.height = 68
  portrait.append(avatar)

  const who = el('div', 'vault__who')
  who.append(el('h3', 'vault__name', PROFILE.name))
  who.append(el('p', 'vault__role', PROFILE.title))
  who.append(el('p', 'vault__role vault__role--soft', PROFILE.secondaryTitle))
  portrait.append(who)
  vault.append(portrait)

  const right = el('div')

  const bio = el('section', 'slab')
  bio.append(el('span', 'slab__label', 'About'))
  bio.append(el('p', 'vault__bio', PROFILE.bio))
  right.append(bio)

  const stats = el('section', 'slab')
  stats.append(el('span', 'slab__label', 'Player stats'))

  const statKeys = { 'Problem Solving': 'solving', Creativity: 'creativity', 'Code Quality': 'quality' }

  PLAYER_STATS.forEach((stat) => {
    const row = el('div', 'stat')
    row.append(el('span', 'stat__label', stat.name))

    const track = el('span', 'stat__track')
    const fill = el('span', 'stat__fill')
    fill.style.width = `${stat.value}%`
    fill.dataset.stat = statKeys[stat.name] || 'solving'
    track.append(fill)
    row.append(track)

    row.append(el('span', 'stat__value', `${stat.value}`))
    stats.append(row)
  })

  right.append(stats)

  const education = el('section', 'slab')
  education.append(el('span', 'slab__label', 'Education'))
  education.append(el('h3', 'forge__title', EDUCATION.school))
  education.append(el('p', 'forge__blurb', EDUCATION.degree))
  education.append(
    el('p', 'inventory__note', `${EDUCATION.duration} · ${EDUCATION.location}`)
  )
  right.append(education)

  const items = el('section', 'slab')
  items.append(el('span', 'slab__label', 'Inventory'))

  const list = el('ul', 'inventory')
  VAULT_ITEMS.forEach((item) => {
    const row = el('li')
    if (item.url) {
      row.append(link('inventory__link', item.name, item.url, item.name === 'Resume'))
    } else {
      row.append(el('span', null, item.name))
    }
    row.append(el('span', 'inventory__note', item.note))
    list.append(row)
  })
  items.append(list)

  if (ACHIEVEMENTS.length) {
    items.append(el('span', 'slab__label slab__label--spaced', 'Achievements'))
    const awards = el('ul', 'inventory')
    ACHIEVEMENTS.forEach((award) => {
      const row = el('li')
      row.append(link('inventory__link', award.name, award.url))
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
