import { type NextRequest, NextResponse } from "next/server"
import type { ContactFormData, ContactSubmission, ApiResponse } from "@/lib/types"
import { mockContactSubmissions } from "@/lib/mock-data"

// In-memory storage (replace with database in production)
const contactSubmissions = [...mockContactSubmissions]

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.travelType) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Create new contact submission
    const newSubmission: ContactSubmission = {
      id: Date.now().toString(),
      ...body,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to mock database
    contactSubmissions.push(newSubmission)

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email to customer
    // 3. Send notification email to admin
    // 4. Add to CRM system

    console.log("New contact submission:", newSubmission)

    return NextResponse.json<ApiResponse<ContactSubmission>>({
      success: true,
      data: newSubmission,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json<ApiResponse<ContactSubmission[]>>({
      success: true,
      data: contactSubmissions,
    })
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
