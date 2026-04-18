import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import type { RegisterData, AuthResponse } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body: RegisterData = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.password || !body.role) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      )
    }

    if (!body.agreeToTerms) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "You must agree to the terms and conditions",
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      )
    }

    // Validate password strength
    if (body.password.length < 8) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "Password must be at least 8 characters long",
        },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: body.email })
    if (existingUser) {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12)

    // Create new user
    const newUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
      phone: body.phone || null,
      role: body.role,
      emailVerified: false,
      isActive: true,
      provider: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(newUser)

    if (result.acknowledged) {
      // Remove password from response
      const { password, ...userWithoutPassword } = newUser

      return NextResponse.json<AuthResponse>(
        {
          success: true,
          user: {
            ...userWithoutPassword,
            id: result.insertedId.toString(),
          } as any,
          message: "User registered successfully",
        },
        { status: 201 }
      )
    } else {
      return NextResponse.json<AuthResponse>(
        {
          success: false,
          error: "Failed to register user",
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json<AuthResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    )
  }
}
