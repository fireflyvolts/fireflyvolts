import { AnimatedSection } from '@/components/animated-section'
import { AnimatedCounter } from '@/components/animated-counter'

export function StatsBar() {
  return (
    <AnimatedSection className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-black mb-2">
              <AnimatedCounter value={500} />+
            </div>
            <div className="text-lg opacity-90">Clientes</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">
              <AnimatedCounter value={35} />%
            </div>
            <div className="text-lg opacity-90">Ahorro Promedio</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">
              <AnimatedCounter value={10} />
            </div>
            <div className="text-lg opacity-90">Años Garantía</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">
              <AnimatedCounter value={24} />
            </div>
            <div className="text-lg opacity-90">Meses ROI</div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
