import Link from 'next/link'
import { Logo } from '@/components/logo'
import { products } from '@/lib/products'
import { WhatsAppButton } from './whatsapp-button'

export function SiteFooter() {
  return (
    <footer className="bg-white py-14">
      <WhatsAppButton />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 text-sm text-slate-500 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs leading-6">Respaldo, protección y ahorro eléctrico para negocios en Mérida y la península.</p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Soluciones</p>
          <nav className="mt-4 grid gap-2 font-semibold">
            {products.map((product) => (
              <Link key={product.id} href={product.href ?? '/'} className="hover:text-sky-600">
                {product.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Contacto</p>
          <div className="mt-4 grid gap-2 font-semibold">
            <a href="mailto:ventas@fireflyvolts.com" className="hover:text-sky-600">ventas@fireflyvolts.com</a>
            <a href="https://wa.me/525585301886" className="hover:text-sky-600">WhatsApp 55 8530 1886</a>
            <Link href="/que-es-peak-shaving" className="hover:text-sky-600">Guía de peak shaving</Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-slate-400 md:px-8">© {new Date().getFullYear()} Firefly Volts · Mérida, Yucatán</p>
    </footer>
  )
}
