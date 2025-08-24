"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Search, Eye, Calendar, Phone } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { ContactSubmission } from "@/lib/types"

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await apiClient.getContactSubmissions()
      setMessages(response.data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      new: "destructive",
      contacted: "default",
      quoted: "secondary",
      booked: "default",
      closed: "outline",
    } as const

    const labels = {
      new: "Nouveau",
      contacted: "Contacté",
      quoted: "Devis envoyé",
      booked: "Réservé",
      closed: "Fermé",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.destination && message.destination.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || message.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
      <div>
        <h1 className="text-3xl font-bold font-serif">Messages</h1>
        <p className="text-muted-foreground">Gérez les demandes de vos clients</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, email ou destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouveau</SelectItem>
                <SelectItem value="contacted">Contacté</SelectItem>
                <SelectItem value="quoted">Devis envoyé</SelectItem>
                <SelectItem value="booked">Réservé</SelectItem>
                <SelectItem value="closed">Fermé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Messages ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Type de voyage</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {message.firstName} {message.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      {message.phone && <p className="text-sm text-muted-foreground">{message.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {message.travelType === "leisure"
                        ? "Loisirs"
                        : message.travelType === "business"
                          ? "Affaires"
                          : message.travelType === "honeymoon"
                            ? "Lune de miel"
                            : message.travelType === "family"
                              ? "Famille"
                              : message.travelType === "group"
                                ? "Groupe"
                                : message.travelType === "adventure"
                                  ? "Aventure"
                                  : message.travelType}
                    </Badge>
                  </TableCell>
                  <TableCell>{message.destination || "-"}</TableCell>
                  <TableCell>{message.budget || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{new Date(message.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedMessage(message)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails du Message</DialogTitle>
                        </DialogHeader>

                        {selectedMessage && (
                          <div className="space-y-6">
                            {/* Client Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">Informations Client</h3>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Nom:</strong> {selectedMessage.firstName} {selectedMessage.lastName}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {selectedMessage.email}
                                  </p>
                                  {selectedMessage.phone && (
                                    <p>
                                      <strong>Téléphone:</strong> {selectedMessage.phone}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">Détails du Voyage</h3>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Type:</strong> {selectedMessage.travelType}
                                  </p>
                                  {selectedMessage.destination && (
                                    <p>
                                      <strong>Destination:</strong> {selectedMessage.destination}
                                    </p>
                                  )}
                                  {selectedMessage.budget && (
                                    <p>
                                      <strong>Budget:</strong> {selectedMessage.budget}
                                    </p>
                                  )}
                                  {selectedMessage.travelers && (
                                    <p>
                                      <strong>Voyageurs:</strong> {selectedMessage.travelers}
                                    </p>
                                  )}
                                  {selectedMessage.travelDate && (
                                    <p>
                                      <strong>Date souhaitée:</strong> {selectedMessage.travelDate}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Message */}
                            {selectedMessage.message && (
                              <div>
                                <h3 className="font-semibold mb-2">Message</h3>
                                <p className="text-sm bg-muted p-3 rounded">{selectedMessage.message}</p>
                              </div>
                            )}

                            {/* Status & Actions */}
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Statut:</span>
                                {getStatusBadge(selectedMessage.status)}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Appeler
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Mail className="h-4 w-4 mr-2" />
                                  Répondre
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
