"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Star, MapPin } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { Destination } from "@/lib/types"

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    region: "",
    country: "",
    image: "",
    price: "",
    currency: "EUR",
    duration: "",
    description: "",
    highlights: "",
    category: "",
    featured: false,
  })

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const response = await apiClient.getDestinations()
      setDestinations(response.data || [])
    } catch (error) {
      console.error("Error fetching destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        highlights: formData.highlights
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      }

      if (editingDestination) {
        await apiClient.updateDestination(editingDestination.id, data)
      } else {
        await apiClient.createDestination(data)
      }

      await fetchDestinations()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving destination:", error)
    }
  }

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination)
    setFormData({
      name: destination.name,
      region: destination.region,
      country: destination.country,
      image: destination.image,
      price: destination.price.toString(),
      currency: destination.currency,
      duration: destination.duration,
      description: destination.description,
      highlights: destination.highlights.join(", "),
      category: destination.category,
      featured: destination.featured,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette destination ?")) {
      try {
        await apiClient.deleteDestination(id)
        await fetchDestinations()
      } catch (error) {
        console.error("Error deleting destination:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      region: "",
      country: "",
      image: "",
      price: "",
      currency: "EUR",
      duration: "",
      description: "",
      highlights: "",
      category: "",
      featured: false,
    })
    setEditingDestination(null)
  }

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-serif">Destinations</h1>
          <p className="text-muted-foreground">Gérez vos destinations de voyage</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDestination ? "Modifier" : "Ajouter"} une Destination</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Pays *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="region">Région *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, region: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une région" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Asie">Asie</SelectItem>
                      <SelectItem value="Amérique du Nord">Amérique du Nord</SelectItem>
                      <SelectItem value="Amérique du Sud">Amérique du Sud</SelectItem>
                      <SelectItem value="Afrique">Afrique</SelectItem>
                      <SelectItem value="Océanie">Océanie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Détente">Détente</SelectItem>
                      <SelectItem value="Aventure">Aventure</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                      <SelectItem value="Romantique">Romantique</SelectItem>
                      <SelectItem value="Famille">Famille</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Prix *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Devise</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Durée</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="ex: 7 jours"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">URL Image</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/placeholder.svg?height=400&width=600"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="highlights">Points forts (séparés par des virgules)</Label>
                <Input
                  id="highlights"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="Plages, Culture, Gastronomie"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <Label htmlFor="featured">Destination mise en avant</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingDestination ? "Modifier" : "Ajouter"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Destinations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Destinations ({filteredDestinations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 bg-cover bg-center rounded"
                        style={{ backgroundImage: `url('${destination.image}')` }}
                      />
                      <div>
                        <p className="font-medium">{destination.name}</p>
                        <p className="text-sm text-muted-foreground">{destination.country}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{destination.region}</TableCell>
                  <TableCell>{destination.price}€</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{destination.rating}</span>
                      <span className="text-muted-foreground text-sm">({destination.reviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={destination.featured ? "default" : "secondary"}>
                      {destination.featured ? "Mise en avant" : "Standard"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(destination)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(destination.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
