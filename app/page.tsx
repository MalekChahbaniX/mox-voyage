"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Globe, Shield } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useI18n } from "@/lib/i18n/context"
import type { Destination } from "@/lib/types"

export default function HomePage() {
  const { t } = useI18n()
  const router = useRouter()
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        const response = await fetch('/api/destinations?featured=true&limit=3')
        const data = await response.json()
        if (data.success) {
          setFeaturedDestinations(data.data)
        }
      } catch (error) {
        console.error('Error fetching featured destinations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedDestinations()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/paris-invitations-gratuites.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-4 md:mb-6 leading-tight animate-fade-in-up">
            {t.home.hero.title.split("Mox Voyage")[0]}
            <span className="text-accent block">Mox Voyage</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            {t.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 transform hover:scale-105 transition-all duration-300"
            >
              {t.home.hero.cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-transparent transform hover:scale-105 transition-all duration-300"
            >
              {t.nav.requestQuote}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-foreground mb-3 md:mb-4">{t.home.features.title}</h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Une expertise reconnue et un service personnalisé pour faire de vos voyages des moments exceptionnels.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <Card className="text-center p-4 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-4 md:pt-6">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t.home.features.expertise.title}</h4>
                <p className="text-sm md:text-base text-muted-foreground">{t.home.features.expertise.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-4 md:pt-6">
                <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t.home.features.personalized.title}</h4>
                <p className="text-sm md:text-base text-muted-foreground">{t.home.features.personalized.description}</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-4 md:pt-6">
                <Globe className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 md:mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t.home.features.support.title}</h4>
                <p className="text-sm md:text-base text-muted-foreground">{t.home.features.support.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations Preview */}
      <section id="destinations" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-foreground mb-3 md:mb-4">{t.home.destinations.title}</h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">{t.home.destinations.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="h-48 sm:h-56 md:h-64 bg-gray-300"></div>
                  <CardContent className="p-4 md:p-6">
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-300 rounded w-20"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div
                    className="h-48 sm:h-56 md:h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${destination.image}')`,
                    }}
                  ></div>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-primary mr-1" />
                      <span className="text-xs sm:text-sm text-muted-foreground">{destination.region}</span>
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold mb-2">{destination.name}</h4>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
                      {destination.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-lg md:text-2xl font-bold text-primary">
                        À partir de {destination.price} {destination.currency}
                      </span>
                      <Button size="sm" className="transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
                        Découvrir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent transform hover:scale-105 transition-all duration-300 text-sm sm:text-base px-6 md:px-8 py-3 md:py-4"
              onClick={() => router.push('/destinations')}
            >
              {t.home.destinations.viewAll || "Voir toutes les destinations"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
