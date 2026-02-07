import { AnimatedSection } from '@/components/animated-section'
import { Card } from '@/components/ui/card'

export function ProcessTimeline() {
  const steps = [
    {
      day: 'DÍA 1-2',
      title: 'Visita técnica gratuita',
      description: 'Medición exacta',
    },
    {
      day: 'DÍA 3-4',
      title: 'Cotización personalizada',
      description: 'Apruebas propuesta',
    },
    {
      day: 'DÍA 5-6',
      title: 'Preparación material',
      description: 'Pedido a Power-All',
    },
    {
      day: 'DÍA 7',
      title: 'Instalación profesional',
      description: '1 día, sin interrupciones',
    },
  ]

  return (
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          De la cotización a la instalación en 7 días
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {index + 1}
                </div>
                {index < 3 && <div className="w-0.5 h-full bg-border mt-2" />}
              </div>
              <Card className="flex-1 p-6 -mt-1">
                <div className="text-sm font-semibold text-primary mb-1">
                  {step.day}
                </div>
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
