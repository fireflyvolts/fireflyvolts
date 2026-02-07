import { AnimatedSection } from '@/components/animated-section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FAQSection() {
  return (
    <AnimatedSection className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg text-left">
              ¿Funciona en cualquier tipo de ventana?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Sí, PowerGlass se puede instalar en cualquier tipo de ventana:
              vidrio templado, laminado, o vidrio simple. Nuestro equipo técnico
              evalúa cada caso para garantizar la mejor aplicación.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg text-left">
              ¿Cuánto dura la instalación?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              La instalación típica se completa en un solo día, dependiendo del
              tamaño del proyecto. Trabajamos sin interrumpir las operaciones de
              tu negocio.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg text-left">
              ¿Afecta la visibilidad?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              No. PowerGlass mantiene una excelente claridad visual mientras
              bloquea el calor y los rayos UV. Tus vistas permanecen intactas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg text-left">
              ¿Qué garantía tiene?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              PowerGlass viene con una garantía de 10 años del fabricante contra
              decoloración, despegamiento y defectos de manufactura.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg text-left">
              ¿Puedo financiar?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Sí, ofrecemos opciones de financiamiento flexibles. Contacta con
              nuestro equipo para conocer las opciones disponibles para tu
              negocio.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AnimatedSection>
  )
}
