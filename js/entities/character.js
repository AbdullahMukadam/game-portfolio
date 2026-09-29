import { Sprite } from './sprite.js'

export class Character extends Sprite {
  constructor({ dialogue = [''], ...options }) {
    super(options)

    this.dialogue = dialogue
    this.dialogueIndex = 0
  }
}
