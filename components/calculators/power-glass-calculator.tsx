'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ResultPanel } from '@/components/site/landing'
import { selectProduct } from '@/components/home/select-product'

const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

/** Reference installed price per m², from the Power Glass sales deck. */
const PRICE_PER_M2 = 450

/**
 * Bill savings range by how much sun the glass takes. The high end matches the deck's restaurant case
 * (30–40 % on a fully glazed facade); less exposed glass saves proportionally less.
 */
const exposures = [
  { id: 'alta', label: 'Sol directo', hint: 'Fachada poniente u oriente', range: [0.3, 0.4], factor: 1 },
  { id: 'media', label: 'Sol parcial', hint: 'Algunas horas al día', range: [0.18, 0.28], factor: 0.7 },
  { id: 'baja', label: 'Poca exposición', hint: 'Sombra la mayor parte', range: [0.08, 0.15], factor: 0.4 },
] as const

/**
 * Savings per m² of glass in the deck's case ($7,500–$10,000/month over 80 m²). Caps the estimate so a
 * small window on a big bill doesn't promise a share of the whole bill.
 */
const SAVINGS_PER_M2: [number, number] = [94, 125]

type ExposureId = (typeof exposures)[number]['id']

export function PowerGlassCalculator() {
  const [m2, setM2] = useState(80)
  const [bill, setBill] = useState(25000)
  const [exposure, setExposure] = useState<ExposureId>('alta')

  const selected = exposures.find((item) => item.id === exposure)!
  const [low, high] = selected.range
  const investment = m2 * PRICE_PER_M2
  const savingsLow = Math.min(bill * low, m2 * SAVINGS_PER_M2[0] * selected.factor)
  const savingsHigh = Math.min(bill * high, m2 * SAVINGS_PER_M2[1] * selected.factor)
  const paybackHigh = savingsLow > 0 ? investment / savingsLow : 0
  const paybackLow = savingsHigh > 0 ? investment / savingsHigh : 0
  const months = (value: number) => Math.max(1, Math.round(value))

  const summary = `${m2} m², recibo ${currency.format(bill)}/mes, ${exposures.find((item) => item.id === exposure)!.label.toLowerCase()}: ahorro ${currency.format(savingsLow)}–${currency.format(savingsHigh)}/mes, inversión aprox. ${currency.format(investment)}`

  return (
    <div className="grid gap-6">
      <label className="grid gap-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-bold text-slate-700">Metros cuadrados de vidrio</span>
          <span className="font-mono text-lg font-black">{m2} m²</span>
        </span>
        <input type="range" min={10} max={600} step={10} value={m2} onChange={(e) => setM2(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-500" />
      </label>
      <label className="grid gap-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-bold text-slate-700">Recibo de luz mensual</span>
          <span className="font-mono text-lg font-black">{currency.format(bill)}</span>
        </span>
        <input type="range" min={3000} max={300000} step={1000} value={bill} onChange={(e) => setBill(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-500" />
      </label>

      <div className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">¿Cuánto sol reciben tus ventanas?</span>
        <div className="grid grid-cols-3 gap-2">
          {exposures.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={exposure === item.id}
              onClick={() => setExposure(item.id)}
              className={`rounded-xl border px-2 py-2 text-center transition ${exposure === item.id ? 'border-sky-500 bg-sky-50 ring-4 ring-sky-100' : 'border-slate-200 hover:border-sky-200'}`}
            >
              <span className="block text-sm font-black text-slate-900">{item.label}</span>
              <span className="block text-[11px] leading-4 text-slate-400">{item.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <ResultPanel
        label="Ahorro estimado al mes"
        value={`${currency.format(savingsLow)} – ${currency.format(savingsHigh)}`}
        detail={
          <>
            <span className="font-bold text-lime-300">
              Inversión aprox. {currency.format(investment)} · recuperas en {months(paybackLow)}–{months(paybackHigh)} meses
            </span>
            <br />
            Al año son {currency.format(savingsLow * 12)} – {currency.format(savingsHigh * 12)} que dejas de pagar. Garantía de 10 años.
          </>
        }
      >
        <button
          type="button"
          onClick={() => selectProduct('power-glass', summary)}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400"
        >
          Agendar visita gratis
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </ResultPanel>
      <p className="text-center text-xs text-slate-400">Estimación con precio de referencia de {currency.format(PRICE_PER_M2)}/m². Medimos en sitio y cotizamos en 24 h.</p>
    </div>
  )
}
