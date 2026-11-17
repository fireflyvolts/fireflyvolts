'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { products } from '@/lib/products'

const PHONE = '525585301886'

/** Floating WhatsApp button. The prefilled message names the product of the page the visitor is on. */
export function WhatsAppButton() {
  const pathname = usePathname()
  const product = products.find((item) => item.href === pathname)
  const text = product
    ? `Hola, vi ${product.name} en fireflyvolts.com y quiero una cotización.`
    : 'Hola, vengo de fireflyvolts.com y quiero una cotización.'

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-24 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 font-black text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-105 lg:bottom-6 lg:right-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
