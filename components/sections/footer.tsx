import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-12 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">Firefly Volts</div>
              <p className="text-muted-foreground">
                Distribuidor autorizado Power-All
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp: 999 XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contacto@fireflyvolts.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mérida, Yucatán</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Términos
                </a>
                <a
                  href="#"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Privacidad
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
            © 2024 Firefly Volts. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
