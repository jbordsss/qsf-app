"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/types"

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (isLoading) {
    return <Button variant="ghost" size="sm" disabled className="h-8 w-8" />
  }

  return user ? (
    <UserAccountNav user={user} />
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/register">
        <Button size="sm">Sign Up</Button>
      </Link>
    </div>
  )
}
