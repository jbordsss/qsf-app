"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { QuantumHeading } from "@/components/quantum-heading"
import { QuantumCard } from "@/components/quantum-card"
import { Button } from "@/components/ui/button"
import { Check, Users, CreditCard, Calendar, Zap } from "lucide-react"
import { getAccessTierDetails, getCurrentUser, upgradeTier, getGroupDiscountInfo } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User, AccessTier } from "@/lib/types"

export default function MembershipPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<AccessTier | null>(null)
  const rawTiers = getAccessTierDetails()
  const accessTiers = rawTiers.filter(t => t.tier !== 3 && t.tier !== 4)

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

  const handleUpgrade = async (tier: AccessTier) => {
    if (!user) {
      router.push("/login")
      return
    }

    setSelectedTier(tier)
    setIsUpgrading(true)

    try {
      const result = await upgradeTier(tier)
      if (result.success && result.user) {
        setUser(result.user)
        router.refresh()
      }
    } catch (error) {
      console.error("Error upgrading access:", error)
    } finally {
      setIsUpgrading(false)
    }
  }

  const renderPaymentType = (tier: AccessTier, paymentType: string) => {
    switch (paymentType) {
      case "free":
        return <Zap className="h-5 w-5 mr-2 text-gray-400" />
      case "subscription":
        return <Calendar className="h-5 w-5 mr-2 text-primary" />
      case "one-time":
        return <CreditCard className="h-5 w-5 mr-2 text-emerald-500" />
      case "enterprise":
        return <Users className="h-5 w-5 mr-2 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 text-center">
        <QuantumHeading level={1} className="text-center mb-4">
          Membership Tiers
        </QuantumHeading>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose the tier that best suits your quantum learning journey and unlock exclusive content and features.
        </p>

        <div className="space-y-6 max-w-3xl mx-auto">
          {accessTiers.map((tier) => {
            const isCurrentTier = user?.accessTier === tier.tier
            const isProcessing = isUpgrading && selectedTier === tier.tier
            const discountInfo = getGroupDiscountInfo(tier.tier)
            const tierColorClass = `tier-${tier.tier}` as const

            // Override price display for Tier 1 and Tier 2 as per new pricing
            let displayPrice = tier.price
            if (tier.tier === 1) {
              displayPrice = "$7 / month"
            } else if (tier.tier === 2) {
              displayPrice = "$27 / month"
            }

            return (
              <QuantumCard
                key={tier.tier}
                className={`p-4 ${isCurrentTier ? `border-2 border-tier-${tier.tier}` : ""}`}
                glowColor={tier.color}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-2/3">
                    <div className="flex items-center mb-2">
                      <h3 className={`font-orbitron text-xl font-bold mr-2 tier-${tier.tier}-color`}>{tier.name}</h3>
                      {isCurrentTier && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Current</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                    <div className="space-y-2 mb-4">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  <div className="md:w-1/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        {renderPaymentType(tier.tier, tier.paymentType)}
                        <span className="text-xs font-medium uppercase">
                          {tier.paymentType === "subscription" ? "Monthly" : tier.paymentType}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{displayPrice}</div>
                    </div>

                    {isCurrentTier ? (
                      <Button className="w-full mt-4" variant="outline" disabled>
                        Current Tier
                      </Button>
                    ) : (
                      <Button
                        className={`w-full mt-4 quantum-button tier-${tier.tier}-bg tier-${tier.tier}-border`}
                        onClick={() => handleUpgrade(tier.tier)}
                        disabled={isUpgrading || !user || (user && user.accessTier >= tier.tier)}
                        variant="outline"
                      >
                        {isProcessing
                          ? "Processing..."
                          : tier.paymentType === "enterprise"
                            ? "Contact Sales"
                            : `Get ${tier.name}`}
                      </Button>
                    )}
                  </div>
                </div>
              </QuantumCard>
            )
          })}
        </div>

        {!user && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">You need to be logged in to upgrade your membership.</p>
            <Button onClick={() => router.push("/login")}>Sign In</Button>
          </div>
        )}

        <div className="mt-12 max-w-3xl mx-auto">
          <QuantumHeading level={2} className="text-center mb-6">
            Frequently Asked Questions
          </QuantumHeading>

          <div className="space-y-6">
            <div>
              <h3 className="font-orbitron text-lg font-medium mb-2">How do the different tiers work?</h3>
              <p className="text-muted-foreground">
                We offer three membership tiers. Tier 1 gives you access to daily quantum insights, alerts, blogs, and videos. Tier 2 includes everything in Tier 1 plus full access to the QSF Magazine and in-depth briefings on our services. Tier 3 offers an executive-level experience, including in-person immersion programs held at our three flagship locations.
              </p>
            </div>


          <div>
              <h3 className="font-orbitron text-lg font-medium mb-2">What's included in the Executive Experience?</h3>
              <p className="text-muted-foreground">
                Tier 3, our Executive Experience, includes a 3-day in-person immersion at one of our strategic hubs (Middleburg, VA, Zurich, Switzerland, or Singapore). It features elite networking, strategic briefings, and private consultations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
