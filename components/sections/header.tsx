import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-foreground">Firefly Volts</div>
        <Button variant="default" size="lg">
          Contacto
        </Button>
      </div>
    </header>
  )
}
