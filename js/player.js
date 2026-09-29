import { Sprite } from './entities/sprite.js'
import { playerImages } from './assets.js'
import { PLAYER_H, PLAYER_SCALE, PLAYER_W, SPAWN_TILE, TILE_SIZE, isMobileDevice } from './config.js'

export function createPlayer() {
  const player = new Sprite({
    position: { x: 0, y: 0 },
    image: playerImages.down,
    frames: { max: 4, hold: 10 },
    scale: PLAYER_SCALE,
    sprites: playerImages
  })

  player.width = PLAYER_W
  player.height = PLAYER_H

  const spawn = isMobileDevice() ? SPAWN_TILE.mobile : SPAWN_TILE.desktop
  player.position.x = spawn.col * TILE_SIZE
  player.position.y = spawn.row * TILE_SIZE

  return player
}
