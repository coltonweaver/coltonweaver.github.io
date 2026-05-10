import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime: string
}

export type Post = PostMeta & { content: string }

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')
const WORDS_PER_MINUTE = 220
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${mins} min`
}

function parsePost(file: string): Post {
  const slug = file.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  const { data, content } = matter(raw)

  const title = typeof data.title === 'string' ? data.title : slug
  const description = typeof data.description === 'string' ? data.description : ''
  const date = typeof data.date === 'string' ? data.date : ''
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : []

  if (!data.title) console.warn(`[blog] ${file}: missing required frontmatter "title"`)
  if (!data.date) console.warn(`[blog] ${file}: missing required frontmatter "date"`)
  else if (!ISO_DATE.test(date))
    console.warn(`[blog] ${file}: date "${date}" is not ISO YYYY-MM-DD`)

  return { slug, title, date, description, tags, readingTime: readingTime(content), content }
}

let cache: Post[] | null = null

function loadAll(): Post[] {
  if (cache) return cache
  if (!fs.existsSync(BLOG_DIR)) return (cache = [])
  cache = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return cache
}

export function getAllPostMeta(): PostMeta[] {
  return loadAll().map(({ content: _content, ...meta }) => meta)
}

export function getPost(slug: string): Post | null {
  return loadAll().find((p) => p.slug === slug) ?? null
}

export function getAllSlugs(): string[] {
  return loadAll().map((p) => p.slug)
}

export function fmtDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.valueOf())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
