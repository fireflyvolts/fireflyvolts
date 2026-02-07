import { AnimatedSection } from '@/components/animated-section'
import { CheckCircle2, Building2 } from 'lucide-react'

export function SolutionSection() {
  return (
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="aspect-square bg-muted rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Building2 className="w-32 h-32 opacity-20" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-8">
              PowerGlass: La solución profesional
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">
                    Se instala en 1 día (sin detener operaciones)
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">
                    Rechaza hasta 79% del calor solar
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">
                    Reduce 25-35% la factura de luz
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">Garantía 10 años</div>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-lg">
                    ROI en 18-24 meses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
