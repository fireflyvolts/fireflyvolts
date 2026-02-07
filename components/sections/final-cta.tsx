'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-balance">
            Únete a +500 negocios que ya redujeron su factura
          </h2>
          <Card className="p-8 bg-card text-card-foreground">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Tu nombre" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="business">Nombre del Negocio</Label>
                <Input
                  id="business"
                  placeholder="Tu negocio"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="999 123 4567"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="sqm">M² aproximados de vidrio</Label>
                <Input
                  id="sqm"
                  type="number"
                  placeholder="150"
                  className="mt-2"
                />
              </div>
              <Button
                size="lg"
                className="w-full text-lg py-7 h-auto bg-foreground text-background hover:bg-foreground/90"
                type="submit"
              >
                SOLICITAR VISITA GRATIS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
