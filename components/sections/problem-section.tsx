import { AnimatedSection } from '@/components/animated-section'
import { Card } from '@/components/ui/card'
import { Flame, DollarSign, Snowflake } from 'lucide-react'

export function ProblemSection() {
  return (
    <AnimatedSection className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          ¿Tu negocio pierde dinero por estas ventanas?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center hover:shadow-xl transition-shadow">
            <Flame className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h3 className="text-2xl font-bold mb-2">Calor insoportable</h3>
            <p className="text-muted-foreground text-lg">El AC trabaja el doble</p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-shadow">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">
              Factura CFE fuera de control
            </h3>
            <p className="text-muted-foreground text-lg">
              Cuesta mantener clima
            </p>
          </Card>
          <Card className="p-8 text-center hover:shadow-xl transition-shadow">
            <Snowflake className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Clientes incómodos</h3>
            <p className="text-muted-foreground text-lg">
              Afecta ventas y productividad
            </p>
          </Card>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-center text-balance max-w-4xl mx-auto">
          Un restaurante de 200m² de vidrio puede perder $8,500 pesos AL MES
          solo por ventanas ineficientes
        </p>
      </div>
    </AnimatedSection>
  )
}
