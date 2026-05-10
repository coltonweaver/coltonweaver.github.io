import type { MetadataRoute } from 'next'
import { getAllPostMeta } from '@/lib/blog'

const SITE_URL = 'https://www.coltonweaver.com'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta()
  const lastBlogUpdate = posts[0]?.date || new Date().toISOString().slice(0, 10)

  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(lastBlogUpdate),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
