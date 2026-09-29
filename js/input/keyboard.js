const KEY_DIRECTION = {
  w: 'up',
  arrowup: 'up',
  a: 'left',
  arrowleft: 'left',
  s: 'down',
  arrowdown: 'down',
  d: 'right',
  arrowright: 'right'
}

const DIRECTION_KEY = {
  up: 'w',
  left: 'a',
  down: 's',
  right: 'd'
}

export const DIRECTIONS = Object.keys(DIRECTION_KEY)

export function createKeyboard({ onConfirm, onInteract, isBlocked = () => false }) {
  const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
  }

  let lastKey = ''

  function pressDirection(direction) {
    keys[DIRECTION_KEY[direction]].pressed = true
    lastKey = DIRECTION_KEY[direction]
  }

  function releaseDirection(direction) {
    keys[DIRECTION_KEY[direction]].pressed = false
  }

  function releaseAll() {
    DIRECTIONS.forEach(releaseDirection)
  }

  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase()
    const isConfirm = e.key === ' ' || e.key === 'Enter'
    const isInteract = key === 'e'
    const direction = KEY_DIRECTION[key]

    if (isConfirm || isInteract || direction) e.preventDefault()

    if (isInteract) {
      onInteract()
      return
    }

    if (isConfirm) {
      onConfirm()
      return
    }

    if (direction && !isBlocked()) pressDirection(direction)
  })

  window.addEventListener('keyup', (e) => {
    const direction = KEY_DIRECTION[e.key.toLowerCase()]
    if (direction) releaseDirection(direction)
  })

  return {
    isActive(key) {
      return keys[key].pressed && lastKey === key
    },
    pressDirection,
    releaseDirection,
    releaseAll
  }
}
