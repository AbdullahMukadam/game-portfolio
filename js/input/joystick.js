const DEADZONE = 0.22

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function createJoystick({ container, stick, base, knob, input, settings }) {
  let movePointerId = null
  let dragPointerId = null
  let dragOffsetX = 0
  let dragOffsetY = 0

  settings.onMoveModeChange((isMoveMode) => {
    stick.classList.toggle('is-movable', isMoveMode)
  })

  function dragStick(e) {
    const area = container.getBoundingClientRect()
    const size = stick.getBoundingClientRect()
    if (!area.width || !area.height || !size.width) return

    const centerX = e.clientX - dragOffsetX
    const centerY = e.clientY - dragOffsetY

    const minX = (size.width / 2 / area.width) * 100
    const minY = (size.height / 2 / area.height) * 100

    settings.setStickPosition(
      clamp(((centerX - area.left) / area.width) * 100, minX, 100 - minX),
      clamp(((area.bottom - centerY) / area.height) * 100, minY, 100 - minY)
    )
  }

  function reset() {
    movePointerId = null
    knob.style.transform = 'translate3d(0, 0, 0)'
    base.classList.remove('is-active')
    input.releaseAll()
  }

  function setDirection(dx, dy, maxRadius) {
    const distance = Math.hypot(dx, dy)

    input.releaseAll()

    if (distance < maxRadius * DEADZONE) return

    const clamped = Math.min(distance, maxRadius)
    const nx = dx / distance
    const ny = dy / distance

    knob.style.transform = `translate3d(${nx * clamped}px, ${ny * clamped}px, 0)`

    if (Math.abs(nx) > Math.abs(ny)) {
      input.pressDirection(nx < 0 ? 'left' : 'right')
    } else {
      input.pressDirection(ny < 0 ? 'up' : 'down')
    }
  }

  function track(e) {
    const bounds = base.getBoundingClientRect()
    const maxRadius = bounds.width / 2 - knob.offsetWidth / 2

    setDirection(
      e.clientX - (bounds.left + bounds.width / 2),
      e.clientY - (bounds.top + bounds.height / 2),
      maxRadius
    )
  }

  function onPointerDown(e) {
    e.preventDefault()

    if (settings.moveMode) {
      const bounds = stick.getBoundingClientRect()
      dragPointerId = e.pointerId
      dragOffsetX = e.clientX - (bounds.left + bounds.width / 2)
      dragOffsetY = e.clientY - (bounds.top + bounds.height / 2)
      base.setPointerCapture(e.pointerId)
      dragStick(e)
      return
    }

    movePointerId = e.pointerId
    base.setPointerCapture(e.pointerId)
    base.classList.add('is-active')
    track(e)
  }

  function onPointerMove(e) {
    if (dragPointerId === e.pointerId) {
      e.preventDefault()
      dragStick(e)
      return
    }

    if (movePointerId !== e.pointerId) return
    e.preventDefault()
    track(e)
  }

  function onPointerUp(e) {
    if (dragPointerId === e.pointerId) {
      e.preventDefault()
      dragPointerId = null
      settings.commit()
      return
    }

    if (movePointerId !== e.pointerId) return
    e.preventDefault()
    reset()
  }

  function onPointerCancel(e) {
    if (dragPointerId === e.pointerId) {
      dragPointerId = null
      settings.commit()
      return
    }

    reset()
  }

  base.addEventListener('pointerdown', onPointerDown)
  base.addEventListener('pointermove', onPointerMove)
  base.addEventListener('pointerup', onPointerUp)
  base.addEventListener('pointercancel', onPointerCancel)
  base.addEventListener('lostpointercapture', reset)
  base.addEventListener('contextmenu', (e) => e.preventDefault())
}
