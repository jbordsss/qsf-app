import type React from "react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface QuantumHeadingProps {
  children: ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  color?: string
}

export function QuantumHeading({ children, className, level = 2, color = "#03a0fa" }: QuantumHeadingProps) {
  const baseClasses = "font-orbitron font-bold relative inline-block"

  const sizeClasses = {
    1: "text-3xl md:text-4xl mb-6",
    2: "text-2xl md:text-3xl mb-6",
    3: "text-xl md:text-2xl mb-4",
    4: "text-lg md:text-xl mb-3",
    5: "text-base md:text-lg mb-2",
    6: "text-sm md:text-base mb-2",
  }

  const combinedClasses = cn(baseClasses, sizeClasses[level], className)

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <div className="relative">
      <HeadingTag className={combinedClasses}>
        {children}
        <span
          className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ "--tw-gradient-via": color } as React.CSSProperties}
        ></span>
      </HeadingTag>
    </div>
  )
}
