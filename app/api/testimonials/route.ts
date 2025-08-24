import { type NextRequest, NextResponse } from "next/server"
import type { Testimonial, ApiResponse } from "@/lib/types"
import { mockTestimonials } from "@/lib/mock-data"

// In-memory storage (replace with database in production)
const testimonials = [...mockTestimonials]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let filteredTestimonials = [...testimonials]

    // Apply filters
    if (featured === "true") {
      filteredTestimonials = filteredTestimonials.filter((t) => t.featured)
    }

    // Apply limit
    if (limit) {
      filteredTestimonials = filteredTestimonials.slice(0, Number.parseInt(limit))
    }

    // Sort by date (newest first)
    filteredTestimonials.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return NextResponse.json<ApiResponse<Testimonial[]>>({
      success: true,
      data: filteredTestimonials,
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create new testimonial
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      ...body,
      verified: false,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to mock database
    testimonials.push(newTestimonial)

    return NextResponse.json<ApiResponse<Testimonial>>({
      success: true,
      data: newTestimonial,
      message: "Testimonial created successfully",
    })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
