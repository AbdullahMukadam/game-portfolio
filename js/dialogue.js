export function createDialogue({ box, player }) {
  let wasNearCharacter = false

  function show(text) {
    box.innerHTML = text
    box.style.display = 'flex'
  }

  function hide() {
    box.style.display = 'none'
  }

  function advance() {
    const character = player.interactionAsset
    if (!character) return

    character.dialogueIndex++

    if (character.dialogueIndex <= character.dialogue.length - 1) {
      show(character.dialogue[character.dialogueIndex])
      return
    }

    player.isInteracting = false
    character.dialogueIndex = 0
    hide()
  }

  function interact() {
    if (player.isInteracting) {
      advance()
      return
    }

    if (!player.interactionAsset) return

    const character = player.interactionAsset
    character.dialogueIndex = 0
    show(character.dialogue[0])
    player.isInteracting = true
  }

  function update() {
    const isNearCharacter = Boolean(player.interactionAsset)

    if (isNearCharacter && !wasNearCharacter && !player.isInteracting) {
      interact()
    }

    wasNearCharacter = isNearCharacter
  }

  box.addEventListener('pointerdown', (e) => {
    if (!player.isInteracting) return
    e.stopPropagation()
    interact()
  })

  return { interact, update, isOpen: () => player.isInteracting }
}
