import { MAP_HEIGHT, MAP_WIDTH, TILE_SIZE } from '../config.js'
import { ZONES } from '../../data/zones.js'

const LANDMASSES = [
  { left: 0, width: 65.7 },
  { left: 68.6, width: 30.0 }
]

const percent = (value, total) => (value / total) * 100

export function createMinimap({ elements }) {
  LANDMASSES.forEach((mass) => {
    const island = document.createElement('div')
    island.className = 'minimap__island'
    island.style.left = `${mass.left}%`
    island.style.width = `${mass.width}%`
    elements.islands.append(island)
  })

  const pins = ZONES.map((zone) => {
    const pin = document.createElement('span')
    pin.className = 'minimap__pin'
    pin.dataset.zone = zone.id
    pin.title = zone.name
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
    const centreX = entity.position.x + entity.width / 2
    const centreY = entity.position.y + entity.height / 2

    player.style.left = `${percent(centreX, MAP_WIDTH)}%`
    player.style.top = `${percent(centreY, MAP_HEIGHT)}%`
  }

  function setCurrentZone(zoneId) {
    pins.forEach((pin) => {
      pin.classList.toggle('minimap__pin--current', pin.dataset.zone === zoneId)
    })
  }

  return { update, setCurrentZone }
}
