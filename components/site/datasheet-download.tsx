'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, FileDown, Loader2 } from 'lucide-react'
import { readAttribution } from '@/lib/attribution'
import { productById, type ProductId } from '@/lib/products'
import { PlaceholderTag } from './placeholders'

/**
 * Datasheet request. There are no PDFs yet, so it captures the lead and sales sends the sheet by email
 * from the HubSpot task. The documents listed are placeholders.
 */
export function DatasheetDownload({ product, documents }: { product: ProductId; documents: string[] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          properties: {
            firstname: name,
            email,
            lead_origin: `Ficha técnica - ${productById[product].name}`,
            product_interest: `${productById[product].name} | Pidió ficha técnica`,
            ...readAttribution(),
          },
        }),
      })
      if (!response.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Fichas técnicas</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-5xl">Revisa las especificaciones.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Para tu ingeniero de mantenimiento o tu área de compras. Te las mandamos al correo junto con un asesor que responde tus dudas.
          </p>
          <div className="mt-8 grid gap-3">
            {documents.map((doc) => (
              <div key={doc} className="flex items-center justify-between gap-4 rounded-xl border-2 border-dashed border-lime-300/70 bg-white px-4 py-3">
                <span className="flex items-center gap-3 text-sm font-bold text-slate-800">
                  <FileDown className="h-5 w-5 shrink-0 text-sky-500" />
                  {doc}
                </span>
                <PlaceholderTag />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-sky-950/10 md:p-8">
          {status === 'success' ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-sky-500" />
              <p className="mt-4 text-2xl font-black">Listo.</p>
              <p className="mt-2 text-slate-600">Te mandamos las fichas a {email} en breve.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <p className="text-xl font-black">Recibe las fichas en tu correo</p>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Nombre</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" autoComplete="name" className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" />
              </label>
              <label className="grid gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Correo</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" autoComplete="email" className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100" />
              </label>
              {status === 'error' && <p className="text-sm font-semibold text-red-500">No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.</p>}
              <button type="submit" disabled={status === 'submitting'} className="inline-flex h-13 items-center justify-center rounded-xl bg-slate-950 py-3.5 font-black text-white transition hover:bg-slate-800 disabled:opacity-70">
                {status === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Enviarme las fichas <FileDown className="ml-2 h-5 w-5" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
