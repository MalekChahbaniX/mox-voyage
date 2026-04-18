"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { UserRole } from "@/lib/types"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: UserRole[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = ["admin", "manager"], 
  fallback 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (requiredRoles && !requiredRoles.includes(session.user.role as UserRole)) {
      router.push("/unauthorized")
      return
    }
  }, [session, status, router, requiredRoles])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to access this page.</p>
      </div>
    )
  }

  if (requiredRoles && !requiredRoles.includes(session.user.role as UserRole)) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  return <>{children}</>
}
