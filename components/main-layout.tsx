"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { QuantumParticles } from "@/components/quantum-particles"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MobileAppBar } from "@/components/mobile-app-bar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-container bg-gradient-to-b from-black to-black/95">
      <QuantumParticles />

      {/* Mobile app bar (visible on mobile only) */}
      <div className="md:hidden">
        <MobileAppBar />
      </div>

      {/* Desktop header (hidden on mobile) */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 hidden md:block ${
          isScrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto">
          <MainNav />
        </div>
      </header>

      <main className="app-page has-bottom-nav md:has-bottom-nav-none">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
