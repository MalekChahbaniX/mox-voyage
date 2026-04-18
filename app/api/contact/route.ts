import { type NextRequest, NextResponse } from "next/server"
import type { ContactFormData, ContactSubmission, ApiResponse } from "@/lib/types"
import { connectToDatabase } from "@/lib/mongodb"

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

    const { db } = await connectToDatabase()

    // Create new contact submission
    const newSubmission: ContactSubmission = {
      id: `contact_${Date.now()}`,
      ...body,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert into database
    const result = await db.collection("contactSubmissions").insertOne(newSubmission)

    if (result.acknowledged) {
      // In a real application, you would:
      // 1. Send confirmation email to customer
      // 2. Send notification email to admin
      // 3. Add to CRM system

      console.log("New contact submission:", newSubmission)

      return NextResponse.json<ApiResponse<ContactSubmission>>({
        success: true,
        data: newSubmission,
        message: "Contact form submitted successfully",
      })
    } else {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Failed to save contact submission",
        },
        { status: 500 },
      )
    }
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
    const { db } = await connectToDatabase()

    // Fetch all contact submissions from database
    const contactSubmissions = await db.collection("contactSubmissions").find({}).toArray()

    // Sort by date (newest first)
    contactSubmissions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json<ApiResponse<ContactSubmission[]>>({
      success: true,
      data: contactSubmissions as unknown as ContactSubmission[],
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
