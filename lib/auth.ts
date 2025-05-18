import type { User, AccessTier } from "@/lib/types"

// Mock current user - in a real app, this would come from an auth provider
let currentUser: User | null = null

// Mock users database
const users: User[] = [
  {
    id: "1",
    name: "Free User",
    email: "free@example.com",
    accessTier: 1,
    joinDate: "May 18, 2025",
  },
  {
    id: "2",
    name: "Insights Subscriber",
    email: "insights@example.com",
    accessTier: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "April 10, 2025",
  },
  {
    id: "3",
    name: "Sector Course Student",
    email: "sector@example.com",
    accessTier: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "March 15, 2025",
  },
  {
    id: "4",
    name: "Quantum Builder",
    email: "builder@example.com",
    accessTier: 4,
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "February 20, 2025",
  },
  {
    id: "5",
    name: "Executive Member",
    email: "executive@example.com",
    accessTier: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "January 5, 2025",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  await delay(300)
  return currentUser
}

// Login user
export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  await delay(800)

  // Simple mock authentication
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  // In a real app, we would verify the password here
  currentUser = user
  return { success: true, user }
}

// Logout user
export async function logout(): Promise<{ success: boolean }> {
  await delay(300)
  currentUser = null
  return { success: true }
}

// Register user
export async function register(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  await delay(1000)

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "Email already in use" }
  }

  // Create new user with tier 1 access
  const newUser: User = {
    id: (users.length + 1).toString(),
    name,
    email,
    accessTier: 1,
    joinDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  }

  users.push(newUser)
  currentUser = newUser

  return { success: true, user: newUser }
}

// Check if user has required access tier
export function hasAccess(requiredTier: AccessTier): boolean {
  if (!currentUser) return requiredTier === 1
  return currentUser.accessTier >= requiredTier
}

// Upgrade user access tier
export async function upgradeTier(tier: AccessTier): Promise<{ success: boolean; user?: User; error?: string }> {
  await delay(800)

  if (!currentUser) {
    return { success: false, error: "Not logged in" }
  }

  // Update user access tier
  currentUser.accessTier = tier

  // Update in "database"
  const userIndex = users.findIndex((u) => u.id === currentUser?.id)
  if (userIndex >= 0) {
    users[userIndex] = { ...currentUser }
  }

  return { success: true, user: currentUser }
}

// Get access tier details
export function getAccessTierDetails(): Array<{
  tier: AccessTier
  name: string
  description: string
  features: string[]
  price: string
  paymentType: "free" | "subscription" | "one-time" | "enterprise"
  color: string
}> {
  return [
    {
      tier: 1,
      name: "News & Information",
      description: "Basic news and information about the macro and basics of quantum computing",
      features: [
        "Latest quantum computing news",
        "Basic quantum concepts",
        "Public research highlights",
        "Community discussions",
      ],
      price: "FREE",
      paymentType: "free",
      color: "#6b7280", // Gray
    },
    {
      tier: 2,
      name: "Insights + Magazine",
      description: "News, podcasts, regulatory updates, intelligence briefs",
      features: [
        "All Free tier features",
        "Exclusive podcasts",
        "Regulatory updates",
        "Intelligence briefings",
        "Monthly digital magazine",
        "Expert interviews",
      ],
      price: "$7/month",
      paymentType: "subscription",
      color: "#03a0fa", // Primary blue
    },
    {
      tier: 3,
      name: "Sector Education",
      description: "Sector/Vertical-specific courses to understand how Quanta can protect and enhance",
      features: [
        "All Insights tier features",
        "Sector-specific courses",
        "Vertical integration guides",
        "Protection strategies",
        "Enhancement techniques",
        "Certification of completion",
      ],
      price: "$30",
      paymentType: "one-time",
      color: "#10b981", // Emerald
    },
    {
      tier: 4,
      name: "Quantum Builder",
      description: "Learn the foundations of how to build a Quantum Computer",
      features: [
        "All Sector Education features",
        "Quantum hardware fundamentals",
        "Quantum programming",
        "System architecture",
        "Error correction techniques",
        "Hands-on projects",
        "Expert mentorship",
      ],
      price: "$70",
      paymentType: "one-time",
      color: "#8b5cf6", // Purple
    },
    {
      tier: 5,
      name: "Executive Experience",
      description: "Elite in-person, classified training immersion",
      features: [
        "All Quantum Builder features",
        "In-person training",
        "Classified information access",
        "Executive networking",
        "Strategic consulting",
        "Future technology previews",
        "Lifetime updates",
      ],
      price: "$150,000",
      paymentType: "enterprise",
      color: "#f59e0b", // Amber
    },
  ]
}

// Get group discount information
export function getGroupDiscountInfo(tier: AccessTier): {
  available: boolean
  basePrice: number
  discountText: string
} {
  switch (tier) {
    case 3:
      return {
        available: true,
        basePrice: 30,
        discountText: "Get $5 off every 10 students for up to $25 off per person.",
      }
    case 4:
      return {
        available: true,
        basePrice: 70,
        discountText: "Get $5 USD dollars off every 10 students for up to $30 USD off per person.",
      }
    default:
      return {
        available: false,
        basePrice: 0,
        discountText: "",
      }
  }
}
