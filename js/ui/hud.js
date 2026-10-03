import { HUD } from '../../data/portfolio.js'
import { ZONES } from '../../data/zones.js'
import { icon } from './icons.js'

const ZONE_ICON_NAMES = {
  guild: 'scroll',
  skills: 'zap',
  projects: 'swords',
  vault: 'package'
}

function fillBar(track, value) {
  track.style.width = `${value}%`
  track.setAttribute('aria-valuenow', String(value))
}

export function createHud({ elements, gameState, onOpenModal }) {
  fillBar(elements.careerHealth, HUD.careerHealth)
  fillBar(elements.projectMana, HUD.projectMana)

  if (elements.careerValue) elements.careerValue.textContent = `${HUD.careerHealth}%`
  if (elements.projectManaValue) elements.projectManaValue.textContent = `${HUD.projectMana}%`

  if (elements.card) {
    elements.card.setAttribute('role', 'button')
    elements.card.setAttribute('tabindex', '0')
    elements.card.title = 'Click to inspect Character & Vault'
    elements.card.addEventListener('click', () => {
      onOpenModal?.('vault')
    })
    elements.card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpenModal?.('vault')
      }
    })
  }

  const rows = ZONES.map((zone) => {
    const row = document.createElement('button')
    row.type = 'button'
    row.className = 'legend-item'
    row.setAttribute('role', 'listitem')
    row.dataset.zone = zone.id
    row.title = `Click to inspect ${zone.name}`

    const iconName = ZONE_ICON_NAMES[zone.id] || 'mapPin'
    row.innerHTML = `
      <span class="legend-item__icon">${icon(iconName, { size: 12 })}</span>
      <span class="legend-item__label">${zone.label}</span>
    `

    row.addEventListener('click', (e) => {
      e.stopPropagation()
      onOpenModal?.(zone.id)
    })

    elements.legend.append(row)
    return row
  })

  gameState.onChange((state) => {
    rows.forEach((row) => {
      const isCurrent = row.dataset.zone === state.currentZone
      row.classList.toggle('legend-item--current', isCurrent)
    })
  })
}
