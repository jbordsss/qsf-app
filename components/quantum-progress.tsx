"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface QuantumProgressProps {
  className?: string
  value?: number
  max?: number
  showValue?: boolean
  size?: "sm" | "md" | "lg"
  color?: string
}

export function QuantumProgress({
  className,
  value = 0,
  max = 100,
  showValue = false,
  size = "md",
  color = "#03a0fa",
}: QuantumProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress value
    const timer = setTimeout(() => {
      setProgress(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const percentage = Math.min(100, Math.max(0, (progress / max) * 100))

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full bg-black/50 rounded-full overflow-hidden border border-primary/20">
        <div
          className={cn("transition-all duration-1000 ease-out rounded-full", sizeClasses[size])}
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}40 0%, ${color} 50%, ${color}40 100%)`,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-xs text-right font-orbitron text-primary">
          {progress} / {max}
        </div>
      )}
    </div>
  )
}
