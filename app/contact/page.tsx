"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelType: "",
    destination: "",
    budget: "",
    travelers: "",
    travelDate: "",
    message: "",
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    alert("Merci pour votre demande ! Nous vous contacterons dans les 24h.")

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      travelType: "",
      destination: "",
      budget: "",
      travelers: "",
      travelDate: "",
      message: "",
      newsletter: false,
    })

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+33 1 23 45 67 89", "Lun-Ven: 9h-18h"],
      description: "Appelez-nous pour un conseil personnalisé",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@moxvoyage.fr", "Réponse sous 24h"],
      description: "Écrivez-nous pour toute question",
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Rue de la Paix", "75001 Paris, France"],
      description: "Venez nous rencontrer en agence",
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun-Ven: 9h-18h", "Sam: 10h-16h"],
      description: "Nous sommes là pour vous",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
              Contactez <span className="text-primary">Mox Voyage</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Notre équipe d'experts est à votre disposition pour créer le voyage de vos rêves. Contactez-nous pour un
              devis personnalisé et gratuit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm mb-1">
                      {detail}
                    </p>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Demande de Devis Gratuit</CardTitle>
                  <p className="text-muted-foreground">
                    Remplissez ce formulaire et recevez une proposition personnalisée sous 24h.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="travelType">Type de voyage *</Label>
                      <Select onValueChange={(value) => handleInputChange("travelType", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Sélectionnez le type de voyage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leisure">Voyage loisirs</SelectItem>
                          <SelectItem value="business">Voyage d'affaires</SelectItem>
                          <SelectItem value="honeymoon">Voyage de noces</SelectItem>
                          <SelectItem value="family">Voyage en famille</SelectItem>
                          <SelectItem value="group">Voyage de groupe</SelectItem>
                          <SelectItem value="adventure">Voyage d'aventure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="destination">Destination souhaitée</Label>
                        <Input
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => handleInputChange("destination", e.target.value)}
                          placeholder="Ex: Bali, Japon, Safari Kenya..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget approximatif</Label>
                        <Select onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez votre budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500-1000">500€ - 1,000€</SelectItem>
                            <SelectItem value="1000-2000">1,000€ - 2,000€</SelectItem>
                            <SelectItem value="2000-3000">2,000€ - 3,000€</SelectItem>
                            <SelectItem value="3000-5000">3,000€ - 5,000€</SelectItem>
                            <SelectItem value="5000+">Plus de 5,000€</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="travelers">Nombre de voyageurs</Label>
                        <Select onValueChange={(value) => handleInputChange("travelers", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Nombre de personnes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 personne</SelectItem>
                            <SelectItem value="2">2 personnes</SelectItem>
                            <SelectItem value="3-4">3-4 personnes</SelectItem>
                            <SelectItem value="5-8">5-8 personnes</SelectItem>
                            <SelectItem value="9+">Plus de 9 personnes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="travelDate">Date de voyage souhaitée</Label>
                        <Input
                          id="travelDate"
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message / Demandes spéciales</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Décrivez vos attentes, vos centres d'intérêt, ou toute demande particulière..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Je souhaite recevoir la newsletter avec les offres spéciales et conseils voyage
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer ma demande
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      En soumettant ce formulaire, vous acceptez d'être contacté par Mox Voyage concernant votre
                      demande.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Office Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Notre Agence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Adresse</p>
                        <p className="text-muted-foreground text-sm">
                          123 Rue de la Paix
                          <br />
                          75001 Paris, France
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Horaires d'ouverture</p>
                        <p className="text-muted-foreground text-sm">
                          Lundi - Vendredi: 9h00 - 18h00
                          <br />
                          Samedi: 10h00 - 16h00
                          <br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Contact direct</p>
                        <p className="text-muted-foreground text-sm">
                          Tél: +33 1 23 45 67 89
                          <br />
                          Email: contact@moxvoyage.fr
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div
                    className="h-64 bg-cover bg-center rounded-lg"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=300&width=500')`,
                    }}
                  >
                    <div className="h-full bg-primary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-foreground font-medium">Notre agence à Paris</p>
                        <p className="text-muted-foreground text-sm">123 Rue de la Paix, 75001</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Options */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <span className="text-sm">Chat en ligne</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-sm">Prendre RDV</span>
                </Button>
              </div>

              {/* FAQ Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Questions Fréquentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">
                        Combien de temps avant le départ dois-je réserver ?
                      </p>
                      <p className="text-muted-foreground">
                        Nous recommandons 2-3 mois pour les destinations populaires.
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">Proposez-vous des assurances voyage ?</p>
                      <p className="text-muted-foreground">
                        Oui, nous incluons une assurance de base et proposons des options étendues.
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-1">
                        Puis-je modifier mon voyage après réservation ?
                      </p>
                      <p className="text-muted-foreground">
                        Oui, selon les conditions de nos partenaires et moyennant des frais.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-serif mb-6">Besoin d'aide pour choisir ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Nos conseillers voyage sont là pour vous guider et créer l'itinéraire parfait selon vos envies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Phone className="h-4 w-4 mr-2" />
              Appeler maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
