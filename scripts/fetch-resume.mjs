// Pulls the built resume PDF from the coltonweaver/resume `latest` release into
// public/ so the site serves it from its own domain.
//
// Why not link straight at the release asset? GitHub serves release downloads
// with `Content-Disposition: attachment`, so Chrome downloads the file instead
// of rendering it — and that header also blocks embedding it in an iframe.
// GitHub Pages serves .pdf as `Content-Type: application/pdf`, which renders
// inline. The PDF is deliberately not committed; it is a build artifact.
//
// Offline builds: set SKIP_RESUME_FETCH=1 to warn instead of failing.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const SOURCE =
  'https://github.com/coltonweaver/resume/releases/latest/download/cbw_resume.pdf'
const DEST = join(process.cwd(), 'public', 'docs', 'cbw_resume.pdf')

if (process.env.SKIP_RESUME_FETCH) {
  console.warn('SKIP_RESUME_FETCH set — skipping; the Resume link may 404')
  process.exit(0)
}

const res = await fetch(SOURCE, { redirect: 'follow' }).catch((err) => {
  throw new Error(`could not reach ${SOURCE}: ${err.message}`)
})

if (!res.ok) {
  throw new Error(`${SOURCE} returned ${res.status} ${res.statusText}`)
}

const pdf = Buffer.from(await res.arrayBuffer())

// Guard against silently shipping an error page as the resume.
if (pdf.subarray(0, 5).toString() !== '%PDF-') {
  throw new Error(`${SOURCE} did not return a PDF (got ${pdf.length} bytes)`)
}

await mkdir(dirname(DEST), { recursive: true })
await writeFile(DEST, pdf)
console.log(`fetched resume: ${pdf.length} bytes -> public/docs/cbw_resume.pdf`)
