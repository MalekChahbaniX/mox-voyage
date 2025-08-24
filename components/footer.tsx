import { Globe, Star, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 mr-2" />
              <h4 className="text-xl font-bold font-serif">Mox Voyage</h4>
            </div>
            <p className="text-gray-300 mb-4">
              Votre partenaire de confiance pour des voyages exceptionnels depuis plus de 10 ans.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-accent mr-1" />
                <span className="text-sm">4.9/5 sur 1,200+ avis</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Destinations</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Europe
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Asie
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Amérique
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Afrique
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Voyages organisés
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Séjours sur mesure
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-accent transition-colors">
                  Voyages d'affaires
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  Assurance voyage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@moxvoyage.fr</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Rue de la Paix, 75001 Paris</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Mox Voyage. Tous droits réservés. | Licence IM075100023</p>
        </div>
      </div>
    </footer>
  )
}
