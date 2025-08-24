"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Globe, Shield } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useI18n } from "@/lib/i18n/context"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight animate-fade-in-up">
            {t.home.hero.title.split("Mox Voyage")[0]}
            <span className="text-accent block">Mox Voyage</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            {t.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
            >
              {t.home.hero.cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-4 bg-transparent transform hover:scale-105 transition-all duration-300"
            >
              {t.nav.requestQuote}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold font-serif text-foreground mb-4">{t.home.features.title}</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une expertise reconnue et un service personnalisé pour faire de vos voyages des moments exceptionnels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">{t.home.features.expertise.title}</h4>
                <p className="text-muted-foreground">{t.home.features.expertise.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">{t.home.features.personalized.title}</h4>
                <p className="text-muted-foreground">{t.home.features.personalized.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-3">{t.home.features.support.title}</h4>
                <p className="text-muted-foreground">{t.home.features.support.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations Preview */}
      <section id="destinations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold font-serif text-foreground mb-4">{t.home.destinations.title}</h3>
            <p className="text-xl text-muted-foreground">{t.home.destinations.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div
                className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=600')`,
                }}
              ></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-muted-foreground">Asie</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Bali, Indonésie</h4>
                <p className="text-muted-foreground mb-4">
                  Temples mystiques, rizières en terrasses et plages paradisiaques vous attendent.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">À partir de 1,299€</span>
                  <Button size="sm" className="transform hover:scale-105 transition-all duration-300">
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div
                className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=600')`,
                }}
              ></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-muted-foreground">Europe</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Santorin, Grèce</h4>
                <p className="text-muted-foreground mb-4">
                  Couchers de soleil magiques et architecture cycladique emblématique.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">À partir de 899€</span>
                  <Button size="sm" className="transform hover:scale-105 transition-all duration-300">
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div
                className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=600')`,
                }}
              ></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-muted-foreground">Amérique du Sud</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Machu Picchu, Pérou</h4>
                <p className="text-muted-foreground mb-4">
                  Découvrez les mystères de la civilisation inca dans les Andes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">À partir de 1,599€</span>
                  <Button size="sm" className="transform hover:scale-105 transition-all duration-300">
                    Découvrir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent transform hover:scale-105 transition-all duration-300"
            >
              {t.home.destinations.viewAll}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
