import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Firefly Volts | Peak shaving y BESS para empresas',
  description:
    'Reduce picos de demanda CFE con un sistema BESS dimensionado para tu operación. Diagnóstico energético sin costo en Mérida y Yucatán.',
  alternates: {
    canonical: '/bess',
  },
}

export default function BessLayout({ children }: { children: React.ReactNode }) {
  return children
}
