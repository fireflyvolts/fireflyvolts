'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Minus, Plus } from 'lucide-react'
import { ResultPanel } from '@/components/site/landing'
import { selectProduct } from '@/components/home/select-product'
import { StoreSuggestion } from '@/components/store/store-ui'
import { itemBySlug } from '@/lib/catalog'

/**
 * Power-All MG+13 portable stations, from the manufacturer's comparison sheets.
 * The 3600IL takes up to two expansion batteries (11,520 Wh in total).
 */
export const stations = [
  { model: 'PA MG+13-800LI', wh: 512, watts: 800 },
  { model: 'PA MG+13-1800LI', wh: 1024, watts: 1800 },
  { model: 'PA MG+13-2400IL', wh: 2048, watts: 2400 },
  { model: 'PA MG+13-3600IL', wh: 3840, watts: 3600 },
] as const

const EXPANSION_WH = 3840
const MAX_EXPANSIONS = 2
/** Share of the nameplate capacity that reaches the AC outlets (same assumption as the manufacturer's sheets). */
const USABLE = 0.85

/** Running watts and the share of the time the device actually draws them (a fridge compressor cycles). */
const devices = [
  { id: 'fridge', label: 'Refrigerador', watts: 150, duty: 0.4, surge: true },
  { id: 'fan', label: 'Ventilador', watts: 60, duty: 1 },
  { id: 'lights', label: 'Foco LED', watts: 10, duty: 1 },
  { id: 'network', label: 'Módem y router', watts: 20, duty: 1 },
  { id: 'laptop', label: 'Laptop o computadora', watts: 80, duty: 1 },
  { id: 'tv', label: 'Televisión', watts: 100, duty: 1 },
  { id: 'cpap', label: 'CPAP o equipo médico en casa', watts: 60, duty: 1 },
  { id: 'pos', label: 'Terminal, caja y cámaras', watts: 80, duty: 1 },
] as const

type DeviceId = (typeof devices)[number]['id']

const hourOptions = [2, 4, 8, 12]

function recommend(peakWatts: number, energyWh: number) {
  const station = stations.find((item) => item.watts >= peakWatts && item.wh * USABLE >= energyWh)
  if (station) return { station, expansions: 0 }
  const largest = stations[stations.length - 1]
  if (peakWatts > largest.watts) return null
  const missing = energyWh - largest.wh * USABLE
  const expansions = Math.ceil(missing / (EXPANSION_WH * USABLE))
  return expansions <= MAX_EXPANSIONS ? { station: largest, expansions } : null
}

export function PowerStationCalculator() {
  const [counts, setCounts] = useState<Record<DeviceId, number>>({
    fridge: 1,
    fan: 2,
    lights: 4,
    network: 1,
    laptop: 1,
    tv: 0,
    cpap: 0,
    pos: 0,
  })
  const [hours, setHours] = useState(4)

  const change = (id: DeviceId, delta: number) =>
    setCounts((current) => ({ ...current, [id]: Math.max(0, Math.min(10, current[id] + delta)) }))

  const { peakWatts, averageWatts } = useMemo(() => {
    let peak = 0
    let average = 0
    for (const device of devices) {
      const count = counts[device.id]
      // Compressors need headroom to start: count them at twice their running power.
      peak += count * device.watts * ('surge' in device ? 2 : 1)
      average += count * device.watts * device.duty
    }
    return { peakWatts: Math.round(peak), averageWatts: Math.round(average) }
  }, [counts])

  const energyWh = averageWatts * hours
  const result = recommend(peakWatts, energyWh)
  const capacity = result ? (result.station.wh + result.expansions * EXPANSION_WH) * USABLE : 0
  const autonomy = averageWatts > 0 ? capacity / averageWatts : 0

  const summary = result
    ? `${result.station.model}${result.expansions ? ` + ${result.expansions} batería(s) de expansión` : ''} · ${averageWatts} W promedio · ${hours} h deseadas · ~${autonomy.toFixed(1)} h estimadas`
    : `Carga de ${peakWatts} W pico por ${hours} h: requiere proyecto`

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-2.5">
            <div>
              <p className="text-sm font-bold text-slate-800">{device.label}</p>
              <p className="text-xs text-slate-400">~{device.watts} W c/u</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label={`Quitar ${device.label}`} onClick={() => change(device.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-mono font-black">{counts[device.id]}</span>
              <button type="button" aria-label={`Agregar ${device.label}`} onClick={() => change(device.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">¿Cuántas horas quieres aguantar?</span>
        <div className="grid grid-cols-4 gap-2">
          {hourOptions.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={hours === value}
              onClick={() => setHours(value)}
              className={`h-11 rounded-xl border text-sm font-black transition ${hours === value ? 'border-sky-500 bg-sky-50 text-sky-700 ring-4 ring-sky-100' : 'border-slate-200 text-slate-600 hover:border-sky-200'}`}
            >
              {value} h
            </button>
          ))}
        </div>
      </div>

      <ResultPanel
        label={`Consumo promedio · ${averageWatts.toLocaleString('es-MX')} W`}
        value={result ? result.station.model.replace('PA ', '') : 'Necesitas un proyecto'}
        detail={
          result ? (
            <>
              <span className="font-bold text-lime-300">
                {result.station.wh.toLocaleString('es-MX')} Wh · {result.station.watts.toLocaleString('es-MX')} W
                {result.expansions > 0 && ` + ${result.expansions} batería${result.expansions > 1 ? 's' : ''} de expansión`}
              </span>
              <br />
              Te aguanta cerca de <strong className="text-white">{autonomy.toFixed(1)} horas</strong> con esos equipos. Se recarga con la luz o con paneles solares.
            </>
          ) : (
            'Tu carga pasa de lo que da una estación portátil. Te conviene un UPS de mayor capacidad o un BESS: lo revisamos contigo.'
          )
        }
      >
        <StoreSuggestion item={result && result.expansions === 0 ? itemBySlug[`estacion-${result.station.model.replace('PA ', '').replace('+', '').toLowerCase()}`] : undefined} />
        <button
          type="button"
          disabled={averageWatts === 0}
          onClick={() => selectProduct(result ? 'estaciones' : 'ups', summary)}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400 disabled:opacity-50"
        >
          {result ? 'Prefiero que me asesoren' : 'Quiero que lo revisen'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </ResultPanel>
      <p className="text-center text-xs text-slate-400">Estimación con consumos típicos y 85 % de energía útil. La duración real depende de tus equipos.</p>
    </div>
  )
}
