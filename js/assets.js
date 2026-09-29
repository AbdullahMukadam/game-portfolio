export function loadImage(src) {
  const image = new Image()
  image.src = src
  return image
}

export const mapImage = loadImage('./img/map.png')
export const foregroundImage = loadImage('./img/foreground image.png')

export const playerImages = {
  up: loadImage('./img/playerUp.png'),
  left: loadImage('./img/playerLeft.png'),
  right: loadImage('./img/playerRight.png'),
  down: loadImage('./img/playerDown.png')
}

export const villagerImage = loadImage('./img/villager/Idle.png')
