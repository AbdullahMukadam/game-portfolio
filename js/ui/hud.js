import { HUD } from '../../data/portfolio.js'
import { ZONES } from '../../data/zones.js'
import { renderIcon } from '../../data/icons.js'

function fillBar(track, value) {
  track.style.width = `${value}%`
  track.setAttribute('aria-valuenow', String(value))
}

export function createHud({ elements, gameState }) {
  fillBar(elements.careerHealth, HUD.careerHealth)
  fillBar(elements.projectMana, HUD.projectMana)

  if (elements.careerValue) elements.careerValue.textContent = `${HUD.careerHealth}%`
  if (elements.projectManaValue) elements.projectManaValue.textContent = `${HUD.projectMana}%`

  const rows = ZONES.map((zone, idx) => {
    const row = document.createElement('span')
    row.className = 'legend-item'
    row.setAttribute('role', 'listitem')
    row.dataset.zone = zone.id

    const iconTitle = zone.iconLabel || zone.icon
    const isLast = idx === ZONES.length - 1
    row.textContent = `[${iconTitle}: ${zone.label}]${isLast ? '' : ','}`

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
