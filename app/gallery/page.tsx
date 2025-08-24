import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Filter, Calendar, Camera, Heart, Share2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Temple Tanah Lot au coucher du soleil",
      destination: "Bali, Indonésie",
      category: "Temples",
      date: "Septembre 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Sophie Martin",
      likes: 127,
      description: "Le temple emblématique de Bali perché sur son rocher, baigné par les derniers rayons du soleil.",
    },
    {
      id: 2,
      title: "Éléphant au coucher du soleil",
      destination: "Safari Kenya",
      category: "Faune",
      date: "Août 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Thomas Martin",
      likes: 203,
      description: "Majestueux éléphant dans la savane kenyane, silhouette parfaite contre le ciel orangé.",
    },
    {
      id: 3,
      title: "Villages blancs de Santorin",
      destination: "Santorin, Grèce",
      category: "Architecture",
      date: "Juillet 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Pierre Leroy",
      likes: 156,
      description: "L'architecture cycladique emblématique avec ses maisons blanches aux toits bleus.",
    },
    {
      id: 4,
      title: "Machu Picchu dans la brume",
      destination: "Machu Picchu, Pérou",
      category: "Paysages",
      date: "Juin 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Jean-Claude Moreau",
      likes: 189,
      description: "La cité perdue des Incas émergeant mystérieusement de la brume matinale.",
    },
    {
      id: 5,
      title: "Temple Senso-ji à Tokyo",
      destination: "Tokyo, Japon",
      category: "Culture",
      date: "Avril 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Famille Rousseau",
      likes: 142,
      description: "Le temple le plus ancien de Tokyo dans toute sa splendeur traditionnelle.",
    },
    {
      id: 6,
      title: "Aurores boréales en Islande",
      destination: "Islande",
      category: "Phénomènes naturels",
      date: "Mars 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Isabelle Petit",
      likes: 234,
      description: "Spectacle magique des aurores boréales dansant dans le ciel islandais.",
    },
    {
      id: 7,
      title: "Rizières en terrasses de Jatiluwih",
      destination: "Bali, Indonésie",
      category: "Paysages",
      date: "Septembre 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Marie Dubois",
      likes: 178,
      description: "Les magnifiques rizières en terrasses classées au patrimoine mondial de l'UNESCO.",
    },
    {
      id: 8,
      title: "Lion dans le Masai Mara",
      destination: "Safari Kenya",
      category: "Faune",
      date: "Août 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Guide Safari",
      likes: 267,
      description: "Le roi de la savane dans son habitat naturel, regard intense et majestueux.",
    },
    {
      id: 9,
      title: "Geysir Strokkur en éruption",
      destination: "Islande",
      category: "Phénomènes naturels",
      date: "Mars 2024",
      image: "/placeholder.svg?height=400&width=600",
      photographer: "Isabelle Petit",
      likes: 195,
      description: "Le geyser Strokkur projetant sa colonne d'eau chaude vers le ciel.",
    },
  ]

  const categories = ["Toutes", "Paysages", "Faune", "Architecture", "Culture", "Temples", "Phénomènes naturels"]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Galerie <span className="text-primary">Photos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Plongez dans l'univers visuel de nos voyages à travers les plus belles photos capturées par nos voyageurs
              et nos guides experts.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Rechercher par destination ou catégorie..." className="pl-10 pr-4 py-3 text-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Photos partagées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85+</div>
              <div className="text-muted-foreground">Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Voyageurs contributeurs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-muted-foreground">J'aime reçus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filtrer par catégorie :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "Toutes" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <div
                    className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                    }}
                  ></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-sm text-foreground">{item.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <div className="flex items-center text-xs opacity-90">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{item.destination}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{item.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{item.photographer}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="font-medium">{item.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            >
              Charger plus de photos
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Destinations les Plus Photographiées</h2>
            <p className="text-xl text-muted-foreground">Les lieux qui inspirent le plus nos voyageurs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Bali, Indonésie", "Safari Kenya", "Santorin, Grèce", "Islande"].map((destination, index) => (
              <Card
                key={destination}
                className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div
                  className="h-32 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url('/placeholder.svg?height=200&width=300')`,
                  }}
                ></div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">{destination}</h3>
                  <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 200) + 50} photos</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Partagez vos plus belles photos de voyage</h2>
          <p className="text-xl mb-8 opacity-90">
            Inspirez d'autres voyageurs en partageant vos moments magiques avec la communauté Mox Voyage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Partager mes photos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Planifier mon voyage
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
