export const TILE_SIZE = 12
export const MAP_COLUMNS = 70
export const MAP_ROWS = 40
export const MAP_WIDTH = MAP_COLUMNS * TILE_SIZE
export const MAP_HEIGHT = MAP_ROWS * TILE_SIZE

export const ZOOM = {
  desktop: 2.5,
  mobile: 3.6
}

export const MOVE_SPEED = 1
export const BASE_WIDTH = 1024

export const PLAYER_SCALE = TILE_SIZE / 48
export const PLAYER_W = 48 * PLAYER_SCALE
export const PLAYER_H = 68 * PLAYER_SCALE
export const NPC_SCALE = TILE_SIZE / 16

export const SPAWN_TILE = {
  desktop: { col: 27, row: 18 },
  mobile: { col: 25, row: 24 }
}

export const TILE_MARKER = {
  boundary: 1025,
  character: 1026
}

export const COARSE_POINTER_QUERY = '(hover: none) and (pointer: coarse)'

export function isMobileDevice() {
  return (
    window.matchMedia(COARSE_POINTER_QUERY).matches ||
    window.innerWidth <= 860 ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  )
}
