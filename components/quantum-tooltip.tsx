"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface QuantumTooltipProps {
  children: ReactNode
  content: string
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function QuantumTooltip({ children, content, position = "top", className }: QuantumTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2",
    left: "right-full top-1/2 transform -translate-x-2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform translate-x-2 -translate-y-1/2 ml-2",
  }

  const arrowClasses = {
    top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent",
    left: "right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent",
    right:
      "left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      <div
        ref={tooltipRef}
        className={cn(
          "absolute z-50 w-max max-w-xs px-3 py-2 rounded-md text-sm font-orbitron bg-black/90 border border-primary/30 backdrop-blur-sm text-white shadow-lg transition-all duration-200",
          positionClasses[position],
          isVisible ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {content}
        <div className={cn("absolute w-0 h-0 border-4 border-black/90", arrowClasses[position])} />
      </div>
    </div>
  )
}
