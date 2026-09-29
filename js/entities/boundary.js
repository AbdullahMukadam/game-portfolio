export class Boundary {
  constructor({ position, width = 12, height = 12 }) {
    this.position = position
    this.width = width
    this.height = height
  }

  draw(c) {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
