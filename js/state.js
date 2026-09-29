

const state = {
  currentZone: null,
  isModalOpen: false,
  isBlocked: false
}

const listeners = new Set()

function emit() {
  listeners.forEach((listener) => listener(state))
}

export const gameState = {
  get currentZone() {
    return state.currentZone
  },
  get isModalOpen() {
    return state.isModalOpen
  },
  get isBlocked() {
    return state.isBlocked
  },
  get isPaused() {
    return state.isModalOpen || state.isBlocked
  },

  setZone(id) {
    if (state.currentZone === id) return
    state.currentZone = id
    emit()
  },

  openModal() {
    if (state.isModalOpen) return
    state.isModalOpen = true
    emit()
  },

  closeModal() {
    if (!state.isModalOpen) return
    state.isModalOpen = false
    emit()
  },

  setBlocked(isBlocked) {
    if (state.isBlocked === isBlocked) return
    state.isBlocked = isBlocked
    emit()
  },

  onChange(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
}
