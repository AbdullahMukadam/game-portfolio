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

  elements.careerValue.textContent = `${HUD.careerHealth}%`
  elements.projectManaValue.textContent = `${HUD.projectMana}%`

  const rows = ZONES.map((zone) => {
    const row = document.createElement('div')
    row.className = 'keyrow'
    row.setAttribute('role', 'listitem')
    row.dataset.zone = zone.id

    const icon = document.createElement('span')
    icon.className = 'keyrow__icon'
    icon.innerHTML = renderIcon(zone.icon, { size: 12 })

    const text = document.createElement('span')
    text.className = 'keyrow__label'
    text.textContent = zone.label

    row.append(icon, text)
    elements.legend.append(row)

    return row
  })

  gameState.onChange((state) => {
    rows.forEach((row) => {
      const isCurrent = row.dataset.zone === state.currentZone
      row.classList.toggle('keyrow--current', isCurrent)
    })
  })
}
