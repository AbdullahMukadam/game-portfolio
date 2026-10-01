import { TILE_SIZE } from '../config.js'
import { ZONES } from '../../data/zones.js'
import { renderIcon } from '../../data/icons.js'
import { rectangularCollision } from '../collision.js'

const OFFSCREEN_MARGIN = 48

/* Touch players use the A button, so the hint must not name a key they have. */
const COARSE_QUERY = '(hover: none) and (pointer: coarse)'

function createInteractHint(elements) {
  const query = window.matchMedia(COARSE_QUERY)

  function sync() {
    elements.tooltipKey.textContent = query.matches ? 'A' : 'E'
  }

  sync()
  query.addEventListener('change', sync)

  return sync
}

function triggerRect(zone) {
  return {
    position: {
      x: zone.trigger.col * TILE_SIZE,
      y: zone.trigger.row * TILE_SIZE
    },
    width: zone.trigger.w * TILE_SIZE,
    height: zone.trigger.h * TILE_SIZE
  }
}

export function createZones({ elements, viewport, gameState, onZoneChange }) {
  const rects = new Map()
  createInteractHint(elements)

  const indicators = ZONES.map((zone, index) => {
    rects.set(zone.id, triggerRect(zone))

    const wrapper = document.createElement('div')
    wrapper.className = 'indicator'
    wrapper.dataset.zone = zone.id

    const reticle = document.createElement('div')
    reticle.className = 'indicator__reticle'

    const icon = document.createElement('div')
    icon.className = 'indicator__icon'
    icon.style.setProperty('--bob-offset', String(index * 0.37))

    const img = document.createElement('img')
    img.src = `img/icons/${zone.id}.jpg`
    img.alt = zone.name
    img.className = 'indicator__img'
    img.loading = 'eager'
    img.referrerPolicy = 'no-referrer'

    const pin = document.createElement('div')
    pin.className = 'indicator__pin'
    pin.style.setProperty('--bob-offset', String(index * 0.37))

    icon.append(img)
    wrapper.append(reticle, icon, pin)
    elements.indicators.append(wrapper)

    return { zone, wrapper }
  })

  function placeIndicators(camera, zoom) {
    indicators.forEach(({ zone, wrapper }) => {
      const worldX = zone.anchor.col * TILE_SIZE + TILE_SIZE / 2
      const worldY = zone.anchor.row * TILE_SIZE

      const point = viewport.worldToScreen(worldX, worldY, zoom, camera)
      const isVisible =
        point.x > -OFFSCREEN_MARGIN &&
        point.x < viewport.displayWidth + OFFSCREEN_MARGIN &&
        point.y > -OFFSCREEN_MARGIN &&
        point.y < viewport.displayHeight + OFFSCREEN_MARGIN

      wrapper.hidden = !isVisible

      wrapper.style.transform =
        `translate(${Math.round(point.x)}px, ${Math.round(point.y)}px) translate(-50%, -100%)`
    })
  }

  function findZone(player) {
    return (
      ZONES.find((zone) =>
        rectangularCollision({ rectangle1: player, rectangle2: rects.get(zone.id) })
      ) || null
    )
  }

  function update({ player, camera, zoom }) {
    placeIndicators(camera, zoom)

    const current = gameState.isPaused ? null : findZone(player)
    const zoneId = current ? current.id : null

    if (zoneId !== gameState.currentZone) {
      gameState.setZone(zoneId)
      onZoneChange(zoneId, current)
    }

    indicators.forEach(({ zone, wrapper }) => {
      wrapper.classList.toggle('indicator--near', zone.id === zoneId)
    })

    const showTooltip = Boolean(current) && !gameState.isModalOpen

    if (showTooltip) {
      const focusX = player.position.x + player.width / 2
      const focusY = player.position.y

      const point = viewport.worldToScreen(focusX, focusY, zoom, camera)

      elements.tooltip.style.transform =
        `translate(${Math.round(point.x)}px, ${Math.round(point.y)}px) translate(-50%, -100%)`

      elements.tooltipText.textContent = 'open dialogue'
    }

    elements.tooltipBox.classList.toggle('active', showTooltip)
  }

  return { update }
}
