import { Award, Camera, Quote } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Placeholders for content we don't have yet (real photos, client logos, testimonials, confirmed figures).
 * Every one carries a visible "Placeholder" tag and a dashed lime border so they're easy to spot and replace.
 */

export function PlaceholderTag({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-lime-300 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-slate-950 ${className}`}>
      Placeholder
    </span>
  )
}

export function PhotoPlaceholder({ label, className = 'aspect-[4/3]' }: { label: string; className?: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-[1.5rem] border-2 border-dashed border-lime-300 bg-[linear-gradient(135deg,#0b1f3a,#061224)] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,.35),transparent_45%)]" />
      <PlaceholderTag className="absolute left-4 top-4" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <Camera className="h-9 w-9 text-sky-300" />
        <figcaption className="max-w-[16rem] text-sm font-semibold leading-5 text-white/75">{label}</figcaption>
      </div>
    </figure>
  )
}

/** Three photos under a heading: installs, equipment, team on site. */
export function PhotoGallery({ eyebrow = 'En campo', title, photos }: { eyebrow?: string; title: string; photos: [string, string, string] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.035em] md:text-5xl">{title}</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <PhotoPlaceholder label={photos[0]} className="aspect-[4/3] md:row-span-2 md:aspect-auto md:min-h-[440px]" />
          <PhotoPlaceholder label={photos[1]} className="aspect-[16/9]" />
          <PhotoPlaceholder label={photos[2]} className="aspect-[16/9]" />
        </div>
      </div>
    </section>
  )
}

const defaultStats = [
  { value: '+20', label: 'años del fabricante' },
  { value: '+500', label: 'proyectos instalados' },
  { value: 'ISO 9001', label: 'equipos certificados' },
  { value: '24/7', label: 'soporte técnico' },
]

/** Figures, client logos and a testimonial. All placeholder until confirmed. */
export function ProofBar({ testimonial }: { testimonial?: { quote: string; author: string } }) {
  return (
    <section className="border-y border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Respaldo</p>
          <PlaceholderTag />
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {defaultStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border-2 border-dashed border-lime-300/70 px-5 py-4">
              <p className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {['Hotel', 'Hospital', 'Clínica', 'Plaza', 'Industria', 'Restaurante'].map((name) => (
            <div key={name} className="flex h-16 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-sm font-black text-slate-300">
              <Award className="h-4 w-4" />
              Logo {name}
            </div>
          ))}
        </div>
        {testimonial && (
          <figure className="mt-8 rounded-[1.5rem] border-2 border-dashed border-lime-300/70 bg-slate-50 p-7 md:p-9">
            <div className="flex items-center justify-between gap-3">
              <Quote className="h-8 w-8 text-sky-400" />
              <PlaceholderTag />
            </div>
            <blockquote className="mt-4 max-w-3xl text-xl font-black leading-snug text-slate-950 md:text-2xl">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-slate-500">{testimonial.author}</figcaption>
          </figure>
        )}
      </div>
    </section>
  )
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-xs font-semibold text-slate-400">{children}</p>
}
