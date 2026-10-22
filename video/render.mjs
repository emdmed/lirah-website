#!/usr/bin/env node
/*
 * Renders a Lirah film (video/<name>.html) to MP4, frame by frame. Ported from alkor-web.
 *
 * The page's render(t) is a pure function of seconds, so this steps t at the frame rate and
 * screenshots each frame instead of screen-recording a playback: no dropped frames, no timing
 * drift, and the same bytes of film on every run.
 *
 *   node video/render.mjs --page context.html                # → video/out/lirah-context-4x5.mp4
 *   node video/render.mjs --page context.html --still 6.5    # one frame → video/out/context-still-6.5.png
 *   node video/render.mjs --page context.html --from 4 --to 9   # a slice, for checking one scene
 *   node video/render.mjs --page context.html --fps 60
 *   node video/render.mjs --serve                            # preview server; open the URL it prints
 *
 * The kit loads Typestar OCR and Departure Mono from ../app/fonts, which file:// can't do, so this
 * serves the site repo over a local HTTP port. Grenze Gotisch comes from Google Fonts; the first
 * frame waits on document.fonts.ready. Needs Playwright (global is fine) and ffmpeg on PATH.
 */
import { spawn, execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { createServer } from 'node:http'
import { mkdirSync, readFile } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const args = process.argv.slice(2)
const opt = (name, dflt) => {
  const i = args.indexOf('--' + name)
  return i > -1 ? args[i + 1] : dflt
}

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' }
function serve(port = 0) {
  const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
    readFile(join(root, path), (err, buf) => {
      if (err) { res.writeHead(404).end(); return }
      res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(buf)
    })
  })
  return new Promise((res) => server.listen(port, '127.0.0.1', () => res(server)))
}

if (args.includes('--serve')) {
  const server = await serve(Number(opt('port', 5193)))
  console.log(`http://127.0.0.1:${server.address().port}/video/<name>.html   (space plays, ?t=12 parks)`)
  await new Promise(() => {})
}

// Playwright is not a dependency of the site, so find a global install.
async function loadPlaywright() {
  try { return await import('playwright') } catch {}
  const roots = [process.env.PLAYWRIGHT_NODE_MODULES]
  try { roots.push(execSync('npm root -g', { encoding: 'utf8' }).trim()) } catch {}
  roots.push(join(process.env.HOME ?? '', '.local/share/mise/installs/npm-playwright/latest/node_modules'))
  for (const r of roots.filter(Boolean)) {
    try { return createRequire(join(r, 'noop.js'))('playwright') } catch {}
  }
  throw new Error('playwright not found: npm i -g playwright && npx playwright install chromium')
}

const pageFile = opt('page')
if (!pageFile) { console.error('usage: node video/render.mjs --page <name>.html [--still t | --from a --to b] [--fps n] [--out file]'); process.exit(1) }
let W = 1080, H = 1350   // a film can declare another stage size as window.__size = [w, h]
const fps = Number(opt('fps', 30))
const still = opt('still')
const base = pageFile.replace(/\.html$/, '')
const outDir = join(here, 'out')
mkdirSync(outDir, { recursive: true })

const server = await serve()
const { chromium } = await loadPlaywright()
// Playwright's own Chromium when its build matches the package; the system one when it doesn't.
const browser = await chromium.launch().catch(() =>
  chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium' }))
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
await page.goto(`http://127.0.0.1:${server.address().port}/video/${pageFile}?render=1`)
await page.evaluate(() => document.fonts.ready)
const size = await page.evaluate(() => window.__size)
if (size) { [W, H] = size; await page.setViewportSize({ width: W, height: H }) }
const duration = await page.evaluate(() => window.__duration)
const clip = { x: 0, y: 0, width: W, height: H }
const shape = W === H ? '1x1' : H * 4 === W * 5 ? '4x5' : W * 9 === H * 16 ? '16x9' : H * 9 === W * 16 ? '9x16' : `${W}x${H}`

async function finish(code = 0) { await browser.close(); server.close(); process.exit(code) }

if (still !== undefined) {
  const file = opt('out', join(outDir, `${base}-still-${still}.png`))
  await page.evaluate((t) => window.__render(t), Number(still))
  await page.evaluate(() => window.__ready?.())   // a film over images says when they have decoded
  await page.screenshot({ path: file, clip })
  console.log(file)
  await finish()
}

const from = Number(opt('from', 0))
const to = Math.min(Number(opt('to', duration)), duration)
const out = opt('out', join(outDir, from === 0 && to === duration ? `lirah-${base}-${shape}.mp4` : `${base}-slice-${from}-${to}.mp4`))
const frames = Math.round((to - from) * fps)

// H.264 High, yuv420p, faststart: what LinkedIn, X and every phone play without re-encoding trouble.
const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
  '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow',
  '-movflags', '+faststart', out,
], { stdio: ['pipe', 'inherit', 'inherit'] })
const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exited ' + c)))))

const started = Date.now()
for (let f = 0; f < frames; f++) {
  await page.evaluate((t) => window.__render(t), from + f / fps)
  await page.evaluate(() => window.__ready?.())
  const buf = await page.screenshot({ clip, type: 'png' })
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  if (f % fps === 0) process.stdout.write(`\r${(from + f / fps).toFixed(1)}s / ${to}s`)
}
ff.stdin.end()
await done
console.log(`\r${out} · ${frames} frames at ${fps} fps · ${((Date.now() - started) / 1000).toFixed(0)}s`)
await finish()
