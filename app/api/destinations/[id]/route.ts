import { type NextRequest, NextResponse } from "next/server"
import type { Destination, UpdateDestinationData, ApiResponse } from "@/lib/types"
import { mockDestinations } from "@/lib/mock-data"

// In-memory storage (replace with database in production)
const destinations = [...mockDestinations]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const destination = destinations.find((d) => d.id === params.id)

    if (!destination) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Destination not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json<ApiResponse<Destination>>({
      success: true,
      data: destination,
    })
  } catch (error) {
    console.error("Error fetching destination:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: Partial<UpdateDestinationData> = await request.json()
    const destinationIndex = destinations.findIndex((d) => d.id === params.id)

    if (destinationIndex === -1) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Destination not found",
        },
        { status: 404 },
      )
    }

    // Update destination
    destinations[destinationIndex] = {
      ...destinations[destinationIndex],
      ...body,
      updatedAt: new Date(),
    }

    return NextResponse.json<ApiResponse<Destination>>({
      success: true,
      data: destinations[destinationIndex],
      message: "Destination updated successfully",
    })
  } catch (error) {
    console.error("Error updating destination:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const destinationIndex = destinations.findIndex((d) => d.id === params.id)

    if (destinationIndex === -1) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Destination not found",
        },
        { status: 404 },
      )
    }

    // Remove destination
    destinations.splice(destinationIndex, 1)

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Destination deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting destination:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
