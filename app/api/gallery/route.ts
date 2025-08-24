import { type NextRequest, NextResponse } from "next/server"
import type { GalleryItem, ApiResponse } from "@/lib/types"
import { mockGalleryItems } from "@/lib/mock-data"

// In-memory storage (replace with database in production)
const galleryItems = [...mockGalleryItems]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const destination = searchParams.get("destination")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let filteredItems = [...galleryItems]

    // Apply filters
    if (category && category !== "Toutes") {
      filteredItems = filteredItems.filter((item) => item.category === category)
    }

    if (destination) {
      filteredItems = filteredItems.filter((item) => item.destination.toLowerCase().includes(destination.toLowerCase()))
    }

    if (featured === "true") {
      filteredItems = filteredItems.filter((item) => item.featured)
    }

    // Apply limit
    if (limit) {
      filteredItems = filteredItems.slice(0, Number.parseInt(limit))
    }

    // Sort by likes (highest first)
    filteredItems.sort((a, b) => b.likes - a.likes)

    return NextResponse.json<ApiResponse<GalleryItem[]>>({
      success: true,
      data: filteredItems,
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

    // Create new gallery item
    const newGalleryItem: GalleryItem = {
      id: Date.now().toString(),
      ...body,
      likes: 0,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to mock database
    galleryItems.push(newGalleryItem)

    return NextResponse.json<ApiResponse<GalleryItem>>({
      success: true,
      data: newGalleryItem,
      message: "Gallery item created successfully",
    })
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
