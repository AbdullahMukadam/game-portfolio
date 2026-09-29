import { Boundary } from './entities/boundary.js'
import { Character } from './entities/character.js'
import { villagerImage } from './assets.js'
import { collisions } from '../data/collisions.js'
import { charactersMapData } from '../data/characters.js'
import { MAP_COLUMNS, NPC_SCALE, TILE_MARKER, TILE_SIZE } from './config.js'

const VILLAGER_DIALOGUE = [
  '...',
  'Hey mister, have you seen my Doggochu?'
]

function toGrid(flatMap) {
  const grid = []

  for (let i = 0; i < flatMap.length; i += MAP_COLUMNS) {
    grid.push(flatMap.slice(i, MAP_COLUMNS + i))
  }

  return grid
}

function createBoundary(column, row) {
  return new Boundary({
    position: {
      x: column * TILE_SIZE,
      y: row * TILE_SIZE
    }
  })
}

function createVillager(column, row) {
  const villager = new Character({
    position: {
      x: column * TILE_SIZE,
      y: row * TILE_SIZE
    },
    image: villagerImage,
    frames: {
      max: 4,
      hold: 60
    },
    scale: NPC_SCALE,
    animate: true,
    dialogue: VILLAGER_DIALOGUE
  })

  villager.width = TILE_SIZE
  villager.height = TILE_SIZE

  return villager
}

export function createBoundaries() {
  const boundaries = []

  toGrid(collisions).forEach((row, rowIndex) => {
    row.forEach((marker, columnIndex) => {
      if (marker === TILE_MARKER.boundary) {
        boundaries.push(createBoundary(columnIndex, rowIndex))
      }
    })
  })

  toGrid(charactersMapData).forEach((row, rowIndex) => {
    row.forEach((marker, columnIndex) => {
      if (marker !== 0) {
        boundaries.push(createBoundary(columnIndex, rowIndex))
      }
    })
  })

  return boundaries
}

export function createCharacters() {
  const characters = []

  toGrid(charactersMapData).forEach((row, rowIndex) => {
    row.forEach((marker, columnIndex) => {
      if (marker === TILE_MARKER.character) {
        characters.push(createVillager(columnIndex, rowIndex))
      }
    })
  })

  return characters
}
