import {
  BASE_WIDTH,
  MAP_HEIGHT,
  MAP_WIDTH,
  ZOOM,
  isMobileDevice
} from './config.js'

export function createViewport({ canvas, context, wrapper }) {
  let viewWidth = BASE_WIDTH
  let viewHeight = 576
  let displayWidth = 0
  let displayHeight = 0

  function resize() {
    const nextWidth = Math.min(BASE_WIDTH, Math.round(window.innerWidth * 2))
    const nextHeight = Math.round(nextWidth * (window.innerHeight / window.innerWidth))
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

    viewWidth = nextWidth
    viewHeight = nextHeight
    displayWidth = wrapper.clientWidth || window.innerWidth
    displayHeight = wrapper.clientHeight || window.innerHeight

    canvas.width = Math.round(nextWidth * pixelRatio)
    canvas.height = Math.round(nextHeight * pixelRatio)

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    context.imageSmoothingEnabled = false
  }

  function getZoom() {
    const deviceZoom = isMobileDevice() ? ZOOM.mobile : ZOOM.desktop
    const coverZoom = Math.max(viewWidth / MAP_WIDTH, viewHeight / MAP_HEIGHT)

    return Math.max(deviceZoom, coverZoom)
  }

  function getCamera(zoom, focus) {
    const visibleWidth = viewWidth / zoom
    const visibleHeight = viewHeight / zoom
    const maxX = Math.max(0, MAP_WIDTH - visibleWidth)
    const maxY = Math.max(0, MAP_HEIGHT - visibleHeight)

    const focusCenterX = focus.x + focus.width / 2
    const focusCenterY = focus.y + focus.height / 2

    return {
      x: Math.min(Math.max(focusCenterX - visibleWidth / 2, 0), maxX),
      y: Math.min(Math.max(focusCenterY - visibleHeight / 2, 0), maxY)
    }
  }

  return {
    resize,
    getZoom,
    getCamera,

    worldToScreen(worldX, worldY, zoom, camera) {
      return {
        x: (worldX - camera.x) * zoom * (displayWidth / viewWidth),
        y: (worldY - camera.y) * zoom * (displayHeight / viewHeight)
      }
    },

    get width() {
      return viewWidth
    },
    get height() {
      return viewHeight
    },
    get displayWidth() {
      return displayWidth
    },
    get displayHeight() {
      return displayHeight
    }
  }
}
