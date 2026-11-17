'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Minus, Plus } from 'lucide-react'
import { ResultPanel } from '@/components/site/landing'
import { selectProduct } from '@/components/home/select-product'
import { StoreSuggestion } from '@/components/store/store-ui'
import { itemBySlug } from '@/lib/catalog'

/** Small single-phase regulators are sold in the store; the rest are quoted. */
function regulatorItem(result: { kva: number | null; series: string }) {
  if (result.series.includes('SMS PHV') && result.kva === 5) return itemBySlug['regulador-sms-phv-5kva']
  if (result.series === 'Servo monofásico · Serie SMS' && (result.kva === 1 || result.kva === 3)) return itemBySlug[`regulador-sms-${result.kva}kva`]
  return undefined
}

/** Approximate apparent power per load, kVA. Minisplit values cover conventional and inverter units. */
const loads = [
  { id: 'ac1', label: 'Minisplit 1 tonelada', kva: 1.3 },
  { id: 'ac15', label: 'Minisplit 1.5 toneladas', kva: 1.9 },
  { id: 'ac2', label: 'Minisplit 2 toneladas', kva: 2.6 },
  { id: 'fridge', label: 'Refrigerador o congelador', kva: 0.6 },
  { id: 'pump', label: 'Bomba de agua o hidroneumático', kva: 1.0 },
  { id: 'other', label: 'Electrónica (TV, cómputo, cocina)', kva: 0.5 },
] as const

type LoadId = (typeof loads)[number]['id']
type Supply = '120' | '220' | '3f'

const supplies: { id: Supply; label: string; hint: string }[] = [
  { id: '120', label: '120 V', hint: '1 fase' },
  { id: '220', label: '220 V', hint: '2 fases' },
  { id: '3f', label: 'Trifásico', hint: 'Comercio/industria' },
]

function pick(required: number, supply: Supply) {
  if (supply === '120') {
    const size = [1, 3, 5, 10, 15].find((value) => value >= required)
    return size
      ? { kva: size, series: 'Servo monofásico · Serie SMS', why: 'Regulación de ±2 % con retardo de arranque que protege compresores al regresar la luz.' }
      : { kva: null, series: 'Cambio a 220 V', why: 'Tu carga pasa de 15 kVA en 120 V. Conviene regular a 2 fases o trifásico; lo revisamos en sitio.' }
  }
  if (supply === '220') {
    const size = [3, 5, 10, 15].find((value) => value >= required)
    if (size) return { kva: size, series: 'Servo 220 V · Serie SMS PHV', why: 'Regulación de ±2 %, bypass y protección por alto y bajo voltaje. Ideal para casas con varios aires.' }
    if (required <= 25) return { kva: 25, series: 'Electrónico 220 V · Serie EEH', why: 'Corrección electrónica rápida para cargas grandes en 2 fases.' }
    return { kva: null, series: 'Regulador industrial', why: 'Tu carga pasa de 25 kVA. Te proponemos un regulador trifásico después de medir tu instalación.' }
  }
  const commercial = [10, 15, 20, 30].find((value) => value >= required)
  if (commercial) return { kva: commercial, series: 'Comercial trifásico · Serie CMS', why: 'Servomotor con protección por voltaje fuera de rango y display por fase.' }
  const industrial = [40, 50, 60, 80, 100, 120, 150, 180, 250, 350].find((value) => value >= required)
  return industrial
    ? { kva: industrial, series: 'Industrial trifásico · Serie ISC', why: 'Servo con booster, pantalla táctil y monitoreo IoT para toda la instalación.' }
    : { kva: null, series: 'Proyecto especial', why: 'Más de 350 kVA: lo diseñamos con ingeniería en sitio.' }
}

export function RegulatorCalculator() {
  const [counts, setCounts] = useState<Record<LoadId, number>>({ ac1: 2, ac15: 2, ac2: 0, fridge: 1, pump: 1, other: 1 })
  const [supply, setSupply] = useState<Supply>('220')

  const connected = loads.reduce((sum, load) => sum + load.kva * counts[load.id], 0)
  const required = connected * 1.25
  const result = useMemo(() => pick(required, supply), [required, supply])
  const airs = counts.ac1 + counts.ac15 + counts.ac2

  const change = (id: LoadId, delta: number) =>
    setCounts((current) => ({ ...current, [id]: Math.max(0, Math.min(30, current[id] + delta)) }))

  const supplyLabel = supplies.find((item) => item.id === supply)?.label
  const summary = result.kva
    ? `Regulador ${result.kva} kVA ${result.series} + supresor, ${supplyLabel}, ${airs} minisplits, carga ${connected.toFixed(1)} kVA`
    : `${result.series}: carga ${connected.toFixed(1)} kVA en ${supplyLabel}`

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        {loads.map((load) => (
          <div key={load.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-2.5">
            <p className="text-sm font-bold text-slate-800">{load.label}</p>
            <div className="flex items-center gap-2">
              <button type="button" aria-label={`Quitar ${load.label}`} onClick={() => change(load.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-mono font-black">{counts[load.id]}</span>
              <button type="button" aria-label={`Agregar ${load.label}`} onClick={() => change(load.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Tu instalación</span>
        <div className="grid grid-cols-3 gap-2">
          {supplies.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={supply === item.id}
              onClick={() => setSupply(item.id)}
              className={`rounded-xl border px-2 py-2 text-center transition ${supply === item.id ? 'border-sky-500 bg-sky-50 ring-4 ring-sky-100' : 'border-slate-200 hover:border-sky-200'}`}
            >
              <span className="block text-sm font-black text-slate-900">{item.label}</span>
              <span className="block text-[11px] text-slate-400">{item.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <ResultPanel
        label={`Carga conectada · ${connected.toFixed(1)} kVA`}
        value={result.kva ? `Regulador de ${result.kva} kVA` : result.series}
        detail={
          <>
            {result.kva && <span className="font-bold text-lime-300">{result.series} + supresor de picos</span>}
            {result.kva && <br />}
            {result.why}
          </>
        }
      >
        <StoreSuggestion item={regulatorItem(result)} />
        <button
          type="button"
          disabled={connected === 0}
          onClick={() => selectProduct('reguladores', summary)}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400 disabled:opacity-50"
        >
          Cotizar mi regulador
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </ResultPanel>
      <p className="text-center text-xs text-slate-400">Incluye 25 % de margen para arranques. Confirmamos con una visita.</p>
    </div>
  )
}
