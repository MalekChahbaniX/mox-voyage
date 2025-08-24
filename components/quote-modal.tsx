"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, X, Plane, Heart, Building, Camera } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const { t } = useI18n()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    travelType: "",
    departureDate: "",
    returnDate: "",
    travelers: "",
    budget: "",
    accommodation: "",
    activities: [] as string[],
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(t.quote.messages.success)
        onClose()
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          destination: "",
          travelType: "",
          departureDate: "",
          returnDate: "",
          travelers: "",
          budget: "",
          accommodation: "",
          activities: [],
          specialRequests: "",
        })
      }
    } catch (error) {
      alert(t.quote.messages.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleActivity = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold font-serif text-foreground">{t.quote.title}</h2>
            <p className="text-muted-foreground">{t.quote.subtitle}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">{t.quote.form.firstName} *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">{t.quote.form.lastName} *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">{t.quote.form.email} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">{t.quote.form.phone}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="destination">{t.quote.form.destination} *</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData((prev) => ({ ...prev, destination: e.target.value }))}
                  placeholder={t.quote.form.destinationPlaceholder}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="travelType">{t.quote.form.travelType} *</Label>
              <Select
                value={formData.travelType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, travelType: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leisure">{t.quote.travelTypes.leisure}</SelectItem>
                  <SelectItem value="business">{t.quote.travelTypes.business}</SelectItem>
                  <SelectItem value="honeymoon">{t.quote.travelTypes.honeymoon}</SelectItem>
                  <SelectItem value="family">{t.quote.travelTypes.family}</SelectItem>
                  <SelectItem value="adventure">{t.quote.travelTypes.adventure}</SelectItem>
                  <SelectItem value="cultural">{t.quote.travelTypes.cultural}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="departureDate">{t.quote.form.departureDate} *</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="returnDate">{t.quote.form.returnDate}</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, returnDate: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="travelers">{t.quote.form.travelers} *</Label>
              <div className="relative mt-1">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Select
                  value={formData.travelers}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, travelers: value }))}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t.quote.travelers.one}</SelectItem>
                    <SelectItem value="2">{t.quote.travelers.two}</SelectItem>
                    <SelectItem value="3">{t.quote.travelers.three}</SelectItem>
                    <SelectItem value="4">{t.quote.travelers.four}</SelectItem>
                    <SelectItem value="5+">{t.quote.travelers.fivePlus}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">{t.quote.form.budget}</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez votre budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<1000">{t.quote.budget.under1000}</SelectItem>
                  <SelectItem value="1000-2500">{t.quote.budget.range1000to2500}</SelectItem>
                  <SelectItem value="2500-5000">{t.quote.budget.range2500to5000}</SelectItem>
                  <SelectItem value="5000-10000">{t.quote.budget.range5000to10000}</SelectItem>
                  <SelectItem value=">10000">{t.quote.budget.over10000}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accommodation">{t.quote.form.accommodation}</Label>
              <Select
                value={formData.accommodation}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, accommodation: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">{t.quote.accommodation.hotel}</SelectItem>
                  <SelectItem value="resort">{t.quote.accommodation.resort}</SelectItem>
                  <SelectItem value="apartment">{t.quote.accommodation.apartment}</SelectItem>
                  <SelectItem value="villa">{t.quote.accommodation.villa}</SelectItem>
                  <SelectItem value="hostel">{t.quote.accommodation.hostel}</SelectItem>
                  <SelectItem value="mixed">{t.quote.accommodation.mixed}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>{t.quote.form.activities}</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {[
                { id: "sightseeing", label: t.quote.activities.sightseeing, icon: Camera },
                { id: "adventure", label: t.quote.activities.adventure, icon: Plane },
                { id: "relaxation", label: t.quote.activities.relaxation, icon: Heart },
                { id: "culture", label: t.quote.activities.culture, icon: Building },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleActivity(id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    formData.activities.includes(id)
                      ? "bg-primary text-white border-primary"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="specialRequests">{t.quote.form.specialRequests}</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
              placeholder={t.quote.form.specialRequestsPlaceholder}
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              {t.quote.buttons.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
              {isSubmitting ? t.quote.buttons.submitting : t.quote.buttons.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
