'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BatteryCharging, Flame, PlugZap, ReceiptText, Snowflake, Zap } from 'lucide-react'
import { productById, type ProductId } from '@/lib/products'
import { selectProduct } from './select-product'

const needs: { id: ProductId; label: string; icon: typeof Zap; why: string }[] = [
  {
    id: 'bess',
    label: 'Mi recibo de CFE no deja de subir',
    icon: ReceiptText,
    why: 'Si pagas cargo por demanda, un BESS recorta el pico que CFE registra.',
  },
  {
    id: 'ups',
    label: 'Los apagones me paran la operación',
    icon: PlugZap,
    why: 'Un UPS de doble conversión mantiene vivos tus equipos críticos mientras regresa la luz.',
  },
  {
    id: 'estaciones',
    label: 'Quiero respaldo en casa sin instalar nada',
    icon: BatteryCharging,
    why: 'Una estación de energía portátil mantiene refri, ventiladores e internet durante el apagón. Llega cargada y se conecta a la pared.',
  },
  {
    id: 'reguladores',
    label: 'Se me queman aires o equipos',
    icon: Flame,
    why: 'Las variaciones de voltaje dañan compresores y tarjetas. Un regulador con supresor las filtra.',
  },
  {
    id: 'calidad',
    label: 'Algo falla y no sé qué es',
    icon: Zap,
    why: 'Medimos tu instalación con analizador para encontrar la causa antes de venderte un equipo.',
  },
  {
    id: 'power-glass',
    label: 'El aire acondicionado no se da abasto',
    icon: Snowflake,
    why: 'Si el sol pega en tus ventanas, la película térmica reduce el calor que entra.',
  },
]

export function NeedFinder() {
  const [selected, setSelected] = useState<ProductId>('bess')
  const need = needs.find((item) => item.id === selected) ?? needs[0]
  const product = productById[selected]

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-950/12 md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">Encuentra tu solución</p>
      <h2 className="mt-2 text-2xl font-black md:text-3xl">¿Qué te está pasando?</h2>

      <div className="mt-5 grid gap-2" role="radiogroup" aria-label="Elige tu problema principal">
        {needs.map((item) => {
          const active = item.id === selected
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(item.id)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                active
                  ? 'border-sky-500 bg-sky-50 text-slate-950 ring-4 ring-sky-100'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${active ? 'text-sky-500' : 'text-slate-400'}`} />
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="mt-5 rounded-2xl bg-[#061224] p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">Te recomendamos</span>
          <span className="rounded-full bg-lime-300 px-3 py-1 text-[11px] font-black text-slate-950">{product.tool}</span>
        </div>
        <p className="mt-3 text-xl font-black">{product.name}</p>
        <p className="mt-2 text-sm leading-6 text-white/70">{need.why}</p>
        {product.href ? (
          <Link
            href={product.href}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400"
          >
            Usar la calculadora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => selectProduct(product.id)}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400"
          >
            Quiero una propuesta
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
