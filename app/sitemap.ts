import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fireflyvolts.com'

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/que-es-peak-shaving`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
