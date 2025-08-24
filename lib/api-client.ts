// API client utilities for frontend components

import type { ApiResponse, ContactFormData, Destination, Testimonial, GalleryItem } from "./types"

const API_BASE_URL = "/api"

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Contact API
  async submitContactForm(data: ContactFormData) {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getContactSubmissions() {
    return this.request("/contact")
  }

  // Destinations API
  async getDestinations(params?: {
    region?: string
    category?: string
    featured?: boolean
    limit?: number
  }) {
    const searchParams = new URLSearchParams()

    if (params?.region) searchParams.append("region", params.region)
    if (params?.category) searchParams.append("category", params.category)
    if (params?.featured) searchParams.append("featured", "true")
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const query = searchParams.toString()
    return this.request<Destination[]>(`/destinations${query ? `?${query}` : ""}`)
  }

  async getDestination(id: string) {
    return this.request<Destination>(`/destinations/${id}`)
  }

  async createDestination(data: any) {
    return this.request("/destinations", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateDestination(id: string, data: any) {
    return this.request(`/destinations/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteDestination(id: string) {
    return this.request(`/destinations/${id}`, {
      method: "DELETE",
    })
  }

  // Testimonials API
  async getTestimonials(params?: {
    featured?: boolean
    limit?: number
  }) {
    const searchParams = new URLSearchParams()

    if (params?.featured) searchParams.append("featured", "true")
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const query = searchParams.toString()
    return this.request<Testimonial[]>(`/testimonials${query ? `?${query}` : ""}`)
  }

  async createTestimonial(data: any) {
    return this.request("/testimonials", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Gallery API
  async getGalleryItems(params?: {
    category?: string
    destination?: string
    featured?: boolean
    limit?: number
  }) {
    const searchParams = new URLSearchParams()

    if (params?.category) searchParams.append("category", params.category)
    if (params?.destination) searchParams.append("destination", params.destination)
    if (params?.featured) searchParams.append("featured", "true")
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const query = searchParams.toString()
    return this.request<GalleryItem[]>(`/gallery${query ? `?${query}` : ""}`)
  }

  async createGalleryItem(data: any) {
    return this.request("/gallery", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
