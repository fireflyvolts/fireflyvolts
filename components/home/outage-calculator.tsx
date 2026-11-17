'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { selectProduct } from './select-product'

const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

type Field = { key: 'perHour' | 'outages' | 'minutes'; label: string; min: number; max: number; step: number; format: (v: number) => string }

const fields: Field[] = [
  { key: 'perHour', label: 'Lo que factura tu negocio por hora', min: 1000, max: 100000, step: 1000, format: (v) => currency.format(v) },
  { key: 'outages', label: 'Cortes o bajones al mes', min: 1, max: 15, step: 1, format: (v) => `${v} ${v === 1 ? 'corte' : 'cortes'}` },
  { key: 'minutes', label: 'Tiempo parado por corte (con reinicios)', min: 5, max: 180, step: 5, format: (v) => `${v} min` },
]

export function OutageCalculator() {
  const [values, setValues] = useState({ perHour: 15000, outages: 3, minutes: 30 })

  const monthlyLoss = values.perHour * (values.minutes / 60) * values.outages
  const yearlyLoss = monthlyLoss * 12

  return (
    <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
      <div className="grid gap-7">
        {fields.map((field) => (
          <label key={field.key} className="grid gap-3">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-white/70">{field.label}</span>
              <span className="font-mono text-lg font-black text-white">{field.format(values[field.key])}</span>
            </span>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={values[field.key]}
              onChange={(event) => setValues((current) => ({ ...current, [field.key]: Number(event.target.value) }))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-sky-400"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-white p-6 text-slate-950">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Lo que hoy pierdes al año</p>
          <p className="mt-3 text-5xl font-black tracking-[-0.04em] text-slate-950 md:text-6xl">{currency.format(yearlyLoss)}</p>
          <p className="mt-2 text-sm text-slate-500">
            {currency.format(monthlyLoss)} al mes en ventas detenidas. No incluye equipo dañado ni producto perdido.
          </p>
        </div>
        <button
          type="button"
          onClick={() => selectProduct('ups')}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400"
        >
          Cotizar un UPS para mi negocio
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <p className="mt-3 text-center text-xs text-slate-400">Estimación ilustrativa con tus datos.</p>
      </div>
    </div>
  )
}
