import type { MetadataRoute } from 'next'
import UTILITIES from '@/utilities'

const SITE_URL = 'https://www.coltonweaver.com'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/utilities/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...UTILITIES.map((utility) => ({
      url: `${SITE_URL}/utilities/${utility.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
