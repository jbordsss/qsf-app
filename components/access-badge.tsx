import type { AccessTier } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Lock } from "lucide-react"

interface AccessBadgeProps {
  tier: AccessTier
  className?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

export function AccessBadge({ tier, className, showIcon = true, size = "md" }: AccessBadgeProps) {
  const colors: Record<AccessTier, string> = {
    1: "bg-tier-1-light text-tier-1 border-tier-1-border",
    2: "bg-tier-2-light text-tier-2 border-tier-2-border",
    3: "bg-tier-3-light text-tier-3 border-tier-3-border",
    4: "bg-tier-4-light text-tier-4 border-tier-4-border",
    5: "bg-tier-5-light text-tier-5 border-tier-5-border",
  }

  const labels: Record<AccessTier, string> = {
    1: "Free",
    2: "Insights",
    3: "Sector",
    4: "Builder",
    5: "Executive",
  }

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  }

  const iconSizes = {
    sm: "h-3 w-3 mr-1",
    md: "h-3.5 w-3.5 mr-1",
    lg: "h-4 w-4 mr-1.5",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-orbitron",
        colors[tier],
        sizeClasses[size],
        className,
      )}
    >
      {showIcon && <Lock className={cn(iconSizes[size])} />}
      {labels[tier]}
    </span>
  )
}
