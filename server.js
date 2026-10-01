import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'

const PORT = Number(process.env.PORT) || 3000
const ROOT = process.cwd()

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ico': 'image/x-icon'
}

function resolveSafe(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const relative = normalize(decoded).replace(/^([/\\])+/, '')
  const target = join(ROOT, relative)

  if (!target.startsWith(ROOT + sep) && target !== ROOT) return null

  return target
}

const server = createServer(async (req, res) => {
  let filePath = resolveSafe(req.url || '/')

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' })
    res.end('403 Forbidden')
    return
  }

  try {
    let info = await stat(filePath)

    if (info.isDirectory()) {
      filePath = join(filePath, 'index.html')
      info = await stat(filePath)
    }

    res.writeHead(200, {
      'Content-Type': MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': 'no-cache'
    })

    createReadStream(filePath).pipe(res)
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Game running at http://0.0.0.0:${PORT}`)
})
