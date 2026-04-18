"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, MessageSquare, ImageIcon, Mail, Users, TrendingUp, Calendar, Star, Eye } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { apiClient } from "@/lib/api-client"
import type { ContactSubmission } from "@/lib/types"

function AdminDashboardContent() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    destinations: 0,
    testimonials: 0,
    galleryItems: 0,
    messages: 0,
    newMessages: 0,
  })

  const [recentMessages, setRecentMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [destinationsRes, testimonialsRes, galleryRes, messagesRes] = await Promise.all([
          apiClient.getDestinations(),
          apiClient.getTestimonials(),
          apiClient.getGalleryItems(),
          apiClient.getContactSubmissions(),
        ])

        const messages = messagesRes.data || []
        const newMessages = messages.filter((m: any) => m.status === "new")

        setStats({
          destinations: (destinationsRes.data as any[])?.length || 0,
          testimonials: (testimonialsRes.data as any[])?.length || 0,
          galleryItems: (galleryRes.data as any[])?.length || 0,
          messages: (messages as any[]).length,
          newMessages: newMessages.length,
        })

        setRecentMessages((messages as any[]).slice(0, 5))
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: "Destinations",
      value: stats.destinations,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Témoignages",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Photos",
      value: stats.galleryItems,
      icon: ImageIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      badge: stats.newMessages > 0 ? stats.newMessages : undefined,
    },
  ]

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-serif text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre agence de voyage</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.badge && (
                      <Badge variant="destructive" className="text-xs">
                        {stat.badge} nouveau{stat.badge > 1 ? "x" : ""}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <MapPin className="h-6 w-6" />
              <span>Ajouter Destination</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <MessageSquare className="h-6 w-6" />
              <span>Gérer Témoignages</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <ImageIcon className="h-6 w-6" />
              <span>Ajouter Photos</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
              <Mail className="h-6 w-6" />
              <span>Voir Messages</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Messages Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">
                          {message.firstName} {message.lastName}
                        </p>
                        <Badge variant={message.status === "new" ? "destructive" : "secondary"} className="text-xs">
                          {message.status === "new" ? "Nouveau" : message.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{message.email}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.destination || message.travelType}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">Aucun message récent</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Aperçu Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-50 p-2 rounded-full">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Note Moyenne</p>
                    <p className="text-xs text-muted-foreground">Tous témoignages</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">4.8/5</p>
                  <p className="text-xs text-muted-foreground">Excellent</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Destinations Populaires</p>
                    <p className="text-xs text-muted-foreground">Ce mois</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">Bali</p>
                  <p className="text-xs text-muted-foreground">156 vues</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-2 rounded-full">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Taux de Conversion</p>
                    <p className="text-xs text-muted-foreground">Demandes → Réservations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">23%</p>
                  <p className="text-xs text-green-600">+5% ce mois</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRoles={["admin", "manager"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
