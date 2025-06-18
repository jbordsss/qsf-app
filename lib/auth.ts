import type { User, AccessTier } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000" 

// Mock current user - in a real app, this would come from an auth provider
let currentUser: User | null = null

// Mock users database

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get current user
export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  return await res.json();
}


// Login user
export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.detail || "Login failed" };
    }

    // ✅ Store JWT and user info
    localStorage.setItem("token", data.access_token);

    if (data.user && data.user.email) {
      localStorage.setItem("user_email", data.user.email);
    }

    return { success: true, data };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "Server error" };
  }
}

// Logout user
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_email");
}


// Register user
export async function register(name: string, email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.detail || "Registration failed" };
    }

    localStorage.setItem("token", data.access_token);
    return { success: true, data };
  } catch (err) {
    console.error("Error during registration:", err);
    return { success: false, error: "Server error" };
  }
}



// Check if user has required access tier
export function hasAccess(requiredTier: AccessTier): boolean {
  if (!currentUser) return requiredTier === 1
  return currentUser.accessTier >= requiredTier
}

// Upgrade user access tier
export async function upgradeTier(tier: AccessTier) {
  const email = localStorage.getItem("user_email"); // Replace with your auth strategy

  const priceMap: Record<AccessTier, string> = {
    0: "", // Free
    1: "price_123MEMBER",   // Replace with Stripe prices
    2: "price_456PREMIUM",
    3: "price_789EDU",
    4: "price_000EXEC",
  };

  const priceId = priceMap[tier];
  if (!priceId || !email) return { success: false, error: "Missing data" };

  const res = await fetch(`${BASE_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, price_id: priceId }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
    return { success: true };
  } else {
    return { success: false, error: "Failed to redirect to Stripe" };
  }
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
  checkoutUrl:string
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
      color: "#6b7280", 
      checkoutUrl: "https://buy.stripe.com/test_cNieVc5iW7Qk16d4yjfw400"
      // Gray
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
      checkoutUrl: "https://buy.stripe.com/test_cNieVc5iW7Qk16d4yjfw400",
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
      checkoutUrl: "https://buy.stripe.com/test_cNieVc5iW7Qk16d4yjfw400",
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
      checkoutUrl: "https://buy.stripe.com/test_cNieVc5iW7Qk16d4yjfw400",
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
      checkoutUrl: "https://buy.stripe.com/test_cNieVc5iW7Qk16d4yjfw400",
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
