import { type NextRequest, NextResponse } from "next/server"
import type { Testimonial, ApiResponse } from "@/lib/types"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const destination = searchParams.get("destination")

    const { db } = await connectToDatabase()

    // Build query
    const query: any = {}

    if (featured === "true") {
      query.featured = true
    }

    if (destination) {
      query.destination = { $regex: destination, $options: "i" }
    }

    // Fetch testimonials from database
    let testimonials = await db.collection("testimonials").find(query).toArray()

    // Apply limit if specified
    if (limit) {
      testimonials = testimonials.slice(0, Number.parseInt(limit))
    }

    // Sort by rating (highest first) and then by date (newest first)
    testimonials.sort((a: any, b: any) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return NextResponse.json<ApiResponse<Testimonial[]>>({
      success: true,
      data: testimonials as unknown as Testimonial[],
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

    // Validate required fields
    if (!body.name || !body.review || !body.rating || !body.destination) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    const { db } = await connectToDatabase()

    // Create new testimonial
    const newTestimonial: Testimonial = {
      id: `test_${Date.now()}`,
      ...body,
      verified: body.verified || false,
      featured: body.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert into database
    const result = await db.collection("testimonials").insertOne(newTestimonial)

    if (result.acknowledged) {
      return NextResponse.json<ApiResponse<Testimonial>>({
        success: true,
        data: newTestimonial,
        message: "Testimonial created successfully",
      })
    } else {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Failed to create testimonial",
        },
        { status: 500 },
      )
    }
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
