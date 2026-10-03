import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from '../config.js'
import { ZONES } from '../../data/zones.js'

const percent = (value, total) => (value / total) * 100

export function createMinimap({ elements }) {
  if (elements.islands) {
    elements.islands.innerHTML = ''
  }

  if (elements.pins) {
    elements.pins.innerHTML = ''
  }

  const pins = ZONES.map((zone) => {
    const pin = document.createElement('div')
    pin.className = 'minimap__location-pin'
    pin.dataset.zone = zone.id
    pin.title = zone.name

    const img = document.createElement('img')
    img.src = `img/icons/${zone.id}.jpg`
    img.alt = zone.name
    img.className = 'minimap__location-img'
    img.referrerPolicy = 'no-referrer'
    pin.append(img)

    pin.style.left = `${percent(zone.anchor.col * TILE_SIZE, MAP_WIDTH)}%`
    pin.style.top = `${percent(zone.anchor.row * TILE_SIZE, MAP_HEIGHT)}%`

    elements.pins.append(pin)
    return pin
  })

  const player = document.createElement('span')
  player.className = 'minimap__pin minimap__pin--player'
  player.dataset.zone = 'player'
  player.title = 'You'
  elements.pins.append(player)

  function update({ player: entity }) {
    if (!entity) return
    const centreX = entity.position.x + entity.width / 2
    const centreY = entity.position.y + entity.height / 2

    player.style.left = `${percent(centreX, MAP_WIDTH)}%`
    player.style.top = `${percent(centreY, MAP_HEIGHT)}%`
  }

  function setCurrentZone(zoneId) {
    pins.forEach((pin) => {
      pin.classList.toggle('minimap__location-pin--current', pin.dataset.zone === zoneId)
    })
  }

  return { update, setCurrentZone }
}
