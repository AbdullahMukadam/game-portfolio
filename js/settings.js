import { readStorage, writeStorage } from './storage.js'
import { COARSE_POINTER_QUERY, isMobileDevice } from './config.js'
import { audio } from '../data/audio.js'

const STORAGE_KEY = 'game.settings'

const DEFAULT_SETTINGS = {
  stickSize: 'medium',
  stickX: null,
  stickY: null,
  music: true
}

const STICK_SIZES = ['small', 'medium', 'large']

function readPercent(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  if (value < 0 || value > 100) return null
  return value
}

function sanitise(stored) {
  if (!stored || typeof stored !== 'object') return { ...DEFAULT_SETTINGS }

  const stickX = readPercent(stored.stickX)
  const stickY = readPercent(stored.stickY)
  const hasPosition = stickX !== null && stickY !== null

  return {
    stickSize: STICK_SIZES.includes(stored.stickSize)
      ? stored.stickSize
      : DEFAULT_SETTINGS.stickSize,
    stickX: hasPosition ? stickX : null,
    stickY: hasPosition ? stickY : null,
    music:
      typeof stored.music === 'boolean' ? stored.music : DEFAULT_SETTINGS.music
  }
}

export function createSettings({ elements }) {
  let state = sanitise(readStorage(STORAGE_KEY, null))
  let moveMode = false

  const moveModeListeners = new Set()

  function apply() {
    elements.mobileControls.dataset.size = state.stickSize

    if (state.stickX !== null && state.stickY !== null) {
      elements.joystick.style.left = state.stickX + '%'
      elements.joystick.style.right = 'auto'
      elements.joystick.style.bottom = state.stickY + '%'
    } else {
      elements.joystick.style.left = ''
      elements.joystick.style.right = ''
      elements.joystick.style.bottom = ''
    }

    elements.panel.querySelectorAll('[data-setting]').forEach((button) => {
      const isActive = String(state[button.dataset.setting]) === button.dataset.value
      button.setAttribute('aria-pressed', String(isActive))
    })

    if (audio?.Map?.mute) audio.Map.mute(!state.music)
  }

  function commit() {
    writeStorage(STORAGE_KEY, state)
    apply()
  }

  function setStickPosition(xPercent, yPercent) {
    const stickX = readPercent(xPercent)
    const stickY = readPercent(yPercent)

    if (stickX === null || stickY === null) {
      state.stickX = null
      state.stickY = null
    } else {
      state.stickX = stickX
      state.stickY = stickY
    }

    apply()
  }

  function setMoveMode(enabled) {
    moveMode = enabled && isMobileDevice()
    elements.positionMove.setAttribute('aria-pressed', String(moveMode))
    elements.moveHint.hidden = !moveMode
    moveModeListeners.forEach((listener) => listener(moveMode))
  }

  function applyTouchOnlyRows() {
    const showTouchOptions = isMobileDevice()

    elements.touchOnlyRows.forEach((row) => {
      row.hidden = !showTouchOptions
    })

    if (!showTouchOptions) setMoveMode(false)
  }

  function open() {
    elements.panel.hidden = false
    elements.toggle.setAttribute('aria-expanded', 'true')
    elements.close.focus()
  }

  function close() {
    elements.panel.hidden = true
    elements.toggle.setAttribute('aria-expanded', 'false')
    elements.toggle.focus()
  }

  elements.toggle.addEventListener('click', () => {
    if (elements.panel.hidden) open()
    else close()
  })

  elements.close.addEventListener('click', close)

  elements.positionMove.addEventListener('click', () => setMoveMode(!moveMode))

  elements.positionReset.addEventListener('click', () => {
    state.stickX = null
    state.stickY = null
    commit()
  })

  elements.reset.addEventListener('click', () => {
    state = { ...DEFAULT_SETTINGS }
    setMoveMode(false)
    commit()
  })

  elements.panel.addEventListener('click', (e) => {
    const button = e.target.closest('[data-setting]')
    if (!button) return

    const { setting, value } = button.dataset
    state[setting] = setting === 'music' ? value === 'on' : value
    commit()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !elements.panel.hidden) close()
  })

  document.addEventListener('pointerdown', (e) => {
    if (elements.panel.hidden) return
    if (elements.panel.contains(e.target)) return
    if (elements.toggle.contains(e.target)) return
    close()
  })

  window
    .matchMedia(COARSE_POINTER_QUERY)
    .addEventListener('change', applyTouchOnlyRows)

  apply()
  applyTouchOnlyRows()

  return {
    get moveMode() {
      return moveMode
    },
    onMoveModeChange(listener) {
      moveModeListeners.add(listener)
    },
    setStickPosition,
    setMoveMode,
    commit,
    get music() {
      return state.music
    }
  }
}
