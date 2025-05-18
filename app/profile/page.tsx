"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { QuantumHeading } from "@/components/quantum-heading"
import { QuantumCard } from "@/components/quantum-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AccessBadge } from "@/components/access-badge"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"
import { UserIcon, Mail, Calendar, ArrowRight } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (currentUser) {
          setName(currentUser.name)
          setEmail(currentUser.email)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call to update profile
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      setUser({
        ...user,
        name,
        email,
      })
    }

    setIsSaving(false)
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-muted animate-pulse"></div>
              <div className="h-8 w-48 bg-muted animate-pulse"></div>
              <div className="h-4 w-32 bg-muted animate-pulse"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-orbitron text-3xl font-bold mb-4">Not Logged In</h1>
          <p className="mb-8">You need to be logged in to view your profile.</p>
          <Button onClick={() => router.push("/login")}>
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <QuantumHeading level={1} className="text-center mb-8">
            Your Profile
          </QuantumHeading>

          <div className="flex flex-col items-center mb-8">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="font-orbitron text-2xl font-bold">{user.name}</h2>
            <div className="mt-2">
              <AccessBadge level={user.accessLevel} size="lg" />
            </div>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Member since {user.joinDate}
            </div>
          </div>

          <QuantumCard className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button type="button" variant="outline" onClick={() => router.push("/membership")}>
                  Manage Membership
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </QuantumCard>
        </div>
      </div>
    </MainLayout>
  )
}
