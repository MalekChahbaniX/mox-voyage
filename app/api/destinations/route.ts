import { type NextRequest, NextResponse } from "next/server"
import type { Destination, CreateDestinationData, ApiResponse } from "@/lib/types"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get("region")
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const country = searchParams.get("country")

    const { db } = await connectToDatabase()

    // Build query
    const query: any = {}

    if (region && region !== "Toutes") {
      query.region = region
    }

    if (category && category !== "Toutes") {
      query.category = category
    }

    if (featured === "true") {
      query.featured = true
    }

    if (country && country !== "Toutes") {
      query.country = country
    }

    // Fetch destinations from database
    let destinations = await db.collection("destinations").find(query).toArray()

    // Apply limit if specified
    if (limit) {
      destinations = destinations.slice(0, Number.parseInt(limit))
    }

    // Sort by rating (highest first)
    destinations.sort((a: any, b: any) => b.rating - a.rating)

    return NextResponse.json<ApiResponse<Destination[]>>({
      success: true,
      data: destinations as unknown as Destination[],
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

    const { db } = await connectToDatabase()

    // Create new destination
    const newDestination: Destination = {
      id: `dest_${Date.now()}`,
      ...body,
      rating: 0,
      reviews: 0,
      featured: body.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert into database
    const result = await db.collection("destinations").insertOne(newDestination)

    if (result.acknowledged) {
      return NextResponse.json<ApiResponse<Destination>>({
        success: true,
        data: newDestination,
        message: "Destination created successfully",
      })
    } else {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Failed to create destination",
        },
        { status: 500 },
      )
    }
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
