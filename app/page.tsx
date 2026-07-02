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
  ClipboardCheck,
  Clock3,
  Factory,
  Gauge,
  Hospital,
  Hotel,
  Loader2,
  MapPin,
  Phone,
  PlugZap,
  ShieldCheck,
  Store,
  TrendingDown,
  Zap,
} from 'lucide-react'

const businessTypes = [
  'Clinica o consultorio',
  'Hotel',
  'Restaurante',
  'Plaza o local comercial',
  'Bodega o refrigeracion',
  'Industria ligera',
  'Otro',
]

const painOptions = [
  'Que mi operacion no se detenga',
  'Bajar mi recibo de luz',
]

const painPoints = [
  {
    icon: Clock3,
    title: 'Cuando paras, pierdes.',
    text: 'Una hora de operacion detenida cuesta en ventas, servicio, producto y confianza. Casi nunca aparece completa en el recibo.',
  },
  {
    icon: ShieldCheck,
    title: 'Las variaciones danan tu equipo.',
    text: 'Picos, bajones y apagones acortan la vida de refrigeracion, servidores, bombas, tableros y equipos sensibles.',
  },
  {
    icon: TrendingDown,
    title: 'Tus picos inflan el recibo.',
    text: 'En tarifas como GDMTH, la demanda pesa mucho. El problema no siempre es cuanto consumes, sino cuando lo consumes.',
  },
]

const segments = [
  { icon: Hospital, title: 'Clinicas y consultorios' },
  { icon: Hotel, title: 'Hoteles' },
  { icon: Store, title: 'Restaurantes y comercios' },
  { icon: Building2, title: 'Plazas y locales' },
  { icon: BatteryCharging, title: 'Bodegas y refrigeracion' },
  { icon: Factory, title: 'Pequena industria' },
]

const steps = [
  {
    title: 'Agendas',
    text: 'Nos dejas tus datos y coordinamos una llamada o visita tecnica.',
  },
  {
    title: 'Diagnosticamos',
    text: 'Revisamos tu recibo CFE, tus cargas criticas y el comportamiento real de tu operacion.',
  },
  {
    title: 'Te presentamos la solucion',
    text: 'Con numeros tuyos: que necesitas, que problema resuelve y como se estructura.',
  },
]

type FormState = {
  name: string
  businessName: string
  whatsapp: string
  businessType: string
  mainConcern: string
}

const initialFormState: FormState = {
  name: '',
  businessName: '',
  whatsapp: '',
  businessType: '',
  mainConcern: painOptions[0],
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
            phone: form.whatsapp,
            nombre_del_negocio: form.businessName,
            company: form.businessName,
            tipo_de_negocio: form.businessType,
            preocupacion_principal: form.mainConcern,
            fuente_del_lead: 'Landing',
            producto_de_interes: 'UPS/BESS',
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
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Logo />
          <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
            <a href="#modelo" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-slate-950">
              Modelo
            </a>
            <a href="#bess" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-slate-950">
              BESS
            </a>
            <a href="#diagnostico" className="rounded-md px-3 py-2 hover:bg-sky-50 hover:text-slate-950">
              Diagnostico
            </a>
          </nav>
          <Button className="hidden md:inline-flex" onClick={scrollToForm}>
            Agenda tu diagnostico
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,163,235,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]" />
          <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-24">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-700 shadow-sm">
                UPS + BESS para empresas en Yucatan
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight text-slate-950 md:text-7xl">
                Que tu operacion nunca se detenga. Y que tu recibo de luz deje de crecer.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Diagnosticamos tu consumo real y te instalamos el respaldo y almacenamiento de energia que tu negocio necesita. A la medida, con un esquema donde el ahorro puede pagar el equipo.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 px-7 text-base" onClick={scrollToForm}>
                  Agenda tu diagnostico sin costo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <a
                  href="#bess"
                  className="inline-flex h-14 items-center justify-center rounded-md border border-slate-300 bg-white px-7 text-base font-bold text-slate-800 shadow-sm transition hover:border-sky-500 hover:text-sky-700"
                >
                  Ver el modelo BESS
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-slate-200 pt-7">
                <div>
                  <div className="text-2xl font-black text-slate-950">Local</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Merida, Yucatan</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-950">UPS</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Continuidad</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-950">BESS</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Ahorro + respaldo</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-950/10">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 p-6 text-white">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">Diagnostico energetico</div>
                      <div className="mt-2 text-2xl font-black">Operacion critica</div>
                    </div>
                    <div className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">Online</div>
                  </div>
                  <div className="relative mt-10 grid gap-4">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <PlugZap className="h-6 w-6 text-sky-300" />
                        <div>
                          <div className="text-sm text-white/60">Riesgo principal</div>
                          <div className="text-xl font-black">Paros y variaciones</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <Gauge className="h-6 w-6 text-lime-300" />
                        <div>
                          <div className="text-sm text-white/60">Oportunidad</div>
                          <div className="text-xl font-black">Recortar picos CFE</div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <ClipboardCheck className="h-6 w-6 text-sky-300" />
                        <div>
                          <div className="text-sm text-white/60">Siguiente paso</div>
                          <div className="text-xl font-black">Numeros de tu negocio</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg className="relative mt-8 h-20 w-full text-lime-300" viewBox="0 0 420 90" preserveAspectRatio="none">
                    <path d="M0 58H45L60 30L76 58H128L142 16L158 58H222L238 38L254 58H318L334 24L350 58H420" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">El problema</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Cada interrupcion tiene un costo. Casi siempre invisible.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {painPoints.map((point) => (
                <Card key={point.title} className="rounded-2xl border-slate-200 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <point.icon className="h-10 w-10 text-primary" />
                  <h3 className="mt-6 text-xl font-black text-slate-950">{point.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{point.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="modelo" className="bg-slate-50 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[.9fr_1.1fr] md:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Nuestro enfoque</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                No te vendemos un equipo. Diagnosticamos tu operacion.
              </h2>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <p className="text-xl leading-9 text-slate-700">
                La mayoria quiere vender la caja mas grande que tenga en bodega. Nosotros primero medimos: leemos tu recibo, revisamos tu consumo y dimensionamos la solucion correcta.
              </p>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Ni de mas, para no tirar dinero. Ni de menos, para no quedarte igual. El resultado es un sistema que encaja con tu negocio.
              </p>
            </div>
          </div>
        </section>

        <section id="bess" className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,163,235,.24),transparent_35%),linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.95fr_1.05fr] md:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">La seccion estrella</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                El sistema que baja tu recibo y con ese ahorro puede pagarse a si mismo.
              </h2>
              <p className="mt-7 text-lg leading-8 text-white/72">
                Un banco de baterias BESS bien dimensionado recorta tus picos de demanda de CFE. Lo importante no es prometer una cifra: es calcularla con tu recibo y tu curva real.
              </p>
              <Button size="lg" className="mt-9 h-14 bg-lime-300 px-7 text-base text-slate-950 hover:bg-lime-200" onClick={scrollToForm}>
                Quiero saber cuanto ahorraria
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid gap-4">
              {[
                'Diagnosticamos tu curva de demanda con tu recibo en mano.',
                'Dimensionamos el BESS exacto para tu operacion.',
                'Lo instalamos con un esquema de arrendamiento.',
                'El ahorro ayuda a cubrir la renta del equipo.',
                'Al terminar el plazo, el sistema queda como activo para tu negocio.',
              ].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400 text-sm font-black text-slate-950">
                    {index + 1}
                  </div>
                  <p className="text-lg font-semibold leading-7 text-white/88">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-[1.5rem] border-slate-200 p-8 shadow-sm md:p-10">
                <Zap className="h-12 w-12 text-primary" />
                <h2 className="mt-7 text-3xl font-black text-slate-950">UPS para proteccion instantanea</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Cuando tu operacion no puede permitirse un corte, el UPS protege cargas criticas y hace la transicion sin interrupciones.
                </p>
              </Card>
              <Card className="rounded-[1.5rem] border-slate-200 p-8 shadow-sm md:p-10">
                <BatteryCharging className="h-12 w-12 text-primary" />
                <h2 className="mt-7 text-3xl font-black text-slate-950">BESS para respaldo y eficiencia</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Cuando necesitas autonomia real y control de demanda, el almacenamiento permite operar con mas margen y menos exposicion a la red.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Para quien es</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Negocios que no pueden darse el lujo de parar ni de pagar de mas.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {segments.map((segment) => (
                <div key={segment.title} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <segment.icon className="h-8 w-8 text-primary" />
                  <span className="text-lg font-black text-slate-900">{segment.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[.95fr_1.05fr] md:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Por que Firefly</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Locales. Tecnicos. De tu lado.
              </h2>
            </div>
            <div className="grid gap-4">
              {[
                'Diagnostico real, no cotizacion a ciegas.',
                'Levantamiento local en Merida y Yucatan.',
                'Recomendacion basada en tus numeros, no en un catalogo.',
                'Estructura pensada para no descapitalizar tu negocio.',
              ].map((item) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <p className="text-lg font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="diagnostico" className="bg-slate-950 py-20 text-white md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.9fr_1.1fr] md:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Tu diagnostico</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                El primer paso no te cuesta nada. Seguir pagando de mas, si.
              </h2>
              <div className="mt-10 grid gap-4">
                {steps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-white/8 p-5">
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">Paso {index + 1}</div>
                    <h3 className="mt-2 text-2xl font-black">{step.title}</h3>
                    <p className="mt-2 leading-7 text-white/70">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="rounded-[1.7rem] border-white/10 bg-white p-6 text-slate-950 shadow-2xl md:p-8">
              <div className="mb-6 rounded-2xl bg-sky-50 p-5">
                <h3 className="text-2xl font-black">Agenda tu diagnostico sin costo</h3>
                <p className="mt-2 text-slate-600">
                  Te contactamos para revisar tu caso y decirte que conviene medir primero.
                </p>
              </div>

              {status === 'success' ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                  <h4 className="mt-4 text-2xl font-black">Listo, recibimos tus datos.</h4>
                  <p className="mt-2 text-slate-600">Te contactamos pronto para coordinar el diagnostico.</p>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={submitLead}>
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Nombre</span>
                    <input
                      required
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="h-12 rounded-md border border-slate-300 px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      placeholder="Tu nombre"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Negocio</span>
                    <input
                      required
                      value={form.businessName}
                      onChange={(event) => updateField('businessName', event.target.value)}
                      className="h-12 rounded-md border border-slate-300 px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      placeholder="Nombre del negocio"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">WhatsApp</span>
                    <input
                      required
                      value={form.whatsapp}
                      onChange={(event) => updateField('whatsapp', event.target.value)}
                      className="h-12 rounded-md border border-slate-300 px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                      placeholder="+52 ..."
                      type="tel"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Tipo de negocio</span>
                    <select
                      required
                      value={form.businessType}
                      onChange={(event) => updateField('businessType', event.target.value)}
                      className="h-12 rounded-md border border-slate-300 bg-white px-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    >
                      <option value="">Selecciona una opcion</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <fieldset className="grid gap-3">
                    <legend className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Que te preocupa mas
                    </legend>
                    <div className="grid gap-3 md:grid-cols-2">
                      {painOptions.map((option) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                            form.mainConcern === option
                              ? 'border-sky-500 bg-sky-50 text-sky-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mainConcern"
                            value={option}
                            checked={form.mainConcern === option}
                            onChange={(event) => updateField('mainConcern', event.target.value)}
                            className="accent-sky-600"
                          />
                          <span className="text-sm font-bold">{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {status === 'error' && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {error}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="h-14 text-base" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Agenda tu diagnostico sin costo
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/94 p-3 shadow-2xl backdrop-blur md:hidden">
        <Button className="h-12 w-full" onClick={scrollToForm}>
          Agenda tu diagnostico sin costo
        </Button>
      </div>

      <footer className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-slate-600">
              Firefly Volts. Continuidad y eficiencia energetica para empresas en Yucatan.
            </p>
          </div>
          <div>
            <h3 className="font-black text-slate-950">Contacto</h3>
            <div className="mt-4 space-y-3 text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>WhatsApp: por confirmar</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Merida, Yucatan</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-black text-slate-950">Modelo</h3>
            <p className="mt-4 text-slate-600">
              Diagnostico, dimensionamiento y estructura comercial para UPS/BESS. Sin promesas a ciegas: primero tus numeros.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
