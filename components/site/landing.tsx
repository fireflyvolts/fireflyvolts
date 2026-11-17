import type { ReactNode } from 'react'
import { CheckCircle2, Mail, MapPin, MessageCircle, ShieldCheck, type LucideIcon } from 'lucide-react'
import { QuoteForm } from '@/components/home/quote-form'
import type { ProductId } from '@/lib/products'

/** Building blocks shared by the product landings so every page keeps the same Firefly layout. */

const gridBackground =
  'bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,.18),transparent_34%),linear-gradient(to_right,rgba(14,165,233,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,.045)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]'

export function LandingHero({
  icon: Icon,
  eyebrow,
  title,
  highlight,
  lead,
  bullets,
  aside,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  highlight: string
  lead: string
  bullets: string[]
  aside: ReactNode
}) {
  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 ${gridBackground}`} />
      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div className="lg:pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            <Icon className="h-4 w-4" />
            {eyebrow}
          </div>
          <h1 className="mt-6 text-[2.6rem] font-black leading-[.96] tracking-[-0.045em] md:text-6xl lg:text-[4.2rem]">
            {title} <span className="text-sky-400">{highlight}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-xl md:leading-8">{lead}</p>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-700">
            {bullets.map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-500" /> {item}
              </span>
            ))}
          </div>
        </div>
        {aside}
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text, tone = 'light' }: { eyebrow: string; title: string; text?: string; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? 'text-lime-300' : 'text-sky-600'}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-4xl font-black tracking-[-0.035em] md:text-6xl ${dark ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
      {text && <p className={`mt-5 text-lg leading-8 ${dark ? 'text-white/65' : 'text-slate-600'}`}>{text}</p>}
    </div>
  )
}

export function Section({ children, tone = 'white', id }: { children: ReactNode; tone?: 'white' | 'muted' | 'dark'; id?: string }) {
  const tones = {
    white: 'bg-white',
    muted: 'border-y border-slate-200 bg-slate-50',
    dark: 'relative overflow-hidden bg-[#061224] text-white',
  }
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-28 ${tones[tone]}`}>
      {tone === 'dark' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      )}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  )
}

export type Feature = { icon: LucideIcon; title: string; text: string; tag?: string }

export function FeatureGrid({ items, columns = 3 }: { items: Feature[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }
  return (
    <div className={`mt-12 grid gap-5 ${cols[columns]}`}>
      {items.map((item) => (
        <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <item.icon className="h-9 w-9 text-sky-500" />
            {item.tag && <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.tag}</span>}
          </div>
          <h3 className="mt-7 text-2xl font-black leading-tight text-slate-950">{item.title}</h3>
          <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export function Steps({ items, tone = 'dark' }: { items: { title: string; text: string }[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((step, index) => (
        <div key={step.title} className={`rounded-[1.5rem] border p-7 ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white'}`}>
          <span className={`font-mono text-lg font-black ${dark ? 'text-lime-300' : 'text-sky-500'}`}>0{index + 1}</span>
          <h3 className={`mt-6 text-2xl font-black ${dark ? 'text-white' : 'text-slate-950'}`}>{step.title}</h3>
          <p className={`mt-3 leading-7 ${dark ? 'text-white/65' : 'text-slate-600'}`}>{step.text}</p>
        </div>
      ))}
    </div>
  )
}

/** The white rounded card that holds a calculator in the hero. */
export function CalculatorCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-sky-950/12 md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  )
}

export function QuoteSection({ product, title, text, origin }: { product: ProductId; title: string; text: string; origin: string }) {
  return (
    <section id="cotizar" className="relative scroll-mt-20 overflow-hidden bg-[#061224] py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,.25),transparent_40%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Cotiza</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">{text}</p>
          <div className="mt-8 grid gap-3 text-sm font-semibold text-white/80">
            <span className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-lime-300" /> Equipos con garantía y póliza de mantenimiento</span>
            <span className="flex items-center gap-3"><MapPin className="h-5 w-5 text-lime-300" /> Visitas técnicas en Mérida y la península</span>
            <a href="https://wa.me/525585301886" className="flex items-center gap-3 hover:text-white"><MessageCircle className="h-5 w-5 text-lime-300" /> WhatsApp 55 8530 1886</a>
            <a href="mailto:ventas@fireflyvolts.com" className="flex items-center gap-3 hover:text-white"><Mail className="h-5 w-5 text-lime-300" /> ventas@fireflyvolts.com</a>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <QuoteForm defaultProduct={product} origin={origin} />
        </div>
      </div>
    </section>
  )
}

/** Dark result panel used by every calculator. */
export function ResultPanel({ label, value, detail, children }: { label: string; value: string; detail?: ReactNode; children?: ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#061224] p-5 text-white">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.03em] md:text-4xl">{value}</p>
      {detail && <div className="mt-2 text-sm leading-6 text-white/70">{detail}</div>}
      {children}
    </div>
  )
}
