"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { AuthButton } from "@/components/auth-button"
import type { User } from "@/lib/types"

export function MainNav({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  // Close search on route change
  useEffect(() => {
    setIsSearchOpen(false)
  }, [pathname])

  return (
    <div className="hidden md:flex h-16 items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/"
            className={`font-orbitron text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/category/quantum-computing"
            className={`font-orbitron text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/category/quantum-computing" ? "text-primary" : "text-foreground"
            }`}
          >
            Quantum Computing
          </Link>
          <Link
            href="/category/quantum-physics"
            className={`font-orbitron text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/category/quantum-physics" ? "text-primary" : "text-foreground"
            }`}
          >
            Quantum Physics
          </Link>
          <Link
            href="/category/quantum-technology"
            className={`font-orbitron text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/category/quantum-technology" ? "text-primary" : "text-foreground"
            }`}
          >
            Quantum Technology
          </Link>
          <Link
            href="/membership"
            className={`font-orbitron text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/membership" ? "text-primary" : "text-foreground"
            }`}
          >
            Membership
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        {isSearchOpen ? (
          <form onSubmit={handleSearch} className="flex items-center gap-2 animate-fadeIn">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] font-orbitron"
              autoFocus
            />
            <Button type="submit" size="sm" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-4 w-4" />
            <span className="ml-2 font-orbitron">Search</span>
          </Button>
        )}

        {user ? (
          <>
            <span className="text-sm text-muted-foreground">Hi, {user.name || user.email}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <AuthButton />
        )}
      </div>


    </div>
  )
}
