'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  CheckCircle2,
  Factory,
  Gauge,
  Hospital,
  Hotel,
  LineChart,
  Loader2,
  Mail,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Store,
  WalletCards,
} from 'lucide-react'

const monthlyBillRanges = [
  'Menos de $500 mil',
  '$500 mil a $750 mil',
  'Más de $750 mil',
]

const segments = [
  { icon: Hotel, title: 'Hoteles' },
  { icon: Hospital, title: 'Hospitales y clínicas' },
  { icon: Building2, title: 'Centros comerciales y plazas' },
  { icon: Factory, title: 'Industria ligera' },
  { icon: BatteryCharging, title: 'Bodegas y refrigeración' },
  { icon: Store, title: 'Comercios con alta demanda' },
]

const modelSteps = [
  {
    title: 'Leemos tu recibo',
    text: 'Identificamos tarifa, demanda máxima y cuánto pesa el cargo por capacidad.',
  },
  {
    title: 'Dimensionamos el BESS',
    text: 'Calculamos el sistema para tu curva real, sin sobredimensionar el proyecto.',
  },
  {
    title: 'Estructuramos el proyecto',
    text: 'Comparamos compra y arrendamiento para evitar una descapitalización innecesaria.',
  },
  {
    title: 'Medimos el resultado',
    text: 'El sistema opera con datos y el desempeño se valida contra tu consumo real.',
  },
]

type FormState = {
  name: string
  email: string
  businessName: string
  whatsapp: string
  monthlyBill: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  businessName: '',
  whatsapp: '',
  monthlyBill: '',
}

type LeadFormProps = {
  form: FormState
  status: 'idle' | 'submitting' | 'success' | 'error'
  error: string
  updateField: (field: keyof FormState, value: string) => void
  submitLead: (event: FormEvent<HTMLFormElement>) => void
  compact?: boolean
  theme?: 'light' | 'dark'
}

function LeadForm({ form, status, error, updateField, submitLead, compact = false, theme = 'dark' }: LeadFormProps) {
  const isLight = theme === 'light'
  const fieldClass = isLight
    ? 'h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100'
    : 'h-12 rounded-xl border border-white/15 bg-white/8 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10'
  const selectClass = isLight
    ? 'h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100'
    : 'h-12 rounded-xl border border-white/15 bg-slate-900 px-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10'
  const labelClass = isLight ? 'text-slate-500' : 'text-slate-400'

  if (status === 'success') {
    return (
      <div className={`rounded-2xl border p-7 text-center ${isLight ? 'border-sky-200 bg-sky-50' : 'border-sky-300/40 bg-sky-300/10'}`}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-sky-500" />
        <h3 className={`mt-4 text-2xl font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>Listo. Ya tenemos tus datos.</h3>
        <p className={`mt-2 leading-7 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
          Te contactaremos para revisar tu recibo y decirte qué vale la pena medir primero.
        </p>
      </div>
    )
  }

  return (
    <form className={compact ? 'grid gap-3' : 'grid gap-4'} onSubmit={submitLead}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${labelClass}`}>Nombre</span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className={fieldClass}
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${labelClass}`}>WhatsApp</span>
          <input
            required
            value={form.whatsapp}
            onChange={(event) => updateField('whatsapp', event.target.value)}
            className={fieldClass}
            placeholder="+52 ..."
            type="tel"
            autoComplete="tel"
          />
        </label>
      </div>
      <label className="grid gap-2">
        <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${labelClass}`}>Correo</span>
        <input
          required
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          className={fieldClass}
          placeholder="ventas@empresa.com"
          type="email"
          autoComplete="email"
        />
      </label>
      <label className="grid gap-2">
        <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${labelClass}`}>Empresa</span>
        <input
          required
          value={form.businessName}
          onChange={(event) => updateField('businessName', event.target.value)}
          className={fieldClass}
          placeholder="Nombre del negocio"
          autoComplete="organization"
        />
      </label>
      <label className="grid gap-2">
        <span className={`text-[11px] font-bold uppercase tracking-[0.16em] ${labelClass}`}>Recibo mensual aproximado</span>
        <select
          required
          value={form.monthlyBill}
          onChange={(event) => updateField('monthlyBill', event.target.value)}
          className={selectClass}
        >
          <option value="">Selecciona un rango</option>
          {monthlyBillRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </label>

      {status === 'error' && (
        <div className="rounded-xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-1 h-14 bg-sky-500 text-base font-black text-white hover:bg-sky-400"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Analizar mi recibo sin costo
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
      <p className={`text-center text-xs leading-5 ${isLight ? 'text-slate-400' : 'text-white/45'}`}>
        Sin compromiso. Primero revisamos tus números; después te decimos si un BESS tiene sentido.
      </p>
    </form>
  )
}

export default function LandingPage() {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const utmProperties = useMemo(() => {
    if (typeof window === 'undefined') return {}
    const params = new URLSearchParams(window.location.search)
    return {
      utm_source: params.get('utm_source') || 'direct',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      landing_page: window.location.pathname,
    }
  }, [])

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          properties: {
            firstname: form.name,
            email: form.email,
            phone: form.whatsapp,
            nombre_del_negocio: form.businessName,
            company: form.businessName,
            tipo_de_negocio: 'Por confirmar',
            preocupacion_principal: `Peak shaving | Recibo mensual: ${form.monthlyBill}`,
            fuente_del_lead: 'Landing BESS - formulario superior',
            producto_de_interes: 'BESS / Peak shaving',
            lead_source: 'Landing',
            ...utmProperties,
          },
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'No pudimos enviar tus datos.')
      }

      setStatus('success')
      setForm(initialFormState)
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : 'No pudimos enviar tus datos.')
    }
  }

  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const leadFormProps = { form, status, error, updateField, submitLead }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-950 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <div>
            <Logo />
          </div>
          <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#peak-shaving" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700">
              Peak shaving
            </a>
            <a href="#modelo" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700">
              Modelo
            </a>
            <a href="#caso" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-sky-700">
              Caso ejemplo
            </a>
          </nav>
          <Button className="hidden bg-sky-500 hover:bg-sky-400 lg:inline-flex" onClick={scrollToForm}>
            Analizar mi recibo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white text-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,.18),transparent_34%),linear-gradient(to_right,rgba(14,165,233,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,.045)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-8 px-5 py-10 md:px-8 md:py-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                <BatteryCharging className="h-4 w-4" />
                Almacenamiento de energía · BESS
              </div>
              <h1 className="mt-6 max-w-4xl text-[2.6rem] font-black leading-[.96] tracking-[-0.045em] md:mt-7 md:text-6xl lg:text-7xl">
                Recorta tus picos de demanda. Convierte tu recibo en un{' '}
                <span className="text-sky-400">activo energético.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:mt-7 md:text-xl md:leading-8">
                Un sistema BESS almacena energía y la usa cuando tu demanda sube. Así reduce la carga que CFE ve en tu pico y abre una ruta real de ahorro, sin poner en riesgo tu operación.
              </p>
              <div className="mt-9 hidden flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-slate-600 md:flex">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-sky-500" /> Dimensionado con tu recibo
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-sky-500" /> Opciones sin descapitalizarte
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-sky-500" /> Atención local en Yucatán
                </span>
              </div>
            </div>

            <div id="diagnostico" className="scroll-mt-28 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-950/12 md:p-7">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">Primer diagnóstico</p>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">¿Cuánto podrías recortar?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">Cuéntanos el tamaño del recibo. Nosotros hacemos las preguntas técnicas después.</p>
                </div>
                <div className="hidden rounded-2xl border border-sky-100 bg-sky-50 p-3 sm:block">
                  <ReceiptText className="h-7 w-7 text-sky-500" />
                </div>
              </div>
              <LeadForm {...leadFormProps} compact theme="light" />
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">El problema</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.035em] text-slate-950 md:text-6xl">
              Tus picos inflan el recibo, no necesariamente tu consumo.
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Gauge,
                  eyebrow: 'Demanda máxima',
                  title: 'Pagas por tu momento más exigente.',
                  text: 'En tarifas con demanda, un periodo de alta carga puede elevar una parte importante del recibo.',
                },
                {
                  icon: LineChart,
                  eyebrow: 'Red variable',
                  title: 'Tu operación no debería depender del pico.',
                  text: 'El BESS aporta energía justo cuando la carga sube, sin pedirle todo a la red al mismo tiempo.',
                },
                {
                  icon: WalletCards,
                  eyebrow: 'Costo creciente',
                  title: 'Cada año pagas más por el mismo problema.',
                  text: 'El diagnóstico separa consumo, demanda y horario para encontrar dónde está el ahorro real.',
                },
              ].map((item) => (
                <Card key={item.title} className="rounded-[1.5rem] border-slate-200 bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <item.icon className="h-9 w-9 text-sky-500" />
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.eyebrow}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black leading-tight text-slate-950">{item.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="peak-shaving" className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[.82fr_1.18fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Peak shaving</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-slate-950 md:text-6xl">
                Recortamos el pico que CFE registra.
              </h2>
              <p className="mt-7 text-lg leading-8 text-slate-600">
                El sistema carga cuando tu demanda es baja y descarga cuando se acerca a tu límite. La operación sigue igual; lo que cambia es cuánta potencia necesitas tomar de la red en el peor momento.
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  'Reduce la demanda máxima registrada cuando tu perfil lo permite.',
                  'Desplaza energía entre horarios para aprovechar mejor la tarifa.',
                  'Añade respaldo para cargas definidas durante variaciones o cortes.',
                ].map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="font-mono text-lg font-black text-sky-500">0{index + 1}</span>
                    <p className="font-semibold leading-7 text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-2xl shadow-slate-950/10 md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Demanda ante CFE · kW</div>
                  <div className="mt-2 text-2xl font-black text-slate-950">Mismo negocio. Menor pico.</div>
                </div>
                <div className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">Pico recortado</div>
              </div>
              <svg className="mt-8 h-[280px] w-full" viewBox="0 0 640 300" role="img" aria-label="Comparación ilustrativa de demanda sin BESS y con BESS">
                <defs>
                  <linearGradient id="areaWithout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[50, 100, 150, 200, 250].map((y) => (
                  <line key={y} x1="42" y1={y} x2="610" y2={y} stroke="#cbd5e1" strokeWidth="1" />
                ))}
                <path d="M42 246 L102 235 L150 242 L196 132 L252 48 L305 132 L350 205 L405 188 L462 220 L520 204 L575 228 L610 218 L610 268 L42 268 Z" fill="url(#areaWithout)" />
                <path d="M42 246 L102 235 L150 242 L196 132 L252 48 L305 132 L350 205 L405 188 L462 220 L520 204 L575 228 L610 218" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M42 246 L102 235 L150 242 L196 150 L305 150 L350 205 L405 188 L462 220 L520 204 L575 228 L610 218" fill="none" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="42" y1="150" x2="610" y2="150" stroke="#84cc16" strokeWidth="3" strokeDasharray="8 8" />
                <circle cx="252" cy="48" r="8" fill="#94a3b8" />
                <text x="267" y="55" fill="#64748b" fontSize="15" fontWeight="700">pico original</text>
              </svg>
              <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-5 text-sm font-bold text-slate-600">
                <span className="flex items-center gap-2"><i className="h-1 w-8 rounded bg-slate-400" /> Sin BESS</span>
                <span className="flex items-center gap-2"><i className="h-1 w-8 rounded bg-sky-500" /> Con BESS</span>
                <span className="ml-auto font-normal text-slate-400">Gráfica ilustrativa</span>
              </div>
            </div>
          </div>
        </section>

        <section id="modelo" className="relative overflow-hidden bg-[#061224] py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <div className="max-w-5xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Nuestro modelo</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-6xl">
                No te vendemos una caja. Estructuramos un activo que debe justificar sus números.
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65">
                Si el ahorro estimado no sostiene el proyecto, te lo decimos. Si sí lo sostiene, diseñamos la ruta técnica y financiera para que el sistema encaje con tu operación.
              </p>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modelSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[.06] p-6 backdrop-blur">
                  <div className={`font-mono text-4xl font-black ${index === modelSteps.length - 1 ? 'text-lime-300' : 'text-sky-400'}`}>
                    0{index + 1}
                  </div>
                  <h3 className="mt-7 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/58">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="caso" className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-4xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Del recibo al ahorro</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] text-slate-950 md:text-6xl">
                  Atacamos el cargo por capacidad. Ahí puede estar el ahorro.
                </h2>
              </div>
              <span className="w-fit rounded-full border border-slate-200 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Ejemplo ilustrativo · GDMTH
              </span>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Recibo mensual</div>
                <div className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">$585,890</div>
                <p className="mt-3 text-slate-500">Operación de referencia con alta demanda.</p>
              </div>
              <div className="rounded-[1.5rem] border border-sky-300 bg-sky-50 p-7">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-sky-600">Cargo identificado</div>
                <div className="mt-4 text-4xl font-black text-sky-600 md:text-5xl">$116,434</div>
                <p className="mt-3 text-sky-800/65">Componente mensual asociado a capacidad en el caso.</p>
              </div>
              <div className="rounded-[1.5rem] border border-lime-300 bg-lime-50 p-7">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-lime-700">Ahorro modelado</div>
                <div className="mt-4 text-4xl font-black text-lime-600 md:text-5xl">$74,980</div>
                <p className="mt-3 text-lime-900/65">Estimación mensual al aplanar el pico del caso.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-4 rounded-2xl bg-slate-950 p-6 text-white md:flex-row md:items-center md:justify-between">
              <p className="max-w-3xl text-lg font-semibold leading-7">
                La oportunidad no sale de una promesa comercial. Sale de tu tarifa, tu demanda y tu curva real.
              </p>
              <Button className="shrink-0 bg-lime-300 text-slate-950 hover:bg-lime-200" onClick={scrollToForm}>
                Quiero revisar mi caso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              Cifras mostradas únicamente como ejemplo de metodología. El ahorro, dimensionamiento, inversión, plazo y tratamiento fiscal dependen de cada operación y deben validarse antes de contratar.
            </p>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-[1.5rem] border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <Gauge className="h-12 w-12 text-sky-500" />
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-sky-600">Beneficio principal</p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">Peak shaving y control de demanda</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  El BESS actúa durante tus picos para reducir la potencia tomada de la red y administrar mejor cuándo usas energía.
                </p>
              </Card>
              <Card className="rounded-[1.5rem] border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <ShieldCheck className="h-12 w-12 text-sky-500" />
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Beneficio adicional</p>
                <h2 className="mt-3 text-3xl font-black text-slate-950">Continuidad para cargas definidas</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Según el diseño, el sistema también puede dar respaldo. Para transiciones sin interrupción en cargas críticas, integramos UPS cuando hace falta.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Para quién es</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.035em] text-slate-950 md:text-6xl">
              Negocios que no pueden parar ni seguir pagando de más.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {segments.map((segment, index) => (
                <div key={segment.title} className="flex min-h-28 items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="font-mono text-sm font-black text-sky-500">0{index + 1}</span>
                  <segment.icon className="h-8 w-8 text-slate-400" />
                  <span className="text-lg font-black text-slate-900">{segment.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="relative overflow-hidden bg-[#061224] py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(132,204,22,.12),transparent_28%),linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[.95fr_1.05fr] md:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">El primer paso no cuesta nada</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-6xl">
                Agenda tu diagnóstico energético.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
                Con tu recibo en mano te decimos qué conviene medir, dónde está el costo y si un sistema BESS puede generar valor para tu empresa.
              </p>
              <div className="mt-9 grid gap-4 text-white/72">
                <span className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-lime-300" /> Sin cotización a ciegas.</span>
                <span className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-lime-300" /> Sin prometer un porcentaje antes de medir.</span>
                <span className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-lime-300" /> Con atención local en Mérida y Yucatán.</span>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/12 bg-white/[.07] p-6 shadow-2xl backdrop-blur md:p-8">
              <LeadForm {...leadFormProps} />
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/94 p-3 shadow-2xl backdrop-blur lg:hidden">
        <Button className="h-12 w-full" onClick={scrollToForm}>
          Analizar mi recibo sin costo
        </Button>
      </div>

      <footer className="bg-white py-12 pb-24 md:pb-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-slate-600">
              Firefly Volts. Peak shaving, respaldo y eficiencia energética para empresas en Yucatán.
            </p>
          </div>
          <div>
            <h3 className="font-black text-slate-950">Contacto</h3>
            <div className="mt-4 space-y-3 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sky-500" />
                <a href="mailto:ventas@fireflyvolts.com" className="hover:text-sky-600">
                  ventas@fireflyvolts.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-500" />
                <span>Mérida, Yucatán</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-black text-slate-950">Método</h3>
            <p className="mt-4 text-slate-600">
              Diagnóstico, dimensionamiento y estructura comercial para BESS y UPS. Primero tus números.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
