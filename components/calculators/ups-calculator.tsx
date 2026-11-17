'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Minus, Plus } from 'lucide-react'
import { ResultPanel } from '@/components/site/landing'
import { selectProduct } from '@/components/home/select-product'

/** Typical running watts per device. Compressor loads are flagged because they need an online UPS with headroom. */
const devices = [
  { id: 'pc', label: 'Computadora de escritorio', watts: 250 },
  { id: 'pos', label: 'Laptop o punto de venta', watts: 120 },
  { id: 'server', label: 'Servidor, NVR o conmutador', watts: 400 },
  { id: 'network', label: 'Módem, router y switch', watts: 60 },
  { id: 'cctv', label: 'Cámaras (DVR + 8 cámaras)', watts: 120 },
  { id: 'fridge', label: 'Refrigerador de medicamento o vacunas', watts: 350, compressor: true },
  { id: 'medical', label: 'Equipo médico (ultrasonido, monitor)', watts: 600 },
] as const

type DeviceId = (typeof devices)[number]['id']

const backupOptions = [
  { minutes: 10, label: '10 min', hint: 'Apagar con calma' },
  { minutes: 30, label: '30 min', hint: 'Cortes cortos' },
  { minutes: 60, label: '1 hora', hint: 'Seguir operando' },
  { minutes: 180, label: '3 h o más', hint: 'Cortes largos' },
]

const sizes = [1, 2, 3, 6, 10, 15, 20]

function recommend(watts: number, voltage: 120 | 220, minutes: number, hasCompressor: boolean) {
  const requiredKva = (watts * (hasCompressor ? 1.5 : 1.25)) / 1000
  const kva = sizes.find((size) => size >= requiredKva)
  if (!kva) {
    return { kva: null, series: 'Proyecto trifásico', why: 'Tu carga pasa de 20 kVA. Lo dimensionamos en sitio con un UPS trifásico o modular.' }
  }
  if (minutes >= 180 && voltage === 120 && kva <= 6) {
    return {
      kva: Math.max(kva, 3),
      series: 'Respaldo prolongado · Serie MG+13',
      why: 'Onda senoidal pura y baterías externas configurables para horas de respaldo. Una alternativa económica a una planta de emergencia.',
    }
  }
  if (voltage === 220 && kva >= 6) {
    return {
      kva,
      series: 'En línea bifásico · Serie FRUK19',
      why: 'Doble conversión con transformador de aislamiento a la salida: la máxima protección para cargas médicas y comerciales en 220 V.',
    }
  }
  if (kva <= 10) {
    return {
      kva,
      series: 'En línea doble conversión · Serie KR+19',
      why: 'Transferencia de 0 ms y regulación de ±1 %. Tus equipos nunca notan el corte.',
    }
  }
  return { kva, series: 'En línea bifásico · Serie FRUK19', why: 'Doble conversión de 1 a 20 kVA con transformador de aislamiento y bypass automático.' }
}

export function UpsCalculator() {
  const [counts, setCounts] = useState<Record<DeviceId, number>>({ pc: 3, pos: 1, server: 0, network: 1, cctv: 1, fridge: 0, medical: 0 })
  const [voltage, setVoltage] = useState<120 | 220>(120)
  const [minutes, setMinutes] = useState(30)

  const watts = devices.reduce((sum, device) => sum + device.watts * counts[device.id], 0)
  const hasCompressor = devices.some((device) => 'compressor' in device && counts[device.id] > 0)
  const result = useMemo(() => recommend(watts, voltage, minutes, hasCompressor), [watts, voltage, minutes, hasCompressor])
  const backupLabel = backupOptions.find((option) => option.minutes === minutes)?.label ?? `${minutes} min`

  const change = (id: DeviceId, delta: number) =>
    setCounts((current) => ({ ...current, [id]: Math.max(0, Math.min(20, current[id] + delta)) }))

  const summary = result.kva
    ? `${result.kva} kVA ${result.series}, ${voltage} V, respaldo ${backupLabel}, carga ${watts.toLocaleString('es-MX')} W`
    : `Carga de ${watts.toLocaleString('es-MX')} W en ${voltage} V, requiere proyecto trifásico`

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
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Voltaje de tus contactos</span>
        <div className="grid grid-cols-2 gap-2">
          {([120, 220] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={voltage === value}
              onClick={() => setVoltage(value)}
              className={`h-11 rounded-xl border text-sm font-black transition ${voltage === value ? 'border-sky-500 bg-sky-50 text-sky-700 ring-4 ring-sky-100' : 'border-slate-200 text-slate-600 hover:border-sky-200'}`}
            >
              {value} V
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">¿Cuánto respaldo necesitas?</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {backupOptions.map((option) => (
            <button
              key={option.minutes}
              type="button"
              aria-pressed={minutes === option.minutes}
              onClick={() => setMinutes(option.minutes)}
              className={`rounded-xl border px-2 py-2 text-center transition ${minutes === option.minutes ? 'border-sky-500 bg-sky-50 ring-4 ring-sky-100' : 'border-slate-200 hover:border-sky-200'}`}
            >
              <span className="block text-sm font-black text-slate-900">{option.label}</span>
              <span className="block text-[11px] text-slate-400">{option.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <ResultPanel
        label={`Carga total · ${watts.toLocaleString('es-MX')} W`}
        value={result.kva ? `UPS de ${result.kva} kVA` : 'Más de 20 kVA'}
        detail={
          <>
            <span className="font-bold text-lime-300">{result.series}</span>
            <br />
            {result.why}
            {result.kva && minutes >= 30 && ' Incluye gabinete de baterías para el tiempo que elegiste.'}
          </>
        }
      >
        <button
          type="button"
          disabled={watts === 0}
          onClick={() => selectProduct('ups', summary)}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400 disabled:opacity-50"
        >
          Cotizar este UPS
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </ResultPanel>
      <p className="text-center text-xs text-slate-400">Estimación con consumos típicos. Confirmamos con una visita antes de cotizar.</p>
    </div>
  )
}
