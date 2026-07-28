import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.coltonweaver.com'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
  ]
}
