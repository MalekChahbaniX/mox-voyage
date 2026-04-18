import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "./mongodb"
import bcrypt from "bcryptjs"
import type { UserRole } from "./types"
import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const client = await clientPromise()
        const db = client.db()
        const user = await db.collection("users").findOne({ email: credentials.email })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          image: user.avatar,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        token.role = user.role
        // For Google users, create account if it doesn't exist
        if (account.provider === "google") {
          const client = await clientPromise()
          const db = client.db()
          const existingUser = await db.collection("users").findOne({ email: user.email })
          
          if (!existingUser) {
            const names = user.name?.split(" ") || ["", ""]
            await db.collection("users").insertOne({
              email: user.email,
              firstName: names[0] || "",
              lastName: names[1] || "",
              role: "client",
              provider: "google",
              googleId: account.providerAccountId,
              emailVerified: true,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }
        }
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

// Helper functions for manual auth handling
export async function verifyUser(email: string, password: string) {
  try {
    const client = await clientPromise()
    const db = client.db()
    const user = await db.collection("users").findOne({ email })

    if (!user || !user.password) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return {
      id: user._id.toString(),
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    }
  } catch (error) {
    console.error("Error verifying user:", error)
    return null
  }
}

export async function createSession(user: any) {
  // This would typically create a session in your database
  // For now, this is a placeholder since NextAuth handles sessions
  console.log("Session created for user:", user.email)
}

export async function deleteSession() {
  // This would typically delete a session from your database
  // For now, this is a placeholder since NextAuth handles sessions
  console.log("Session deleted")
}

export async function getSession() {
  // This would typically get a session from your database
  // For now, this is a placeholder since NextAuth handles sessions
  return null
}

export default NextAuth(authOptions)
