import { type NextRequest, NextResponse } from "next/server"
import type { GalleryItem, ApiResponse } from "@/lib/types"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const destination = searchParams.get("destination")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    const { db } = await connectToDatabase()

    // Build query
    const query: any = {}

    if (category && category !== "Toutes") {
      query.category = category
    }

    if (destination) {
      query.destination = { $regex: destination, $options: "i" }
    }

    if (featured === "true") {
      query.featured = true
    }

    // Fetch gallery items from database
    let galleryItems = await db.collection("gallery").find(query).toArray()

    // Apply limit if specified
    if (limit) {
      galleryItems = galleryItems.slice(0, Number.parseInt(limit))
    }

    // Sort by likes (highest first)
    galleryItems.sort((a: any, b: any) => b.likes - a.likes)

    return NextResponse.json<ApiResponse<GalleryItem[]>>({
      success: true,
      data: galleryItems as unknown as GalleryItem[],
    })
  } catch (error) {
    console.error("Error fetching gallery items:", error)
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
    if (!body.title || !body.image || !body.destination) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    const { db } = await connectToDatabase()

    // Create new gallery item
    const newGalleryItem: GalleryItem = {
      id: `gallery_${Date.now()}`,
      ...body,
      likes: 0,
      featured: body.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert into database
    const result = await db.collection("gallery").insertOne(newGalleryItem)

    if (result.acknowledged) {
      return NextResponse.json<ApiResponse<GalleryItem>>({
        success: true,
        data: newGalleryItem,
        message: "Gallery item created successfully",
      })
    } else {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Failed to create gallery item",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error creating gallery item:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
