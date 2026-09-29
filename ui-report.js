(function uiReport() {
  const px = (n) => Math.round(n * 10) / 10
  const L = []
  const say = (s) => L.push(s)

  say('=== 1. DID THE CSS LOAD? ===')
  const probe = document.querySelector('.mapcard') || document.querySelector('.hud__vitals')
  if (!probe) { say('!! no HUD element found - markup missing or renamed'); return console.log(L.join('\n')) }
  const cs = getComputedStyle(probe)
  say('probe class      : ' + probe.className)
  say('background-color : ' + cs.backgroundColor)
  say('border-top       : ' + cs.borderTopWidth + ' ' + cs.borderTopColor)
  say('font-size        : ' + cs.fontSize)
  say('position         : ' + cs.position + ' | z-index ' + cs.zIndex)
  const tokenOK = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent'
  say(tokenOK ? '-> stylesheet IS applied' : '-> !! stylesheet NOT applied (stale cache? hard-refresh)')

  say('')
  say('=== 2. TEXT OVERFLOW (content wider/taller than its box) ===')
  let of = 0
  document.querySelectorAll('*').forEach((el) => {
    if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) {
      if (el.clientWidth === 0) return
      of++
      say('  ' + (el.className || el.tagName) +
        '  content ' + el.scrollWidth + 'x' + el.scrollHeight +
        ' vs box ' + el.clientWidth + 'x' + el.clientHeight)
    }
  })
  say(of ? '  ' + of + ' overflowing element(s)' : '  none')

  say('')
  say('=== 3. CHILDREN ESCAPING THEIR PARENT ===')
  let esc = 0
  document.querySelectorAll('.mapcard, .hud__vitals, .modal__panel, .hud, .settings-panel, #characterDialogueBox').forEach((p) => {
    const pr = p.getBoundingClientRect()
    p.querySelectorAll('*').forEach((c) => {
      const cr = c.getBoundingClientRect()
      if (!cr.width) return
      const dR = cr.right - pr.right, dB = cr.bottom - pr.bottom
      const dL = pr.left - cr.left, dT = pr.top - cr.top
      const worst = Math.max(dR, dB, dL, dT)
      if (worst > 1) {
        esc++
        say('  ' + (c.className || c.tagName) + ' inside .' + (p.className.split(' ')[0]) +
          '  overflows by R' + px(dR) + ' B' + px(dB) + ' L' + px(dL) + ' T' + px(dT))
      }
    })
  })
  say(esc ? '  ' + esc + ' escape(s)' : '  none')

  say('')
  say('=== 4. HUD ELEMENT BOXES (collision check) ===')
  const boxes = []
  document.querySelectorAll('.hud__vitals, .hud__controls, .mapcard, .settings-toggle, #characterDialogueBox, .mobile-controls, .modal.active, .tooltip__box')
    .forEach((el) => {
      const r = el.getBoundingClientRect()
      if (!r.width) return
      const st = getComputedStyle(el)
      if (st.display === 'none' || st.visibility === 'hidden') return
      boxes.push({ n: el.className || el.id || el.tagName, r })
      say('  ' + (el.className || el.id).toString().padEnd(22) +
        ' x' + px(r.left) + ' y' + px(r.top) +
        ' w' + px(r.width) + ' h' + px(r.height) +
        (r.right > innerWidth + 1 || r.bottom > innerHeight + 1 ? '   !! OFFSCREEN' : '') +
        (r.left < -1 || r.top < -1 ? '   !! NEGATIVE' : ''))
    })

  say('')
  say('  -- overlaps --')
  let hits = 0
  for (let a = 0; a < boxes.length; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      const A = boxes[a].r, B = boxes[b].r
      const ox = Math.min(A.right, B.right) - Math.max(A.left, B.left)
      const oy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top)
      if (ox > 1 && oy > 1) {
        hits++
        say('    ' + boxes[a].n + '  X  ' + boxes[b].n + '   (' + px(ox) + ' x ' + px(oy) + 'px)')
      }
    }
  }
  say(hits ? '  ' + hits + ' overlap(s)' : '  none')

  say('')
  say('=== 5. ACTUAL COMPUTED FONT SIZES ===')
  const seen = new Set()
  document.querySelectorAll('.mapcard__title, .keyrow, .keyrow__label, .vital__label, .vital__value, .hud__controls, .modal__heading, .modal__body, .quest__list, .node__name, .slot, .stat, .slab__label, .inventory li, #characterDialogueBox, .settings-panel, .tooltip__text')
    .forEach((el) => {
      if (!el.textContent.trim()) return
      const s = getComputedStyle(el)
      const k = el.className
      if (seen.has(k)) return
      seen.add(k)
      say('  ' + k.toString().padEnd(22) + s.fontSize.padStart(7) + '  ' +
        s.fontFamily.split(',')[0].replace(/['"]/g, ''))
    })

  say('')
  say('=== 6. INVISIBLE / ZERO-SIZED UI ===')
  let hid = 0
  document.querySelectorAll('.hud__vitals, .hud__controls, .mapcard, .mapcard__field, .mapcard__key, .keyrow, .legend, .minimap, .tooltip__box')
    .forEach((el) => {
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (s.display === 'none' || r.width === 0) {
        hid++
        say('  ' + (el.className) + '  display:' + s.display + ' size:' + px(r.width) + 'x' + px(r.height))
      }
    })
  say(hid ? '  ' + hid + ' hidden element(s)' : '  none')

  say('')
  say('=== 7. VIEWPORT / ENVIRONMENT ===')
  say('  window        : ' + innerWidth + ' x ' + innerHeight)
  say('  devicePixelRatio: ' + devicePixelRatio)
  say('  coarse pointer : ' + matchMedia('(hover: none) and (pointer: coarse)').matches)
  say('  loaded via     : ' + location.protocol + '//' + location.host)
  say('  module scripts : ' + performance.getEntriesByType('resource').filter(r => r.name.endsWith('.js')).length)
  const errs = []
  window.onerror = null
  say('  map key rows   : ' + document.querySelectorAll('.keyrow').length)
  say('  map pins       : ' + document.querySelectorAll('.minimap__pin').length)
  say('  bar fill widths: ' + [...document.querySelectorAll('.bar__fill')].map(e => getComputedStyle(e).width).join(', '))
  say('  modal slots    : ' + document.querySelectorAll('.slot').length + ' (empty ' + document.querySelectorAll('.slot--empty').length + ')')

  console.log(L.join('\n'))
  window.__uiReport = L.join('\n')
})()
