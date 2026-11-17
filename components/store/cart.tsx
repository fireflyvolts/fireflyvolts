'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { formatPrice, itemBySlug, type StoreItem } from '@/lib/catalog'

const STORAGE_KEY = 'firefly_cart'
const PHONE = '525585301886'

type Line = { slug: string; qty: number }

type CartContext = {
  lines: (Line & { item: StoreItem })[]
  count: number
  total: number
  add: (slug: string, qty?: number) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const Context = createContext<CartContext | null>(null)

export function useCart() {
  const value = useContext(Context)
  if (!value) throw new Error('useCart must be used inside CartProvider')
  return value
}

/** WhatsApp order message. Checkout is manual for now: sales confirms stock, payment and delivery. */
export function orderLink(lines: { item: StoreItem; qty: number }[]) {
  const total = lines.reduce((sum, line) => sum + line.item.price * line.qty, 0)
  const text = [
    'Hola, quiero hacer este pedido en fireflyvolts.com:',
    '',
    ...lines.map((line) => `• ${line.qty} × ${line.item.name} (${line.item.model}) · ${formatPrice(line.item.price * line.qty)}`),
    '',
    `Total: ${formatPrice(total)} MXN`,
    '¿Me confirman disponibilidad y entrega en Mérida?',
  ].join('\n')
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Line[]
      setRaw(saved.filter((line) => itemBySlug[line.slug]))
    } catch {
      // Storage unavailable: start with an empty cart.
    }
  }, [])

  const persist = useCallback((next: Line[]) => {
    setRaw(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Ignore: the cart still works for this visit.
    }
  }, [])

  const value = useMemo<CartContext>(() => {
    const lines = raw.map((line) => ({ ...line, item: itemBySlug[line.slug] })).filter((line) => line.item)
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      total: lines.reduce((sum, line) => sum + line.item.price * line.qty, 0),
      add: (slug, qty = 1) => {
        const existing = raw.find((line) => line.slug === slug)
        persist(existing ? raw.map((line) => (line.slug === slug ? { ...line, qty: line.qty + qty } : line)) : [...raw, { slug, qty }])
        setOpen(true)
      },
      setQty: (slug, qty) => persist(qty <= 0 ? raw.filter((line) => line.slug !== slug) : raw.map((line) => (line.slug === slug ? { ...line, qty } : line))),
      remove: (slug) => persist(raw.filter((line) => line.slug !== slug)),
      open,
      setOpen,
    }
  }, [raw, open, persist])

  return (
    <Context.Provider value={value}>
      {children}
      <CartDrawer />
    </Context.Provider>
  )
}

export function CartButton() {
  const { count, setOpen } = useCart()
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Abrir carrito (${count})`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:border-sky-300 hover:text-sky-600"
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1 text-[11px] font-black text-slate-950">{count}</span>
      )}
    </button>
  )
}

function CartDrawer() {
  const { lines, total, setQty, remove, open, setOpen } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-slate-950/40 transition ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside
        role="dialog"
        aria-label="Carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <p className="text-xl font-black">Tu carrito</p>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar carrito" className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-slate-300" />
            <p className="font-bold text-slate-600">Tu carrito está vacío.</p>
            <Link href="/tienda" onClick={() => setOpen(false)} className="font-black text-sky-600 hover:text-sky-700">
              Ver la tienda
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-6">
              {lines.map(({ slug, qty, item }) => (
                <li key={slug} className="flex gap-4 py-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-lime-300 bg-[#061224] font-mono text-[10px] font-black uppercase text-white/60">
                    Foto
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/tienda/${slug}`} onClick={() => setOpen(false)} className="font-black leading-tight hover:text-sky-600">
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-400">{item.model}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button type="button" aria-label="Quitar uno" onClick={() => setQty(slug, qty - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-mono font-black">{qty}</span>
                        <button type="button" aria-label="Agregar uno" onClick={() => setQty(slug, qty + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-black">{formatPrice(item.price * qty)}</span>
                    </div>
                  </div>
                  <button type="button" aria-label={`Eliminar ${item.name}`} onClick={() => remove(slug)} className="self-start text-slate-300 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-500">Total</span>
                <span className="text-2xl font-black">{formatPrice(total)} <span className="text-sm text-slate-400">MXN</span></span>
              </div>
              <p className="mt-1 text-xs text-slate-400">IVA incluido · Entrega en Mérida sin costo</p>
              <a
                href={orderLink(lines)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#25D366] font-black text-white transition hover:brightness-95"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pedir por WhatsApp
              </a>
              <p className="mt-2 text-center text-xs text-slate-400">Te confirmamos existencia, pago y fecha de entrega.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
