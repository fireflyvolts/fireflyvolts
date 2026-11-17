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
      url: `${baseUrl}/bess`,
      lastModified: new Date('2026-11-17'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ups`,
      lastModified: new Date('2026-11-17'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reguladores`,
      lastModified: new Date('2026-11-17'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calidad-de-energia`,
      lastModified: new Date('2026-11-17'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/power-glass`,
      lastModified: new Date('2026-11-17'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/que-es-peak-shaving`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
