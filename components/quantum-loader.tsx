"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface QuantumLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function QuantumLoader({ className, size = "md" }: QuantumLoaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-1/4 rounded-full bg-primary/20 animate-pulse"></div>
      </div>
    </div>
  )
}
