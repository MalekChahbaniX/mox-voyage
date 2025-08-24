import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Users, Shield, CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
              À propos de <span className="text-primary">Mox Voyage</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Depuis plus de 10 ans, nous créons des expériences de voyage exceptionnelles qui transforment vos rêves
              d'évasion en souvenirs inoubliables.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-serif text-foreground mb-6">Notre Histoire</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fondée en 2014 par une équipe de passionnés de voyage, Mox Voyage est née d'une vision simple : rendre
                les voyages extraordinaires accessibles à tous. Nous croyons que chaque voyage est une opportunité de
                découverte, de croissance personnelle et de création de liens durables.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Au fil des années, nous avons accompagné plus de 15,000 voyageurs dans leurs aventures, des escapades
                romantiques aux expéditions d'entreprise, en passant par les voyages familiaux et les aventures en solo.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
                  <div className="text-sm text-muted-foreground">Voyageurs accompagnés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">85+</div>
                  <div className="text-sm text-muted-foreground">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Satisfaction client</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="h-96 bg-cover bg-center rounded-lg shadow-xl"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=600&width=800')`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Nos Valeurs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et définissent notre approche du voyage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Passion</h3>
                <p className="text-muted-foreground">
                  Notre amour du voyage transparaît dans chaque détail de nos services. Nous vivons et respirons
                  l'aventure.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Confiance</h3>
                <p className="text-muted-foreground">
                  Transparence, fiabilité et sécurité sont au cœur de notre relation avec chaque voyageur.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  Nous nous efforçons constamment de dépasser vos attentes et de créer des expériences mémorables.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Notre Équipe</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés qui mettent leur savoir-faire à votre service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=300')`,
                }}
              ></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sophie Martin</h3>
                <p className="text-primary font-medium mb-3">Directrice & Fondatrice</p>
                <p className="text-muted-foreground text-sm">
                  Passionnée de voyages depuis l'enfance, Sophie a visité plus de 60 pays et met son expertise au
                  service de vos projets.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=300')`,
                }}
              ></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Thomas Dubois</h3>
                <p className="text-primary font-medium mb-3">Conseiller Voyages</p>
                <p className="text-muted-foreground text-sm">
                  Spécialiste des destinations asiatiques et des voyages d'aventure, Thomas vous guide vers des
                  expériences authentiques.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=400&width=300')`,
                }}
              ></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Marie Leroy</h3>
                <p className="text-primary font-medium mb-3">Responsable Clientèle</p>
                <p className="text-muted-foreground text-sm">
                  Marie assure un suivi personnalisé de votre voyage, de la réservation jusqu'à votre retour, pour une
                  expérience sans souci.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Nos Certifications</h2>
            <p className="text-xl text-muted-foreground">Des garanties officielles pour votre tranquillité d'esprit.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <CheckCircle className="h-12 w-12 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Licence ATOUT FRANCE</h3>
              <p className="text-sm text-muted-foreground">IM075100023</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <Shield className="h-12 w-12 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Garantie Financière</h3>
              <p className="text-sm text-muted-foreground">APST</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <Award className="h-12 w-12 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Assurance RC</h3>
              <p className="text-sm text-muted-foreground">Hiscox</p>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <Users className="h-12 w-12 text-accent mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Membre SNAV</h3>
              <p className="text-sm text-muted-foreground">Syndicat National</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Prêt à vivre votre prochaine aventure ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez notre équipe d'experts pour créer ensemble le voyage de vos rêves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Demander un devis gratuit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
