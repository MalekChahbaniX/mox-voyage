import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const key = new TextEncoder().encode(secretKey)

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "agent" | "user"
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function createSession(user: User) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  const session = await encrypt({ user, expires })

  cookies().set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  cookies().delete("session")
}

// Mock user database (replace with real database in production)
const users: User[] = [
  {
    id: "1",
    email: "admin@moxvoyage.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "agent@moxvoyage.com",
    name: "Travel Agent",
    role: "agent",
  },
]

export async function verifyUser(email: string, password: string): Promise<User | null> {
  // In production, hash and compare passwords properly
  const mockPasswords: Record<string, string> = {
    "admin@moxvoyage.com": "admin123",
    "agent@moxvoyage.com": "agent123",
  }

  if (mockPasswords[email] === password) {
    return users.find((user) => user.email === email) || null
  }

  return null
}
