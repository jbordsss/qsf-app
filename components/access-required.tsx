"use client"

import type React from "react"

import { useState } from "react"
import type { AccessTier } from "@/lib/types"
import { hasAccess } from "@/lib/auth"
import { AccessBadge } from "@/components/access-badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

interface AccessRequiredProps {
  tier: AccessTier
  children: React.ReactNode
  blurContent?: boolean
  showTeaser?: boolean
  teaserHeight?: string
  className?: string
}

export function AccessRequired({
  tier,
  children,
  blurContent = true,
  showTeaser = true,
  teaserHeight = "200px",
  className,
}: AccessRequiredProps) {
  const router = useRouter()
  const [hasAccessRights] = useState(() => hasAccess(tier))

  if (hasAccessRights) {
    return <>{children}</>
  }

  const tierNames: Record<AccessTier, string> = {
    1: "Free",
    2: "Insights",
    3: "Sector Education",
    4: "Quantum Builder",
    5: "Executive Experience",
  }

  return (
    <div className={className}>
      {showTeaser && (
        <div className="relative overflow-hidden rounded-lg" style={{ height: teaserHeight }}>
          <div className={blurContent ? "blur-md" : ""}>{children}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex flex-col items-center justify-end p-6 text-center">
            <Lock className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-orbitron text-xl mb-2">
              <AccessBadge tier={tier} className="mr-2" /> Access Required
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              This content requires {tierNames[tier]} access. Upgrade your account to view this content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => router.push("/login")} className="w-full sm:w-auto">
                Sign In
              </Button>
              <Button onClick={() => router.push("/membership")} className="w-full sm:w-auto">
                Upgrade Access
              </Button>
            </div>
          </div>
        </div>
      )}

      {!showTeaser && (
        <div className="p-4 sm:p-6 border border-primary/20 rounded-lg bg-black/50 text-center">
          <Lock className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="font-orbitron text-xl mb-2">
            <AccessBadge tier={tier} className="mr-2" /> Access Required
          </h3>
          <p className="text-muted-foreground mb-4">
            This content requires {tierNames[tier]} access. Upgrade your account to view this content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => router.push("/login")} className="w-full sm:w-auto">
              Sign In
            </Button>
            <Button onClick={() => router.push("/membership")} className="w-full sm:w-auto">
              Upgrade Access
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
