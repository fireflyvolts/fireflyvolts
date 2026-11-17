'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { selectProduct } from './select-product'

export function ProductCta({ product, tone = 'light' }: { product: Product; tone?: 'light' | 'dark' }) {
  const className =
    tone === 'dark'
      ? 'inline-flex items-center font-black text-lime-300 transition hover:text-lime-200'
      : 'inline-flex items-center font-black text-sky-600 transition hover:text-sky-700'

  if (product.href) {
    return (
      <Link href={product.href} className={`group ${className}`}>
        Ver solución
        <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    )
  }

  return (
    <button type="button" onClick={() => selectProduct(product.id)} className={`group ${className}`}>
      Cotizar
      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
    </button>
  )
}
