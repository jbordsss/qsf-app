"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { QuantumParticles } from "@/components/quantum-particles"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobileAppBar } from "@/components/mobile-app-bar"
import { getCurrentUser, logout } from "@/lib/auth"
import type { User } from "@/lib/types"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Fetch user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <div className="app-container bg-gradient-to-b from-black to-black/95">
      <QuantumParticles />

      {/* Mobile Nav */}
      <div className="md:hidden">
        <MobileAppBar user={user} onLogout={handleLogout} />
      </div>

      {/* Desktop Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 hidden md:block ${
          isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto">
          <MainNav user={user} onLogout={handleLogout} />
        </div>
      </header>

      <main className="app-page has-bottom-nav md:has-bottom-nav-none">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
