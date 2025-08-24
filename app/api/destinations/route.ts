import { type NextRequest, NextResponse } from "next/server"
import type { Destination, CreateDestinationData, ApiResponse } from "@/lib/types"
import { mockDestinations } from "@/lib/mock-data"

// In-memory storage (replace with database in production)
const destinations = [...mockDestinations]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get("region")
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let filteredDestinations = [...destinations]

    // Apply filters
    if (region && region !== "Toutes") {
      filteredDestinations = filteredDestinations.filter((d) => d.region === region)
    }

    if (category && category !== "Toutes") {
      filteredDestinations = filteredDestinations.filter((d) => d.category === category)
    }

    if (featured === "true") {
      filteredDestinations = filteredDestinations.filter((d) => d.featured)
    }

    // Apply limit
    if (limit) {
      filteredDestinations = filteredDestinations.slice(0, Number.parseInt(limit))
    }

    // Sort by rating (highest first)
    filteredDestinations.sort((a, b) => b.rating - a.rating)

    return NextResponse.json<ApiResponse<Destination[]>>({
      success: true,
      data: filteredDestinations,
    })
  } catch (error) {
    console.error("Error fetching destinations:", error)
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
    const body: CreateDestinationData = await request.json()

    // Validate required fields
    if (!body.name || !body.region || !body.country || !body.price) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Create new destination
    const newDestination: Destination = {
      id: Date.now().toString(),
      ...body,
      rating: 0,
      reviews: 0,
      featured: body.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to mock database
    destinations.push(newDestination)

    return NextResponse.json<ApiResponse<Destination>>({
      success: true,
      data: newDestination,
      message: "Destination created successfully",
    })
  } catch (error) {
    console.error("Error creating destination:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
