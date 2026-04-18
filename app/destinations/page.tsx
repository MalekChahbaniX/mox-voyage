"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Filter, Clock, Users, Star } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import type { Destination } from "@/lib/types"

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState("Toutes")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations')
        const data = await response.json()
        if (data.success) {
          setDestinations(data.data)
          setFilteredDestinations(data.data)
        }
      } catch (error) {
        console.error('Error fetching destinations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  useEffect(() => {
    let filtered = destinations

    // Filter by region
    if (selectedRegion !== "Toutes") {
      filtered = filtered.filter(dest => dest.region === selectedRegion)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredDestinations(filtered)
  }, [destinations, selectedRegion, searchTerm])

  // Get unique regions from destinations
  const regions = ["Toutes", ...Array.from(new Set(destinations.map(dest => dest.region)))]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Nos <span className="text-primary">Destinations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Explorez le monde avec nos circuits soigneusement sélectionnés. Des aventures extraordinaires vous
              attendent aux quatre coins de la planète.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Rechercher une destination..." 
                  className="pl-10 pr-4 py-3 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filtrer par région :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Badge
                  key={region}
                  variant={region === selectedRegion ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-8 bg-gray-300 rounded w-24"></div>
                      <div className="h-8 bg-gray-300 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative">
                    <div
                      className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${destination.image}')`,
                      }}
                    ></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-foreground">{destination.region}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm text-muted-foreground">{destination.country}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{destination.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.slice(0, 3).map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{destination.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{destination.reviews} avis</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">À partir de {destination.price}</span>
                        <span className="text-sm text-muted-foreground block">par personne</span>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">Découvrir</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">Aucune destination trouvée pour vos critères.</p>
              </div>
            )}
          </div>

          {!loading && filteredDestinations.length > 0 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Charger plus de destinations
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Votre destination de rêve n'est pas dans la liste ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nos experts créent des voyages sur mesure selon vos envies et votre budget.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Créer mon voyage sur mesure
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
