import { createGame } from './game.js'
import { createPlayer } from './player.js'
import { createViewport } from './viewport.js'
import { createDialogue } from './dialogue.js'
import { createSettings } from './settings.js'
import { createKeyboard } from './input/keyboard.js'
import { createJoystick } from './input/joystick.js'
import { createBoundaries, createCharacters } from './world.js'
import { createHud } from './ui/hud.js'
import { createMinimap } from './ui/minimap.js'
import { createZones } from './ui/zones.js'
import { createModals } from './ui/modals.js'
import { gameState } from './state.js'
import { audio } from '../data/audio.js'

function query() {
  return {
    canvas: document.querySelector('#game-canvas'),
    wrapper: document.querySelector('.game-wrapper'),
    dialogueBox: document.querySelector('#characterDialogueBox'),
    mobileControls: document.querySelector('#mobileControls'),
    joystick: document.querySelector('#joystick'),
    joystickBase: document.querySelector('#joystickBase'),
    joystickKnob: document.querySelector('#joystickKnob'),
    interactButton: document.querySelector('#interactButton'),
    settingsToggle: document.querySelector('#settingsToggle'),
    settingsPanel: document.querySelector('#settingsPanel'),
    settingsClose: document.querySelector('#settingsClose'),
    settingsReset: document.querySelector('#settingsReset'),
    positionMove: document.querySelector('#positionMove'),
    positionReset: document.querySelector('#positionReset'),
    moveHint: document.querySelector('#moveHint'),

    hudCard: document.querySelector('.hud__card'),
    legend: document.querySelector('#legend'),
    careerHealth: document.querySelector('#careerHealthFill'),
    careerValue: document.querySelector('#careerValue'),
    projectMana: document.querySelector('#projectManaFill'),
    manaValue: document.querySelector('#manaValue'),

    minimapField: document.querySelector('#minimapField'),
    minimapViewport: document.querySelector('#minimapViewport'),
    minimapIslands: document.querySelector('#minimapIslands'),
    minimapPins: document.querySelector('#minimapPins'),

    zoneIndicators: document.querySelector('#zoneIndicators'),
    tooltip: document.querySelector('#proximityTooltip'),
    tooltipBox: document.querySelector('#tooltipBox'),
    tooltipKey: document.querySelector('#tooltipKey'),
    tooltipText: document.querySelector('#tooltipText'),

    modals: {
      guild: {
        root: document.querySelector('#modalGuild'),
        body: document.querySelector('#guildBody'),
        close: document.querySelector('#guildClose')
      },
      skills: {
        root: document.querySelector('#modalSkills'),
        body: document.querySelector('#skillsBody'),
        close: document.querySelector('#skillsClose')
      },
      projects: {
        root: document.querySelector('#modalProjects'),
        body: document.querySelector('#projectsBody'),
        close: document.querySelector('#projectsClose')
      },
      vault: {
        root: document.querySelector('#modalVault'),
        body: document.querySelector('#vaultBody'),
        close: document.querySelector('#vaultClose')
      }
    }
  }
}

function startMusicOnce(settings) {
  let started = false

  window.addEventListener('click', () => {
    if (started) return
    started = true
    if (settings.music) audio.Map.play()
  })
}

function boot() {
  const dom = query()
  const context = dom.canvas.getContext('2d')

  const boundaries = createBoundaries()
  const characters = createCharacters()
  const player = createPlayer()

  const viewport = createViewport({
    canvas: dom.canvas,
    context,
    wrapper: dom.wrapper
  })

  const settings = createSettings({
    elements: {
      mobileControls: dom.mobileControls,
      joystick: dom.joystick,
      panel: dom.settingsPanel,
      toggle: dom.settingsToggle,
      close: dom.settingsClose,
      reset: dom.settingsReset,
      positionMove: dom.positionMove,
      positionReset: dom.positionReset,
      moveHint: dom.moveHint,
      touchOnlyRows: dom.settingsPanel.querySelectorAll('[data-touch-only]')
    }
  })

  const dialogue = createDialogue({ box: dom.dialogueBox, player })

  let modals = null

  function interact() {
    if (modals.isOpen()) {
      modals.close()
      return
    }

    if (dialogue.isOpen() || !gameState.currentZone) return

    modals.open(gameState.currentZone)
  }

  const input = createKeyboard({
    onConfirm: dialogue.interact,
    onInteract: interact,
    isBlocked: () => gameState.isPaused
  })

  modals = createModals({ elements: dom.modals, input, gameState })

  const minimap = createMinimap({
    elements: {
      islands: dom.minimapIslands,
      pins: dom.minimapPins
    }
  })

  const zones = createZones({
    elements: {
      indicators: dom.zoneIndicators,
      tooltip: dom.tooltip,
      tooltipBox: dom.tooltipBox,
      tooltipKey: dom.tooltipKey,
      tooltipText: dom.tooltipText
    },
    viewport,
    gameState,
    onZoneChange: (zoneId) => minimap.setCurrentZone(zoneId)
  })

  createHud({
    elements: {
      legend: dom.legend,
      careerHealth: dom.careerHealth,
      careerValue: dom.careerValue,
      projectMana: dom.projectMana,
      projectManaValue: dom.manaValue,
      card: dom.hudCard
    },
    gameState,
    onOpenModal: (zoneId) => modals.open(zoneId)
  })

  const game = createGame({
    context,
    boundaries,
    characters,
    player,
    input,
    viewport,
    dialogue,
    isPaused: () => gameState.isPaused,

    onFrame: ({ player: entity, camera, zoom }) => {

      gameState.setBlocked(dialogue.isOpen())

      zones.update({ player: entity, camera, zoom })
      minimap.update({ player: entity, camera, zoom })
    }
  })

  createJoystick({
    container: dom.mobileControls,
    stick: dom.joystick,
    base: dom.joystickBase,
    knob: dom.joystickKnob,
    input,
    settings
  })

  dom.interactButton.addEventListener('click', interact)

  gameState.onChange((state) => {
    const isAvailable =
      Boolean(state.currentZone) && !state.isModalOpen && !state.isBlocked

    /* Must stay enabled while a modal is open, otherwise the A button opens a
       modal and can never close it again, and touch has no ESC key. */
    const isEnabled = isAvailable || state.isModalOpen

    dom.interactButton.disabled = !isEnabled
    dom.interactButton.classList.toggle('is-available', isAvailable)
    dom.interactButton.setAttribute(
      'aria-label',
      state.isModalOpen
        ? 'Close the open panel'
        : 'Interact with the zone in front of you'
    )
  })

  game.start()
  startMusicOnce(settings)

  function onResize() {
    viewport.resize()

    modals.redrawSkillLinks()
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', onResize)
}

boot()
