// Data types for the Mox Voyage application

export interface Destination {
  id: string
  name: string
  region: string
  country: string
  image: string
  price: number
  currency: string
  duration: string
  rating: number
  reviews: number
  description: string
  highlights: string[]
  category: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  name: string
  location: string
  destination: string
  date: string
  rating: number
  avatar: string
  review: string
  highlights: string[]
  verified: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GalleryItem {
  id: string
  title: string
  destination: string
  category: string
  date: string
  image: string
  photographer: string
  likes: number
  description: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ContactSubmission {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  travelType: string
  destination?: string
  budget?: string
  travelers?: string
  travelDate?: string
  message?: string
  newsletter: boolean
  status: "new" | "contacted" | "quoted" | "booked" | "closed"
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "agent" | "user"
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Request types
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  travelType: string
  destination?: string
  budget?: string
  travelers?: string
  travelDate?: string
  message?: string
  newsletter: boolean
}

export interface CreateDestinationData {
  name: string
  region: string
  country: string
  image: string
  price: number
  currency: string
  duration: string
  description: string
  highlights: string[]
  category: string
  featured?: boolean
}

export interface UpdateDestinationData extends Partial<CreateDestinationData> {
  id: string
}
