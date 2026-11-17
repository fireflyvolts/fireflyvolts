import type { MetadataRoute } from 'next'
import { catalog } from '@/lib/catalog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fireflyvolts.com'

  const store: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tienda`, lastModified: new Date('2026-11-17'), changeFrequency: 'weekly', priority: 0.9 },
    ...catalog.map((item) => ({
      url: `${baseUrl}/tienda/${item.slug}`,
      lastModified: new Date('2026-11-17'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]

  return [
    ...store,
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
      url: `${baseUrl}/estaciones-de-energia`,
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
