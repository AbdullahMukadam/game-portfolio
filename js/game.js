import { Sprite } from './entities/sprite.js'
import { rectangularCollision, checkForCharacterCollision } from './collision.js'
import { foregroundImage, mapImage } from './assets.js'
import { MOVE_SPEED } from './config.js'

const MOVEMENT = [
  { key: 'w', sprite: 'up', axis: 'y', delta: -MOVE_SPEED },
  { key: 'a', sprite: 'left', axis: 'x', delta: -MOVE_SPEED },
  { key: 's', sprite: 'down', axis: 'y', delta: MOVE_SPEED },
  { key: 'd', sprite: 'right', axis: 'x', delta: MOVE_SPEED }
]

export function createGame({
  context,
  boundaries,
  characters,
  player,
  input,
  viewport,
  dialogue,
  isPaused,
  onFrame
}) {
  const background = new Sprite({
    position: { x: 0, y: 0 },
    image: mapImage
  })

  const foreground = new Sprite({
    position: { x: 0, y: 0 },
    image: foregroundImage
  })

  const renderables = [
    background,
    ...boundaries,
    ...characters,
    player,
    foreground
  ]

  function collidesAt(dx, dy) {
    const probe = {
      position: {
        x: player.position.x + dx,
        y: player.position.y + dy
      },
      width: player.width,
      height: player.height
    }

    return boundaries.some((boundary) =>
      rectangularCollision({ rectangle1: probe, rectangle2: boundary })
    )
  }

  function updatePlayer() {
    player.animate = false

    if (isPaused()) return

    const move = MOVEMENT.find(({ key }) => input.isActive(key))
    if (!move) return

    player.animate = true
    player.image = player.sprites[move.sprite]

    const dx = move.axis === 'x' ? move.delta : 0
    const dy = move.axis === 'y' ? move.delta : 0

    if (collidesAt(dx, dy)) return

    player.position[move.axis] += move.delta
  }

  function frame() {
    window.requestAnimationFrame(frame)

    updatePlayer()

    checkForCharacterCollision({ characters, player })
    dialogue.update()

    const zoom = viewport.getZoom()
    const camera = viewport.getCamera(zoom, {
      x: player.position.x,
      y: player.position.y,
      width: player.width,
      height: player.height
    })

    context.fillStyle = '#000000'
    context.fillRect(0, 0, viewport.width, viewport.height)

    context.save()
    context.scale(zoom, zoom)
    context.translate(-camera.x, -camera.y)
    renderables.forEach((renderable) => renderable.draw(context))
    context.restore()

    onFrame({ player, camera, zoom })
  }

  return {
    start() {
      viewport.resize()
      frame()
    }
  }
}
