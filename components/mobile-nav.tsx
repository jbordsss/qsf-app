"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuthButton } from "@/components/auth-button"

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="md:hidden flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
      </Link>

      <div className="flex items-center gap-2">
        <AuthButton />

        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <Search className="h-5 w-5" />
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 border-primary/20">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex flex-col gap-6">
                <Link
                  href="/"
                  className={`font-orbitron text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/" ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/category/quantum-computing"
                  className={`font-orbitron text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/category/quantum-computing" ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Quantum Computing
                </Link>
                <Link
                  href="/category/quantum-physics"
                  className={`font-orbitron text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/category/quantum-physics" ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Quantum Physics
                </Link>
                <Link
                  href="/category/quantum-technology"
                  className={`font-orbitron text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/category/quantum-technology" ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Quantum Technology
                </Link>
                <Link
                  href="/membership"
                  className={`font-orbitron text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/membership" ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Membership
                </Link>
              </nav>

              <div className="mt-auto pt-8">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="font-orbitron"
                  />
                  <Button type="submit" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/95 p-4 border-b border-primary/20 slide-in">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search for quantum news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-orbitron"
              autoFocus
            />
            <Button type="submit" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
