export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  date: string
  author: string
  category: string
  tags: string[]
  featured?: boolean
  accessTier?: AccessTier // Changed from accessLevel to accessTier
}

export interface Topic {
  id: string
  name: string
  slug: string
  count: number
}

// New types for access control with 5 tiers
export type AccessTier = 1 | 2 | 3 | 4 | 5

export interface User {
  id: string
  name: string
  email: string
  accessTier: AccessTier
  avatar?: string
  joinDate: string
}

// Course types for education tiers
export interface Course {
  id: string
  title: string
  slug: string
  description: string
  tier: AccessTier
  duration: string
  modules: number
  thumbnail?: string
  instructor: string
}

// Podcast type for tier 2
export interface Podcast {
  id: string
  title: string
  slug: string
  description: string
  duration: string
  date: string
  host: string
  thumbnail?: string
}

export type AccessLevel = "public" | "member" | "premium"
