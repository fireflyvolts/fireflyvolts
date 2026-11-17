'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { readAttribution } from '@/lib/attribution'
import { products, productById, type ProductId } from '@/lib/products'
import { SELECT_PRODUCT_EVENT } from './select-product'

const fieldClass =
  'h-12 rounded-xl border border-white/15 bg-white/8 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10'

const initialForm = { name: '', whatsapp: '', email: '', businessName: '', product: '' as ProductId | '' }

export function QuoteForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<ProductId>).detail
      setForm((current) => ({ ...current, product: id }))
    }
    window.addEventListener(SELECT_PRODUCT_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_PRODUCT_EVENT, onSelect)
  }, [])

  const update = (field: keyof typeof initialForm, value: string) =>
    setForm((current) => ({ ...current, [field]: value }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const metaEventId =
      typeof window.crypto?.randomUUID === 'function'
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    const productName = form.product ? productById[form.product].name : 'Sin definir'

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
            lead_origin: 'Home - formulario de cotización',
            product_interest: productName,
            meta_event_id: metaEventId,
            ...readAttribution(),
          },
        }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'No pudimos enviar tus datos.')
      }

      window.sessionStorage.setItem('firefly_lead_conversion', JSON.stringify({ meta_event_id: metaEventId }))
      window.location.assign('/gracias')
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : 'No pudimos enviar tus datos.')
    }
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">¿Qué te interesa?</span>
        <select
          required
          value={form.product}
          onChange={(event) => update('product', event.target.value)}
          className="h-12 rounded-xl border border-white/15 bg-slate-900 px-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
        >
          <option value="">Elige una solución</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Nombre</span>
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} className={fieldClass} placeholder="Tu nombre" autoComplete="name" />
        </label>
        <label className="grid gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">WhatsApp</span>
          <input required value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} className={fieldClass} placeholder="+52 ..." type="tel" autoComplete="tel" />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Correo</span>
        <input required value={form.email} onChange={(e) => update('email', e.target.value)} className={fieldClass} placeholder="tu@empresa.com" type="email" autoComplete="email" />
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Empresa o negocio</span>
        <input required value={form.businessName} onChange={(e) => update('businessName', e.target.value)} className={fieldClass} placeholder="Nombre del negocio" autoComplete="organization" />
      </label>

      {status === 'error' && (
        <div className="rounded-xl border border-red-300/30 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{error}</div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 inline-flex h-14 items-center justify-center rounded-xl bg-lime-300 text-base font-black text-slate-950 transition hover:bg-lime-200 disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Quiero mi propuesta <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
      <p className="text-center text-xs leading-5 text-white/45">Te contactamos por WhatsApp en menos de 24 horas hábiles.</p>
    </form>
  )
}
