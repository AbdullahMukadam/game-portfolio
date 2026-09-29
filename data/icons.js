

const ICONS = {
  scroll: [
    '..####..',
    '.#....#.',
    '.#.##.#.',
    '.#....#.',
    '.#.##.#.',
    '.#....#.',
    '.#.##.#.',
    '..####..'
  ],
  lightning: [
    '....##..',
    '...##...',
    '..##....',
    '.#####..',
    '...##...',
    '..##....',
    '.##.....',
    '##......'
  ],
  anvil: [
    '..####..',
    '.######.',
    '.######.',
    '..####..',
    '...##...',
    '...##...',
    '..####..',
    '.######.'
  ],
  chest: [
    '........',
    '.######.',
    '########',
    '#.#..#.#',
    '########',
    '#.####.#',
    '#.#..#.#',
    '########'
  ]
}

export const ICON_NAMES = Object.keys(ICONS)

function runs(rows) {
  const out = []

  rows.forEach((row, y) => {
    let x = 0

    while (x < row.length) {
      if (row[x] !== '#') {
        x += 1
        continue
      }

      let end = x
      while (end < row.length && row[end] === '#') end += 1

      out.push({ x, y, w: end - x, h: 1 })
      x = end
    }
  })

  return out
}

export function renderIcon(name, { size = 16, className = '', fill = 'currentColor' } = {}) {
  const rows = ICONS[name]

  if (!rows) throw new Error(`Unknown icon "${name}". Known: ${ICON_NAMES.join(', ')}`)

  const rects = runs(rows)
    .map(({ x, y, w, h }) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`)
    .join('')

  return (
    `<svg class="icon ${className}" width="${size}" height="${size}" ` +
    `viewBox="0 0 8 8" fill="${fill}" shape-rendering="crispEdges" ` +
    `aria-hidden="true" focusable="false">${rects}</svg>`
  )
}
