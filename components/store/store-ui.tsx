'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react'
import { categories, formatPrice, hasPrice, type CategoryId, type StoreItem } from '@/lib/catalog'
import { showPlaceholders } from '@/lib/site-mode'
import { PlaceholderTag } from '@/components/site/placeholders'
import { orderLink, useCart } from './cart'

const PHONE = '525585301886'

function askPriceLink(item: StoreItem) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(`Hola, me interesa ${item.name} (${item.model}). ¿Me pasan precio y disponibilidad en Mérida?`)}`
}

export function ProductImage({ item, className = 'aspect-square' }: { item: StoreItem; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] ${showPlaceholders ? 'border-2 border-dashed border-lime-300' : 'border border-slate-200'} bg-[linear-gradient(135deg,#0b1f3a,#061224)] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,.35),transparent_45%)]" />
      <PlaceholderTag className="absolute left-3 top-3" />
      <div className="relative flex h-full flex-col items-center justify-center p-4 text-center">
        {showPlaceholders && <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">Foto</span>}
        <span className="mt-1 text-sm font-black text-white/80">{item.model}</span>
      </div>
    </div>
  )
}

export function Price({ item, size = 'md' }: { item: StoreItem; size?: 'md' | 'lg' }) {
  if (!hasPrice(item)) {
    return <span className={`font-black text-slate-950 ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>Precio por WhatsApp</span>
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`font-black tracking-[-0.03em] text-slate-950 ${size === 'lg' ? 'text-4xl' : 'text-2xl'}`}>
        {formatPrice(item.price)}
        <span className="ml-1 text-xs font-bold text-slate-400">MXN</span>
      </span>
      {item.pricePlaceholder && <PlaceholderTag />}
    </div>
  )
}

export function ProductCard({ item }: { item: StoreItem }) {
  const { add } = useCart()
  return (
    <article className="group flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/10">
      <Link href={`/tienda/${item.slug}`} className="relative block">
        <ProductImage item={item} />
        {item.badge && <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-black text-slate-950 shadow">{item.badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-4">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{item.model}</p>
        <Link href={`/tienda/${item.slug}`} className="mt-1 text-lg font-black leading-tight hover:text-sky-600">
          {item.name}
        </Link>
        <p className="mt-2 text-sm leading-6 text-slate-500">{item.summary}</p>
        <div className="mt-auto pt-4">
          <Price item={item} />
          {hasPrice(item) ? (
          <button
            type="button"
            onClick={() => add(item.slug)}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white transition hover:bg-sky-600"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Agregar al carrito
          </button>
          ) : (
            <a
              href={askPriceLink(item)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#25D366] text-sm font-black text-white transition hover:brightness-95"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Pedir precio
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/** Category chips + grid. Client-side filter so the catalog stays one static page. */
export function StoreGrid({ items, initial = 'todo' }: { items: StoreItem[]; initial?: CategoryId | 'todo' }) {
  const [active, setActive] = useState<CategoryId | 'todo'>(initial)
  const visible = active === 'todo' ? items : items.filter((item) => item.category === active)
  const chips = [{ id: 'todo' as const, short: 'Todo' }, ...categories]

  return (
    <div>
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Categorías">
        {chips.map((chip) => {
          const count = chip.id === 'todo' ? items.length : items.filter((item) => item.category === chip.id).length
          const selected = active === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(chip.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${selected ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300'}`}
            >
              {chip.short}
              <span className={`ml-2 font-mono text-xs ${selected ? 'text-lime-300' : 'text-slate-400'}`}>{count}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item) => (
          <ProductCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  )
}

export function BuyBox({ item }: { item: StoreItem }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  if (!hasPrice(item)) {
    return (
      <a
        href={askPriceLink(item)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-xl bg-[#25D366] font-black text-white transition hover:brightness-95"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Pedir precio y disponibilidad
      </a>
    )
  }
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-2">
          <button type="button" aria-label="Menos" onClick={() => setQty((value) => Math.max(1, value - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100">
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-mono font-black">{qty}</span>
          <button type="button" aria-label="Más" onClick={() => setQty((value) => Math.min(20, value + 1))} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => add(item.slug, qty)}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Agregar al carrito
        </button>
      </div>
      <a
        href={orderLink([{ item, qty }])}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-[#25D366] font-black text-[#128C4B] transition hover:bg-[#25D366]/10"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Comprar ahora por WhatsApp
      </a>
    </div>
  )
}

/** Shown inside a calculator result when the recommended model is sold in the store. */
export function StoreSuggestion({ item }: { item: StoreItem | undefined }) {
  if (!item) return null
  return (
    <Link
      href={`/tienda/${item.slug}`}
      className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-lime-300 px-4 py-3 font-black text-slate-950 transition hover:bg-lime-200"
    >
      <span className="flex items-center gap-2">
        <ShoppingBag className="h-5 w-5" />
        Comprar en la tienda
      </span>
      <span>{hasPrice(item) ? formatPrice(item.price) : 'Ver modelo'}</span>
    </Link>
  )
}
