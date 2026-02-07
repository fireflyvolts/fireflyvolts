import { AnimatedSection } from '@/components/animated-section'
import { Card } from '@/components/ui/card'
import { Hotel, UtensilsCrossed, Building2 } from 'lucide-react'

export function CaseStudies() {
  return (
    <AnimatedSection className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          Resultados reales de negocios como el tuyo
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="overflow-hidden group cursor-pointer">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Hotel className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-white/20" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold mb-2">Hotel Mérida Plaza</h3>
                <p className="text-lg mb-2">
                  {'"Reducimos $15,000/mes en luz"'}
                </p>
                <p className="text-sm opacity-90">280m² • ROI en 16 meses</p>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden group cursor-pointer">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <UtensilsCrossed className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-white/20" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Restaurante La Terraza
                </h3>
                <p className="text-lg mb-2">
                  {'"Clientes más cómodos, menos AC"'}
                </p>
                <p className="text-sm opacity-90">180m² • ROI en 20 meses</p>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden group cursor-pointer">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-white/20" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Oficinas Corporativas
                </h3>
                <p className="text-lg mb-2">{'"35% menos en energía"'}</p>
                <p className="text-sm opacity-90">450m² • ROI en 22 meses</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  )
}
