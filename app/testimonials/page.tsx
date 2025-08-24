import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, MapPin, Calendar, Users } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      location: "Paris, France",
      destination: "Bali, Indonésie",
      date: "Septembre 2024",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      review:
        "Un voyage absolument magique ! L'équipe de Mox Voyage a organisé chaque détail à la perfection. Les temples de Bali, les rizières en terrasses et l'accueil chaleureux des habitants resteront gravés dans ma mémoire. Je recommande vivement !",
      highlights: ["Organisation parfaite", "Guides exceptionnels", "Expérience authentique"],
    },
    {
      id: 2,
      name: "Thomas Martin",
      location: "Lyon, France",
      destination: "Safari Kenya",
      date: "Août 2024",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      review:
        "Safari inoubliable ! Voir les Big Five dans leur habitat naturel était un rêve devenu réalité. L'organisation était impeccable, les lodges somptueux et notre guide local extraordinaire. Mox Voyage a dépassé toutes nos attentes.",
      highlights: ["Big Five observés", "Lodges de luxe", "Guide expert"],
    },
    {
      id: 3,
      name: "Sophie et Pierre Leroy",
      location: "Bordeaux, France",
      destination: "Santorin, Grèce",
      date: "Juillet 2024",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      review:
        "Notre voyage de noces à Santorin était parfait ! Les couchers de soleil d'Oia, les villages blancs et bleus, la gastronomie locale... Tout était organisé avec soin. Merci à Mox Voyage pour ces moments magiques !",
      highlights: ["Voyage de noces", "Couchers de soleil", "Gastronomie"],
    },
    {
      id: 4,
      name: "Jean-Claude Moreau",
      location: "Toulouse, France",
      destination: "Machu Picchu, Pérou",
      date: "Juin 2024",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      review:
        "À 65 ans, j'ai réalisé mon rêve de visiter le Machu Picchu. L'équipe a adapté le voyage à mes besoins, avec un rythme parfait et des guides passionnés. Une expérience spirituelle et culturelle extraordinaire.",
      highlights: ["Voyage adapté", "Guides passionnés", "Expérience spirituelle"],
    },
    {
      id: 5,
      name: "Famille Rousseau",
      location: "Nantes, France",
      destination: "Tokyo, Japon",
      date: "Avril 2024",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      review:
        "Voyage en famille au Japon absolument réussi ! Nos enfants (8 et 12 ans) ont adoré. Entre tradition et modernité, temples et mangas, cuisine et technologie, chaque jour était une découverte. Organisation au top !",
      highlights: ["Voyage famille", "Culture japonaise", "Enfants ravis"],
    },
    {
      id: 6,
      name: "Isabelle Petit",
      location: "Marseille, France",
      destination: "Islande",
      date: "Mars 2024",
      rating: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      review:
        "L'Islande en hiver, un spectacle grandiose ! Les aurores boréales, les geysers, les paysages lunaires... Mox Voyage a su nous faire découvrir cette île magique en toute sécurité. Une aventure inoubliable !",
      highlights: ["Aurores boréales", "Paysages uniques", "Sécurité assurée"],
    },
  ]

  const stats = [
    { number: "4.9/5", label: "Note moyenne", icon: Star },
    { number: "1,200+", label: "Avis clients", icon: Users },
    { number: "15,000+", label: "Voyageurs satisfaits", icon: MapPin },
    { number: "10+", label: "Années d'expérience", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Témoignages <span className="text-primary">Clients</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez les expériences authentiques de nos voyageurs. Leurs récits témoignent de notre engagement à
              créer des moments inoubliables.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Ce que disent nos voyageurs</h2>
            <p className="text-xl text-muted-foreground">Des témoignages authentiques de clients satisfaits</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-0">
                  <div className="absolute -top-2 -left-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Quote className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-center mb-4 mt-4">
                    <div
                      className="w-12 h-12 bg-cover bg-center rounded-full mr-4"
                      style={{
                        backgroundImage: `url('${testimonial.avatar}')`,
                      }}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.destination}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{testimonial.review}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {testimonial.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{testimonial.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Témoignages Vidéo</h2>
            <p className="text-xl text-muted-foreground">Écoutez directement nos clients partager leurs expériences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div
                className="h-64 bg-cover bg-center relative group cursor-pointer"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=600')`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sarah & Antoine - Voyage de Noces à Bali</h3>
                <p className="text-muted-foreground text-sm">
                  "Mox Voyage a rendu notre lune de miel absolument parfaite..."
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div
                className="h-64 bg-cover bg-center relative group cursor-pointer"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=600')`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Famille Moreau - Safari au Kenya</h3>
                <p className="text-muted-foreground text-sm">
                  "Une aventure familiale extraordinaire que nous n'oublierons jamais..."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Rejoignez nos voyageurs satisfaits</h2>
          <p className="text-xl mb-8 opacity-90">Créons ensemble votre prochaine aventure inoubliable.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Planifier mon voyage
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Laisser un avis
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
