import { getAllPostMeta } from '@/lib/blog'

export const dynamic = 'force-static'

const SITE_URL = 'https://www.coltonweaver.com'
const TITLE = 'Colton Weaver — Blog'
const DESCRIPTION =
  'Distributed systems, API design, and platform reliability — by Colton Weaver.'

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getAllPostMeta()
  const lastBuildDate =
    posts[0]?.date ? new Date(posts[0].date + 'T00:00:00Z').toUTCString() : new Date().toUTCString()

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}/`
      const pubDate = new Date(p.date + 'T00:00:00Z').toUTCString()
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(p.description)}</description>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(TITLE)}</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
