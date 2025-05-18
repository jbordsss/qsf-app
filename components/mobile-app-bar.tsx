"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Headphones, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { getCurrentUser } from "@/lib/auth"
import type { User as UserType } from "@/lib/types"

export function MobileAppBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUser()
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      {/* Top App Bar */}
      <div className="app-header flex items-center justify-between px-4 notch-padding">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="touch-manipulation">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 border-primary/20 pt-safe-top pb-safe-bottom">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                {/* Remove duplicate logo here */}
                <span className="font-orbitron text-lg font-bold">Menu</span>
              </div>
              <div className="overflow-y-auto momentum-scroll mobile-nav-height">
                <MainNav />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="app-bottom-nav">
        <Link href="/" className="flex flex-col items-center justify-center w-1/4 touch-manipulation">
          <div className={`p-2 rounded-full ${isActive("/") ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
            <Home className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1 font-orbitron">Home</span>
        </Link>

        {user && user.accessTier >= 2 && (
          <Link href="/podcasts" className="flex flex-col items-center justify-center w-1/4 touch-manipulation">
            <div
              className={`p-2 rounded-full ${
                isActive("/podcasts") ? "bg-primary/20 text-primary" : "text-muted-foreground"
              }`}
            >
              <Headphones className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1 font-orbitron">Podcasts</span>
          </Link>
        )}

        {user && user.accessTier >= 3 && (
          <Link href="/courses" className="flex flex-col items-center justify-center w-1/4 touch-manipulation">
            <div
              className={`p-2 rounded-full ${
                isActive("/courses") ? "bg-primary/20 text-primary" : "text-muted-foreground"
              }`}
            >
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xs mt-1 font-orbitron">Courses</span>
          </Link>
        )}

        <Link
          href={user ? "/profile" : "/login"}
          className="flex flex-col items-center justify-center w-1/4 touch-manipulation"
        >
          <div
            className={`p-2 rounded-full ${
              isActive("/profile") || isActive("/login") ? "bg-primary/20 text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1 font-orbitron">{user ? "Profile" : "Sign In"}</span>
        </Link>
      </div>
    </>
  )
}
