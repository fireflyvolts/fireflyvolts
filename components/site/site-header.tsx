'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { products } from '@/lib/products'
import { CartButton } from '@/components/store/cart'

/** Header shared by the home and every product landing. "Cotizar" jumps to the page's own #cotizar form. */
export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" aria-label="Firefly Volts inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
          <div className="group relative">
            <button type="button" className="inline-flex items-center rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700">
              Soluciones
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full w-80 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-sky-950/10">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href ?? '/'}
                    className={`rounded-xl px-4 py-3 hover:bg-sky-50 ${pathname === product.href ? 'bg-sky-50' : ''}`}
                  >
                    <span className="block font-black text-slate-950">{product.name}</span>
                    <span className="block text-xs font-medium text-slate-500">{product.tool}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/tienda" className={`rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700 ${pathname.startsWith('/tienda') ? 'text-sky-700' : ''}`}>Tienda</Link>
          <Link href="/que-es-peak-shaving" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700">Guía</Link>
          <Link href="/#como-trabajamos" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700">Cómo trabajamos</Link>
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <a
            href={pathname.startsWith('/tienda') ? '/#cotizar' : '#cotizar'}
            className="inline-flex h-10 items-center rounded-md bg-sky-500 px-3 text-sm font-bold text-white transition hover:bg-sky-400 sm:px-4"
          >
            Cotizar
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="grid gap-1">
            <Link href="/tienda" onClick={() => setOpen(false)} className="rounded-xl bg-lime-300 px-3 py-3 font-black text-slate-950">
              Tienda: compra directo
            </Link>
            {products.map((product) => (
              <Link
                key={product.id}
                href={product.href ?? '/'}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-bold text-slate-800 hover:bg-sky-50"
              >
                {product.name}
              </Link>
            ))}
            <Link href="/que-es-peak-shaving" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-bold text-slate-800 hover:bg-sky-50">
              Guía de peak shaving
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
